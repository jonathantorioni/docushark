# SHTRCDTBASE.PRW

**db**

### **Dados da Customização**

**Analista:** Jose Antonio

----

## **Especificação de Funções**

----

### U_shTrcTkn()  

(Em construção)

**Autor**
Jose Antonio

**Desde**
24/05/2023

**Versão**
1.0

#### Definição

**Sintax**

shTrcTkn(jObj)

#### Parâmetros

Nome|Tipo|Uso|Descricao
---|---|---|---
|||


#### Retorno

Tipo|Descrição
---|---
cTok|

----

### U_shLogDms()  

Responsável por gerar registros de log de integração das interfaces DMS-01 e DMS-02 da TRC-AGCO.
Esses logs são gravados na tabela ZYT do banco de dados e contêm informações relevantes sobre a integração.

**Autor**
Jose Antonio

**Desde**
23/05/2023

**Versão**
1.0

#### Definição

**Sintax**

shTrcDms(aParam)

#### Parâmetros

Nome|Tipo|Uso|Descricao
---|---|---|---
jObj|json|Obrigatório|objeto contendo os dados necessários para gerar o log na tabela

#### Retorno

Tipo|Descrição
---|---
lRet|indica o sucesso ou falha da operação de gravação do log.

----

### U_shupdms1()

Responsavel por fazer update referente a interface DMS-01

**Autor**
Jose Antonio

**Desde**
24/05/2023

**Versão**
1.0

#### Definição

**Sintax**

shupdms1(jDms)

#### Parâmetros

Nome|Tipo|Uso|Descricao
---|---|---|---
jDms|json|Obrigatório|Contem valores para utilizar no Update


#### Retorno

Tipo|Descrição
---|---
lRet|A função retorna um valor lógico indicando o sucesso da operação. Retorna .T.

----

### U_shupdms2

Responsavel por fazer update referente a interface DMS-02

**Autor**
Jose Antonio

**Desde**
24/05/2023

**Versão**
1.0

#### Definição

**Sintax**

shupdms2(jDms)

#### Parâmetros

Nome|Tipo|Uso|Descricao
---|---|---|---
jDms|json|Obrigatório|Contem valores para utilizar no Update

#### Retorno

Tipo|Descrição
---|---
nStatus|A função retorna um valor lógico indicando o sucesso da operação. Retorna .T.
