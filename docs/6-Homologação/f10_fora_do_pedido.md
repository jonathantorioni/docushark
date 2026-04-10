# F10 Botão pesquisar desabilitado
----

Analista: Jonathan
Data: 09/10/2025

----

## Problema relatado

Ao abrir a tela de busca de produtos fora do pedido de vendas (F10), o botão de pesquisa estava desabilitado

----

## Diagnóstico

Durante a análise foi observado que o cliente e loja não vinham preenchidos ao abrir a tela de pesquisa de produtos, fazendo com que o botão **pesquisar** ficasse desabilitado.

Este cenário só ocorria quando o F10 era aberto fora da montagem do pedido de vendas.

----

## Solução

Foi observado que quando o objeto de cliente e loja não recebe o foco da tela, as variáveis do **msGet** cCliente e cLoja não eram preenchidas.

Neste caso para corrigir o problema foi utilizada a variável **_lOrcPed** para identificar se o F10 está sendo aberto dentro do pedido de vendas ou orçamento.

Caso essa variável esteja como **.F.**, o sistema passa a atribuir o foco nos objetos, fazendo com que as váriaveis sejam preenchidas e resolvendo o destravamento do botão **pesquisar**.

----

## Homologação

A homologação deve ocorrer nos ambientes AG e SK não produtivos.

Observar se os comportamentos relatados pelos usuários foram corrigidos.

