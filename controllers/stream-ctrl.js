const Stream = require('../models/stream-model');

updateStream = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a stream',
        })
    }

    const stream = new Stream(body);

    if (!stream) {
        return res.status(400).json({ success: false, error: err })
    }

    Stream.updateOne({_id: stream._id}, stream, {upsert: true})
        .then(() => {
            return res.status(201).json({
                success: true,
                id: stream._id,
                message: 'Stream updated!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Stream not updated!',
            })
        })
};

createStreams = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a stream',
        })
    }

    
    const streams = body.map(x => new Stream(x));

    if (!streams) {
        return res.status(400).json({ success: false, error: "invalid schema" })
    }

    Stream.insertMany(streams)
        .then(() => {
            return res.status(201).json({
                success: true,
                ids: streams.map(a => a._id),
                message: 'Streams created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Streams not created!',
            })
        });
};

getStreamById = async (req, res) => {
    await Stream.findOne({ _id: req.params.id }, (err, stream) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: stream })
    }).catch(err => console.log(err))
}

module.exports = {
    updateStream,
    createStreams,
    getStreamById
};
