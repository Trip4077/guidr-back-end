const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../dbConfig');
const Joi = require('joi');
const validation = require('../../Helpers/joi-validations');

const { authenticate } = require('../../Authentication/authenticate');
const jwtKey = process.env.JWT_KEY || 'Need to add JWT_KEY to your .env File';

module.exports = server =>{
    server.post('/users/registration', register);
    server.post('/users/login', login);
}

createToken = (user) =>{
    const payload = {
        username: user.username,
        id: user.id
    };
    const options = {
        expiresIn: '30m',
        jwtid: toString(Date.now())
    };
    return jwt.sign(payload, jwtKey, options)
};

register=(req, res)=>{
    //user expects body to have username(unique), password(min 6 chars, required), name(required);
const user = req.body;
const validateUserObject = Joi.validate(user, validation.userInput);
//additional checks need to go here
if (validateUserObject.error){
     res.status(406).json({
         error:" Please make sure you have Your Name(first and last), Username(unique) & Password(min 6 chars)"
     });
    }else{
        const hash = bcrypt.hashSync(user.password);
        user.password = hash;
        db('users').insert(user).then( id=>{
            
        res.status(201).json({
            message: 'User has been added'
        })
    })
    .catch(err=>{
        res.status(500).send(err)
    })
    }
}

login = (req, res)=>{
    const credentials = req.body;
    db('users').where('username', credentials.username).first().then(user=>{
        if(user && bcrypt.compareSync(credentials.password, user.password)){
            const token = createToken(user);
            const id = user.id
            res.json({token, message: 'Theeeeee keeeeeeeeeeey', id})
        }else{
            res.status(402).json({
                message: "Get Bent! (you have no token)"
            })
        }
    }).catch(err =>{
        res.status(500).send(err)
    })
}
