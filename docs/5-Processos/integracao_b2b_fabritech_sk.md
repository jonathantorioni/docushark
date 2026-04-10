# Documentação — Integração SK - B2B Fabritech

**Fonte: skpostfabritech** 

Analista: Jose Antonio

---

## Visão Geral
Integrações entre o Protheus (tabelas `ZK1`, `ZK2`, `PVF`, `SB1`, etc.) e a plataforma B2B Fabritech (via API REST), trabalhando com:
- Envio de produtos (JSON) recebidos da VTEX para Fabritech.
- Envio de estoques por filial.
- Sinalização de alterações de preço e envio via PUT.
- Atualizações em lote nas tabelas de controle (`ZK1`, `ZK2`).

O objetivo desta documentação é **descrever cada função**, explicar parâmetros, retornos, dependências e pontos de atenção — e também servir como estrutura para conversão em *mindmap*.

---

## Estrutura e convenções
- `ZK1` — tabela de produtos recebidos da VTEX.
- `ZK2` — tabela de estoques por produto/filial.
- `PVF`, `SB1`, `SA2`, `ACV`, `ACU` — tabelas do Protheus usadas nas consultas.
- Convenção de status:
  - `P` = Pendente (para envio).
  - `I` = Integrado (sucesso).
  - `F` = Falha.
- Muitas funções usam `GetNextAlias()` e consultas via `MPSysOpenQuery(...)`.

---

## Índice
- [SKEnvPrd](#skenvprd)
- [EnviaLote](#envialote)
- [PreparaAtualizacao](#preparaatualizacao)
- [AtuZK1Batch](#atuzk1batch)
- [UpdateBatch](#updatebatch)
- [AtuZK1Individual](#atuzk1individual)
- [SKaltPrc](#skaltprc)
- [ProcessaProdutoPreco](#processaprodutopreco)
- [PUTPRECO](#putpreco)
- [ParseOriginalJson](#parseoriginaljson)
- [GenProdJson](#genprodjson)
- [GetManufInfo / GetProdGroup / GetManufName / GetLocCat](#manuf-e-categoria)
- [StrSanitize / Implode / IsOracle](#utils)
- [GetPricesJ / GetPrcData / ProcPrcRecFull](#precos)
- [GetStockJs / GetStockData / ProcStockRec / GetStockQt](#estoque)
- [SKCarZk2 / InsereZk2](#skcarzk2)
- [SKEnvEst / GenEstqJson / EnvLotEstq / AtuZK2Batch / UpdZK2Batch / AtuZK2Ind](#envio-estoque)
- [RETUFFIL](#retuffil)
- [Notas de qualidade, melhorias e erros comuns](#melhorias)
- [Mindmap (formato baseado em headings)](#mindmap)

---

## SKEnvPrd
**Assinatura:** `User Function SKEnvPrd(nLoteSize, lTestMode)`

**Descrição curta:** Varre a tabela `ZK1` buscando produtos recebidos da VTEX (status `'P'`) e não enviados para a Fabritech, formata JSONs via `GenProdJson`, agrupa em lotes e envia via `EnviaLote`. Atualiza `ZK1` em lote com resultados.

**Parâmetros:**
- `nLoteSize` (opcional): tamanho máximo do lote. Aceita numérico ou string numérica. Default interno usado: 100 (ajusta para 50 se menor igual 0).
- `lTestMode` (opcional): `.T.` para simular (não envia).

**Retorno:** `array [total_processado, sucesso_geral, lotes_enviados, detalhes_erros]`

**Passo a passo:**
1. Salva contexto/área atual (`GetArea()`).
2. Ajusta `nMaxLote` tratando `nLoteSize`.
3. Se necessário, chama `RpcSetEnv(...)` para configurar ambiente.
4. Obtém token com `U_GetB2BTk()` — se falhar, retorna erro.
5. Monta query para selecionar produtos em `ZK1` com `ZK1_ATUALI = 'P'` e não integrados (`!= 'V'`).
   - Quando Oracle, reconstitui campos LONG/Lob (uses `UTL_RAW.CAST_TO_VARCHAR2(DBMS_LOB.SUBSTR(...))`).
6. Para cada registro:
   - Reconstroi JSON original (concatena pedaços em Oracle).
   - Faz parse seguro com `ParseOriginalJson`.
   - Valida mínimo: `RefId` e `Name`.
   - Gera novo JSON com `GenProdJson`.
   - Acumula JSONs e códigos em `aLote` / `aLoteCodes`.
   - Quando lote atinge `nMaxLote`, chama `EnviaLote` (a menos que `lTestMode`), registra sucesso/falha em `aData` via `PreparaAtualizacao`.
   - Periodicamente chama `AtuZK1Batch(aData)` quando `aData` atinge 100 itens.
7. Ao final envia último lote (se existir) e faz última atualização em `ZK1`.
8. Restaura ambiente e retorna resumo.

**Pontos importantes / erros comuns:**
- Depende de `U_GetB2BTk()`; sem token o envio não ocorre.
- JSONs muito grandes no Oracle são reconstruídos por múltiplos campos `Json1..Json99`.
- `lTestMode` útil para debug (não chama web service).
- Mensagens de log com `ConOut(...)` para acompanhamento.

---

## EnviaLote
**Assinatura:** `Static Function EnviaLote(aLote, cToken, aErrors)`

**Descrição:** Junta uma lista de JSONs (`aLote`) em um array JSON e faz envio via `U_EnvLoteB2B("PRODUTOS", cJsonFinal, cToken)` com até 3 tentativas. Registra erros em `aErrors`.

**Parâmetros:**
- `aLote` — array de strings (JSONs).
- `cToken` — token de autenticação.
- `aErrors` — array passado por referência para armazenar mensagens de erro.

**Retorno:** `.T.` se sucesso.

**Passos:**
1. Monta string `cJsonFinal = "[" + items + "]"`, validando que cada item seja texto (`ValType == "C"`).
2. Se problema na formação do JSON, adiciona erro em `aErrors` e retorna `.F.`.
3. Loop de tentativas (1..3):
   - Se tentativa > 1, renova token com `U_GetB2BTk()` e `Sleep`.
   - Chama `U_EnvLoteB2B`.
   - Em caso de erro registra `TCSQLERROR()` (ou mensagem desconhecida).
4. Log de sucesso ou falha após 3 tentativas.

**Observações:**
- Reaproveita `U_EnvLoteB2B` (função externa do código base).
- Retentativas com pequeno backoff.

---

## PreparaAtualizacao
**Assinatura:** `Static Function PreparaAtualizacao(aLote, aData, lSuccess, aCodes)`

**Descrição:** Para cada item do lote adiciona um registro em `aData` com o código, status (`I` ou `F`), data, hora e mensagem (em caso de erro). Usada para atualização em lote posterior.

**Parâmetros:**
- `aLote` — array de JSONs (não usado diretamente além do loop).
- `aData` — array (referência) que será preenchido.
- `lSuccess` — status booleano do envio do lote.
- `aCodes` — array com códigos dos itens do lote.

**Retorno:** void (modifica `aData` por referência).

---

## AtuZK1Batch
**Assinatura:** `Static Function AtuZK1Batch(aData)`

**Descrição:** Atualiza a tabela `ZK1` em lotes, separando registros com sucesso e falha. Usa `UpdateBatch` para atualizações em lote e, em caso de falha, usa `AtuZK1Individual`.

**Parâmetros:** `aData` — array de arrays com formato `[codigo, status, data, hora, msg]`.

**Detalhes operacionais:**
- Separa `aData` em `aCodesI` (sucesso) e `aCodesF` (falha).
- Atualiza em lotes (`nBatchSize = 500`) via `UpdateBatch`.
- Se `UpdateBatch` falhar tenta atualizar individualmente via `AtuZK1Individual`.

---

## UpdateBatch
**Assinatura:** `Static Function UpdateBatch(cStatus, aCodes, nStart, nEnd, cData, cHora, cMsg)`

**Descrição:** Monta e executa uma query SQL `UPDATE ... WHERE ZK1_CODIGO IN (...)` para atualizar vários códigos de uma só vez. Remove marcações de encoding `[UTF-8]` antes de executar.

**Parâmetros importantes:**
- `cStatus`: `'I'` ou `'F'`.
- `aCodes`: array de códigos.
- `nStart`, `nEnd`: limites do sub-lote.
- `cData`, `cHora`: valores para `ZK1_DTINTE` e `ZK1_HRINTE`.
- `cMsg`: mensagem de erro.

**Retornos:** `.T.` se sucesso.

**Observações:** Verifica retorno `TCSQLEXEC(cQuery) < 0` para detectar erro e loga `TCSQLERROR()`.

---

## AtuZK1Individual
**Assinatura:** `Static Function AtuZK1Individual(aData, cFilterStatus)`

**Descrição:** Atualiza `ZK1` um a um. Usada como fallback quando `UpdateBatch` falha.

**Parâmetros:**
- `aData`: array com os dados.
- `cFilterStatus`: se informado, atualiza apenas registros com este status.

**Observações:** Faz `TCSQLEXEC` por registro e loga query (parcial) em caso de erro.

---

## Utilitários: Implode, IsOracle, StrSanitize
### Implode
**Assinatura:** `Static Function Implode(cSeparator, aArray)`
Concatena elementos de `aArray` com separador `cSeparator`. Retorna string.

### StrSanitize
Remove aspas duplas, quebras de linha e faz `AllTrim`. Usada para preparar strings para JSON.

---

## ParseOriginalJson
**Assinatura:** `Static Function ParseOriginalJson(cJson)`

**Descrição:** Recebe `cJson` (string) e retorna `JsonObject()` com `fromJson(cJson)`; em caso de erro retorna `Nil`. Loga aviso/erro via `ConOut`.

**Pontos críticos:**
- Se o JSON estiver vazio ou for inválido retorna `Nil`.
- Em Oracle o JSON pode estar fragmentado em vários campos — reconstruído antes desta chamada.

---

## GenProdJson
**Assinatura:** `Static Function GenProdJson(oProd)`

**Descrição:** Gera o JSON no formato esperado pela Fabritech a partir do objeto original `oProd` (parseado do JSON vindo da VTEX). Junta dados de fabricante, categorias, imagens, relacionamentos, preços e estoques.

**Parâmetros:** `oProd` — objeto JSON (tipo `J`).

**Retorno:** string JSON formatada (ou `""` em caso de falha).

**Lógica (resumida, passo a passo):**
1. Valida `oProd` (`ValType(oProd) == "J"`).
2. Garante que `RefId` e `Name` existam (fallback para `""`).
3. Obtém `oManuf := GetManufInfo(RefId)`.
4. `cGroup := GetProdGroup(oManuf)` e `cManuf := GetManufName(oManuf)`.
5. `oCat := GetLocCat(RefId)` — se existir inclui estrutura de categorias com `oCat:ToJson()`; senão usa `oProd["Category"]`.
6. Monta campos principais (`_id`, `name`, `slug`, `description`, `brand`, `manufacturer`, `ean/barcode`, etc).
7. Insere `technicalSpecification` a partir do SKU quando presente; faz consulta em `SB1` para quantidade por caixa (`B1_XLOTVEN`).
8. Adiciona arrays de `image`, `alternatives`/`related` via `GetRelPrdJ`.
9. Anexa `prices` via `GetPricesJ` e `stocks` via `GetStockJs`.
10. Retorna `cJson` se começar com `{`, senão `""`.

**Pontos de atenção:**
- Usa `StrSanitize` para limpar textos.
- Se `Skus` estiver vazio muitos campos técnicos ficam com 0 ou vazio.
- Faz consulta em `SB1` para montar `boxQuantity`.
- Se alguma função auxiliar falhar (ex: `GetLocCat`) é aplicado fallback.

---

## Manuf. e Categoria (GetManufInfo, GetProdGroup, GetManufName, GetLocCat)
**GetManufInfo(cProdCod)**  
- Query em `SB1` para obter `codFab`, `codMarca`, `codGrupo`. Retorna `JsonObject` com estes campos ou objeto vazio.

**GetProdGroup(oManuf)**  
- Se `oManuf["codGrupo"]` existir, consulta `SBM` e retorna `BM_DESC`.

**GetManufName(oManuf)**  
- Se `oManuf["codFab"]` existir, consulta `SA2` e retorna `A2_NOME`.

**GetLocCat(cProdCod)**  
- Lê tabela `ACV` para categoria do produto e, com `WITH` (CatHierarchy), percorre níveis de categoria em `ACU` e monta JSON com levels (3=department, 2=category, 1=subcategory). Retorna objeto JSON ou vazio.

---

## Relacionamentos (GetRelPrdJ, GetAltProd, GetRelProd)
- `GetAltProd`: Busca em `VB1` por alternativas; monta lista única.
- `GetRelProd`: Busca em `VPD` por produtos relacionados; monta lista única.
- `GetRelPrdJ`: Monta os arrays `"alternatives":[...]` e `"related":[...]` em JSON pronto para inclusão na saída do produto.

---

## Preços (GetPricesJ, GetPrcData, ProcPrcRecFull)
**GetPricesJ(cProdCod)**  
- Usa `GetPrcData` para coletar registros de preço (`PVF`), compõe array JSON de preços e retorna como `"prices":[...],` ou, em contexto de outra chamada (`U_SKaltPrc`), retorna objeto JSON.

**GetPrcData(cProdCod)**  
- Executa uma query complexa com `ROW_NUMBER()` para obter preços por UF (cada `PVF` por UF). Para cada linha chama `ProcPrcRecFull`.

**ProcPrcRecFull(cAlias)**  
- Processa todos os campos de preço do registro `PVF`, cria strings JSON para cada preço com `id`, `name`, `promotion` (false) e `value`. Retorna uma estrutura contendo o `uf`, `aItems`, `aStrs` e `cAll` (concatenação).

---

## Estoque (GetStockJs, GetStockData, ProcStockRec, GetStockQt)
**GetStockJs(cProdCod)**  
- Retorna a string `"stocks":[...]` usando `GetStockData`.

**GetStockData(cProdCod)**  
- Query em `PVF` por `PVF_CODFIL, PVF_UF` e chama `ProcStockRec` por filial.

**ProcStockRec(cProdCod, cAlias, aStock)**  
- Para cada filial listada em MV (`ES_FILB2B`) busca entrada em `SZP` e chama `GetStockQt` para obter saldo (função `u_specc013` usada para cálculo). Monta objeto `{ "id":"09,filial", "name":"filial UF", "value":qtd }` e adiciona em `aStock`.

**GetStockQt(cProdCod, cFilOrig, cUF)**  
- Chama `u_specc013` (função externa) para obter saldo. Retorna array `[cProdCod, cFilOrig, cUF, saldo]` com tratamento de saldo negativo.

---

## SKaltPrc
**Assinatura:** `User Function SKaltPrc()`

**Descrição:** Verifica na tabela `PVF` por produtos cujo `PVF_DTCALC/PVF_HRCALC` são posteriores ao último envio em `ZK1` (ou seja, preços atualizados desde a última integração) e dispara `ProcessaProdutoPreco` para cada um, sinalizando os produtos que devem ser atualizados via API (PUT).

**Retorno:** `[total_processado, total_sinalizados, detalhes_erros]`

**Fluxo:**
1. Ajusta ambiente (RPC) se necessário.
2. Query eficiente com `GROUP BY` para trazer produtos com `PVF` mais recente que `ZK1`.
3. Coleta todos os produtos em memória `aProdutos`.
4. Obtém token `U_GetB2BTk()`.
5. Para cada produto chama `ProcessaProdutoPreco(...)`.
6. Restaura ambiente e retorna resumo.

---

## ProcessaProdutoPreco
**Assinatura:** `Static Function ProcessaProdutoPreco(cProduto, cDataAlt, cHoraAlt, cToken, aErrors)`

**Descrição:** Marca produto como pendente (`'P'`) em `ZK1`, gera JSON de preços (`GetPricesJ`), tenta enviar via `PUTPRECO` (com retentativas), atualiza `ZK1` com resultado.

**Retorno:** `1` em sucesso, `0` em falha.

**Detalhes:**
- Faz até 3 tentativas; renova token em cada tentativa se necessário.
- No sucesso chama `AtualizaStatusZK1(cProduto, "I", ...)`.
- Em falha ao final chama `AtualizaStatusZK1(cProduto, "F", ...)`.

---

## PUTPRECO
**Assinatura:** `Static Function PUTPRECO(cProduto, cJson, cToken, cObsInt)`

**Descrição:** Monta e executa requisição HTTP `PUT` para `"/v1/collection/products/"+cProduto` usando `FWRest()` com headers (Content-Type, Accept, Origin, Authorization). Envia JSON de preços no corpo (EncodeUTF8 para cp1252).

**Retorno:** `.T.` se status HTTP entre 200 e 299.

**Efeito colateral:** Atualiza registro `ZK1` (status, data/hora e `ZK1_OBSINT`) conforme resultado.

**Erros comuns:** Falha de rede, token inválido, status 4xx. `HTTPGetStatus(@cError)` é usado para obter código.

---

## RETUFFIL (RETFIL/RETFIL?)
**Assinatura:** `STATIC FUNCTION RETUFFIL(cEmpOri, cFilOri)`

**Descrição:** Lê tabela `SZP` para retornar informações da filial (`nomeFil`, `codEmp`, `codFil`, `cgc`, `empresa`, `uf`) e retorna o primeiro item do array `oJson["filiais"][1]`.

**Observação:** A função é usada para preencher o `name`/UF ao gerar JSON de estoque.

---

## SKCarZk2 / InsereZk2
**SKCarZk2()**  
- Busca produtos integrados (`ZK1_ATUALI = 'I'`) que não existem em `ZK2` e insere um registro inicial por filial (lista de filiais em `ES_FILB2B`).
- Usa `InsereZk2` para a inserção.

**InsereZk2(cCodigo, cFilOri)**  
- Obtém estoque via `u_specc013` e insere em `ZK2` com status `"N"` (novo) e gravando data/hora/obs. Usa `RecLock("ZK2", .T.)` para inserir e `MsUnlock()`.

---

## SKEnvEst / GenEstqJson / EnvLotEstq / AtuZK2Batch / UpdZK2Batch / AtuZK2Ind
**SKEnvEst(nLoteSize, lTestMode)** — Similar a `SKEnvPrd`, mas para estoque:
- Varre `ZK2` buscando itens com `ZK2_STATUE` indicando alteração (lógica no código original).
- Monta JSON por (`GenEstqJson`) e envia lotes via `EnvLotEstq`.
- Atualiza `ZK2` em lote via `AtuZK2Batch`.

**GenEstqJson(cProdCod, cFilOri, nSaldo)**  
- Monta JSON com `_id` = produto e `stock` com `id` = `"09," + filial`, `name` = `filial UF` e `value` = `nSaldo`.

**EnvLotEstq(aLote, cToken, aErrors)**  
- Monta JSON array e envia (mesma lógica de retentativas do envio de produtos).

**AtuZK2Batch / UpdZK2Batch / AtuZK2Ind**  
- Funções de atualização em lote/individual para `ZK2` (similar arquitetura a `ZK1`).

---

## Notas de Qualidade, Melhorias e Pontos de Atenção
1. **Tratamento de erros e logs:** O código usa `ConOut` para logs e `aErrors` para coletar erros. Seria interessante centralizar logs e adicionar níveis (INFO/ERROR).
2. **Reuso de tokens:** A renovação do token em cada tentativa pode ser otimizada verificando validade do token antes de renovar.
3. **Performance em Oracle:** A montagem do JSON a partir de vários campos (Json1..Json99) pode produzir strings muito longas — verificar limites de `DBMS_LOB.SUBSTR` e memória.
4. **Encoding:** Há muitas chamadas a `StrTran(..., "[UTF-8]", "")` e `EncodeUTF8(...)`. Validar encoding em origem e padronizar (usar UTF-8 consistentemente).
5. **Tratamento de concorrência:** Em `InsereZk2` foi usado `RecLock` e `MsUnlock()`, mas é necessário confirmar se há tratamento de deadlock em cenários concorrentes.
6. **Testes e modo de simulação:** `lTestMode` implementado em funções de envio — manter cobertura de testes unitários para ambas as rotas (simulação e execução real).
7. **Documentação inline:**  Blocos `/{Protheus.doc}` estão presentes e foram usados como base.
---

## Mindmap (estrutura hierárquica para importação)
- Integração Protheus SK - Fabritech
  - SKEnvPrd (envio produtos)
    - ParseOriginalJson
    - GenProdJson
      - GetManufInfo
      - GetProdGroup
      - GetManufName
      - GetLocCat
      - GetRelPrdJ
      - GetPricesJ
        - GetPrcData
          - ProcPrcRecFull
      - GetStockJs
        - GetStockData
          - ProcStockRec
            - GetStockQt
    - EnviaLote
      - U_EnvLoteB2B (externa)
    - PreparaAtualizacao
    - AtuZK1Batch
      - UpdateBatch
      - AtuZK1Individual
  - SKEnvEst (envio estoque)
    - GenEstqJson
    - EnvLotEstq
    - AtuZK2Batch
      - UpdZK2Batch
      - AtuZK2Ind
  - SKaltPrc (sinaliza alteração de preço)
    - ProcessaProdutoPreco
      - PUTPRECO
  - SKCarZk2 (carga inicial ZK2)
    - InsereZk2
  - Utilitários
    - Implode / StrSanitize / IsOracle / RETUFFIL

---
