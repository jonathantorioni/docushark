# Margem do Pedido de Venda

**Margem pedido de venda**

### Dados da customização

Analista responsável: Rafael Gomes

----

### Especificação da customização

Este ajuste tem como objetivo bloquear a margem novamente após alterar a forma de pagamento

----

### Especificação de parametros

                  

### Execução do Processo

* Acesso a rotina
Acessar Modulo Maquinas 97
Atualizações => Venda => Pedido de venda*



Faça um pedido de vendas normal

![fd](img\PED1.png)

Va em **Outras Ações** e clique em **alterar dados Pedido** 

![fd](img\PED2.png)

Altere a condição de pagamento e clique em **[Confirma]**
A alteração será realizada

![fd](img\PED3.png)

Faça o mesmo procedimento mas algora altere para uma condição que não pode ser usada, por exemplo a condição **275**, ao confirmar vai apresentar a mensagem conforme abaixo não deixando fazer alteração

![fd](img\PED4.png)

Agora altere o pedido e altere o campo desconto do item e em seguida salva o pedido.
O pedido vai cair na margem ficando com a legenda Rosa.

![fd](img\PED5.png)

Entre com a senha de um usuario que faz as liberações de Margem(001602, utilizado na tratores)

![fd](img\PED6.png)

Após liberar o pedido, a legenda vai ficar azul.

![fd](img\PED7.png)

Va em **Outras Ações** e clique em **alterar dados Pedido** e altere a condição de pagamento

![fd](img\PED8.png)

Após clicar em confirma vai apresentar a mensagem de bloqueio de margem.

![fd](img\PED9.png)
