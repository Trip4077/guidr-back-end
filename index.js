require('dotenv');

const server = require('./Api/server');
const PORT = process.env.PORT || 3500;

server.listen(PORT , ()=>{
    console.log(`server trucking on ${PORT}`)
})