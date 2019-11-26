const express = require('express');
const { Pool, Client } = require('pg');
const app = express();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Lets_share',
    password: '1234',
    port: 3000,
});
port = 5000;

app.get('/', (req,res) => {
    res.send({
        response: 'server is running on port' + port,
        status: 200,
        message: 'Success'
    });
});

app.get('/addAdmin', (req,res) => {
    pool.query('SELECT * from addadmin()', (err2, res2) => {
        res.send({
            response : res2.rows,
            status: 200,
            message: 'Success'
        });
    });
});
app.listen(port, () => {
    console.log('server is running on port' , port);
});
