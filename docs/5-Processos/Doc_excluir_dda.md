# Excluir Titulos DDA não conciliados

**Excluir titulos DDA antigos**

Módulo: 97 - Distribuição de Peças (SIGAESP)

----

## Dados da Customização

Analista: Carlos Henrique

----

## Especificação da customização

Criação de rotina para excluir os registros de titulos não conciliados. 

----

## Critérios da customização

- Somente registros de 365 dias antes da data atual.
- O periodo utilizado para a busca deve ser no maxámo de 365 dias.
- Liberação de acesso apenas para usuarios do financeiro Holding (Tabela:SZJ). 

----

## Processo

Rotina: **Concilicao DDA > Outras Ações**


Botão: Excluir nao conciliado.

![img](img/Doc_excluir_dda_imagem01.png)

Escolher a data de acordo com os critérios determidos

![img](img/Doc_excluir_dda_imagem02.png)

Pesquisar e selecionar os registros desejados

![img](img/Doc_excluir_dda_imagem03.png)


Ao clicar em excluir irá processar os registros

![img](img/Doc_excluir_dda_imagem04.png)

No final do processo retornará a mensagem de conclusão

![img](img/Doc_excluir_dda_imagem05.png)


