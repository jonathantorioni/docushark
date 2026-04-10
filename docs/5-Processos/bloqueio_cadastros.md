# BLOQUEIO CADASTROS

Idealizador: Jonathan Torioni

Data de criaçãõ: 22/10/2025

----

## Objetivo

Rotina de execução automática para bloqueio de cadastros não utilizados.

**Cadastros:**
* Produtos
* Clientes
* Fornecedores

----

## Regras

### Produtos
- Ausência total de estoque (Qualquer tipo, incluindo BO)
- Não possuir vínculo com OS em aberto
- Cadastro criado há 36 meses ou mais
- Sem movimento (Entrada, saida, devolução ou transferência) por 36 meses ou mais

### Clientes
- Cadastri com status inativo
- Inexistência de títulos em aberto (qualquer natureza e financeiro)
- Ausência de registros de negativação
- Cadastro criado há 36 meses ou mais
- Sem movimentação (venda, devolução) por 36 meses ou mais

### Fornecedores
- Sem estoque vinculado (qualquer tipo, incluindo BO)
- Inexistência de títulos em aberto (Qualquer natureza)
- Não possuir processo de garantia ou devolução em andamento
- Cadastro criado há 36 meses ou mais

**Obs: A empresa Moreia não será incluida neste processo inicialmente.**

----

## Fontes

- **viewb1040.prw** - Responsável por realizar a criação das views referente ao bloqueio de cadastro dos produtos.
- **shblqprd.prw** - Fonte responsável por bloquear itens do cadastro de produto e armazenar o log do bloqueio.
- **shblqcli.prw** - Fonte responsável por bloquear itens do cadastro de clientes e armazenar o log do bloqueio.
- **shblqfor.prw** - Fonte responsável por bloquear itens do cadastro de fornecedores e armazenar o log do bloqueio.

----

## Views

- **V_ULT_MOV_SB1040** - View responsável por apresentar o ultimo movimento de qualquer produto cadastrado na SB1040
- **V_PROD_VIC_OS_SB1040** - View responsável por apresentar todos os produtos que possuem vinculo com OS em abertos, somente produtos cadastrados na SB1040
- **V_PROD_BO_SB1040** - View responsável por apresentar todos os produtos da sb1040 que possuem processo de BO em aberto.
- **V_ULT_MOV_SB1060** - View responsável por apresentar o ultimo movimento de qualquer produto cadastrado na SB1060
- **V_PROD_VIC_OS_SB1060** - View responsável por apresentar todos os produtos que possuem vinculo com OS em abertos, somente produtos cadastrados na SB1060
- **V_PROD_BO_SB1060** - View responsável por apresentar todos os produtos da sb1060 que possuem processo de BO em aberto.
- **VIEWSLD_01_03_04_08_11_24_25** - View de saldos dos produtos, Tratores, Equagril, Agricase, SSA, Nova Holanda, Disma, Agriparts
- **VIEWSLD_01_03_04_08_11_23_24_25** - View de saldos dos produtos, Tratores, Equagril, Agricase, SSA, Nova Holanda, Moreia, Disma, Agriparts
- **VIEW_TITULOS_ABERTOS** - View responsável por apresentar clientes com titulos(saldos) em aberto em todas as empresas ou somente SK
- **VIEW_TITULOS_ABERTOS_FORNECEDOR** - View responsável por apresentar fornecedores com titulos(saldos) em aberto em todas as empresas ou somente SK

----

## Querys

### Seleção produtos para bloqueio

```sql
--As datas na query sao atualizadas conforme o dia do processamento
SELECT 
BASE3.B1_COD,
BASE3.DATA_INC,
BASE3.DATA_ULT_MOV
FROM
(SELECT 
BASE2.B1_COD,
BASE2.DATA_INC,
(SELECT MAX(ULTIMA_DATA) FROM V_ULT_MOV_SB1040 WHERE B2_COD = BASE2.B1_COD) AS DATA_ULT_MOV --Busca ultima movimentacao do produto
FROM
(SELECT 
BASE.B1_COD,
BASE.DATA_INC
FROM
(SELECT 
B1_COD,
TO_CHAR(TO_DATE('1996-01-01', 'YYYY-MM-DD') + (CAST((ASCII(SUBSTR(B1_USERLGI, 12, 1)) - 50) || (ASCII(SUBSTR(B1_USERLGI, 16, 1)) - 50) AS INT) + CASE WHEN SUBSTR(B1_USERLGI, 8, 1) = '<' THEN 10000 ELSE 0 END),'YYYYMMDD') as DATA_INC
FROM SB1040 SB1
WHERE B1_FILIAL = ' '
AND B1_MSBLQL = '2'
AND B1_TIPO = 'ME'
AND B1_USERLGI NOT LIKE '%COREMA%'
AND B1_USERLGI NOT LIKE '%      %'
AND SB1.D_E_L_E_T_ = ' ')BASE
WHERE BASE.DATA_INC <= '20221017')BASE2)BASE3
WHERE (BASE3.DATA_ULT_MOV IS NULL
OR BASE3.DATA_ULT_MOV <= '20221017'
OR BASE3.DATA_ULT_MOV = ' ')
AND NOT EXISTS (SELECT 'Y' FROM V_PROD_VIC_OS_SB1040 WHERE PRODUTO_EM_OS = BASE3.B1_COD) --Descarta produtos com vinculos em OS
AND NOT EXISTS (SELECT 'Y' FROM V_PROD_BO_SB1040 WHERE C7_PRODUTO = BASE3.B1_COD) --Descarta produtos que possuem BO em aberto
```

### Seleção clientes para bloqueio

```sql
--As datas na query sao atualizadas conforme o dia do processamento
SELECT
AMOSTRA.A1_COD,
AMOSTRA.A1_LOJA,
AMOSTRA.A1_NOME,
AMOSTRA.A1_ULTCOM,
AMOSTRA.DATA_INC
FROM
(SELECT 
A1_COD, 
A1_LOJA,
A1_NOME,
A1_ULTCOM,
TO_CHAR(TO_DATE('1996-01-01', 'YYYY-MM-DD') + (CAST((ASCII(SUBSTR(A1_USERLGI, 12, 1)) - 50) || (ASCII(SUBSTR(A1_USERLGI, 16, 1)) - 50) AS INT) + CASE WHEN SUBSTR(A1_USERLGI, 8, 1) = '<' THEN 10000 ELSE 0 END),'YYYYMMDD') as DATA_INC
FROM SA1080 SA1
WHERE A1_FILIAL = ' '
AND A1_MSBLQL = '2'
AND A1_XBLFAT = 'I'
AND A1_XEMPGRU <> '1'
AND A1_RISCO <> 'A'
AND A1_ULTCOM <= '20221027'
AND A1_USERLGI NOT LIKE '%      %'
AND NOT EXISTS (SELECT 'Y' FROM SZPG01 SZP
                       WHERE ZP_FILIAL = ' '
                       AND ZP_CGC = A1_CGC
                       AND ZP_ATIVA = 'S'
                       AND SZP.D_E_L_E_T_ = ' ')
AND SA1.D_E_L_E_T_ = ' '
AND NOT EXISTS (SELECT 'Y' FROM VIEW_TITULOS_ABERTOS
                WHERE EMP IN ('01','08')
                AND E1_CLIENTE = A1_COD
                AND E1_LOJA = A1_LOJA)
)AMOSTRA
WHERE AMOSTRA.DATA_INC <= '20221027'
```

### Seleção fornecedores para bloqueio

```sql
--As datas na query sao atualizadas conforme o dia do processamento
SELECT 
BASE3.B1_PROC,
BASE3.B1_LOJPROC,
BASE3.A2_NOME,
BASE3.A2_XDTCAD,
BASE3.SLD
FROM
(SELECT 
BASE2.B1_PROC,
BASE2.B1_LOJPROC,
BASE2.A2_NOME,
BASE2.A2_XDTCAD,
SUM(BASE2.SLD_EST) SLD
FROM
(SELECT 
BASE1.B1_PROC,
BASE1.B1_LOJPROC,
BASE1.A2_NOME,
BASE1.A2_XDTCAD,
BASE1.B1_COD,
(SELECT SUM(SLD_EST) FROM VIEWSLD_06 WHERE PRD = BASE1.B1_COD) SLD_EST
FROM 
(SELECT 
B1_PROC, 
B1_LOJPROC,
A2_NOME,
A2_XDTCAD,
B1_COD
FROM SA2060 SA2
RIGHT JOIN SB1060 SB1 ON SB1.B1_FILIAL = ' ' AND SB1.B1_PROC = SA2.A2_COD AND SB1.B1_LOJPROC = SA2.A2_LOJA AND SB1.B1_MSBLQL = '2' AND SB1.D_E_L_E_T_ = ' '
WHERE SA2.A2_FILIAL = ' '
AND SA2.A2_MSBLQL = '2'
AND SA2.A2_XDTCAD <= '20221103'
AND SA2.A2_XDTCAD <> ' '
AND SA2.A2_XEMPGRU = '2'
AND SA2.D_E_L_E_T_ = ' '
AND NOT EXISTS (SELECT 'Y' FROM V_PROD_BO_SB1060 
                WHERE C7_PRODUTO = SB1.B1_COD)
AND NOT EXISTS (SELECT 'Y' FROM VIEW_TITULOS_ABERTOS_FORNECEDOR
                WHERE EMP = '06'
                AND E2_FORNECE = SB1.B1_PROC
                AND E2_LOJA = SB1.B1_LOJPROC)
GROUP BY B1_PROC, B1_LOJPROC,A2_NOME,A2_XDTCAD,B1_COD
)BASE1)BASE2
GROUP BY BASE2.B1_PROC,BASE2.B1_LOJPROC,BASE2.A2_NOME,A2_XDTCAD)BASE3
WHERE BASE3.SLD <= 0
```

----

## Tabelas

### Tabela de logs de bloqueios

#### Log de produtos

**SB1_LOG_BLOQUEIOS**

CAMPOS|TAMANHO|RESTRICAO
---|---|---
TABELA|10|NOT NULL
PRODUTO|27|NOT NULL
DATA_CADASTRO|8|
DATA_ULT_MOV|8|
DATA_BLOQ|8|NOT NULL

#### Log de clientes

**SA1_LOG_BLOQUEIOS**

CAMPOS|TAMANHO|RESTRICAO
---|---|---
TABELA|10|NOT NULL
CLIENTE|06|NOT NULL
LOJA|02|NOT NULL
DATA_CADASTRO|8|
DATA_ULT_COMPRA|8|
DATA_BLOQ|8|NOT NULL


#### Log de fornecedores

**SA2_LOG_BLOQUEIOS**

CAMPOS|TAMANHO|RESTRICAO
---|---|---
TABELA|10|NOT NULL
FORNECEDOR|06|NOT NULL
LOJA|02|NOT NULL
DATA_CADASTRO|8|
DATA_BLOQ|8|NOT NULL