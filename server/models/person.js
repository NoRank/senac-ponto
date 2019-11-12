const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: String,
    age: Number,
    checkin: String,
    checkout: String
});

module.exports = mongoose.model('Person', personSchema);
