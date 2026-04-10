# Lançamento Pre Nota - Erro Chave UF

**Validar cadastro de cliente ou fornecedor na importação no lançamento Pre-Nota**

Modulo: 97 - Distribuição de Peças  (SIGAESP)

----

## Dados da Customização

Analista: Carlos Henrique

----

## Especificação da customização

Tem como objetivo fazer a mesma validação da função Relivadar do Monitor XML, assim corrigir o erro de chave UF não encontrada no lançamento de pré-nota.

----

## Critérios da customização

- Se a nota for do tipo B ou D = Benef./Devolucao, deve-se validar no cadastro de Clientes;
- Se a nota for do tipo N = Nota fiscal Normal, deve-se validar o cadastro de Fornecedores

----

## Fontes 

- MGERPRE01.PRW

---

## Processo

Rotina: **Pre Nota Entrada**

:::info 
A nota deve estar no monitor XML para a realização deste processo
:::                                                                                 
  

1- Outras Ações > Verif. NF e img/import*

![](img/imp-prenota_imagem01.png)


2- Selecione a filial correspondente

![](img/imp-prenota_imagem02.png)

3-  Selecione a opção desejada

![](img/imp-prenota_imagem03.png)


4- Selecione para filtrar apenas uma nota

![](img/imp-prenota_imagem04.png)


5- Pesquise a nota

![](img/imp-prenota_imagem05.png)

6- Poscione na nota e clique em Gerar Pré Nota

![](img/imp-prenota_imagem06.png)

O sistema irá trazer as informações referente a nota selecionada.

7- Confira os dados e clique em Confirmar

![](img/imp-prenota_imagem07.jpg)

8- Aguarde o processamento
![](img/imp-prenota_imagem08.png)

9- Se tudo estiver correto irá apresentar a mensagem de sucesso

![](img/imp-prenota_imagem09.png)

Caso alguma informação esteja divergente 

![](img/imp-prenota_imagem10.png)

