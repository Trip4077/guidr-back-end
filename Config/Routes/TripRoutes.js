const bcrypt = require('bcryptjs');
const db = require('../dbConfig');
const Joi = require('joi');
const validation = require('../../Helpers/joi-validations');

module.exports = server =>{
server.post('/trips', newTrip)
server.get('/trips/:username', getAllByUser);
server.get('/trips', getAllTrips);
server.post('/trips/:id', updateTrip);
server.delete('/trips/:id', deleteTrip);
}

newTrip = (req, res) =>{
    const trip = req.body;
    const validateTripObject = Joi.validate(trip, validation.tripInput);

    if(validateTripObject.error){
      res.status(406).json(validateTripObject.error);
    }else{
      db('trips').insert(trip).then(id=>{
        res.status(201).json({message: "trip added"})
      }).catch(err=>{
        res.status(500).send(err);
      })
    }
}


getAllByUser = (req, res) =>{
    const { username } = req.params;
    db('trips').where('username', username).then(row=>{
      res.json(row);  
    }).catch(err =>{
        res.status(500).send(err)
    })
}

getAllTrips = (req, res) =>{
  db('trips').then(users=>{
    res.json(users);
  }).catch(err=>{
    res.status(500).json({message: 'internal server error'})
  })
}

updateTrip = (req, res) =>{
  const { id } = req.params; 
  const trip = req.body;
  db('trips').where('id', id).update(trip).then(number=>{
    res.status(202).json(number);
  }).catch(err=>{
    res.status(500).send('internal server error')
  })
}
deleteTrip = (req, res) =>{
  const { id } = req.params;
  db('trips').where('id', id).del().then(number=>{
    if(number){
        res.json(number);
    }else{
      res.status(404).json({message: 'Trip not found'});
    }
  }).catch(err=>{
    res.status(500).send(err)
  })
}