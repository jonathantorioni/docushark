# SKZBP2B.PRW

**Documentação Técnica (Fonte: skprdb2b.prw)**

Este documento técnico descreve o conteúdo do arquivo `skprdb2b.prw` e suas funções principais. Foi preparado para revisão de qualidade e está formatado para ser visualizado com Markmap (mapa mental).


# Resumo do arquivo
- Propósito geral: integração de produtos entre Protheus e B2B (fraga), coleta, transformação e envio de preços, estoques, imagens e produtos completos.
- Principais responsabilidades:
  - Identificar produtos a processar
  - Coletar dados de Protheus e da API Fraga
  - Montar JSONs para envio
  - Enviar via API (PUT/POST) com lógica de lote e tentativas
  - Marcar registros como integrados ou falha na base ZBP
- Observações operacionais:
  - O código faz uso de chamadas externas (FWRest, parâmetros MV, PutMV/GetMV) e manipulação direta da tabela ZBP.
  - Possui funções de utilitários JSON e tratamento de tokens.

---

# Estrutura (nós principais para Markmap)

## SKZBP001 (User Function)
- Tipo: user function
- Descrição: processo de integração completo - chama a rotina inicial de cadastro e disparo de processos.
- Parâmetros: nenhum
- Retorno: .T. (sempre retorna .T.)
- Observações: chama `Processa001` e `SKZBP002`.

## Processa001 (Static Function)
- Tipo: static function
- Descrição: cadastro inicial de produtos a partir de SB1/PVF quando não existe registro em ZBP.
- Parâmetros:
  - nInserted (referência) contador de inserções
  - cAlias alias de consulta
- Retorno: .T. se inseriu algum registro
- Efeitos: insere registros em ZBP via `RecAddZBP`.

## RecAddZBP (Static Function)
- Tipo: static function
- Descrição: adiciona registro na tabela ZBP (ZBP090) com status e observação.
- Parâmetros: cCodigo (character, código do produto)
- Retorno: .T.
- Efeitos: grava campos ZBP_*; usa DbSeek em ZK1 para obter status se necessário.

## SKZBP002 (Static Function)
- Tipo: static function
- Descrição: coleta dados da API Fraga (quando disponível) ou do Protheus para cada produto pendente; chama atualização `AtuDadosPrd`.
- Parâmetros: nenhum
- Retorno: .T.
- Observações: usa `TKNFRAGA`, `GetDadosFraga`, `GetDadosProth`, `AtuDadosPrd`.

## GetDadosFraga (Static Function)
- Tipo: static function
- Descrição: consulta a API Fraga e monta estrutura JSON interna com dados do produto (quando disponível).
- Parâmetros: cCodProd, cToken
- Retorno: object/Json com chaves `fraga`, `protheus` e `dadosProduto`
- Observações: faz parsing do JSON retornado, tenta extrair imagens, especificações e normalizar campos; cria JSON manualmente.
- Dependências externas: FWRest, HTTPGetStatus

## GetDadosProth (Static Function)
- Tipo: static function
- Descrição: monta JSON a partir de dados do Protheus (usa `GetDscPrd`, `GetAltProd`, `GetRelProd`).
- Parâmetros: cCodProd
- Retorno: object JSON com `protheus` = .T. e `dadosProduto` preenchido

## AtuDadosPrd (Static Function)
- Tipo: static function
- Descrição: atualiza registro ZBP com os dados coletados (JSONs de produto, especificações, imagens, preços, estoques).
- Parâmetros: cCodProd, jDados, cOrigem
- Retorno: logical (.T. se atualizado)
- Efeitos: atualiza campos ZBP_* (ZBP_JPRODU, ZBP_JESPTC, ZBP_JIMAGE, ZBP_JALTER, ZBP_JRELAC, ZBP_JPRECO, ZBP_JESTOQ, flags ATU*), marca datas e observações.
- Notas de segurança: alterações em tabelas de produção; executa em Begin Transaction.

## TKNFRAGA (Static Function)
- Tipo: static function
- Descrição: obtém token da API Fraga (login) retornando accessToken
- Parâmetros: nenhum
- Retorno: cToken (character) ou empty
- Observações: HTTP POST para /v1/login; valores client key/secret embutidos no código - revisar segurança.

## GetLocCat (Static Function)
- Tipo: static function
- Descrição: consulta categorias locais (ACV/ACU) e monta objeto JSON com hierarquia de categorias.
- Parâmetros: cProdCod
- Retorno: object JSON (categories)

## GetDscPrd (Static Function)
- Tipo: static function
- Descrição: busca descrição e atributos do produto no Protheus e monta JSON parcial de produto usado por `GetDadosProth`.
- Parâmetros: cCodProd
- Retorno: jJson com `dadosProduto` (estrutura JSON)
- Observações: monta campos técnicos (peso, dimensões) e lista image[] vazia.

## StrSanitize (Static Function)
- Tipo: static function
- Descrição: sanitiza strings para JSON (retira quebras, aspas, trims)
- Parâmetros: cString
- Retorno: string sanitizada

## GetAltProd / GetRelProd (Static Function)
- Tipo: static function
- Descrição: obtém arrays de códigos alternativos e relacionados (VB1 / VPD)
- Parâmetros: cProdCod
- Retorno: array de códigos

## GetPricesJ / GetPrcData / ProcPrcRecFull
- Tipo: static function
- Descrição:
  - `GetPricesJ`: monta JSON de preços usando `GetPrcData`
  - `GetPrcData`: retorna array com todos os campos de preços por filial/UF
  - `ProcPrcRecFull`: formata cada registro de preço em objetos JSON
- Parâmetros: cProdCod (quando aplicável) ou cAlias
- Retorno: JSON ou arrays usados para compor o payload de preços

## GetStockJs / GetStockData / ProcStockRec / GetStockQt
- Tipo: static function
- Descrição: funções para extrair estoque no formato JSON e quantidades disponíveis
- Parâmetros: cProdCod (e alias/filial/UF conforme assinatura)
- Retorno: JSONs/arrays com estoque

## JsonEscape (Static Function)
- Tipo: static function
- Descrição: escapa strings para uso em JSON (barra, aspas, CR/LF) e remove controles invisíveis
- Parâmetros: cStr
- Retorno: string escapada
- Observações: implementação importante para evitar JSON inválido

## SKZBP007 (User Function)
- Tipo: user function
- Descrição: orquestrador que chama as rotinas de envio (SKZBP003..006)
- Parâmetros: nenhum
- Retorno: numeric (soma dos resultados das rotinas de envio)

## SKZBP003 / SKZBP004 / SKZBP005 / SKZBP006 (User Functions)
- Tipo: user functions
- Descrição:
  - SKZBP003: Envio de preços (lotes)
  - SKZBP004: Envio de estoques (lotes)
  - SKZBP005: Envio de imagens (lotes)
  - SKZBP006: Envio de produtos completos (lotes)
- Parâmetros: nenhum
- Retorno: número enviado com sucesso
- Observações: cada função contabiliza total, quebra em lotes e chama `ProcLot*` correspondentes.

## ProcLotPreco / ProcLotEstoq / ProcLotimage / ProcLotProdu (Static)
- Tipo: static function
- Descrição: preparam arrays com itens do lote (montagem de JSON parcial ou completo) e chamam os processamentos individuais (`ProcInd*`) ou envio em lote (`EnviaLoteProdu`).
- Parâmetros: nLote, nLoteSize, @nEnviados, @nFalhas
- Retorno: .T.

## ProcIndPreco / ProcIndEstoq / ProcIndImage / ProcIndProdut
- Tipo: static function
- Descrição: processa cada item individualmente e chama `PutIndiviB2B`.
- Parâmetros: (cCodProd, cJson...) dependendo da função
- Retorno: logical (.T. se sucesso)
- Efeitos: em caso de sucesso chama `MarcInt*`, em falha chama `MarcaFalha`.

## PutIndiviB2B (Static Function)
- Tipo: static function
- Descrição: envia um produto individual via PUT para o endpoint do B2B (usa cPath + produto.codigo)
- Parâmetros: jProduto, cPath, cJson (opcional)
- Retorno: logical
- Observações: usa GetB2BTk() para token; define headers e executa PUT via FWRest. Trata status HTTP.

## GetB2BTk / TokenValidoMV / AtualizaTokenMV / DateTimeToChar / STOTIME
- Tipo: static functions utilitárias para gerenciar token do B2B
- Descrição:
  - `GetB2BTk`: recupera token a partir de MV ou atualiza
  - `TokenValidoMV`: valida timestamp do token
  - `AtualizaTokenMV`: realiza POST de autenticação e grava PutMV com token dividido em partes
  - `DateTimeToChar` e `STOTIME`: utilitários de conversão de data/hora
- Observações: `AtualizaTokenMV` realiza POST para /v1/login e grava nos MV (PutMV); use com cuidado e verifique credenciais nos MV.

## EnviaLoteProdu / EnvLoteB2B
- Tipo: static function
- Descrição:
  - `EnviaLoteProdu`: monta JSON do lote, valida e tenta enviar com retentativas, atualiza lista de erros
  - `EnvLoteB2B`: efetivamente faz POST para endpoints (produtos, estoque, preços, imagens)
- Parâmetros: variados (aLote, cToken, cJson, cTipo)
- Retorno: logical
- Observações: possui retry (3 tentativas), espera progressiva, e logging via ConOut.

## MarcIntPreco / MarcIntEstoq / MarcIntImage / MarcIntProdu / MarcaFalha
- Tipo: static functions
- Descrição: funções que marcam registros ZBP como integrado ou falha (atualizam campos e timestamps)
- Parâmetros: cCodProd, cTipo, cMotivo (MarcaFalha)
- Retorno: logical
- Efeitos: Atualizam flags ZBP_* e campos de data/hora; executam dentro de Begin Transaction.

---

# Notas de Qualidade / Pontos de Atenção
- Segurança: chaves e segredos (client key/secret) estão no código (`TKNFRAGA`) — migrar para configuração segura (MV/secret store).
- Robustez: montagem manual de JSON por concatenação de strings aumenta risco de JSON inválido; recomenda-se usar bibliotecas JSON (quando possível) ou reforçar JsonEscape/StrSanitize.
- Tamanho de Lote / Performance: limites de Lote e paginação comentada (algumas queries possuem comentário de OFFSET/FETCH). Testar comportamento em bases grandes.
- Tratamento de Erros: falhas de rede são registradas, mas alguns de/para mapping podem perder relação produto erro — `EnviaLoteProdu` e `ProcLotProdu` têm lógica simplificada para associar erros.
- Transações: atualizações em ZBP fazem Begin Transaction – garantir rollback em falhas críticas (o código atual faz uso correto do Begin/End Transaction na maioria dos pontos).
- Validação de JSON: funções `ProcLotProdu` e `ProcInd*` validam início do JSON por `Left(cJsonProduto, 1) == "{"` — considerar validação adicional.

---

# Recomendações para homologação
- Executar testes em ambiente de homologação com volumes de lote pequenos; validar logs e campos ZBP após execução.
- Testar os fluxos de atualização de token (GetB2BTk / AtualizaTokenMV) com tempos de expiração próximos.

---

# Itens entregues
- eEste arquivo: documentação técnica em Markdown compatível com Markmap.

---
Fim da documentação.
