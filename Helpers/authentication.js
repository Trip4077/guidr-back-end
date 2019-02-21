const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_KEY || 'add the jwt token key into your .env file';

module.exports = {
    authenticate,
}

function authenticate (req, res, next) {
    const token = req.get('Authorization');

    if (token) {
        jwt.verify(token, jwtKey, (err, decoded)=>{
            if(err) return res.status(401).json(err);
            req.decoded = decoded; 
            next();
        })
    }else{
        return res.status(401).json({error: "No token provided, must be set on Authorization Header"})
    }
};

