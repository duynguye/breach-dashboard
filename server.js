const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const http = require('http').Server(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({
    port: 5000
});

wss.on('connection', function connection (ws, req) {
    console.log('A Client has Connected');
    let text = 'Hello from the Server';

    ws.on('message', function incoming (message) {
        console.log('Recieved: %s', message);
    });

    ws.send(text, (error) => {
       if (error === undefined) {
           console.log('Message successfully sent');
       }
    });

    this.isAlive = true;

    ws.on('pong', () => {
        this.isAlive = true;
        console.log('Pong');
    });

    // setInterval(() => {
    //     if (this.isAlive === false) {
    //         return ws.terminate();
    //     }

    //     this.isAlive = false;
    //     ws.ping(() => {});
    // }, 1000);

    ws.on('close', () => {
        console.log('Client closed');
    });
});

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/dashboards', (req, res, next) => {
    res.sendFile(__dirname + '/dist/index.html');
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

        if (payload.user.id === 'U9A21T555') {
            text = `Digital Diva is handling this breach.`;
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "text": payload.original_message.text,
            "attachments": [{
                "color": "#00FF00",
                "text": text,
                "image_url": "https://media.giphy.com/media/CpxCYD0Or2Ty8/giphy.gif"
            }]
        }));
    }
});

app.listen(process.env.PORT || 8000, () => {
    console.log(`App running on port ${process.env.PORT || 3000}!`);
});