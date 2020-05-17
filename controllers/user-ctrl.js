const User = require('../models/user-model');

updateUser = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const user = new User(body);

    if (!user) {
        return res.status(400).json({ success: false, error: "invalid schema" })
    }

    User.updateOne({_id: user._id}, user, {upsert: true})
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User updated!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not updated!',
            })
        })
};

getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, stream) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: stream })
    }).catch(err => console.log(err))
}

module.exports = {
    updateUser,
    getUserById
};
