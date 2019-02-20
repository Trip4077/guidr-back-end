const Joi = require('joi');

module.exports={
    userInput:{
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
        name: Joi.string().required()
    },
    tripInput:{
        username: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        type: Joi.string(),
        private: Joi.boolean().required(),
        duration: Joi.string().required(),
        date: Joi.string(),
        image: Joi.string()

    }
}