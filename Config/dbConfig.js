// const knex = require('knex');

// const knexConfig = require('../knexfile');
// const dbEnv = process.env.TESTING_DB || 'development';

// module.exports = knex(knexConfig[dbEnv]);



//comment out for testing and uncomment above
const dbEngine = process.env.DB || 'development';
const config = require('../knexfile')[dbEngine];

module.exports = require('knex')(config);