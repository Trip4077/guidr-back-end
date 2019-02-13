const knex = require('knex');

const knexConfig = require('../knexfile');
const dbEnv = process.env.TESTING_DB || 'development';

module.exports = knex(knexConfig[dbEnv]);