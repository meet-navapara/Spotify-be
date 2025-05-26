const Track = require('../model/track.model');

exports.createTrack = async (req, res) => {
  try {
    const addedBy = req.user.email;
    const exists = await Track.findOne({ name: req.body.name, addedBy });
    if (exists) {
      return res.status(400).json({ message: 'Track already added' });
    }

    const track = new Track({ name: req.body, addedBy });
    const saved = await track.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTracksByAddedBy = async (req, res) => {
  try {
    const tracks = await Track.find({ addedBy: req.user.email });
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTrackByUser = async (req, res) => {
  try {
    const updated = await Track.findOneAndUpdate(
      { _id: req.params.id, addedBy: req.user.email },
      { name: req.body.name },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Track not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTrackByUser = async (req, res) => {
  try {
    const deleted = await Track.findOneAndDelete({
      _id: req.params.id,
      addedBy: req.user.email
    });
    if (!deleted) return res.status(404).json({ message: 'Track not found' });
    res.json({ message: 'Track deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
