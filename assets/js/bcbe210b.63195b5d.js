"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6325],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>f});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function A(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?A(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):A(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},A=Object.keys(e);for(a=0;a<A.length;a++)r=A[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var A=Object.getOwnPropertySymbols(e);for(a=0;a<A.length;a++)r=A[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=a.createContext({}),c=function(e){var t=a.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},d=function(e){var t=c(e.components);return a.createElement(i.Provider,{value:t},e.children)},l="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,A=e.originalType,i=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),l=c(r),u=n,f=l["".concat(i,".").concat(u)]||l[u]||p[u]||A;return r?a.createElement(f,o(o({ref:t},d),{},{components:r})):a.createElement(f,o({ref:t},d))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var A=r.length,o=new Array(A);o[0]=u;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[l]="string"==typeof e?e:n,o[1]=s;for(var c=2;c<A;c++)o[c]=r[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}u.displayName="MDXCreateElement"},2872:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>l,frontMatter:()=>A,metadata:()=>s,toc:()=>c});var a=r(7462),n=(r(7294),r(3905));const A={sidebar_position:3},o="SK Crossdocking",s={unversionedId:"Rotinas/Central de compras/shcrossdocking",id:"Rotinas/Central de compras/shcrossdocking",title:"SK Crossdocking",description:"Cadastro de transportadora (De Para)",source:"@site/docs/4-Rotinas/Central de compras/shcrossdocking.md",sourceDirName:"4-Rotinas/Central de compras",slug:"/Rotinas/Central de compras/shcrossdocking",permalink:"/docushark/docs/Rotinas/Central de compras/shcrossdocking",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Wizzard Central de compras",permalink:"/docushark/docs/Rotinas/Central de compras/wizzard_central_de_compras"},next:{title:"Processos",permalink:"/docushark/docs/category/processos"}},i={},c=[{value:"Dados da Customiza\xe7\xe3o",id:"dados-da-customiza\xe7\xe3o",level:3},{value:"Especifica\xe7\xe3o da Customiza\xe7\xe3o",id:"especifica\xe7\xe3o-da-customiza\xe7\xe3o",level:3},{value:"Cadastro",id:"cadastro",level:3}],d={toc:c};function l(e){let{components:t,...A}=e;return(0,n.kt)("wrapper",(0,a.Z)({},d,A,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"sk-crossdocking"},"SK Crossdocking"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Cadastro de transportadora (De Para)")),(0,n.kt)("h3",{id:"dados-da-customiza\xe7\xe3o"},"Dados da Customiza\xe7\xe3o"),(0,n.kt)("hr",null),(0,n.kt)("p",null,"Analista: Jonathan Torioni\nFonte: ",(0,n.kt)("strong",{parentName:"p"},"skcadcrossdoking.prw")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"especifica\xe7\xe3o-da-customiza\xe7\xe3o"},"Especifica\xe7\xe3o da Customiza\xe7\xe3o"),(0,n.kt)("p",null,"Axcadastro simples apenas para realziar o De para de transportadoras para os pedidos de transfer\xeancia autom\xe1tico"),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"cadastro"},"Cadastro"),(0,n.kt)("p",null,"O cadastro \xe9 feito de forma bastante simples, existe apenas tr\xeas campos para preenchimento, sendo:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Filial Orig")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Transportador")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Filial Dest"))),(0,n.kt)("p",null,"Ao acessar a rotina, ir\xe1 aparecer a seguinte tela:\n",(0,n.kt)("img",{alt:"Crossdocking",src:r(8423).Z,width:"580",height:"267"})),(0,n.kt)("p",null,"Clique no bot\xe3o ",(0,n.kt)("strong",{parentName:"p"},"+Incluir")," e preencha os campos conforme a imagem abaixo:\n",(0,n.kt)("img",{alt:"Corssdocking",src:r(1564).Z,width:"578",height:"188"})),(0,n.kt)("p",null,"No campo Filial Orig, deve ser informado a filial da qual ser\xe1 enviada a mercadoria, no campo Transportador, preencha com o c\xf3digo da transportadora que realizar\xe1 a coleta e entrega da mercadoria e no campo Filial Dest, preencha qual a filial receber\xe1 a mercadoria."),(0,n.kt)("p",null,"Ap\xf3s o preenchimento de todas as informa\xe7\xf5es, clique em ",(0,n.kt)("strong",{parentName:"p"},"Salvar")),(0,n.kt)("p",null,"As rotinas de funcionamento autom\xe1tio passaram a obedecer a regra cadastrada nesta rotina."),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},"Este processo foi desenvolvido com o objetivo de realizar o abastecimento e desabastecimento autom\xe1tico das filiais ligados ao processo de Central de compras.")),(0,n.kt)("admonition",{type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"Este processo deve ser realizado pelo departamento logistico!")))}l.isMDXComponent=!0},8423:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/crossdocking_1-9a5ace29f0cb69370c0a772e8f1ce833.png"},1564:(e,t,r)=>{r.d(t,{Z:()=>a});const a="data:image/png;base64,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"}}]);