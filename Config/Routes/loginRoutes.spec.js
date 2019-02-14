const request = require('supertest');
const server = require('../../Api/server');
const db = require('../dbConfig');

describe('tests for login routes', ()=>{
    describe('register', ()=>{
        afterEach(async ()=>{
            await db('users').truncate();
        });
    })
})