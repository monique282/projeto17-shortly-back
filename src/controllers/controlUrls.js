import { nanoid } from 'nanoid';
import { db } from '../database/database.connection.js';

export async function urlsPost(req, res) {

    // pegando os dados do token
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        const userLogeed = await db.query('SELECT * FROM usersLogged WHERE token = $1;', [token]);
        
    } catch (erro) {
        res.status(500).send(erro.message);
    }



}