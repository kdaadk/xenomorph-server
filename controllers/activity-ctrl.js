const Activity = require('../models/activity-model');

createActivity = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a activity',
        })
    }

    const activity = new Activity(body);

    if (!activity) {
        return res.status(400).json({ success: false, error: err })
    }

    Activity.updateOne({_id: activity._id}, activity, {upsert: true})
        .then(() => {
            return res.status(201).json({
                success: true,
                id: activity._id,
                message: 'Activity created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Activity not created!',
            })
        })
};

createActivities = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a activity',
        })
    }

    const activities = body.map(x => new Activity(x));

    if (!activities) {
        return res.status(400).json({ success: false, error: err })
    }

    Activity.insertMany(activities)
        .then(() => {
            return res.status(201).json({
                success: true,
                ids: activities.map(a => a._id),
                message: 'Activities created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Activities not created!',
            })
        });
};

getActivities = async (req, res) => {
    await Activity.find({}, (err, activities) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!activities.length) {
            return res
                .status(404)
                .json({ success: false, error: `Activity not found` })
        }
        return res.status(200).json({ success: true, data: activities })
    }).catch(err => console.log(err))
};

getLastActivity = async (req, res) => {
    await Activity.find().sort({ startDate: -1 }).limit(1).exec((err, activity) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!activity.length) {
            return res
                .status(404)
                .json({ success: false, error: `Activity not found` })
        }
        return res.status(200).json({ success: true, data: activity })
    })
};

deleteActivity = async (req, res) => {
    await Activity.findOneAndDelete({ _id: req.params.id }, (err, activity) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!activity) {
            return res
                .status(404)
                .json({ success: false, error: `Activity not found` })
        }

        return res.status(200).json({ success: true, data: activity })
    }).catch(err => console.log(err))
};

module.exports = {
    createActivity,
    createActivities,
    getActivities,
    getLastActivity,
    deleteActivity
};
