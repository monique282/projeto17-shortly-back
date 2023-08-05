import { nanoid } from 'nanoid';
import { db } from '../database/database.connection.js';


// função que para cadastrar uma url a encurtando, urls/short
export async function urlsPost(req, res) {

    // pegando os dados do token
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    // pegando os dados enviado pelo usuario pelo input
    const { url } = req.body;

    try {

        // validando o token
        const userLogeed = await db.query('SELECT * FROM userslogged WHERE token = $1;', [token]);
        if (userLogeed.rows.length === 0) {
            return res.status(401).send({ message: "Usuário não autorizado." });
        };

        // quero o id da tabela de usuarios 
        const idUser = await db.query('SELECT * FROM users WHERE email = $1;', [userLogeed.rows[0].email]);

        // gera a short URL utilizando o nanoid
        const shortUrl = nanoid(8);

        // enviando os dados para o servidor
        await db.query('INSERT INTO urls ("shortUrl",url) VALUES ($1, $2)', [shortUrl, url]);

        // quero o id da tabela de urls 
        const idUrls = await db.query('SELECT * FROM urls WHERE "shortUrl" = $1;', [shortUrl]);

        // salvar na tabela de shortUser o id do user e do urls
        await db.query('INSERT INTO shortuser ( "userId" ,"shortId") VALUES ($1, $2)', [idUser.rows[0].id, idUrls.rows[0].id]);

        return res.status(201).send({ "id": idUrls.rows[0].id, "shortUrl": shortUrl });

    } catch (erro) {
        res.status(500).send(erro.message);
    };
}

// função que pega a url pelo id urls/:id
export async function urlsGet(req, res) {
    const { id } = req.params;
    try {

        // pegando a url peli id indicado
        const urls = await db.query('SELECT * FROM urls WHERE id = $1;', [id]);

        // verificando se a ulr é valida
        if (urls.rows.length === 0) {
            return res.status(404).send("Url não valida");
        };

        // se tudo der certo
        res.status(200).send({ "id": urls.rows[0].id, "shortUrl": urls.rows[0].shortUrl, "url": urls.rows[0].url })

    } catch (erro) {
        res.status(500).send(erro.message);
    };
}

// função que direciona pra urls espcifica urls/open/:shortUrl
export async function urlsOpenGet(req, res) {
    const { shortUrl } = req.params;
    try {

        // verificando se o short existe 
        const shortForUrl = await db.query('SELECT * FROM urls WHERE "shortUrl" = $1;', [shortUrl]);

        // verificando se a short é valida
        if (shortForUrl.rows.length === 0) {
            return res.status(404).send("Url não encontrada");
        };

        // se tudo der certo
        // atualizando visitCount
        await db.query(`UPDATE urls SET "visitCount" = $1 WHERE "shortUrl" = $2`, [shortForUrl.rows[0].visitCount + 1, shortUrl])
        res.redirect(`/urls/open/${shortForUrl.rows[0].url}`);

    } catch (erro) {
        res.status(500).send(erro.message);
    };
}

// função que deleta pelo id urls/:id
export async function urlsDelete(req, res) {

    // pegando os dados do token
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "")

    // pegando o id 
    const { id } = req.params;
    try {

        // validando o token
        const userLogeed = await db.query('SELECT * FROM userslogged WHERE token = $1;', [token]);
        if (userLogeed.rows.length === 0) {
            return res.status(401).send({ message: "Usuário não autorizado." });
        };

        // verificando de o id existe
        // pegando a url peli id indicado
        const users = await db.query('SELECT * FROM users WHERE id = $1;', [id]);

        // verificando se a userslogged é valida
        if (users.rows.length === 0) {
            return res.status(404).send("Url não existe");
        };

        // pegando o usuario que é o mesmo que o usuario logado usando o email como parametro
        const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [userLogeed.rows[0].email]);

        // verificando se a pessoa que quer apagar é a dona do link
        const shortUrl = await db.query(`SELECT * FROM shortuser WHERE "userId" = $1 AND "shortId" = $2;`, [user.rows[0].id, id]);

        // se não for
        if (shortUrl.rows.length === 0) {
            return res.status(401).send(" Não há autorização para deletar");
        }

        // fazendo a requisição para deletar a urls 
        await db.query(`DELETE FROM shortuser WHERE "shortId" = $1;`, [id]);
        await db.query(`DELETE FROM urls WHERE id = $1;`, [id]);

        // se tudo der certo
        res.sendStatus(204);

    } catch (erro) {
        res.status(500).send(erro.message);
    };
}
