// Setup Credentials
const _ = require('lodash');
const fs = require('fs');
// const private_key = fs.readFileSync('./server/certificates/localhost.key', 'utf8');
// const certificate = fs.readFileSync('./server/certificates/localhost.crt', 'utf8');
// const credentials = { key: private_key, cert: certificate };

// Setup the WebSocket Server
const app = require('./server');
const WebSocket = require('ws');
const WSServer = require('ws').Server;
const server = require('http').createServer(app);

const wss = new WSServer({ server });

// Database Specific
require('./models/issues');
require('./database');

const mongoose = require('mongoose');
const Issue = mongoose.model('issues');

// Get the JIRA request function
const initializeJIRARequest = require('./jira').initializeJIRARequest;

// Request the initial set of data from JIRA.
console.log('Initializing First JIRA Request');
initializeJIRARequest().then((results) => {
    console.log(results);
});

// Global and Useful parameters
const __PING__ = 0x9;
const __PONG__ = 0xA;
const __AUTH__ = 0x1b;
const __LOGIN__ = 0x1c;
const __SUCCESS__ = 0x1d;
const __FAILED__ = 0x1e;
const __UPDATE__ = 0x1f;

function noop () {}

// Collection of Clients
let clients = [];

// Handle Connection
wss.on('connection', connection);

// Start Server
server.listen(process.env.PORT || 8443, function () {
    console.log(`Server started on port: ${process.env.PORT || 8443}`);
})

// On Connect
function connection (ws) {
    // Request Client Information
    console.log('New Connection detected...');
    console.log('Sending: __AUTH__');
    
    let payload = {
        type: __AUTH__
    };

    ws.send(JSON.stringify(payload));

    // Handle Incoming Messages
    ws.on('message', function incoming (message) {
        let data;
    
        try {
            data = JSON.parse(message);
            
            if (data.type) {
                if (data.type === __PING__) {
                    console.log('A client has pinged the server. Responding...');
        
                    let payload = { type: __PONG__ };
        
                    ws.send(JSON.stringify(payload), (error) => {
                        if (error === undefined) {
                            console.log('Response successfully sent.');
                        }
                    });
                }

                if (data.type === __LOGIN__) {
                    console.log('A client has sent credentials. Authenticating...');
                    console.log('Client Location: ' + data.location);
                    console.log('Sending: __SUCCESS__');
                    ws.send(JSON.stringify({ type: __SUCCESS__ }));

                    if (!_.find(clients, { id: data.location })) {
                        clients.push({
                            handle: ws,
                            id: data.location,
                            types: ['Email Marketing'],
                            active: true
                        });
                    }
                }
            }
        } catch (e) {
            console.error('Error occured, not a valid JSON data.');
        }
    });
}

async function pushContent () {
    await initializeJIRARequest().then((response) => {
        clients.map(async (client) => {
            const { id, handle, types, active } = client;
            console.log('Pushing to client: ' + id);

            if (client.active && client.handle.readyState === WebSocket.OPEN) {
                let data = types.map(async (type) => {
                    let result =  await Issue.find({ type }).then((response) => {
                        return response;
                    });

                    return result;
                });

                Promise.all(data).then((results) => {
                    client.handle.send(JSON.stringify({
                        type: __UPDATE__,
                        payload: results
                    }));
                });
            }
        });
    });
};

setInterval(() => {
    wss.clients.forEach((client) => {
        client.send(JSON.stringify({
            date: new Date().toTimeString()
        }));
    });
}, 1000);

setInterval(pushContent, 60000);
