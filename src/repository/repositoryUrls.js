import { db } from '../database/database.connection.js';

export async function postRequisitionValidateToken(token) {
    const userLogeedResult = await db.query('SELECT * FROM userslogged WHERE token = $1;', [token]);
    return userLogeedResult;
};

export async function postRequisitionUrlsIdTableUsers(email) {
    const idUserResult = await db.query('SELECT * FROM users WHERE email = $1;', [email]);
    return idUserResult;
};

export async function postSendUrlsIdTableUsers(shortUrl, url) {
    const serveSend = await db.query('INSERT INTO urls ("shortUrl",url) VALUES ($1, $2)', [shortUrl, url]);
    return serveSend;
};

export async function postRequisitionUrlsIdTableUrls(shortUrl) {
    const idUrlsResult = await db.query('SELECT * FROM urls WHERE "shortUrl" = $1;', [shortUrl]);
    return idUrlsResult;
};