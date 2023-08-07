import { db } from '../database/database.connection.js';

export async function postRequisitionUrlsIdTableUsers(email) {
    const idUserResult = await db.query('SELECT * FROM users WHERE email = $1;', [email]);
    return idUserResult;
};

export async function postSendUrlsIdTableUsers(shortUrl, url) {
    const serveSend = await db.query('INSERT INTO urls ("shortUrl",url) VALUES ($1, $2)', [shortUrl, url]);
    return serveSend;
};