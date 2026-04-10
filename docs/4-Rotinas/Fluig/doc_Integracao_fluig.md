# Documentação de Endpoints ERP/FLUIG

## 1. serviço Rest /POST Responsavel para Amarração SIG x Doc Celula

**Descrição**: Este serviço RESTful é responsável para Amarração SIG x Doc Celula.

- **Tipo**: Endpoint
- **Versão**: 1.0
- **Autor**: jose.oliveira
- **Desde**: 11/06/2024
- **Método**: POST
- **Caminho**: /agricolas/SIG/fluig/doc
- **Formato**: application/json
- **Parâmetros**:
  - `aParam` (array): Contém "Empresa" e "Filial".
- **Retorno**: JSON com as SIG cadastradas.
- **Fontes:** wsfluig.prw

## 2. Filiais do Grupo

**Descrição**: Este serviço RESTful retorna uma lista de filiais do grupo.

- **Tipo**: Endpoint
- **Versão**: 1.0
- **Autor**: Jose Antonio
- **Desde**: 11/06/2024
- **Método**: GET
- **Caminho**: /agricolas/FILIAISGRUPO/erp/fluig
- **Formato**: application/json, text/html
- **Parâmetros**:
  - `Page` (INTEGER, opcional)
  - `PageSize` (INTEGER, opcional)
  - `aQueryString` (ARRAY, opcional)
- **Fontes:** wsfluig.prw / filAdapter.prw

## 3. Fornecedor

**Descrição**: Este serviço RESTful retorna uma lista de fornecedores.

- **Tipo**: Endpoint
- **Versão**: 1.0
- **Autor**: Jose Antonio
- **Desde**: 11/06/2024
- **Método**: GET
- **Caminho**: /agricolas/FORNECEDOR/erp/fluig
- **Formato**: application/json, text/html
- **Parâmetros**:
  - `Page` (INTEGER, opcional)
  - `PageSize` (INTEGER, opcional)
  - `aQueryString` (ARRAY, opcional)
- **Fontes: wsfluig.prw / forAdapter.prw**

## 4. Natureza Financeira

**Descrição**: Este serviço RESTful retorna uma lista de naturezas financeiras.

- **Tipo**: Endpoint
- **Versão**: 1.0
- **Autor**: Jose Antonio
- **Desde**: 11/06/2024
- **Método**: GET
- **Caminho**: /agricolas/NATFINANCEIRA/erp/fluig
- **Formato**: application/json, text/html
- **Parâmetros**:
  - `Page` (INTEGER, opcional)
  - `PageSize` (INTEGER, opcional)
  - `aQueryString` (ARRAY, opcional)
- **Fontes:** wsfluig.prw / nfnAdapter.prw

## 5. Veículos

**Descrição**: Este serviço RESTful retorna uma lista de veículos do ativo fixo.

- **Tipo**: Endpoint
- **Versão**: 1.0
- **Autor**: Jose Antonio
- **Desde**: 11/06/2024
- **Método**: GET
- **Caminho**: /agricolas/VEICULOS/erp/fluig
- **Formato**: application/json, text/html
- **Parâmetros**:
  - `Page` (INTEGER, opcional)
  - `PageSize` (INTEGER, opcional)
  - `aQueryString` (ARRAY, opcional)
- **Fontes:** wsfluig.prw / veiAdapter.prw

## 6. Funcionários

**Descrição**: Este serviço RESTful retorna uma lista de funcionários.

- **Tipo**: Endpoint
- **Versão**: 1.0
- **Autor**: Jose Antonio
- **Desde**: 11/06/2024
- **Método**: GET
- **Caminho**: /agricolas/FUNCIONARIOS/erp/fluig
- **Formato**: application/json, text/html
- **Parâmetros**:
  - `Page` (INTEGER, opcional)
  - `PageSize` (INTEGER, opcional)
  - `aQueryString` (ARRAY, opcional)
- **Fontes:** wsfluig.prw / funAdapter.prw
