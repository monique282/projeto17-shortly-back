import { db } from '../database/database.connection.js';

export async function postRequisitionRegister(email) {
    const existingUserResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return existingUserResult;
};

export async function postRequisitionRegisterSend(query, queryParams) {
    const existingUserResultSend = await db.query(query, queryParams);;
    return existingUserResultSend;
};

export async function postRequisitionLogin(email) {
    const emailExistsQueryResult = await db.query('SELECT * FROM users WHERE email = $1;', [email]);
    return emailExistsQueryResult;
};

export async function postRequisitionLoginSend(name, email, token) {
    const existingUserResultSend = await db.query('INSERT INTO usersLogged (name,email,token) VALUES ($1, $2, $3)', [name, email, token]);
    return existingUserResultSend;
};

export async function getRequisitionUserMe(token) {
    const userLoggedResult = await db.query('SELECT * FROM userslogged WHERE token = $1;', [token]);
    return userLoggedResult;
};

export async function getRequisitionUserMeValidationToken(email) {
    const userDataSend = await db.query(`
    SELECT
    users.id AS id,
    users.name As name,
    CAST(SUM(urls."visitCount") AS INTEGER) AS "visitCount",
    json_agg(json_build_object(
        'id', urls.id,
        'shortUrl', urls."shortUrl",
        'url', urls.url,
        'visitCount', urls."visitCount"
    )) AS "shortenedUrls"
    FROM users
    JOIN shortuser ON shortuser."userId" = users.id
    JOIN urls ON shortuser."shortId" = urls.id
    WHERE users.email = $1
    GROUP BY users.id, users.name;
`, [email]);
    return userDataSend;
};