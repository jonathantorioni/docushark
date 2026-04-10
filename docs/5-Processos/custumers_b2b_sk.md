# Documentação - Integração CUSTOMERS B2B SK
## Visão Geral
Integração para atualização de clientes no ambiente B2B com processamento diferenciado por horário comercial.

---

## Estrutura do Projeto

### User Function Principal
**U_EnvDicB2B(aParam)**  
Função principal que orquestra o processamento dos dicionários.

**Parâmetros**
- `aParam`: Array com código da empresa e filial (padrão: `{"09","01"}`)

**Dicionários Processados**
```advpl
aDicionarios := {
    "STATE",
    "CITY",
    "COMPANY",
    "PAYMENT_CONDITION",
    "SELLER",
    "PRICE_TABLE",
    "DELIVERY_TYPE",
    "TRANSACTION_TYPE",
    "CUSTOMER_TYPE",
    "CUSTOMERS"
}
```

---

## Lógica de Horário de Processamento

**Horário Comercial (08:00 - 21:00, Segunda a Sábado)**
- Processa **APENAS** dicionário `CUSTOMERS`
- Executa atualização específica via `AtualizaCustomers()`
- Chama `ProcessDic("CUSTOMERS")`

**Fora do Horário Comercial**
- Processa **TODOS** os dicionários normalmente
- Inclui o job das 22:00 que processa integralmente

---

## Função de Atualização - AtualizaCustomers()

**Objetivo**  
Atualiza registros na tabela `ZYD090` com status `"N"` para clientes modificados.

### Query Principal
```sql
SELECT *
FROM
  (SELECT A1.A1_COD AS COD,
          A1.A1_LOJA AS LOJA,
          A1.A1_NOME AS NOME,
          A1.S_T_A_M_P_ AS STAMP,
          YD.ZYD_IDREG AS IDREG,
          YD.ZYD_DTINT AS DT_INT,
          YD.ZYD_HORA AS HR_INT,
          TO_CHAR(A1.S_T_A_M_P_, 'YYYYMMDD') AS DT_ALTERACAO,
          TO_CHAR(A1.S_T_A_M_P_ - INTERVAL '3' HOUR, 'HH24:MI:SS') AS HR_ALTERACAO
   FROM SA1090 A1
   INNER JOIN SZ9090 Z9 ON A1.A1_COD = Z9.Z9_CLIENTE
   AND Z9.D_E_L_E_T_ = ' '
   LEFT JOIN ZYD090 YD ON YD.ZYD_IDREG = A1.A1_COD || A1.A1_LOJA
   AND YD.D_E_L_E_T_ = ' '
   AND YD.ZYD_INTERF = 'CUSTOMERS'
   AND YD.ZYD_STATUS = 'S'
   WHERE A1.D_E_L_E_T_ = ' '
     AND A1.A1_FILIAL = ' '
     AND A1.A1_COD <> 'LJ0001'
     AND A1.A1_XEMPGRU <> '1'
     AND (A1.A1_COD,
          A1.A1_LOJA) IN
       (SELECT ZD.ZD_CODIGO,
               ZD.ZD_LOJA
        FROM SZD090 ZD
        WHERE ZD.D_E_L_E_T_ = ' ')
   ORDER BY A1.A1_COD,
            A1.A1_LOJA)
```

### Campos Atualizados na `ZYD090`
- `ZYD_DTALT`: Data da alteração (`FwTimeUF('SP')[1]`)
- `ZYD_STATUS`: Status atualizado para `"N"`
- `ZYD_ERRO`: Limpa o campo de erro

---

## Configurações Técnicas

**Chave de Busca na ZYD**
```advpl
cChaveBusca := FWxFilial("ZYD") + ;
               PadR("CUSTOMERS", TamSX3("ZYD_INTERF")[1]) + ;
               PadR(cIdReg, TamSX3("ZYD_IDREG")[1])
```

**Índice Utilizado**
- Índice 1 da tabela `ZYD090`

**Funções de Apoio**
- `MPSysOpenQuery()`: Execução de queries
- `FwTimeUF('SP')[1]`: Data atual SP
- `RetSqlName()`: Retorna nome SQL das tabelas

---

## Fluxo de Processamento

1. **Validação Inicial**
    - Verifica ambiente RPC
    - Checa registros pendentes com `RegPendentes()`

2. **Processamento por Dicionário**
    - Loop através de `aDicionarios`
    - Aplica lógica de horário comercial
    - Processa específico para `CUSTOMERS` ou geral

3. **Atualização em Lote**
    - Identifica registros modificados
    - Atualiza status para `"N"`
    - Mantém métricas de performance

---

## Execução

**Chamada da Function**
```advpl
U_EnvDicB2B()
```

**Job Automático**
- Configurado para executar às 22:00
- Processa todos os dicionários
- Durante o dia processa apenas `CUSTOMERS`

---
