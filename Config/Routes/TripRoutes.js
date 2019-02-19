const bcrypt = require('bcryptjs');
const db = require('../dbConfig');
const Joi = require('joi');
const validation = require('../../Helpers/joi-validations');

module.exports = server =>{
server.get('/trips/:id', getAllById);
}
// newTrip = (req, res) =>{
//     const trip = req.body;
//     const tripValidation = Joi.validate(trip, validation.)
// }


getAllById = (req, res) =>{
    const { id } = req.params;
    db('trips').where('user_id', id).then(row=>{
      res.json(rows);  
    }).catch(err =>{
        res.status(500).send(err)
    })
}