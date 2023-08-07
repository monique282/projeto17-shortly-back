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