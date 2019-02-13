const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');

const db = require('../Config/dbConfig');

const server = express();

server.use(
    express.json(),
    logger('dev'),
    cors(),
    helmet()
);

module.exports = server;

