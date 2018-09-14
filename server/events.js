const events = require('events');
const eventEmitter = new events.EventEmitter();

eventEmitter.on('triggered', () => {
    console.log('I am so triggered!');
});

module.exports = eventEmitter;