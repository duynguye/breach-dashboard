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

const PODS = [{
    pod: 1,
    stations: ['KBAK', 'KBFX', 'KBOI', 'KYUU', 'KCBY', 'KMCW', 'KMTR', 'KPIC', 'KTCW', 'KVAL', 'KFRE', 'KMPH', 'KTVL', 'KATU', 'KUNP', 'KMYU', 'KUTV', 'KENV', 'KOMO', 'KUNS', 'KOMO-AM', 'KPLZ-FM', 'WCHS',
                'WVAH', 'WKRC', 'WSTR', 'EKRC', 'WSYX', 'WTTE', 'WWHO', 'MTVD', 'WKEF', 'WRGT', 'WBSF', 'WEYI', 'WSMH', 'WWMT', 'WLUK', 'WCWF', 'WSBT', 'WTOV', 'WGTQ', 'WGTU', 'WPBN', 'WTOM']
}, {
    pod: 2,
    stations: ['WNYO', 'WUTV', 'KBSI', 'WDKA', 'KRCG', 'WMYV', 'WXLV', 'WTVZ', 'WPGH', 'WPMY', 'WPNT', 'WLFL', 'WRDC', 'WRLH', 'KDNL', 'WNWO', 'WOLF', 'WQMY', 'WSWB', 'WCWN', 'WRGB', 'KFXA', 'KGAN', 'WCCU',
                'WICD', 'WBUI', 'KDSM', 'KLEW', 'KFXL', 'KHGI', 'WMSN', 'EVTV', 'WVTV', 'WUCW', 'KPTM', 'KXVO', 'KTVO', 'KHQA', 'KMEG', 'KPTH', 'WICS', 'WRSP', 'KSAS', 'KMTW', 'KIMA', 'KORX', 'KUNW', 'KVVK',
                'KEPR']
}, {
    pod: 3,
    stations: ['WBFF', 'EBFF', 'WNUV', 'WUTB', 'WHP', 'WLYH', 'WJAC', 'WGME', 'WPFO', 'WJAR', 'WSET', 'EHAM', 'WHAM', 'WUHF', 'WSTM', 'WSTQ', 'WTVH', 'WJLA', 'WTVC', 'ETVC', 'KSNV', 'KVCW', 'KVMY', 'NSNV',
                'WNAB', 'WUXP', 'WZTV', 'KAME', 'KRNV', 'KRXI', 'KTVM', 'KDBZ-CD', 'KCVU', 'KRCR', 'KRVU-LD', 'KUCO-LP', 'KKTF-LD', 'KAEF', 'KBVU', 'KECA-LD', 'KEUV-LP', 'WCTI', 'WYDO', 'KCFW', 'KECI', 'KTXE',
                'WCYB', 'WEMT']
}, {
    pod: 4,
    stations: ['KVIH', 'KVII', 'KVI-AM', 'KEYE', 'NEYE', 'KBTV', 'KWBB', 'KFDM', 'KFOX', 'KDBC', 'KGBT', 'WDKY', 'KATV', 'KOCB', 'KOKH', 'KABB', 'KMYS', 'WOAI', 'KTUL', 'KSCC (KUQI)', 'KTES-LD', 'KTXS', 'KTXE-LD',
                'WFXL', 'WABM', 'WBMA', 'WCFT', 'WDBB', 'WJSU', 'WTTO', 'WCIV', 'WMMP', 'WTAT', 'ECIV', 'WACH', 'WGFL', 'WMYG-LP', 'WNBW', 'WMYA', 'WLOS', 'WGXA', 'WEAR', 'WFGX', 'WJTC', 'WPMI', 'WPDE', 'WTGS', 'WTFL',
                'WTHL', 'WTWC', 'ETWC', 'WTLH', 'WPEC', 'WTCN', 'WTVX', 'WWHB']
}, {
    pod: 6,
    stations: ['Waypoint - Hattiesburg', 'Waypoint - Jackson', 'Waypoint - Jonesboro', 'Waypoint - Lafayette', 'Waypoint - Meridian']
}];

async function initializeJIRARequest () {
    await Promise.all([
        getBreaches('Email Marketing', EMM_REQUESTS),
    ]).then((response) => {
        response.map((data) => {
            const type = data.type;

            let filtered = data.content.filter((issue) => {
                return issue.fields.customfield_12306.ongoingCycle || issue.fields.customfield_12108.ongoingCycle;
            });
            
            let results = filtered.map((issue) => {
                let key = issue.key.replace(/SRP-/g, '');
                let title = issue.fields.summary;
                let url = `https://jira.sinclairstoryline.com:8443/browse/SRP-${key}`;
                let station = issue.fields.customfield_11922.value;
                let pod = PODS.filter((pod) => {
                    return pod.stations.includes(station);
                }); //pod[0].pod
                let status = '';
                let isBreached = false;
                let remaining = 0;
                
                // Check if SLA Content Review is running
                if (issue.fields.customfield_12108.ongoingCycle) {
                    isBreached = issue.fields.customfield_12108.ongoingCycle.breached;
                    remaining = issue.fields.customfield_12108.ongoingCycle.remainingTime.millis;
                }

                // Check if SLA SRP to Respond is running
                if (issue.fields.customfield_12102.ongoingCycle && type !== 'Email Marketing') {
                    // Ignore SLA SRP to Respond for Email Marketing
                }

                // Check if SLA Production is running
                if (issue.fields.customfield_12306.ongoingCycle) {
                    isBreached = issue.fields.customfield_12306.ongoingCycle.breached;
                    remaining = issue.fields.customfield_12306.ongoingCycle.remainingTime.millis;
                }

                // Create the Object
                return {
                    key,
                    title,
                    url,
                    station,
                    pod: pod[0].pod,
                    isBreached,
                    remaining
                };
            });

            results.map((result) => {
                console.log(result);
            });
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

        }).catch(error => reject(error));
    });
}

module.exports = {
    initializeJIRARequest
};
