const mongoose = require('mongoose');
const { Schema } = mongoose;

const issuesSchema = new Schema({
    srp: Number,
    type: String,
    title: String,
    url: String,
    station: String,
    pod: Number,
    isBreached: Boolean,
    remaining: Number,
    isPaused: Boolean,
    handler: String
});

mongoose.model('issues', issuesSchema);
