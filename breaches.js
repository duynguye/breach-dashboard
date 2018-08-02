const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log(req.body);

    res.send('Hello!');
});

app.get('/status', (req, res) => {
    res.sendStatus(200);
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

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "text": payload.original_message.text,
            "attachments": [{
                "color": "#00FF00",
                "text": `<@${payload.user.id}> is handling this breach.`
            }]
        }));
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`App running on port ${process.env.PORT || 3000}!`);
});