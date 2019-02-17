const Joi = require('joi');

module.exports={
    userInput:{
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
        name: Joi.string().required()
    },
    tripInput:{
        user_id: Joi.number().integer().required(),
        title: Joi.string().required(),
        tag: Joi.string(),
        private: Joi.boolean().required(),
        duration: Joi.number().required(),
        date: Joi.string(),
        image: Joi.string()

    }
}