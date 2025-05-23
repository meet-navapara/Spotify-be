const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
    name: String,
    duration_ms: Number,
    popularity: Number,
    isrc: String,
    spotify_url: String,
    addedBy: String, 
    artists: [{
        name: String,
        spotify_url: String
    }],
    album: {
        name: String,
        release_date: String,
        images: [{
            height: Number,
            width: Number,
            url: String
        }]
    }
});

module.exports = mongoose.model('Track', TrackSchema);
