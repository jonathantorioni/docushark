# NF Duplicada

# SUPXFUN.PRW

**Liberar entrada de NF com duplicidade**

### Dados da customização

Analista responsável: Rafael Gomes

----

### Especificação da customização

Quando desenvolveram a validação da NF de entrada, uma delas é o contas a pagar onde colocaram o prefixo **Filial+Serie da NF**.
Exemplo: Filial 03 + NF: 81 = Prefixo 038
Se o Fornecedor com o tempo altere a Serie Ex: 84 o prefixo vai ser 038 assim como a antiga nota, gerando duplicidade na entrada.


----

### Especificação de funções e rotinas

* **NFEDUPLI** - Função responsavel em trazer os dados da NF antiga

* **ALTDOC** - Função responsavel em alterar os dados da NF antiga

----

### Especificação de parametros

Nenhum


### Execução do Processo

* Acesso a rotina
Acessar Modulo Maquinas 97
Ferramenta Auxiliar Suporte

Informe os dados da NF atual, clique em **[OK]**
![fd](img\NFDupli1.png)

Nessa tela retire um zero do campo NF e clique em **[Confirma]**
![fd](img\NFDupli2.png)




