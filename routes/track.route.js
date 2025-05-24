const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createTrack,
  getTracksByAddedBy,
  updateTrackByUser,
  deleteTrackByUser
} = require('../controller/track.controller');

router.post('/', protect, createTrack);
router.get('/user', protect, getTracksByAddedBy);
router.put('/:id', protect, updateTrackByUser);
router.delete('/:id', protect, deleteTrackByUser);

module.exports = router;
