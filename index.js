const express = require('express');   /*** getting the express*/
const { Pool, Client } = require('pg'); /*** getting the posgresql*/
const app = express(); /*** creating a express app*/
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
/**
 *  connecting to the database
 */
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Lets_share',
    password: '1234',
    port: 3000,
});
/**
 * setting the port for the server
 */
port = 10000;

vaccess_code = '';

/**
 * function to check the server root path
 */
app.get('/', (req,res) => {
    res.send({
        response: 'server is running on port' + port,
        status: 200,
        message: 'Success'
    });
});

/**
 * function to get the data using access_code
 */

app.get('/Admin?access_code=' + vaccess_code, (req,res) => {
    pool.query('SELECT * from data where access_code = ' , vaccess_code , (err2, res2) => {
        res.send({
            response : res2.rows,
            status: 200,
            message: 'Success'
        });
    });
});

/**
 * function to add the admin
 */

app.get('/addAdmin', (req,res) => {
    pool.query('SELECT * from addadmin()', (err2, res2) => {
        res.send({
            response : res2.rows,
            status: 200,
            message: 'Success'
        });
    });
});

/**
 * function to get the data
 */
app.get('/getData', (req,res) => {
    pool.query(`select * from get_data(${req.body.access_code})`, (err2,res2) => {
        console.log('error', err2);
        console.log('res2', res2);
        res.send({
            response : res2,
            status: 200,
            message: 'Success'
        })
    })
});


/**
 * function to add the data
 */
app.post('/add_data', (req,res) => {
    // console.log(req.body);
    console.log(typeof (req.body.access_code));
    const query = `select * from add_data(${req.body.access_code}, \" ${req.body.data})`;
    pool.query(query, (err2, res2) => {
        console.log('error', err2);
        // console.log('res2', res2);
        if (err2) {
            res.send({
                response : err2,
                status: 500,
                message: 'Error'
            });
        } else {
            res.send({
                response : res2,
                status: 200,
                message: 'Success'
            });
        }
    })
});

/**
 * function to set the port of the server
 */
app.listen(port, () => {
    console.log('server is running on port' , port);
});
