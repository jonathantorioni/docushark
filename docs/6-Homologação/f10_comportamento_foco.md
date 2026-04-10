# F10 Comportamento de foco
----

Analista: Jonathan
Data: 07/10/2025

----

## Problema relatado

Ao abrir a tela de busca de produtos no pedido de vendas (F10), o sistema estava desposicionando o foco todas as vezes que clicava na digitação do código do produto.

----

## Diagnóstico

Durante a análise foi observado que o foco ao clicar na digitação do produto, não estava configurado corretamente.

----

## Solução

Para resolver este problema, foi necessário remover o valid **msGet** referente ao código do produto e desabilitar o nexfocus para os proximos componentes não utilizados da tela.

A correção foi realizado no fonte **SPECC010.PRW**

Vale ressaltar que esse comportamento já era observado antes da atualização do webapp.dll.

----

## Homologação

A homologação deve ocorrer nos ambientes AG e SK não produtivos.

Observar se os comportamentos relatados pelos usuários foram corrigidos.



----

## Bug presente no webapp.dll

Durante todo o desenvolvimento e testes iniciais, por mais de 2 horas não observamos comportamentos anômalos, porém em um certo ponto notamos que o webapp apresentou o bug, esse problema faz com que mesmo clicando em outro componente da tela, o foco sempre volte para o **mSGet** do código do produto.

Proximos passos, validação da nova versão **10.1.4** do **webapp.dll** que foi disponibilizado pela totvs no dia 06/10/2025.

----

## Link/Referências


[Notas e releases Webapp.dll](https://tdn.totvs.com/display/tec/10.x+-+7.00.240223P)


