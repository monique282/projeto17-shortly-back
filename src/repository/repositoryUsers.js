import { db } from '../database/database.connection.js';

export async function postRequisitionRegister(email) {
    const existingUserResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return existingUserResult;
}

export async function postRequisitionRegisterSend(query, queryParams) {
    const existingUserResultSend = await db.query(query, queryParams);;
    return existingUserResultSend;
}
