// Setup Environment
require('dotenv').config();

// Import Statements
const axios = require('axios');

// Authentication
const USERNAME = process.env.JIRA_USERNAME;
const PASSWORD = process.env.JIRA_PASSWORD;
const token = USERNAME + ':' + PASSWORD;
const hash = Buffer.from(token).toString('base64');
const auth = 'Basic ' + hash;

// JIRA Related
const JIRA_URL = 'https://jira.sinclairstoryline.com:8443/rest/api/latest/search';
const EMM_REQUESTS = "issuetype = 'Email Marketing' AND status != 'Closed' AND ('SLA Content Review' <= remaining(4h) OR 'SLA Production' <= remaining(8h) OR 'SLA SRP to Respond' <= remaining(2h))";

async function initializeJIRARequest () {
    await Promise.all([
        getBreaches('Email Marketing', EMM_REQUESTS),
        getBreaches('Marketing Marketing', EMM_REQUESTS)
    ]).then((response) => {
        response.map((data) => {
            console.log(data.type);
        });
    });
}

function getBreaches (type, jql) {
    return new Promise((resolve, reject) => {
        let data = {
            jql: jql
        };

        axios.post(JIRA_URL, data, {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': auth,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            let results = {
                type: type,
                total: response.data.total,
                content: response.data.issues
            };

            resolve(results);
        });
    });
}

module.exports = {
    initializeJIRARequest
};
