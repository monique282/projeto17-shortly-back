import { db } from '../database/database.connection.js';

export async function postRequisitionUrlsIdTableUsers(email) {
    const idUserResult = await db.query('SELECT * FROM users WHERE email = $1;', [email]);
    return idUserResult;
};

export async function postRequisitionLogin(email) {
    const emailExistsQueryResult = await db.query('SELECT * FROM users WHERE email = $1;', [email]);
    return emailExistsQueryResult;
};