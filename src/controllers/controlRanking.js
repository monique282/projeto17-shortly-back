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
                CAST(SUM(urls."visitCount") AS INTEGER) AS "",
                json_agg(json_build_object(
                    'id', urls.id,
                    'shortUrl', urls."shortUrl",
                    'url', urls.url,
                    'visitCount', urls."visitCount"
                )) AS "shortenedUrls"
                FROM userslogged
                LEFT JOIN urls ON userslogged.id = urls.id
                WHERE userslogged.token = $1
                GROUP BY userslogged.id;
            `, [token]);

        // retornar os dados do usuário no formato especificado
        const { id, name, visitcount, shortenedurls } = userData.rows[0];
        const response = {
            id: id,
            name: name,
            visitCount: visitcount,
            shortenedUrls: shortenedurls,
        };

        return res.status(200).send(userData.rows[0]);

    } catch (error) {
        res.status(500).send(error.message);
    }
};



