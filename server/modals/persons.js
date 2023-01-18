
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Persons = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    gmail: {
        type: String
    }
}, {
    collection: 'persons'
});

module.exports = mongoose.model('Persons', Persons);