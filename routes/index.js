var express = require('express');
var router = express.Router();
var Job = require('../models/job');

/* GET home page. */
router.get('/', function(req, res, next) {
  Job.find({}, function(err, jobs) {
    res.render('index', { title: 'JobbedOut', jobs: jobs });
  });
});

module.exports = router;
