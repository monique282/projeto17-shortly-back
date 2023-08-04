import { nanoid } from 'nanoid';
import { db } from '../database/database.connection.js';

export async function urlsPost(req, res) {

    // pegando os dados do token
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    // pegando os dados enviado pelo usuario pelo input
    const { url } = req.bady;


    try {

        // validando o token
        const userLogeed = await db.query('SELECT * FROM usersLogged WHERE token = $1;', [token]);
        if (userLogeed.rows.length === 0) {
            return res.status(401).send({ message: "Usuário não autorizado." });
        };

        // gera a short URL utilizando o nanoid
        const shortUrl = nanoid(8);

        // contando quantas vezes foi visitdo
        const visitCount = 0

        // enviando os dados para o servidor
        await db.query('INSERT INTO urls (shortUrl,url,visitCount,Iduser) VALUES ($1, $2, $3)', [shortUrl, url, userLogeed.rows[0].id, visitCount]);

        // pegando o id
        const idUrls = await db.query('SELECT * FROM urls WHERE shortUrl = $1;', [shortUrl]);
        return res.status(201).send({ "id": idUrls.rows[0].id, "shortUrl": shortUrl });

    } catch (erro) {
        res.status(500).send(erro.message);
    };
}

export async function urlsGet(req, res) {
    const { id } = req.params;
    try {

    } catch (erro) {
        res.status(500).send(erro.message);
    }
}