const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('dist'));
app.use('/images', express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendStatus(200);
});

app.get('/dashboards/:id', (req, res, next) => {
    res.sendFile(path.resolve('dist/index.html'));
});

app.post('/slack', (req, res, next) => {
    let command = null;

    if (command = req.body.command) {
        if (command === '') {
            
        }
    }
});

module.exports = app;