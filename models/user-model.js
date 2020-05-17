const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        _id: String,
        stravaUserId: { type: Number, required: true },
        login: String,
        firstName: String,
        lastName: String,
        height: Number,
        weight: { type: [
            {
                date: Date,
                value: Number
            }]
        },
        VDOT: { type: [
            {
                date: Date,
                value: Number
            }]
            },
    },
    { timestamps: true },
);

module.exports = mongoose.model('users', User);