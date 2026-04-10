---
sidebar_position: 5
---

# Escala Automática (SIGAOFI)

----

### Objetivo

Esta rotina foi criada para possibilitar que o usuário realize o cadastro das escalas de
trabalho dos produtivos de forma automatizada, sem a necessidade de realizar o
cadastramento dia a dia, ou seja, registro por registro de forma manual (a forma
manual é realizada através da rotina Escala Produtivos (OFIOM040). Uma vez
cadastrados os períodos existentes dentro da empresa para os produtivos, o usuário
poderá informar as escalas utilizadas por dias da semana, bem como domingos e
feriados.

----

### Procedimentos

**ATENÇÃO!** Antes de utilizar esta rotina, é necessário que os períodos estejam
previamente cadastrados no sistema. Para isso, utilize a rotina **Períodos (OFIOA080)**
para cadastrar os períodos de trabalho existentes para os produtivos. Também é necessário que no cadastro do produtivo seja informado a quantidade maxima de agendamento por dia no campo **Max. Agendam.** na aba OFICINA.

No **Oficina (SIGAOFI)**, acesse **Atualizações > Mov Produtivos > Escala Automática (OFIOM270)**.

Será exibida uma janela contendo as informações necessárias para que a escala seja
cadastrada.

Informe os campos conforme abaixo:

- **Produtivo**: informe qual o código do produtivo que será cadastrada a escala;

- **Período**: informe para qual período deseja cadastrar as escalas. O período
máximo permitido pelo sistema é 1 ano. Caso deseje cadastrar um período
maior do que um ano, será necessário repetir a operação para cada ano
desejado;

- **Escalas**: para cada campo de dia da semana existente aqui, será necessário
informar um período previamente cadastrado. Desta forma, é **OBRIGATÓRIO**
informar períodos para sábados, domingos e feriados, mesmo que não haja
expediente no dia. Nestes casos, cadastre um período com todas as
informações zeradas e informe seu código para estes dias;

- **Botão ... (Feriados)**: caso a rotina **Feriados (OFIOA380)** esteja presente no
menu do usuário, ficará disponível um botão que servirá de atalho para
execução desta mesma rotina, facilitando o cadastramento/ atualizações dos
feriados do sistema.

Após informar os períodos desejados para todos os dias, clique em **ESCALAR** para que o sistema realize as escalas automaticamente no sistema.

Para fechar a rotina, clique em **SAIR**.

Caso deseja conferir as escalas cadastradas, utilize a rotina **Escala Produtivos (OFIOM040)**.
