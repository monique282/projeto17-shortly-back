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

export async function postSendUrlsIdTableShortuser(idUser, idUrls) {
    const serveSend = await db.query('INSERT INTO shortuser ( "userId" ,"shortId") VALUES ($1, $2)', [idUser, idUrls]);
    return serveSend;
};

export async function getRequisitionUrlsId(id) {
    const urlsResult = await db.query('SELECT * FROM urls WHERE id = $1;', [id]);
    return urlsResult;
};

export async function getSendUrlsOpenUpdatVistirCount(visitCount, shortUrl) {
    const serveSend = await db.query(`UPDATE urls SET "visitCount" = $1 WHERE "shortUrl" = $2`, [visitCount + 1, shortUrl])
    return serveSend;
};

export async function deleteRequisitionUrlsId(id) {
    const usersResult = await db.query('SELECT * FROM users WHERE id = $1;', [id]);
    return usersResult;
};

export async function deleteRequisitionShortuserLink(user, id) {
    const shortUrlResult = await db.query(`SELECT * FROM shortuser WHERE "userId" = $1 AND "shortId" = $2;`, [user, id]);
    return shortUrlResult;
};

