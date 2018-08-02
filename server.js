const path = require('path');
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

app.get('/dashboards', (req, res, next) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(process.env.PORT || 8000);