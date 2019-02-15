module.exports = server =>{
    server.post('/registration', register);
    server.post('/user/login', login);
}
