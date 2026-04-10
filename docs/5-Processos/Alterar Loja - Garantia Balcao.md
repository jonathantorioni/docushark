# Alterar Loja - Garantia Balcão

**Alterar Loja do Cliente na rotina Garantia Balcão**

### Dados da customização

Analista responsável: Rafael Gomes

----

### Especificação da customização

Este ajuste tem como objetivo alterar loja do cliente, quando a inscrição do cliente estiver baixada e não consegue mais dar continuidade no processo de Garantia.

----

### Especificação de funções e rotinas

* **SPECA080** - Rotina onde será incluido a customização
* **ALTLOJC**  - Alterar Loja do Cliente
* **GETLOJA**  - Funcao para usuario informar nova loja do cliente
* **MUDALJ**   - Funcao de troca de Loja do cliente caso cadastro bloqueado.
* **VALIDLJ**  - Funcao para validar Loja do cliente.

----

### Especificação de parametros

* **ES_PECA80C** Acesso alterar loja do cliente em Garantia Balcao 

### Execução do Processo

* Acesso a rotina
Acessar Modulo Maquinas 97
Atualizações => Garantia => Garantia Balcão

Filtre uma garantia com status cinza ou azul
![fd](img\Gar001.jpg)

Vá em outras ações e verique se existe a rotina **Alterar loja Cliente** se existir clique para alterar, caso não tenha coloque o ID do usuario no parametro **ES_PECA80C**
![fd](img\Gar01.jpg)

Vai apresentar a tela, informe a nova loja e clique em **[OK]**
![fd](img\Gar02.jpg)

Vai apresentar o aviso informando que a loja foi alterada, clique em **[FECHAR]**
![fd](img\Gar03.jpg)

Verifique se realmente alterou a loja no browser.
