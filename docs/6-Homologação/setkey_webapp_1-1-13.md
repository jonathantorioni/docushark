# SetKey Webapp 1.1.13

----

Analista: Jonathan, Yori
Data: 06/10/2025

----

## Problema relatado

Após realizar a busca de um produto na tela de consulta de produtos no pedido de vendas (F10), o sistema não estava acadando as teclas de atalho, em especial a tecla (F6) - Estoque por filial.

----

## Diagnóstico

Durante a nossa análise, identificamos que as funções de message load, ao terminar sua execução, não estavam retornando o foco para a aba do usuário.

Esse tipo de comportamento evita que funções que definem teclas de atalhos possam funcionar.

Ao desponsicionar a aba de processamento do usuário, nenhuma tecla de atalho funciona efetivamente.

Esse problema foi observado em todas as funções que fazer load de um bloco de código após atualização do webapp **1.1.13**.
Ex: **FwMsgRun()**, **MsgRun()**, **MsAguarde()** ...

----

## Solução

Infelizmente não existe uma solução elegante para o problema, visto que o erro ocorre dentro do **webapp.dll** no qual a TOTVS é 100% responsável e não libera para customizações.

Para resolver a solução, foi criado um parâmetro: **ES_MSLOAD**, fica responsável por controlar a inclusão ou não da função **FwMsgRun()** no componente **BUTTON** de pesquisa do produto.

A correção foi realizado no fonte **SPECC010.PRW**

----

## Parâmetro

* **ES_MSLOAD** - Define se executa FwMsgRun na pesquisa do item. F10 PV. (**Tipo Logico**)

**Obs:** Caso o parâmetro não esteja criado no dicinário de dados, recebe por default o conteúdo **.F.**

----

## Homologação

A homologação deve ocorrer em um ambiente de testes onde esteja com o **webapp 1.1.13**.

### Parâmetro .F.

1. Acesso um pedido de vendas;
2. Clique em F10 para abrir a tela de busca de produtos;
3. Preencha um produto para ser buscado;
4. Clique em buscar produto;
5. Quando a rotina retornar os produtos, pressione F6, o sistema deve abrir a lista de estoque por filiais.

### Parâmetro .T.


1. Acesso um pedido de vendas;
2. Clique em F10 para abrir a tela de busca de produtos;
3. Preencha um produto para ser buscado;
4. Clique em buscar produto;
5. Quando a rotina retornar os produtos, pressione F6, **o sistema não deve abrir** a lista de estoque por filial.


----

## Link/Referências


[Notas e releases Webapp.dll](https://tdn.totvs.com/display/tec/10.x+-+7.00.240223P)

