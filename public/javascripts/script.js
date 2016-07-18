$(function() {

  var loadJobs = function (){
    $.ajax({
      url: '/api/v1/jobs/',
      method: 'GET',
      dataType: 'json',
      data: {},
    })
    .done(function(data) {
      console.log(data);
      displayJobs(data);
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  }

  var displayJobs = function (jobs){
    if(!jobs){
      console.log("no jobs to display");
    }
    $('#jobList').empty();
    for (var i = 0; i < jobs.length; i++){
      var job = jobs[i];
      $('#jobList').append(`<div class="job">
        <h3><a href="">${job.title}</a> at ${job.employer}</h3>
        <p>${job.description}</p>
        <button class="btn btn-danger" data-job-id="${job._id}">Remove Job</button>
        </div>`);
    }

  }
  $('#createJob').click(function() {
    var jobTitle = $('#jobTitle').val();
    var employer = $('#employer').val();
    var hyperlink = $('#hyperlink').val();
    var description = $('#description').val();
    $.ajax({
      url: '/api/v1/jobs/',
      method: 'POST',
      data: {
              jobTitle: jobTitle,
              employer: employer,
              hyperlink: hyperlink,
              description: description
            }
    })
    .done(function(data) {
      console.log("success");
      $('#myModal').modal('hide');
      addJob(data);
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

  });

  function addJob(data) {
    $('#jobList').append(`<div class="job">
        <h3><a href="">${data.title}</a> at ${data.employer}</h3>
        <p>${data.description}</p>
        <button class="btn btn-danger" data-job-id="${data._id}">Remove Job</button>
        </div>`);
  }

  var deleteJob = function(deleteJobId){
    $.ajax({
      url: '/api/v1/jobs/' + jobId,
      method: 'DELETE',
      data: {},
    })
    .done(function() {
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  }

  $('#jobList').on('click', '.btn-danger', function(){
    var youSure = confirm("Are you sure you want to delete this job?");
    if (youSure){
      var deleteJobId = $(this).data('job-id');
      $(this).parent().remove();
      deleteJob(deleteJobId);
    }
  });


  loadJobs();

});
