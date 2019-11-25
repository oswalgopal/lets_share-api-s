const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send({
        status: 200,
        message: 'server is running',
        response: 'Success'
    })
});
app.listen(5000, () => {
    console.log('server is running');
});
