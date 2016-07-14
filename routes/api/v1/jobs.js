var express = require('express');
var router = express.Router();
var Job = require('../../../models/job');

router.get('/', function(req, res, next) {
  var searchParams = {};
  if (req.query.searchTitle) {
    searchParams.title = new RegExp(req.query.searchTitle, "i")
  }
  else if (req.query.searchEmployer) {
    searchParams.employer = new RegExp(req.query.searchEmployer, "i")
  }
  // Query the Job model for all jobs
  Job.find({}, function(err, jobs) {
    // Render the jobs in JSON format
    res.status(200).json(jobs);
  });
});

/* GET /api/v1/concerts/:id */
router.get('/:id', function(req, res, next) {
  Job.findById(req.params.id, function(err, job) {
    res.status(200).json(job);
  });
});

/* POST /api/v1/concerts */
router.post('/', function(req, res, next) {
  Job.create({
    title: req.body.title,
    employer: req.body.employer,
    hyperlink: req.body.hyperlink,
    description: req.body.description
  }, function(err, job) {
    res.status(200).json(job);
  });
});

/* PUT /api/v1/concerts/:id */
router.put('/:id', function(req, res, next) {
  Job.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    function(err, job) {
      res.status(200).json(job);
  });
});

/* DELETE /api/v1/concerts/:id */
router.delete('/:id', function(req, res, next) {
  Job.findByIdAndRemove(req.params.id, function(err, job) {
    res.status(200).json(job);
  });
});

module.exports = router;
