# SHTRCDMS.PRW

**carga**

### **Dados da Customização**

**Analista:** Jose Antonio

----

## **Especificação de Funções**

----

### U_shTrcJob()  

A função faz uso das seguintes variáveis locais:
- aParam: É um array que será utilizado para passar parâmetros para a função u_shTrcDms.
- aFilTrc: É um array que armazena os códigos das filiais que serão processadas no sistema TRC-AGCO.
- aSm0: É um array que contém informações do sistema SM0, como informações das filiais.
- nX e nY: São variáveis utilizadas para percorrer os arrays aFilTrc e aSm0, respectivamente.

**Autor**
Jose Antonio

**Desde**
23/05/2023

**Versão**
1.0

#### Definição

**Sintax**

shTrcJob(_cEmp,_cFil)

#### Parâmetros

Nome|Tipo|Uso|Descricao
---|---|---|---
_cEmp|variant|Obrigatório|param_description
_cFil|variant|Obrigatório|recebe dois parâmetros opcionais _cEmp e _cFil, que representam a empresa e a filial respectivamente.

#### Retorno

Tipo|Descrição
---|---
|

----

### U_shTrcDms()  

1. Inicializa algumas variáveis locais, incluindo _cQry, _cQry1, cGnTRC1, cNgnTRC1, cNgnTRC2, jDms01, aArea e cAlias.
2. Define o valor padrão para jDms01["Ambiente"] e jDms01["Tok"] como True.
3. Atualiza o token na variável cTOK chamando a função u_shTrcTok(jDms01).
4. Monta uma consulta SQL na variável _cQry para obter os dados dos produtos.
5. Executa a consulta SQL usando a função MPSysOpenQuery() e armazena o resultado na variável cAlias.
6. Verifica se existem registros retornados pela consulta SQL.
7. Se existir pelo menos um registro, itera sobre os registros retornados.
8. Para cada registro, monta uma nova consulta SQL na variável _cQry1 para verificar se o produto já foi integrado nas interfaces DMS-01 e DMS-02.
9. Verifica se a área de dados "ZYT" está aberta e, se estiver, fecha-a.
10. Seleciona a área de dados "ZYT" e define a ordem de classificação como a primeira ordem.
11. Verifica se o registro correspondente ao produto e interface DMS-02 existe na área "ZYT" e se o campo "ZYT_INTEGR" é igual a "S". Se sim, define a variável lIntegra como verdadeira e avança para o próximo registro.
12. Verifica se o registro não corresponde à interface "TOKEN".
13. Se o produto corresponder ao número AGCO_PART_NUMBER e a interface for DMS-01 e a integração for definida como "S", define a variável lIntegra como verdadeira e avança para o próximo registro.
14. Se a variável lIntegra for falsa, verifica se o AGCO_PART_NUMBER não está vazio e chama a função JDMS02() ou JDMS01() com os parâmetros apropriados, dependendo da interface. Essas funções são responsáveis por realizar a integração do produto.
15. Se o registro correspondente ao produto não for encontrado na área "ZYT", exibe algumas informações relacionadas à integração do produto e chama as funções JDMS02() e JDMS01() para realizar a integração.
16. Fecha a área de dados "ZYT".
17. Avança para o próximo registro.
18. Após o loop, exibe uma mensagem indicando que o envio das interfaces DMS-01 e DMS-02 foi concluído.
19. Fecha a área de dados cAlias.
20. Restaura a área de dados aArea.

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
aParam|array|Obrigatório|Array contendo tres elementos. O valor padrão para aParam é `{empresa,filial, json com dados da filial}`.

#### Retorno

Tipo|Descrição
---|---

----

### JDMS01

A função jDms01(_Tok,_Codigo) é uma função estática (Static Function) que faz parte da interface DMS-01.
Essa função é chamada pela função anterior, trccgdms(), e recebe dois parâmetros:
token (_Tok) utilizado para estabelecer a conexão com a plataforma e o código do produto (_Codigo).
A função jDms01 tem como objetivo processar e enviar os dados relacionados à interface DMS-01 para a plataforma TRC-AGCO.
Ela é responsável por enviar a posição atual dos itens, tanto aqueles com movimentação quanto aqueles sem movimentação,
incluindo estoques zerados. Além disso, é necessário gerar obrigatoriamente a interface DMS-02 para todos os itens da filial.
Através da utilização do token fornecido e do código do produto, a função jDms01 estabelece a conexão com a plataforma e envia os dados necessários.
Essa função desempenha um papel fundamental no processo de envio das informações relevantes para a interface DMS-01 na plataforma TRC-AGCO,
garantindo a integridade e a consistência dos dados enviados.

**Autor**
Jose Antonio

**Desde**
19/05/2023

**Versão**
1.0

#### Definição

**Sintax**

JDMS01(_Tok,_Codigo)

#### Parâmetros

Nome|Tipo|Uso|Descricao
---|---|---|---
_Tok|char|Obrigatório|O token é um parâmetro utilizado para estabelecer a conexão com a plataforma TRC-AGCO
_Codigo|char|Obrigatório|O código do produto é um parâmetro utilizado na função jDms01 que identifica de forma única um determinado item ou peça dentro do sistema. Esse código é utilizado para realizar operações relacionadas à interface DMS-01 na plataforma TRC-AGCO.

#### Retorno

Tipo|Descrição
---|---
nStatus|A função retorna um valor numerico indicando o sucesso da operação.

----

### JDMS02

A função JDMS02 tem como objetivo processar e enviar os dados referentes à interface DMS-02 para a plataforma TRC-AGCO.
Essa interface é responsável por enviar todas as peças cadastradas, independentemente de possuírem estoque ou não,
desde que sejam compatíveis com os produtos AGCO. Além disso, é obrigatório gerar a interface DMS-01 para todos os itens, com ou sem estoque.
Essa função desempenha um papel fundamental no processo de envio das informações adequadas para a interface DMS-02,
garantindo que todas as peças compatíveis sejam enviadas e que a interface DMS-01 seja gerada corretamente para todos os itens.

**Autor**
Jose Antonio

**Desde**
19/05/2023

**Versão**
1.0

#### Definição

**Sintax**

JDMS02(_Tok,_Codigo,_AgcoPartNumber,_Descricao,_UnidMedida)

#### Parâmetros

Nome|Tipo|Uso|Descricao
---|---|---|---
_Tok|char|Obrigatório|_Tok representa o token de conexão utilizado para autenticar e estabelecer uma conexão segura com a plataforma TRC-AGCO.
_Codigo|char|Obrigatório|_Codigo é o código do produto que identifica de forma única um item ou peça dentro do sistema.
_AgcoPartNumber|char|Obrigatório|_AgcoPartNumber representa o número da peça AGCO.
_Descricao|char|Obrigatório|_Descricao representa a descrição da peça que está sendo enviada para a interface DMS-02.
_UnidMedida|char|Obrigatório|_UnidMedida refere-se à unidade de medida associada à peça que está sendo enviada para a interface DMS-02.

#### Retorno

Tipo|Descrição
---|---
nStatus|A função retorna um valor numerico indicando o sucesso da operação.
