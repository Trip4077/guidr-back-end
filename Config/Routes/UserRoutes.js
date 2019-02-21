const bcrypt = require('bcryptjs');
const db = require('../dbConfig');
const Joi = require('joi');
const validation = require('../../Helpers/joi-validations');
const upload = require('../../Helpers/file-uploader');
const { authenticate } = require('../../Helpers/authentication');

const singleUpload = upload.single('image');

module.exports = server => {
    server.get('/users', authenticate, allUsers);
    server.get('/users/:id', authenticate, userById);
    server.put('/users/:id', authenticate, editUser);
    server.delete('/users/:id', authenticate, deleteUser);
    //for cloud storage stretch
    server.post('/users/:id/image-upload', authenticate, addImage);
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
    //add validation
    db('users').where('id', id).update(user).then(number => {
        res.json(number)
    }).catch(err =>{
        res.status(500).send(err);
    })
}

deleteUser=(req, res)=>{
    const { id } = req.params;
    db('users').where('id', id).del().then(number =>{
        if(number){
            res.json(number)
        }else{
            res.status(404).json({message: 'User not found' })
        }
    }).catch(err=>{
        res.status(500).send("internal server error")
    })
}


// Need to figure out the upload to the DB as profileImage
addImage=(req, res)=>{
    singleUpload(req, res, err=>{
        if(err){
           return res.status(422).send({errors: [{title:'Image Upload Error', detail: err.message}]})
        }
        const image = req.file.location;
        console.log(image);
       return res.json({"profileImage": req.file.location});
       
    })
}