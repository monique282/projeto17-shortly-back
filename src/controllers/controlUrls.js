import { nanoid } from 'nanoid';
import { db } from '../database/database.connection.js';

export async function urlsPost(req, res) {

    // pegando os dados do token
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    // pegando os dados enviado pelo usuario
    const {url} = req.bady;

    try {
        const userLogeed = await db.query('SELECT * FROM usersLogged WHERE token = $1;', [token]);
        if(userLogeed.rows.length === 0){
            return res.status(401).send({ message: "Usuário não autorizado." });
        }

    } catch (erro) {
        res.status(500).send(erro.message);
    }



}