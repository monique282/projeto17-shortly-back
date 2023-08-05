// esse arquivo aqui serve para executar todas as funções que eu preciso
// esse arquivo é chamado la em Routes
// esse arquivo aqui é enviado por um post para faser o cadastro

import { db } from '../database/database.connection.js';


// essa função aqui serve pra pegar as postagem que foi o usuario que fez users/me
export async function rankingGet(req, res) {

    try {
        
        // pegando os dados do usuário e suas urls somando o total de visitas e juntando tudo
        const ranking = await db.query(`
                SELECT
                users.id, users.name,
                CAST(COUNT(shortsuser."userId") AS INTEGER) AS "linksCount",
                CAST(SUM(urls."visitCount") AS INTEGER) AS "visitCount"
                FROM users
                JOIN shorts ON users.id = shorts."userId"
                JOIN urls ON urls.id = shorts."shortsId"
                WHERE users.id = Shorts."userId"
                GROUP BY user.id
                ORDER BY "visitCount" DESC
                LIMIT 10
            ;`);

        // retornar os dados do usuário no formato especificado

        return res.status(200).send(ranking.rows);

    } catch (error) {
        res.status(500).send(error.message);
    }
};



