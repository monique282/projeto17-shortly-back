import { db } from '../database/database.connection.js';

export async function getRequisitionRanking (){
    const result = await db.query(`
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
            return result;
}