const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const http = require('http');
const https = require('https');
const WebSocket = require('ws');

app.use(express.static('dist'));
app.use('/images', express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/dashboards/:id', (req, res, next) => {
    res.sendFile(__dirname + '../dist/index.html');
});

app.post('/', (req, res) => {
    console.log(req.headers);
    console.log(req.body);

    if (req.body.command === '/breaches') {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "text": "Here is a list of the current breaches.",
            "attachments": [{
                "color": "#f84c00",
                "text": "<https://jira.sinclairstoryline.com:8443/browse/SRP-43780|SRP-43780 Coalition of Inginition Interlock Manufacturers with SEO>"
            }, {
                "color": "#f84c00",
                "text": "<https://jira.sinclairstoryline.com:8443/browse/SRP-28840|SRP-28840 New West Distributing - Custom>"
            }, {
                "color": "#f84c00",
                "text": "<https://jira.sinclairstoryline.com:8443/browse/SRP-20371|SRP-20371 [P4] Pool Cover Solutions>"
            }, {
                "color": "#f84c00",
                "text": "<https://jira.sinclairstoryline.com:8443/browse/SRP-55031|SRP-55031 CompulseOTT>"
            }]
        }));
    } else {
        let payload = JSON.parse(req.body.payload);
        let text = `<@${payload.user.id}> is handling this breach.`;

        res.setHeader('Content-Type', 'application/json');

        if (payload.user.id === 'U9A21T555') {
            text = `Digital Diva is handling this breach.`;
            res.send(JSON.stringify({
                "text": payload.original_message.text,
                "attachments": [{
                    "color": "#00FF00",
                    "text": text,
                    "image_url": "https://media.giphy.com/media/CpxCYD0Or2Ty8/giphy.gif"
                }]
            }));
        } else {
            res.send(JSON.stringify({
                "text": payload.original_message.text,
                "attachments": [{
                    "color": "#00FF00",
                    "text": text,
                }]
            }));
        }
    }
});

