// esse arquivo aqui serve para executar todas as funções que eu preciso
// esse arquivo é chamado la em Routes
// esse arquivo aqui é enviado por um post para faser o cadastro


import bcrypt from 'bcrypt';
import { db } from '../database/database.connection.js';


export async function registerPost(req, res) {

    // pegar os dados que a pessoa colocou na tela de cadastro
    const { name, email, password, confirmPassword } = req.body;

    try {

        // verificando se as senhas são iguais
        if (password !== confirmPassword) {
            return res.status(409).send({message: "Senha e Confirmar senha não são iguais."});
        }

        // cripitografas a senha 
        const passwordsafe = bcrypt.hashSync(password, 2);

        let query = 'INSERT INTO users (name,email,password) VALUES ($1, $2, $3) ';
        const queryParams = [];


        // Verificando os parâmetros enviados pela query são validos
        // verificando se name é valido
        if (typeof name !== 'undefined' && name !== '') {
            queryParams.push(name);
        };

        // verificando se o email é valido
        if (typeof email !== 'undefined' && email !== '') {
            queryParams.push(email);
        };

        // verificando se a senha é valida
        if (typeof password !== 'undefined' && password !== '') {
            queryParams.push(passwordsafe);
        };

        // enviar os dados pro servidor pra quando o cadastro der certo
        await db.query(query, queryParams);
        return res.sendStatus(201);
    } catch (erro) {
        res.status(500).send(erro.message);
    }

};

