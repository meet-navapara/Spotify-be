const Track = require('../model/track.model');

// CREATE
exports.createTrack = async (req, res) => {
    try {
        const isTrackisAdded = await Track.findOne({name:req.body.name,addedBy:req.body.addedBy });
        if(isTrackisAdded)
        {
          return  res.status(400).json({error:true,message:"Already added in Playlist"})
        }
        else {
            const track = new Track(req.body);
            const savedTrack = await track.save();
            res.status(201).json(savedTrack);
        }
      
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET TRACKS BY addedBy
exports.getTracksByAddedBy = async (req, res) => {
    try {
        const { addedBy } = req.params;
        const tracks = await Track.find({ addedBy });
        res.json(tracks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE TRACK BY addedBy + ID
exports.updateTrackByUser = async (req, res) => {
    try {
        const { id, addedBy } = req.params;
        const updatedTrack = await Track.findOneAndUpdate({ _id: id, addedBy }, {name:req.body.name}, { new: true });
        if (!updatedTrack) return res.status(404).json({ message: 'Track not found or unauthorized' });
        res.json(updatedTrack);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE TRACK BY addedBy + ID
exports.deleteTrackByUser = async (req, res) => {
    try {
        const { id, addedBy } = req.params;
        const deletedTrack = await Track.findOneAndDelete({ _id: id, addedBy });
        if (!deletedTrack) return res.status(404).json({ message: 'Track not found or unauthorized' });
        res.json({ message: 'Track deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
