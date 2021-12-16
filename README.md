<h3 align="center">
    <img width="300px" src="https://i.imgur.com/V862hpm.png">
    <br><br>
    <p align="center">
      <a href="#-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <a href="#-alunos-integrantes-da-equipe">Alunos Integrantes da Equipe</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <a href="#-professoras-responsáveis">Professoras responsáveis</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <a href="#-instruções-de-utilização">Instruções de utilização</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <a href="#-licença">Licença</a>
  </p>
</h3>

<p align="center">
  <a href="https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2021-2-ti4-0658100-corpoclinico">
    <img src="https://i.imgur.com/xGJ14gt.png">
  </a>
</p>

## 🔖 Sobre

O Complexo Hospitalar São Francisco (CHSF) realiza suas tarefas de recursos humanos como enviar documentos e receber avaliações dos diretores e coordenadores clínicos de maneira manual. Dessa forma, o hospital solicitou um software capas de realizar a automação no processo de cadastro de corpo clínico. O objetivo deste projeto é desenvolver uma aplicação web  

Para coletar dados do cliente, as ferramentas utilizadas foram entrevistas e reuniões com os membros do hospital e os membros do grupo de desenvolvimento. Com as informações em mãos iniciou-se a fase de modelagem e estruturação do projeto (wireframes, levantamento de requisitos e organização de sprints (metodologia ágil SCRUM)). As tecnologias utilizadas foram VueJs no frontend e TypeScript no backend com o framework Nuxt para inicializar o servidor com o interpretador NodeJS. O banco de dados utilizado foi o MySQL e o sistema foi instalado no Google Cloud.

O <strong>Cadastro de Corpo Clínico</strong> é uma aplicação web, desenvolvida com o intuito de permitir que possibilite os médicos se cadastrarem no sistema e a administração clínica efetuar todos os passos de avaliação da documentação de forma online. Dessa forma, por meio dessa aplicação, os administradores da aplicação consiguirão verificar quais os médicos já estão no corpo e quais estão em fase de avaliação.

Com esta aplicação vai ser possível realizar um gerenciamento mais amplo do corpo clínico. Os administradores poderão visualizar a lista de candidaturas médicas, possibilitando-os avaliar os dados e documentos inseridos pelo médicos, tais avaliações que os médicos recebem para poderem corrigir caso algum dado esteja incorreto.

## 👨‍💻 Alunos integrantes da equipe

* [Guilherme Gabriel Silva Pereira](https://github.com/guizombas)
* [Henrique Penna Forte Monteiro](https://github.com/Henrikkee)
* [Lucas Ângelo Oliveira Martins Rocha](https://lucasangelo.com/links)
* [Victor Boaventura Goes Campos](https://github.com/777-victor)
* [Vinícius Marini Costa E Oliveria](https://github.com/marinisz)

## 👩‍🏫 Professoras responsáveis

* Ivre Marjorie Ribeiro Machado
* Soraia Lúcia Da Silva

## 🚀 Tecnologias

* [NuxtJs](https://nuxtjs.org/)
* [NodeJs](https://nodejs.org/)
* [VueJs](https://vuejs.org/)
* [Vuetify](https://vuetifyjs.com/en/)
* [TypeScript](https://www.typescriptlang.org/)
* [Sequelize](https://sequelize.org/)
* [MySQL](https://www.mysql.com/)

## ⤵ Instruções de utilização

Essas instruções vão te levar a uma cópia do projeto rodando em sua máquina local para propósitos de testes e desenvolvimento.

#### Configurar modelo de banco de dados MySQL
- [ModeloMySQL.sql](Artefatos/Banco%20de%20dados/ModeloMySQL.sql)

---

```bash
- git clone https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2021-2-ti4-0658100-corpoclinico
- cd plf-es-2021-2-ti4-0658100-corpoclinico
- cd Codigo
```
#### Altere as informações de autenticação do banco
``` bash
$ mv .env.example .env
```
#### Instalar dependências
``` bash
$ npm install
```

#### Rodar a aplicação localmente em dev
``` bash
$ npm run dev
```
#### Ou, rodar a aplicação localmente
``` bash
$ npm run build
$ npm run start
```

## 🔗 Links do projeto

- [Artefatos](Artefatos)
- [Codigo](Codigo)
- [Divulgacao](Divulgacao)
- [Documentacao](Documentacao)

## 📝 Licença

Esse projeto está sob a licença Creative Commons Attribution 4.0 International. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
