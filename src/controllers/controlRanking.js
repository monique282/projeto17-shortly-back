// esse arquivo aqui serve para executar todas as funções que eu preciso
// esse arquivo é chamado la em Routes

import { getRequisitionRanking } from "../repository/repositoryRanking.js";

// essa função aqui serve pra pegar mostrar o rank os 10 mais acessados
export async function rankingGet(req, res) {

    try {
        
        // pegando os dados do usuário e suas urls somando o total de visitas e juntando tudo
        const ranking = await getRequisitionRanking();

        // retornar os dados do usuário no formato especificado
        return res.status(200).send(ranking.rows);

    } catch (error) {
        res.status(500).send(error.message);
    };
};



