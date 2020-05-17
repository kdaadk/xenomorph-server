const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Activity = new Schema(
    {
        _id: String,
        stravaActivityId: { type: Number, required: true },
        userId: { type: String, required: true },
        type: { type: String, required: true },
        startDate: { type: Date, required: true },
        distance: { type: Number, required: true },
        time: { type: Number, required: true },
        VDOT: {type: Number, required: true},
        score: { type: Number },
        comment: { type: String }, 
        satisfaction: {type: Number},
        startPoint: { type: [Number] },
        mapPolyline: { type: String }
    },
    { timestamps: true },
);

module.exports = mongoose.model('activities', Activity);