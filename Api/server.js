const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');

const configureRoutes = require('../Config/Routes/LoginRoutes')

const server = express();

server.use(
    express.json(),
    logger('dev'),
    cors(),
    helmet()
);

configureRoutes(server);

server.get('/', (req, res) => {
    res
      .status(200)
      .json({
          api: "Welcome to the Guidr server"
      })
})

module.exports = server;

