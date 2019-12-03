const express = require('express');   /*** getting the express*/
const { Pool, Client } = require('pg'); /*** getting the posgresql*/
const app = express(); /*** creating a express app*/
var bodyParser = require('body-parser');
var xoauth2 = require('xoauth2');
var mailer = require("nodemailer");
// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport({
    service: "Gmail",
    secure: false,
    requireTLS: true,
    port: 587,
    auth: {
        type: "login",
        user: "gploswal@gmail.com",
        pass: "moonwalk"
    }
});
var mail = {
    from: "Gopal Oswal <gploswal@gmail.com>",
    to: "yashirathore11@gmail.com",
    subject: "Confirmation mail",
    text: "sent via node api",
    html: "<b>Sent via nodejs api</b>"
};
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
 * function to add the admin
 */

app.get('/addAdmin', (req,res) => {
    pool.query('SELECT * from addadmin()', (err2, res2) => {
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + response.message);
            }
            smtpTransport.close();
        });
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
app.get('/getData/accesscode=:access_code', (req,res) => {
    pool.query('select * from get_data($1)',[req.params.access_code], (err2,res2) => {
        console.log('error', err2);
        console.log('res2', res2);
        res.send({
            response : res2.rows,
            status: 200,
            message: 'Success'
        })
    })
});

/**
 * function to check that access_code exist  or not
 */
app.post('/check_access_code', (req,res) => {
    pool.query('select * from check_access_code($1)', [req.body.access_code], (err2, res2) => {
        if (err2) {
            res.send({
                response : err2,
                status: 500,
                message: 'Error'
            });
        } else {
            res.send({
                response : res2.rows,
                status: 200,
                message: 'Success'
            });
        }
    })
});

/**
 * function to add the data
 */
app.post('/add_data', (req,res) => {
    pool.query('select * from add_data($1, $2)', [req.body.access_code, req.body.data], (err2, res2) => {
        // console.log('error', err2);
        // console.log('res2', res2);
        if (err2) {
            res.send({
                response : err2,
                status: 500,
                message: 'Error'
            });
        } else {
            res.send({
                response : res2.rows,
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
