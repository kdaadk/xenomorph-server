const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Stream = new Schema({
        _id: Number,
        streams: {type: []}
})

module.exports = mongoose.model('streams', Stream);