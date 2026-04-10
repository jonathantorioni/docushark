# Integração CRM Seller (Notas Fiscais)

## Visão Geral

Sistema de integração **inteligente** responsável por enviar **notas fiscais** do Protheus para o sistema **CRM Seller** via API REST, com controle automático por parâmetros e ativação por filial.

### Funcionalidades Principais
- **Controle inteligente** via parâmetros ES_SELLFST, ES_SELLDAY, ES_SELLACT
- **Ativação por filial** com controle individual ES_SELLACT
- **Processamento assíncrono** para múltiplas filiais via StartJob
- **Detecção automática** primeira carga vs carga diária
- **URL V2 dinâmica** via crmCredencial.prw ("seller" parameter)
- **Logs detalhados** para monitoramento e debug
- **Controle de duplicação** via tabela ZRM

---

## Arquitetura do Sistema

### Estrutura de Arquivos
```
ag/2026/V3.0/integracao_clientes/
├── agcpdcrm.prw              # Fonte principal com sistema inteligente
├── crmCredencial.prw         # URLs V2 e credenciais
├── crmintegracao.prw         # Integrações grupo/marca/modelo
└── CRM_Seller_Documentacao.md # Esta documentação
```

### Dependências
- **crmCredencial.prw**: URLs V2 dinâmicas e tokens
- **Tabela ZRM**: Controle de integração e logs
- **Parâmetros**: ES_SELLFST, ES_SELLDAY, ES_SELLACT

---

## Sistema de Parâmetros Inteligente

### **Parâmetros do Sistema**
| Parâmetro | Tipo | Escopo | Descrição | Default | Exemplo |
|-----------|------|--------|-----------|---------|---------|
| **ES_SELLFST** | Lógico | Global | .T.=Primeira carga \| .F.=Diária | `.T.` | `.F.` |
| **ES_SELLDAY** | Numérico | Global | Dias processamento (0=automático) | `0` | `7` |
| **ES_SELLACT** | Lógico | **Por Filial** | .T.=Ativa \| .F.=Inativa | `.F.` | `.T.` |

### **Lógica Automática**
```advpl
// Sistema decide automaticamente baseado nos parâmetros:

// PRIMEIRA CARGA (ES_SELLFST = .T.)
- Período: 24 meses (se ES_SELLDAY = 0) ou ES_SELLDAY dias
- Ideal para: Carga inicial, migração

// CARGA DIÁRIA (ES_SELLFST = .F.)  
- Período: 1 dia (se ES_SELLDAY = 0) ou ES_SELLDAY dias
- Ideal para: Processamento diário automático
```

---

## Funções Principais

### 1. **U_CRMSELLER(aParam)**

**Função principal inteligente** para integração de notas fiscais.

#### Parâmetros
| Parâmetro | Tipo | Obrigatório | Descrição | Exemplo |
|-----------|------|-------------|-----------|---------|
| `aParam` | Array | ✅ | \{empresa, filial\} | `{"01","01"}` |

#### Exemplos de Uso
```advpl
// Integração automática - usa parâmetros ES_SELL*
U_CRMSELLER(\{"01","01"\})  // Empresa 01, Filial 01

// Diferentes empresas/filiais
U_CRMSELLER(\{"04","03"\})  // Empresa 04, Filial 03
U_CRMSELLER(\{"01","02"\})  // Empresa 01, Filial 02

// Sistema verifica ES_SELLACT automaticamente
// Se filial estiver inativa, finaliza sem processar
```

#### Controle de Ativação
```advpl
// FILIAL ATIVA (ES_SELLACT = .T.)
- Processa notas conforme ES_SELLFST/ES_SELLDAY
- Grava logs de sucesso/erro na ZRM

// FILIAL INATIVA (ES_SELLACT = .F.)
- Exibe mensagem informativa nos logs
- Finaliza sem processar (não é erro)
- Para ativar: configurar ES_SELLACT = .T. na filial
```

---

### 2. **U_CRMSELDB(cEmpresa)**

**Função de debug** para processar todas as filiais de uma empresa em paralelo.

```advpl
// Debug empresa 01 - todas as filiais via StartJob
U_CRMSELDB("01")

// Debug empresa 04 - todas as filiais
U_CRMSELDB("04")
```

#### Características
- **Processamento paralelo** via StartJob para cada filial
- **Delay controlado** (3s entre disparos)
- **Logs detalhados** de progresso
- **Respeita ES_SELLACT** - filiais inativas são finalizadas
- **Ideal para testes** e cargas massivas

#### Output Típico
```
=== CRM SELLER DEBUG (MODO ASSÍNCRONO) ===
Empresa: 01
Filiais encontradas: 8
ATENÇÃO: Jobs serão executados em paralelo!
Disparando JOB 1/8 - Empresa: 01 Filial: 01
JOB DISPARADO - Empresa: 01 Filial: 01
Aguardando 3 segundos antes do próximo disparo...
...
=== TODOS OS JOBS DISPARADOS ===
Total de jobs disparados: 8
```

---

## URL V2 Dinâmica

### **Sistema Inteligente de URLs**
O sistema usa **crmCredencial.prw** com parâmetro **"seller"** para determinar URLs:

```advpl
// crmCredencial.prw detecta automaticamente:
If cParam == "seller"
    // Usar URL V2 para integração Seller
    cUrl := "https://wfrsistemas.net.br/Sites/CamposDealer/CamposDealer/API_CRM_V2/"
Else  
    // URLs padrão para grupo/marca/modelo
    cUrl := "https://wfrsistemas.net.br/Sites/CamposDealer/CamposDealer/API_CRM/"
EndIf
```

### **Configuração Automática**
- **Grupo/Marca/Modelo**: API_CRM (URL original)
- **Seller (Notas)**: API_CRM_V2 (nova URL)
- **Detecção automática** baseada no tipo de integração

---

## Schedule e Processamento Automático

### **Configuração Schedule Recomendada**

#### **Empresa 01 (Shark Tratores)**
```
Nome: CRM_SELLER_EMP01
Função: U_CRMSELDB  
Parâmetro: "01"
Frequência: Diária às 00:00
Descrição: CRM Seller - Empresa 01 - Todas Filiais
```

#### **Empresa 04 (Agricase)**
```
Nome: CRM_SELLER_EMP04
Função: U_CRMSELDB
Parâmetro: "04"
Frequência: Diária às 00:00  
Descrição: CRM Seller - Empresa 04 - Todas Filiais
```

### **Fluxo de Execução Schedule**
1. **Schedule** dispara `U_CRMSELDB("01")` às 00:00
2. **Sistema busca** todas as filiais da empresa via `CrmGetFils()`
3. **Para cada filial** dispara `U_CRMSELLER(\{empresa, filial\})`
4. **Cada filial verifica** ES_SELLACT individualmente:
   - **Se ES_SELLACT = .T.**: Processa notas conforme ES_SELLFST/ES_SELLDAY
   - **Se ES_SELLACT = .F.**: Finaliza com log informativo

---

## Configuração

### Parâmetros Necessários

#### **1. Sistema ES_SELL*** 
| Parâmetro | Tipo | Escopo | Valor Sugerido | Descrição |
|-----------|------|--------|----------------|-----------|
| **ES_SELLFST** | Lógico | Global | .F. | .F.=Diária, .T.=Primeira |
| **ES_SELLDAY** | Numérico | Global | 0 | 0=Auto, N=Dias específicos |
| **ES_SELLACT** | Lógico | **Por Filial** | .F. | .T.=Ativa, .F.=Inativa |

#### **2. Credenciais API** (via **crmCredencial.prw**)
- **URLs automáticas**: Detecta "seller" para API_CRM_V2
- **Tokens por empresa**: Configuração individual
- **IdGrupo**: Identificação do grupo de empresas

### **Ativação Filiais Piloto**
```advpl
// Configurar via Configurador apenas nas filiais piloto:
// Empresa 01 - Filial 01: ES_SELLACT = .T.
// Empresa 01 - Filial 03: ES_SELLACT = .T.
// Empresa 04 - Filial 01: ES_SELLACT = .T.  
// Empresa 04 - Filial 03: ES_SELLACT = .T.
// Demais filiais mantém ES_SELLACT = .F. (padrão)
```

---

## Monitoramento e Logs

### **Logs Inteligentes**
```advpl
// Filial ativa processando
ConOut("=== CRM SELLER INTEGRAÇÃO ===")  
ConOut("Empresa: 01 | Filial: 01")
ConOut("Primeira Carga: NÃO | Tipo: DIARIA | Dias: 1")
ConOut("Período: 12/03/2026 até 13/03/2026")

// Filial inativa (não é erro)
ConOut("=== CRM SELLER DESABILITADO ===")
ConOut("Empresa: 01 | Filial: 02 - FILIAL INATIVA")
ConOut("Para ativar: Configurar ES_SELLACT = .T. na filial 01/02")
```

### **Logs de Debug Paralelo**
```advpl
U_CRMSELDB("01")
/*
=== CRM SELLER DEBUG (MODO ASSÍNCRONO) ===
Empresa: 01
Filiais encontradas: 8
Disparando JOB 1/8 - Empresa: 01 Filial: 01
JOB DISPARADO - Empresa: 01 Filial: 01
Aguardando 3 segundos antes do próximo disparo...
=== TODOS OS JOBS DISPARADOS ===
Total de jobs disparados: 8
*/
```

### **Verificação Status**
```advpl
// Verificar integrações na ZRM
SELECT ZRM_CODIGO, ZRM_OPERAC, ZRM_STATUS, ZRM_EMPRES, ZRM_FILORI 
FROM ZRM010 
WHERE ZRM_INTERF = 'SELL-POST' 
  AND ZRM_DATA = '20260313'
ORDER BY ZRM_HORA DESC
```

---

## Tabela ZRM - Controle de Integração

### Campos Principais
| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| **ZRM_IDCRM** | C(50) | NumeroNota+Serie | `00000111` |
| **ZRM_CODIGO** | C(50) | ID do Cliente | `000001` |
| **ZRM_INTERF** | C(20) | Interface | `SELL-POST` |
| **ZRM_OPERAC** | C(1) | Operação (A/U/X) | `A` |
| **ZRM_STATUS** | C(3) | Status HTTP | `200` |
| **ZRM_EMPRES** | C(2) | Empresa origem | `01` |
| **ZRM_FILORI** | C(2) | Filial origem | `01` |

### Status de Operação
| Código | Descrição | Ação |
|--------|-----------|-------|
| **A** | Inserido | Nova nota criada no CRM |
| **U** | Atualizado | Nota já existia (409) |
| **X** | Erro | Falha na integração |
```advpl
// Configuração automática baseada na empresa
oConfig := U_crmCredl("01")  // Empresa 01
/*
Retorna:
{
  "Url": "https://wfrsistemas.net.br/...",
  "Token": "Basic xxxxxxxx",
  "IdGrupo": "123",
  "IdEmpresa": "456"
}
*/
```

#### **2. Controle de Execução**
- **ES_SELLULT_01_01**: Última execução filial 01/01
- **ES_SELLULT_03_02**: Última execução filial 03/02
- **ES_EMPRCRM**: Empresas ativas (`"01,03,04,06,11,24,27"`)
- **ES_FILCRM**: Filiais ativas (`"01,02"`)

### Endpoints API

#### **Envio de Notas**
```http
POST /PRTNotaVenda/grupo/{idGrupo}/empresa/{idEmpresa}/CreateNotaVenda
Content-Type: application/json
Authorization: Basic {token}
```

#### **Finalização Pós-Integração**
```http
POST /PRTNotaVenda/grupo/{idGrupo}/PostAtualizaNotaVenda
Content-Type: application/json
Authorization: Basic {token}
```

---

## Estrutura de Dados

### JSON da Nota Fiscal
```json
\{
  "idNota": "000001",
  "idEmpresa": "01",
  "idFilial": "01",
  "clienteId": "000001",
  "numeroNota": "000001",
  "serie": "1",
  "data": "2026-03-10",
  "operacao": "101",
  "operacaoNatureza": "VENDAS DE MERCADORIAS",
  "tipoOperacao": "V",
  "Moeda": "BRL",
  "totalMercadoria": 1000.00,
  "totalServico": 0.00,
  "totalNota": 1000.00,
  "tipoPagamento": "V",
  "nroParcelas": 1,
  "vendedorId": "000001",
  "vendedorNome": "João Silva",
  "customerName": "EMPRESA TESTE LTDA",
  "customerDoc": "12.345.678/0001-90",
  "listaItens": [
    \{
      "item": "01",
      "codigo": "PROD001",
      "descricao": "Produto Teste",
      "ncm": "12345678",
      "cfop": "5102",
      "classe": "A",
      "um": "PC",
      "tipo": "ME",
      "quantidade": 10,
      "precoUnit": 100.00,
      "totalItem": 1000.00,
      "desconto": 0.00,
      "acrescimo": 0.00,
      "impostos": 180.00
    \}
  ]
\}
```

### Campos Calculados

#### **tipoOperacao** (V/D)
```sql
CASE 
  WHEN UPPER(SF4.F4_XRESMOV) LIKE '%DEVVEN%' THEN 'D' 
  WHEN UPPER(SF4.F4_XRESMOV) LIKE '%VENDA%' THEN 'V' 
  ELSE 'V' 
END
```

#### **tipoPagamento** (V/P)
- **"V"**: À vista (1 parcela ou parcelas vazias)
- **"P"**: Parcelado (> 1 parcela)

---

## Query Principal

### Tabelas Utilizadas (Estrutura Modernizada)
```sql
FROM SF2010 SF2                 -- Cabeçalho das notas (nomenclatura direta)
INNER JOIN SD2010 SD2           -- Itens das notas (nomenclatura direta)
INNER JOIN SB1040 SB1           -- Produtos
INNER JOIN SA1080 SA1           -- Clientes
INNER JOIN SF4210 SF4           -- TES
LEFT JOIN SA3010 SA3            -- Vendedores
LEFT JOIN SE4A01 SE4            -- Condições pagamento
LEFT JOIN ZRM010 ZRM            -- Controle integração
```

### Filtros Aplicados (Por Filial)
```sql
-- Isolamento rigoroso por filial
SF2.F2_FILIAL = '\{cFilOri\}'         -- Filial específica
SD2.D2_FILIAL = '\{cFilOri\}'         -- Isolamento items
SE1.E1_FILORIG = '\{cFilOri\}'        -- Financeiro origem
SA3.A3_FILIAL = '\{cFilOri\}'         -- Vendedor filial

-- Período dinâmico baseado em parâmetros
SF2.F2_EMISSAO BETWEEN '\{cDataIni\}' AND '\{cDataFim\}'

-- Filtros de negócio
SF2.F2_XTPPED != '36'               -- Exclusões específicas
SB1.B1_TIPO = 'ME'                 -- Apenas mercadorias
D2_XEMPFIL = '\{cEmpAnt\}\{cFilAnt\}'   -- Empresa+Filial
ZRM.ZRM_CODIGO IS NULL              -- Não integrados
```

### URL V2 Dinâmica
```sql
-- Sistema automaticamente determina URL baseado na função
-- crmCredencial.prw("seller") → API_CRM_V2/
-- Demais integrações → API_CRM/
```

---

## Troubleshooting

### **Problemas Comuns**

#### **1. "Filial Inativa - ES_SELLACT = .F."**
```advpl
// SINTOMA: 
=== CRM SELLER DESABILITADO ===
Empresa: 01 | Filial: 02 - FILIAL INATIVA

// SOLUÇÃO:
// 1. Configurar ES_SELLACT = .T. na filial desejada
// 2. Não é erro - é controle intencional
```

#### **2. "Nenhuma filial encontrada"**
```advpl
// VERIFICAÇÃO:
aFiliais := CrmGetFils("01")
If Len(aFiliais) == 0
    // Problema: Função CrmGetFils() não localiza filiais
    // Verificar lógica interna da função
EndIf
```

#### **3. "Erro ao obter configurações"**  
```advpl
// VERIFICAÇÃO:
oConfig := U_crmCredl("01")
If oConfig == Nil
    // Problema: crmCredencial.prw não configurado
    // Verificar função com parâmetro "seller"
EndIf
```

#### **4. "Query não retorna dados com sistema inteligente"**
- **Período automático**: Verificar se ES_SELLFST/ES_SELLDAY estão corretos
- **Primeira carga**: Pode buscar 24 meses se ES_SELLDAY = 0
- **Carga diária**: Busca D-1 se ES_SELLDAY = 0
- **Filtros por filial**: Conferir isolamento rigoroso por filial

---

## Monitoramento Avançado

### **Verificação Sistema Parâmetros**
```advpl
// Verificar configuração atual
ConOut("ES_SELLFST: " + cValToChar(SuperGetMv("ES_SELLFST",.F.,.T.)))
ConOut("ES_SELLDAY: " + cValToChar(SuperGetMv("ES_SELLDAY",.F.,0)))
ConOut("ES_SELLACT: " + cValToChar(SuperGetMv("ES_SELLACT",.F.,.F.)))
```

### **Performance Schedule**
| Métrica | Valor Esperado | Observação |
|---------|----------------|------------|
| **Jobs simultâneos** | 8-12 por empresa | Via U_CRMSELDB |
| **Delay entre jobs** | 3s | Evita sobrecarga |
| **Filiais ativas** | 2-4 iniciais | Crescimento gradual |
| **Timeout API** | 30s | Por requisição |

---

## Checklist de Implementação

### **Pré-requisitos**
- [ ] **Tabela ZRM** criada com campos atualizados
- [ ] **crmCredencial.prw** configurado com suporte "seller" → API_V2
- [ ] **Parâmetros ES_SELL*** criados no Configurador
- [ ] **ES_SELLACT = .T.** apenas nas filiais piloto

### **Configuração Schedule**
- [ ] **CRM_SELLER_EMP01**: `U_CRMSELDB("01")` às 00:00
- [ ] **CRM_SELLER_EMP04**: `U_CRMSELDB("04")` às 00:00
- [ ] **Frequência**: Diária
- [ ] **Logs**: Verificação automática

### **Testes Recomendados**
```advpl
// 1. Teste configuração parâmetros
ConOut("ES_SELLFST: " + cValToChar(SuperGetMv("ES_SELLFST")))

// 2. Teste filial ativa individual
U_CRMSELLER(\{"01","01"\})

// 3. Teste filial inativa (deve ser finalizada)  
U_CRMSELLER(\{"01","02"\})  // Se ES_SELLACT = .F.

// 4. Teste debug paralelo
U_CRMSELDB("01")

// 5. Verificar URL V2
oConfig := U_crmCredl("01", "seller")  // Deve usar API_V2
```

---

## Histórico de Versões

| Versão | Data | Alterações Principais |
|--------|------|----------------------|
| **4.0** | Mar/2026 | **Sistema de parâmetros inteligente** |
| | | ✅ **ES_SELLFST/ES_SELLDAY/ES_SELLACT** |
| | | ✅ **Ativação por filial** |
| | | ✅ **URL V2 dinâmica** |
| | | ✅ **Processamento assíncrono otimizado** |
| | | ✅ **Função simplificada U_CRMSELLER(aParam)** |
| | | ✅ **Query modernizada com nomenclatura direta** |

---

**Última atualização: 13/03/2026**
**Sistema: Parâmetros Inteligentes + Controle por Filial**