$(function() {


var loadJobs = function() {
  $.ajax({
    url: '/api/v1/jobs',
    method: 'GET',
    data: {},
    dataType: "json"
  })
  .done(function(data){
    console.log(data);
    displayJobs(data);
  })
  .fail(function(jqXHR, textStatus, errorThrown){
    console.log("Request failed: ", textStatus);
  })
  .always(function(){
    console.log("Request completed");
  })
}

var displayJobs = function(jobs){
  if(!jobs) {
    console.log("no jobs to output")
  }
  $('#job-board').empty();

  for (var i=0; i<jobs.length; i++) {
    var job = jobs[i];
    $('#job-board').append(`<ul><li><h3><a href="{$job.hyperlink}">${job.title}</a> at ${job.employer}</h3><p> ${job.description}</p><button type="button" class="btn btn-danger" data-job-id="${job._id}">Remove Job</button></li></ul>`)
  }
}


// CREATE NEW JOB POST //

$('.btn-submit').click(function(){
  var title = $('#title').val();
  var employer = $('#employer').val();
  var hyperlink = $('#hyperlink').val();
  var description = $('#description').val();

  $.ajax({
    url: '/api/v1/jobs',
    method: 'POST',
    data: {
      title: title,
      employer: employer,
      hyperlink: hyperlink,
      description: description
    }
  })
  .done(function(data){
    console.log("created:", data)
    $('#myModal').modal('hide');


    $('#job-board').append(`<ul><li><h3><a href="{$data.hyperlink}">${data.title}</a> at ${data.employer}</h3><p> ${data.description}</p><button type="button" class="btn btn-danger" data-job-id="${data._id}">Remove Job</button></li></ul>`)
  })
  .fail(function(jqXHR, textStatus, errorThrown){
    console.log("Post failed: ", textStatus);
  })
  .always(function(){
    console.log("Post completed");
  })
})


// DELETE JOB POST //

var deleteJob = function(jobId) {
  $.ajax({
    method: 'DELETE',
    url: '/api/v1/jobs/' + jobId,
    data: {}
  })
  .done(function(data){
    console.log("Job deleted:", data);
  })
  .fail(function(jqXHR, textStatus, errorThrown){
    console.log("Delete failed" + textStatus);
  })
  .always(function(){
    console.log("Delete completed");
  })
}

$('#job-board').on('click', '.btn-danger', function(){
  var thinkTwice = confirm("Are you you want to delete this job?");
  if (thinkTwice) {
    var jobId = $(this).data('job-id');
    $(this).parent().remove();
    deleteJob(jobId);
  }
})








loadJobs();
});
