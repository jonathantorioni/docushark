# Bonus Comercial

# SMAQA500.PRW
# SD1100I.PRW

**Lançamento de Bonus Compras e Vendas modulo de Maquinas**

### Dados da customização

Analista responsável: Rafael Gomes

----

### Especificação da customização

Este ajuste tem como objetivo gravar o Bonus de compras quando lançado no pedido de compras, lançar manualmente em caso de esquecimento de lançar no pedido e lançar um Bonus Vendas.

----

### Especificação de funções e rotinas

* **SMAQA500** - Rotina onde será alterado e Gravado o Bonus 

* **SD1100I** - Rotina que recebe as informações de Bonus Compras e Total

----

### Especificação de parametros

Nenhum


### Execução do Processo

* Acesso a rotina
Acessar Modulo Maquinas 98
Atualizações => Estoque => Estoque de Maquinas

Filtra um chassi que está Disponivel, clique em **[Alterar]**
![fd](img\Bonus1.png)

Verifique se os campos **Bônus do Ped Compras** e **Bônus Venda** esão zerados e como o campo liberado para alteração e o campo **Bônus Total** está bloqueado.
Inclua um valor no campo **Bônus Venda** e clique em **[Confirma]**
![fd](img\Bonus2.png)

Vai apresentar a mensagem abaixo, clique em **[SIM]**
![fd](img\Bonus3.png)

Será gerado o Titulo no Financeiro conforme mostra a imagem abaixo, clique em **[FECHAR]**
![fd](img\Bonus4.png)

Confirmação do registro alterado, clique em **[FECHAR]**
![fd](img\Bonus5.png)

Clique para alterar o chassi novamente, vá na aba cadastros.
O Bônus do Ped Compras deve estar desbloqueado e o Bônus Venda deve estar bloqueado e o Bônus Total preenchido com o valor do Bônus Venda.
![fd](img\Bonus6.png)

**Repita todo o Processo anterior no mesmo chassi e colocando valor no Bônus do Ped Compras**

Clique para alterar o chassi novamente, vá na aba cadastros.
Agora o Bônus do Ped Compras deve estar bloqueado e o Bônus Total preenchido com o valor acumulado com o Bônus do Ped Compras + Bônus Venda.
![fd](img\Bonus7.png)

Faça uma Query pegando os campos abaixo, verificar se a observação está gravando a ultima alteração.
![fd](img\Bonus8.png)

Faça uma Query pegando os campos abaixo, verificar se historico está gravado com os 2 tipos de Bonus
![fd](img\Bonus9.png)

Va na aba Resumo da operação e pegue o pedido de compras
![fd](img\Bonus10.png)

Pesquise esse pedido de compras, clique em **[VISUALIZAR]**, veja se o campo bonus está preenchido conforme foi gravado anteriormente na rotina estoque de maquinas.
![fd](img\Bonus11.png)


:::info
Foi necessario a criação de um novo campo PXS_BONVD
:::