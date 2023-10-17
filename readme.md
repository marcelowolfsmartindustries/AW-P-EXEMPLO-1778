# Conteúdo e Ficha de exercícios

## TECH STACK
- Node
- Prisma + PostgreSQL

## Aula 1 - Apresentação da UC
1. Conhecer as Arquiteturas de Aplicações Web.
2. Conhecer a Arquitetura de Desenvolvimento Model View Controller.
3. Desenvolver aplicações Web, utilizando bibliotecas e frameworks de produtividade nas várias camadas do desenvolvimento.
4. Produzir Aplicações Web adaptadas aos vários tipos de dispositivos.
5. Saber disponibilizar e integrar informação a partir de APIs e/ou Web Services.
6. Conhecer Soluções de desenvolvimento e publicação em modelos de computação na nuvem (cloud computing).


## Aula 2 
### Setup de instalação
 - Criar conta no GitHub;
 - Criar um repositório – AW-P-EXEMPLO-{{número-de-aluno}};
 - Instalar GitHub desktop e mapear o repositório;
- Instalar node;
    - https://nodejs.org/en
- Instalar Postman;
    - https://www.postman.com/
- Abrir projeto mapeado com o VSCode;

### MY FIRST API
- Abrir terminal e executar:
    - <code>npm init</code>;
- Preencher os dados pedidos;
- Instalar dependências:
    - <code>npm install express nodemon cors dotenv morgan --save 
</code>
- Criar ficheiro .env (environment) na raiz do projeto:
     ```
    SERVER_HOST=localhost
    SERVER_PORT=4242
    ```

- Criar um ficheiro na raiz do projeto server.js;
- Alterar no package.json "main": "server.js";
- Adicionar script no package.json:
    - "start": "nodemon server.js“

- package.json deverá ficar assim:
    ```json
    {
    "name": "aw-p-exemplo-1778",
    "version": "1.0.0",
    "description": "Educational project",
    "main": "server.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon server.js"
    },
    "author": "Marcelo Antunes Fernandes",
    "license": "ISC",
    "dependencies": {
        "cors": "^2.8.5",
        "dotenv": "^16.3.1",
        "express": "^4.18.2",
        "morgan": "^1.10.0",
        "nodemon": "^3.0.1"
    }
    }

    ```

- Alterar server.js
    ```javascript
    require('dotenv').config();

    const bodyParser = require('body-parser');
    const cors = require('cors');
    const express = require('express');

    const router = require('../routes/index');

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    app.use('/api/', router);

    const port = process.env.SERVER_PORT || 8080;
    app.listen(port, () => {
        console.log('Express server listening on port', port)
    });
    ```

- Criar a seguinte estrutura de pastas e ficheiros:
    ```
    📦AW-P-EXEMPLO-1778
    ┣ 📂controllers
    ┃ ┃ ┗ 📜student.js
    ┣ 📂routes
    ┃ ┃ ┗ 📜index.js
    ┃ ┃ ┗ 📜student.js
    ┣ 📜.env
    ┣ 📜.gitignore
    ┣ 📜package-lock.json
    ┣ 📜package.json
    ┣ 📜readme.md
    ┗ 📜server.js
    ```

- Alterar routes
    - student.js

    ```javascript
    const studentRouter = require('express').Router();
    const controller = require('../controllers/student');

    //students CRUD
    studentRouter.get('/', controller.getAll); //read all
    studentRouter.get('/:number', controller.getById); //read one by his id (student number)
    studentRouter.post('/create', controller.create); //create new student
    studentRouter.put('/update', controller.update); //update student
    studentRouter.delete('/delete/:number', controller.delete); //delete student

    module.exports = studentRouter;
    ```

    - index.js
    ```javascript
    const router = require('express').Router();
    const studentRouter = require('./students');

    router.use('/students', studentRouter);

    module.exports = router;
    ```
- Alterar controller:
    - student.js
    ```javascript
    const fs = require('fs');

    //return all students
    exports.getAll = async (req, res) => {
        return res.send("ok");
    }

    //return student by his id (student number)
    exports.getById = async (req, res) => {
        //get student id requested
        const id = req.params.number;
        //just return same id
        return res.send(id);
    }

    //creates student
    exports.create = async (req, res) => {
        //get requested student properties
        const {number, name, city, birthday } = req.body;
        //just return same new student
        return res.status(201).send(req.body);
    }

    //updates student
    exports.update = async (req, res) => {
        //get requested student properties
        const {number, name, city, birthday } = req.body;
        //just return same new student
        return res.send(req.body);
    }

    //delete student by his id (student number)
    exports.delete = async (req, res) => {
        //get student id requested
        const id = req.params.number;
        //just return ok
        return res.send("ok");
    }
    ```

- Executar <code>npm start</code>;

- Testar no Postman;

- Push para o GIT;

## Aula 3 - Base de dados local

- Criar data -> local -> data.json

    ```
    📦AW-P-EXEMPLO-1778
    ┣ 📂controllers
    ┃ ┃ ┗ 📜student.js
    ┣ 📂data
    ┃ ┃ ┗ 📂local
    ┃ ┃     ┗ 📜data.json
    ┣ 📂routes
    ┃ ┃ ┗ 📜index.js
    ┃ ┃ ┗ 📜student.js
    ┣ 📜.env
    ┣ 📜.gitignore
    ┣ 📜package-lock.json
    ┣ 📜package.json
    ┣ 📜readme.md
    ┗ 📜server.js
    ```

- Estrutura exemplo data.json
    ```json
    {
        "students": [
            {
                "number": "1778",
                "name": "Marcelo Filipe",
                "city": "Braga",
                "birthday": "17-09-1991"
            }
        ]
    }
    ```


- Alterar controller:
    - student.js

    ```javascript
    const fs = require('fs');

    //return all students
    exports.getAll = async (req, res) => {
        //read local data json file
        const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
        //parse to json
        const data = JSON.parse(datajson);
        //returns students array
        return res.send(data.students);
    }

    //return student by his id (student number)
    exports.getById = async (req, res) => {
        //get student id requested
        const id = req.params.number;
        //read local data json file
        const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
        //parse to json
        const data = JSON.parse(datajson);
        //finds student by his id
        const student = data.students.filter(student => student.number == id);
        //return student
        res.send(student);
    }

    //creates student
    exports.create = async (req, res) => {
        //get requested student properties
        const {number, name, city, birthday } = req.body;
        //read local data json file
        const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
        //parse to json
        const data = JSON.parse(datajson);
        //add to students array
        data.students.push(req.body);
        //add to students array
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        //return new student
        return res.status(201).send(req.body);
    }

    //updates student
    exports.update = async (req, res) => {
        const { number, name, city, birthday } = req.body;
        //read local data json file
        const datajson = fs.readFileSync("data/local/data.json", "utf-8");
        //parse to json
        const data = JSON.parse(datajson);
        //find student to update
        const student = data.students.find(student => student.number == number);
        //update properties
        student.name = name;
        student.city = city;
        student.birthday = birthday;
        //update local database
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        //return updated student
        return res.send({number, name, city, birthday });
    }

    //delete student by his id (student number)
    exports.delete = async (req, res) => {
        //get student id requested
        const id = req.params.number;
        //read local data json file
        const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
        //parse to json
        const data = JSON.parse(datajson);
        //find student to delete
        const student = data.students.filter(student => student.number == id);
        //delete student
        data.students.splice(student, 1);
        //update local database
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        //return ok
        return res.status(200).send("ok");
    }
    ```

- Executar <code>npm start</code>;

- Testar no Postman;

- Push para o GIT;

### Ficha de exercícios
### Criar toda a estrutura para:
- Escolas:
    - [ ] Identificador, nome, sigla, morada, website.
- Cursos:
    - [ ] Identificador, nome, sigla e escola a que pertence.
- Alunos
    - [ ] Identificador, nº de aluno, nome, morada, data de nascimento e curso a que pertence.

**Não esquecer de validar:**

- Antes de retornar um registo verificar se:
    - [ ] o registo efetivamente existe;

- Antes de gravar verificar se:
    - [ ] o registo efetivamente existe;
    - [ ] todas os campos estão devidamente preenchidos;
    - [ ] (no caso de create) se já existe um registo com o mesmo identitificador (número);

- Antes de eliminar verificar se:
    - [ ] o registo efetivamente existe;
  
## Aula 4 - Base de dados

## Aula 5 - Autenticação e autorização

## Aula 6 - Deploy
 
