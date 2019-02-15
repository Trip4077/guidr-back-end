const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_KEY || 'Add the JWT_KEY to your .env file.';

module.exports = {
    authenticate
};

function authenticate(req, res, next){
    const token = req.get('Authorization');

    if(token) {
        jwt.verify(token, jwtKey, (err, decoded) =>{
            if(err)return res.status(402).json(err);
            req.decoded = decoded; 
            next();
        })
    }else{
        return res.status(401).json({error: 'No token Provided, Must be set on the Authorization Header'});
    }
}