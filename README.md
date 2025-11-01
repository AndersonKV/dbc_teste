Projeto Backend Node.js com TypeScript

Este projeto consiste em um backend em Node.js com TypeScript, que tem como objetivo gerenciar tarefas (ToDo) 
e usuários, incluindo autenticação e rotas básicas de CRUD. A ideia era ter o front e back no mesmo repositorio 
O projeto foi desenvolvido de forma incremental, com cada feature sendo adicionada separadamente e integrada à branch principal (main) via merge.

<b>Histórico de Desenvolvimento</b>

O desenvolvimento seguiu uma abordagem incremental:

Cada nova feature foi iniciada a partir da branch main, garantindo que o histórico principal estivesse sempre atualizado.

Foram implementadas rotas separadas para ToDo e usuários, incluindo:

Criação, listagem, atualização e remoção de ToDo.

Criação de usuário e login com autenticação.

O banco de dados utilizado é <b>SQLite</b>.

Durante o processo, algumas limitações foram enfrentadas:

Front-end: Não foi possível iniciar e integrar o frontend devido ao tempo limitado.

Testes automatizados: Houve tentativa de configurar testes com Jest e supertest para o backend, mas a configuração completa não foi concluída a tempo. 
O foco foi priorizar a implementação das rotas e funcionalidades essenciais.

Funcionalidades Implementadas

ToDo:

Criar, atualizar e deletar tarefas.

Buscar tarefas por título ou descrição.

Filtrar tarefas pendentes ou concluídas.

Usuário e autenticação:

Registro de novos usuários.

Login com token JWT.

Rotas protegidas com middleware de autenticação.
