---
sidebar_position: 2
---

# Cadastros Iniciais (SIGAOFI)

**Sequencia de cadastros para o funcionamento correto do módulo SIGAOFI**

Abaixo está um checklist de tudo que deve ser cadastrado para o funcionamento correto das rotinas presentes no módulo SIGAOFI(14).

----
### Essenciais

Antes de realizar os cadastros realize os seguintes ajustes:

- Ajustar o parâmetro MV_VEICULO igual a "S"
- Acessar a rotina **Atualizações > Cad Gerais > Tab Gener Conces. (OFIOA560)** para que os registros sejam incluidos na tabela VX5. Acessar e preeencher a tabela 050 com o código 1.
- Atualizar o menu SIGAOFI

-----

### Cadastros

- [ ] Cadastrar funções dos usuários/funcionários **Atualizações > Cad Gerais > Funcoes**.
- [ ] Cadastrar usuários na rotina Equipe Técnica **Atualizações > Cad Gerais > Equipe Tecnica** na aba Oficina, no campo **Max. Agendam** preencha a quantidade de agendamentos que o produtivo/funcionario conseguirá realizar em um unico dia.
- [ ] Cadastrar Marcas **Atualizações > Cad. Gerais > Marcas**.
- [ ] Cadastrar Tipo de Veiculo **Atualizações > Cad Veiculos > Tipo de Veiculos**.
- [ ] Cadastrar Especie Veiculo **Atualizações > Cad Veiculos > Especies**.
- [ ] Cadastrar Categoria Veiculo **Atualizações > Cad Veiculos > Categorias**.
- [ ] Cadastrar Grupo de Modelos **Atualizações > Cad Veiculos > Grupo de Modelos**.
- [ ] Cadastrar Modelos **Atualizações > Cad Veiculos > Modelos**.
- [ ] Cadastrar Cores **Atualizações > Cad Veiculos > Cores**.
- [ ] Cadastrar Grupo Cores **Atualizações > Cad Veiculos > Cores** no campo **Grupo de Cor** clique **F3** e depois Incluir.
- [ ] Cadastar Secoes **Atualizações > Cad Oficina > Secoes**.
- [ ] Cadastar Box **Atualizações > Cad Oficina > Box**.
- [ ] Cadastrar Periodo de trabalho **Atualizações > Cad Oficina > Periodos**.
- [ ] Cadastro Tipo Servico **Atualizações > Cad Oficina > Tipo Servico/secao** no campo **Grupo Item** é necessário o preenchimento de acordo com os serviços cadastrado em Grupos de Produtos (SBM) e o campo Tipo Grupo tem que estar igual a 4.
- [ ] Cadastrar Tipo Tempo **Atualizações > Cad Oficina > Tipo Tempo**.
- [ ] Gerar Escala Automática **Atualizações > Mov Produtivos > Escala Automatica**.

----

### Agendamento

- Para realizar um agendamento, acesse a rotina agendamentos em **Atualizações > Mov Oficina > Agendamentos**, clique incluir e preencha os campos obrigatorios referente ao agendamento. 
- No campo Chv Veiculo é a indentificação de um veiculo que deve estar previamente cadastrado, caso não tenha veiculos cadastrados, acesse a rotina **Atualizações > Cad Veiculos > Veiculos**, clique incluir e preencha os campos obrigatorios.


:::info
O Campo Chassi é obrigatório para o correto funcionamento do módulo
:::

