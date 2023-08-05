// esse arquivo aqui serve para executar todas as funções que eu preciso
// esse arquivo é chamado la em Routes

import { db } from '../database/database.connection.js';

// essa função aqui serve pra pegar mostrar o rank os 10 mais acessados
export async function rankingGet(req, res) {

    try {
        
        // pegando os dados do usuário e suas urls somando o total de visitas e juntando tudo
        const ranking = await db.query(`
                SELECT
                users.id, users.name,
                CAST(COUNT(shortuser."userId") AS INTEGER) AS "linksCount",
                CAST(SUM(urls."visitCount") AS INTEGER) AS "visitCount"
                FROM users
                JOIN shortuser ON users.id = shortuser."userId"
                JOIN urls ON urls.id = shortuser."shortId"
                WHERE users.id = shortuser."userId"
                GROUP BY users.id
                ORDER BY "visitCount" DESC
                LIMIT 10
            ;`);

        // retornar os dados do usuário no formato especificado
        return res.status(200).send(ranking.rows);

    } catch (error) {
        res.status(500).send(error.message);
    };
};



