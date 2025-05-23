const express = require('express');
const router = express.Router();
const trackController = require('../controller/track.controller');

router.post('/tracks', trackController.createTrack);

// Custom routes by addedBy
router.get('/tracks/user/:addedBy', trackController.getTracksByAddedBy);
router.put('/tracks/user/:addedBy/:id', trackController.updateTrackByUser);
router.delete('/tracks/user/:addedBy/:id', trackController.deleteTrackByUser);

module.exports = router;
