# SHTRCCON.PRW

**auth**

### **Dados da Customização**

**Analista:** Jose Antonio

----

## **Especificação de Funções**

----

### U_shTrcTok()  

Esta função é responsável por obter um token de autenticação para a integração com a TRC-AGCO. Ela recebe um
objeto JSON contendo as informações necessárias, como a URL, o caminho, o nome de usuário e a senha.
O token de autenticação é retornado pela função.

**Autor**
Jose Antonio

**Desde**
23/05/2023

**Versão**
1.0

#### Definição

**Sintax**

shTrcTok(jObj)

#### Parâmetros

Nome|Tipo|Uso|Descricao
---|---|---|---
jObj|json|Obrigatório|Objeto JSON contendo as informações necessárias para a obtenção do token.

#### Retorno

Tipo|Descrição
---|---
cToken|A função retorna o token de autenticação como uma string.

----

### U_shTrcPost()  

Esta função realiza um POST na interface DMS-01 ou DMS-02 da TRC-AGCO. Ela recebe um objeto JSON contendo os
dados necessários para a integração, como a URL, o caminho, o token de autorização e os parâmetros do POST.
O resultado da integração é armazenado no objeto JSON e é retornado pela função.

**Autor**
Jose Antonio

**Desde**
23/05/2023

**Versão**
1.0

#### Definição

**Sintax**

shTrcPost(jObj)

#### Parâmetros

Nome|Tipo|Uso|Descricao
---|---|---|---
jObj|json|Obrigatório|Objeto JSON contendo os parâmetros necessários para a integração.

#### Retorno

Tipo|Descrição
---|---
nStatus|A função retorna um valor numerico indicando o sucesso da operação.

