# Ajustar Integridades da OS

**Ajustar integridades da OS**

### Dados da customização

Analistas responsáveis: Rafael Gomes/Carlos/Nikolaus

----

### Especificação da customização

Quando está incluindo itens na OS e o sistema cai ou alguem fecha sem finalizar o processo, acaba causando integridades na OS e essas integridades são previstas no codigo, com base nisso foi desenvolvido tratativas para essas integridades.


----

### Especificação de funções e rotinas

* **AJUSOFI** - Função responsavel em ajustar as integridades

* **OFIA001** - Função responsavel por criar OS

----

### Especificação de parametros

***AJUSTOFI*** é um parametro no grupo de usuarios para acesso a o botão de ajuste, esse botão será liberado para o Dpto Pos-vendas


### Execução do Processo

* Acesso a rotina
Acessar Modulo Oficina 98

Visualize a OS que está apresentando integridade **[Confirmar]**    

![fd](img\Ofia1.png)

Nessa tela visualizar da OS, vai em Outras Ações e clique em  **[Avaliar Integridade]** 

![fd](img\Ofia2.png)

Vai apresentar essa mensagem novamente da integridade **[Confirmar]**   

![fd](img\Ofia1.png)

Após clicar na rotina, vai apresentar que a OS foi ajustada.   

![fd](img\Ofia3.png)

Clique novamente em **[Avaliar Integridade]**   

![fd](img\Ofia2.png)

Vai apresentar a mensagem dizendo que os itens estão integros.  

![fd](img\Ofia4.png)


:::info
Em caso de aparecer mais de uma integridade, pode ser que ajuste um por vez, então deve fazer o processo novamente para ajustar as demais integridades.
:::

