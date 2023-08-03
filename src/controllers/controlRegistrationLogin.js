// esse arquivo aqui serve para executar todas as funções que eu preciso
// esse arquivo é chamado la em Routes
// esse arquivo aqui é enviado por um post para faser o cadastro


import bcrypt from 'bcrypt';
import { db } from '../database/database.connection.js';


export async function Register(req, res) {

    // pegar os dados que a pessoa colocou na tela de cadastro
    const { name, email, password } = req.body;

    // verificar se o email ja foi castrado
    const user = await db.collection("users").findOne({ email });

    // se o usuario fornecido estiver no sevidor
    if (user) {
        return res.status(409).send({ message: "Já existe um usuario com este email" })
    };

    // se tudo estiver certo 
    // cripitografas a senha 
    const passwordsafe = bcrypt.hashSync(password, 2);

    try {

        let query = 'SELECT * FROM customers';
        const queryParams = [];

        // Verificando os parâmetros enviados pela query são validos
        // verificando se name é valido
        if (typeof name !== 'undefined' && name !== '') {
            queryParams.push(name);
            query += ' WHERE name LIKE $1';
        };

        // verificando se o email é valido
        if (typeof email !== 'undefined' && email !== '') {
            queryParams.push(email);
            query += ' AND email LIKE $' + queryParams.length;
        };

        // verificando se a senha é valida
        if (typeof password !== 'undefined' && password !== '') {
            queryParams.push(passwordsafe);
            query += ' AND password LIKE $';
        };

        // enviar os dados pro servidor pra quando o cadastro der certo
        await db.collection("users").insertOne(query + queryParams);
        return res.sendStatus(201);
    } catch (erro) {
        res.status(500).send(erro.message);
    }

};