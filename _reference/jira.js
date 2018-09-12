const response = {
    issues: [{
        // Issue Name
        key: 'SRP-12345',
        fields: {
            
            // Station Call Letters
            customfield_11922: {
                value: 'WEAR'
            },

            // Current Status
            status: {
                name: 'Test Review',
                statusCategory: {
                    key: 'indeterminate',
                    colorName: 'yellow',
                    name: 'In Progress'
                }
            },

            // SLA SRP to Respond Information
            customfield_12102: {
                name: 'SLA SRP to Respond',
                ongoingCycle: { // completedCycles Also
                    remainingTime: {
                        millis: -12226565,
                        friendly: '-1h 22m'
                    },
                    startTime: {
                        iso8601: "2018-08-20T11:47:34-0700",
                        jira: "2018-08-20T11:47:34.578-0700",
                        friendly: "Yesterday 11:47 AM",
                        epochMillis: 1534790854578
                    },
                    breachTime: {
                        iso8601: "2018-08-21T11:47:34-0700",
                        jira: "2018-08-21T11:47:34.578-0700",
                        friendly: "Today 11:47 AM",
                        epochMillis: 1534877254578
                    },
                    breached: true,
                    paused: false,
                }
            },

            // SLA Production
            customfield_12306: {
                // Same as previous
            }
        }
    }]
}