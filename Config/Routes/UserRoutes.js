const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../dbConfig');
const Joi = require('joi');
const validation = require('../../Helpers/joi-validations');

const {
    authenticate
} = require('../../Authentication/authenticate');

module.exports = server => {
    server.get('/users', allUsers);
    server.get('/users/:id', userById);
    server.put('/users/:id', editUser);
    server.delete('/users/:id', deleteUser);
}

allUsers = (req, res) => {
    db('users').then(users => {
        res.json(users)
    }).catch(err => {
        res.status(500).send(err)
    })
}

userById = (req, res) => {
    const {
        id
    } = req.params
    db('users').where('id', id).then(row => {
        !row[0] ? res.status(404).json({
            err: "user not Found"
        }) : res.json(row)
    }).catch(err => {
        res.status(500).send(err);
    })
}

editUser = (req, res) => {
    const user = req.body;
    const {
        id
    } = req.params;
    db('users').where('id', id).update(user).then(number => {
        res.json(number)
    }).catch(err =>{
        res.status(500).send(err);
    })
}

deleteUser=(req, res)=>{
    const { id } = req.params;
    db('users').where('id', id).del().then(number =>{
        res.json(number)
    })
}