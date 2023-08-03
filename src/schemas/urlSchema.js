import joi from "joi";

// validação da url grande que o usuario manda
export const urlSentByUser = joi.object({
    
    url : joi.string().uri().required()
});