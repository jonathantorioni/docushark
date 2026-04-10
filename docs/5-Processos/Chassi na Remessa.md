# Chassi na Remessa

**Travar chassi em branco no Remessa**

### Dados da customização

Analista responsável: Rafael Gomes

----

### Especificação da customização

Este ajuste tem como objetivo não deixar dar continuidade no processo de remessa de maquina quando não informar o chassi e/ou informar um chassi não cadastrado.

----

### Especificação de funções e rotinas

* **MT410OK** - Rotina onde será incluido a customização

----

### Especificação de parametros

Nenhuma

### Execução do Processo

* Acesso a rotina
Acessar Modulo Maquinas 98
Atualizações => Documentos => Remessa

Vá em outras ações => remessa e escolha a opção 7B 
![fd](img\REM01.jpg)

Preencha os dados, Cliente é a propria filial e o vendedor é filial+9999(Exemplo se eu estiver na filial 22 => 229999), informe um produto de maquina e clique em  **[Salvar]**
![fd](img\REM02.jpg)

Vai apresentar o HELP pedindo para informar o Cahssi, clique em **[FECHAR]**
![fd](img\REM03.jpg)

Preencha um chassi errado, por exemplo 123456 e tenta salvar novamente, vai apresentar a mensagem que o chassi infomado não foi encontrado clique em **[FECHAR]**
![fd](img\REM04.jpg)

Agora preencha o chassi correto e clique em salvar, o sistema ira gerar o pedido normal.



:::info

:::