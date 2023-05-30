import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docushark/blog',
    component: ComponentCreator('/docushark/blog', '0d3'),
    exact: true
  },
  {
    path: '/docushark/blog/archive',
    component: ComponentCreator('/docushark/blog/archive', '307'),
    exact: true
  },
  {
    path: '/docushark/blog/first-blog-post',
    component: ComponentCreator('/docushark/blog/first-blog-post', '175'),
    exact: true
  },
  {
    path: '/docushark/blog/long-blog-post',
    component: ComponentCreator('/docushark/blog/long-blog-post', '5ea'),
    exact: true
  },
  {
    path: '/docushark/blog/mdx-blog-post',
    component: ComponentCreator('/docushark/blog/mdx-blog-post', '85b'),
    exact: true
  },
  {
    path: '/docushark/blog/tags',
    component: ComponentCreator('/docushark/blog/tags', '066'),
    exact: true
  },
  {
    path: '/docushark/blog/tags/docusaurus',
    component: ComponentCreator('/docushark/blog/tags/docusaurus', 'e7a'),
    exact: true
  },
  {
    path: '/docushark/blog/tags/facebook',
    component: ComponentCreator('/docushark/blog/tags/facebook', '6c9'),
    exact: true
  },
  {
    path: '/docushark/blog/tags/hello',
    component: ComponentCreator('/docushark/blog/tags/hello', '0b0'),
    exact: true
  },
  {
    path: '/docushark/blog/tags/hola',
    component: ComponentCreator('/docushark/blog/tags/hola', '04b'),
    exact: true
  },
  {
    path: '/docushark/blog/welcome',
    component: ComponentCreator('/docushark/blog/welcome', '81e'),
    exact: true
  },
  {
    path: '/docushark/Central-compras',
    component: ComponentCreator('/docushark/Central-compras', 'd62'),
    exact: true
  },
  {
    path: '/docushark/markdown-page',
    component: ComponentCreator('/docushark/markdown-page', '76d'),
    exact: true
  },
  {
    path: '/docushark/search',
    component: ComponentCreator('/docushark/search', '28c'),
    exact: true
  },
  {
    path: '/docushark/docs',
    component: ComponentCreator('/docushark/docs', 'c1a'),
    routes: [
      {
        path: '/docushark/docs/category/fontes',
        component: ComponentCreator('/docushark/docs/category/fontes', 'fee'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/category/processos',
        component: ComponentCreator('/docushark/docs/category/processos', 'c13'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/category/rotinas',
        component: ComponentCreator('/docushark/docs/category/rotinas', '2c5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Fontes/ccxfun',
        component: ComponentCreator('/docushark/docs/Fontes/ccxfun', 'bb3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Fontes/conscli',
        component: ComponentCreator('/docushark/docs/Fontes/conscli', '122'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Fontes/menvmail',
        component: ComponentCreator('/docushark/docs/Fontes/menvmail', '790'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Fontes/mschxml',
        component: ComponentCreator('/docushark/docs/Fontes/mschxml', '55e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Fontes/mx181',
        component: ComponentCreator('/docushark/docs/Fontes/mx181', '117'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Fontes/relabast',
        component: ComponentCreator('/docushark/docs/Fontes/relabast', '5ea'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Fontes/shextcom',
        component: ComponentCreator('/docushark/docs/Fontes/shextcom', '1c1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Fontes/shgerabc',
        component: ComponentCreator('/docushark/docs/Fontes/shgerabc', '62e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Fontes/shmprecosk',
        component: ComponentCreator('/docushark/docs/Fontes/shmprecosk', 'cd4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Fontes/shprccom',
        component: ComponentCreator('/docushark/docs/Fontes/shprccom', 'b93'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Fontes/shsugtran',
        component: ComponentCreator('/docushark/docs/Fontes/shsugtran', 'e51'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Fontes/shtraaba',
        component: ComponentCreator('/docushark/docs/Fontes/shtraaba', '485'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Fontes/shtranes',
        component: ComponentCreator('/docushark/docs/Fontes/shtranes', 'a7e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Fontes/shtranf',
        component: ComponentCreator('/docushark/docs/Fontes/shtranf', 'e1d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Fontes/transporteBancosShark',
        component: ComponentCreator('/docushark/docs/Fontes/transporteBancosShark', 'abd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Homologação/Retirar Pedido do Faturamento Automatico',
        component: ComponentCreator('/docushark/docs/Homologação/Retirar Pedido do Faturamento Automatico', 'd09'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/intro',
        component: ComponentCreator('/docushark/docs/intro', '654'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Processos/Estrutura PCO',
        component: ComponentCreator('/docushark/docs/Processos/Estrutura PCO', 'f94'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Processos/fechamento_estoque',
        component: ComponentCreator('/docushark/docs/Processos/fechamento_estoque', 'f19'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Processos/formacao_preco_sk',
        component: ComponentCreator('/docushark/docs/Processos/formacao_preco_sk', 'c96'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Processos/liberacao_preco',
        component: ComponentCreator('/docushark/docs/Processos/liberacao_preco', '511'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Rotinas/Central de compras/central_compras_mm',
        component: ComponentCreator('/docushark/docs/Rotinas/Central de compras/central_compras_mm', '51e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Rotinas/Central de compras/exclusao_abastecimentos',
        component: ComponentCreator('/docushark/docs/Rotinas/Central de compras/exclusao_abastecimentos', '663'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Rotinas/Central de compras/new_flag_produto_1',
        component: ComponentCreator('/docushark/docs/Rotinas/Central de compras/new_flag_produto_1', '418'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Rotinas/Central de compras/new_flag_produto_2',
        component: ComponentCreator('/docushark/docs/Rotinas/Central de compras/new_flag_produto_2', '4d7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Rotinas/Central de compras/shcrossdocking',
        component: ComponentCreator('/docushark/docs/Rotinas/Central de compras/shcrossdocking', 'dac'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Rotinas/Central de compras/wizzard_central_de_compras',
        component: ComponentCreator('/docushark/docs/Rotinas/Central de compras/wizzard_central_de_compras', '770'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Rotinas/Oficina SIGAOFI/Agendamento',
        component: ComponentCreator('/docushark/docs/Rotinas/Oficina SIGAOFI/Agendamento', '417'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Rotinas/Oficina SIGAOFI/Cadastros_iniciais',
        component: ComponentCreator('/docushark/docs/Rotinas/Oficina SIGAOFI/Cadastros_iniciais', 'bbf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Rotinas/Oficina SIGAOFI/Escala_automatica',
        component: ComponentCreator('/docushark/docs/Rotinas/Oficina SIGAOFI/Escala_automatica', 'a01'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Rotinas/Oficina SIGAOFI/Fluxograma_Oficina',
        component: ComponentCreator('/docushark/docs/Rotinas/Oficina SIGAOFI/Fluxograma_Oficina', '5da'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Rotinas/Oficina SIGAOFI/Orcamento_fases',
        component: ComponentCreator('/docushark/docs/Rotinas/Oficina SIGAOFI/Orcamento_fases', '777'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Rotinas/Oficina SIGAOFI/Ordem_Servico',
        component: ComponentCreator('/docushark/docs/Rotinas/Oficina SIGAOFI/Ordem_Servico', '2ca'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Rotinas/TRC-AGCO/shtrccon',
        component: ComponentCreator('/docushark/docs/Rotinas/TRC-AGCO/shtrccon', '02a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Rotinas/TRC-AGCO/shtrcdms',
        component: ComponentCreator('/docushark/docs/Rotinas/TRC-AGCO/shtrcdms', 'b56'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docushark/docs/Rotinas/TRC-AGCO/shtrcdtbase',
        component: ComponentCreator('/docushark/docs/Rotinas/TRC-AGCO/shtrcdtbase', 'bea'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/docushark/',
    component: ComponentCreator('/docushark/', '967'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
