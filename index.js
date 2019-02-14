require('dotenv').config();

const server = require('./Api/server');
const Port = process.env.PORT || 3500;

server.listen(Port, ()=>{
    console.log(`Port trucking on ${Port}`)
})