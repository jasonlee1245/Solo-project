const express = require('express');
const db = require('../controllers/queries');
const router = express.Router();

router.get('/', db.getApps, function(req,res) {
    res.status(200).json(res.body);
})
  
router.post('/', db.newApp, function(req, res) {
  res.sendStatus(200);
})
  
router.patch('/', db.updateApp, function(req, res) {
  res.sendStatus(200);
})
  
router.delete('/:_id', db.deleteApp, function(req, res) {
  res.sendStatus(200);
})

module.exports = router;
