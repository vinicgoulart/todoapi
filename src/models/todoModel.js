const mongoose = require('mongoose');

const todoModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    endDate: {
        type: Date,
        min: Date.now()
    },
    type: {
        type: String,
    },
    idUser: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('todo', todoModel);
