$(function() {

  var loadJobs = function(){
    // request JSON and process it
    $.ajax({
      url: '/api/v1/jobs',
      method: 'GET',
      data: {},
      dataType: 'json'
    }).done(function(data){
      // display all our concerts
      displayJobs(data);
      console.log(data)
    }).fail(function(jqXHR, textStatus, errorThrown){
      console.log("Request Failed: ", textStatus)
    }).always(function(){
      console.log("Request completed")
    })
  }

  var displayJobs = function(jobs){
    if (!jobs){
      console.log("no jobs to output");
    }

    $('#jobs').empty();
    for (var i = 0; i < jobs.length; i++){
      var job = jobs[i];
      $('#jobs').append(`<div class="job"><h3><a href="${job.hyperlink}">${job.title}</a> at ${job.employer}</h3><p>${job.description}</p><button type="button" class="btn btn-danger" data-job-id="${job._id}">Remove Job</button></div>`)
    }
  };

  var deleteJob = function(deleteJobId){
    $.ajax({
      method: "DELETE",
      url: '/api/v1/jobs/' + deleteJobId,
      data: {}
    }).done(function(data) {
      console.log('deleted', data)
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log('request failed' + textStatus)
    }).always(function() {
      console.log('delete completed')
    })
  }

  $('#jobs').on('click', '.btn-danger', function(){
    var youSure = confirm('Are you sure you want to delete this job?');
    if (youSure) {
      var deleteJobId = $(this).data('job-id');
      $(this).parent().remove();
      deleteJob(deleteJobId);
    }
  })

  $('.btn-submit').click('.btn-create', function(){
    var title = $('#title').val();
    var employer = $('#employer').val();
    var hyperlink = $('#hyperlink').val();
    var description = $('#description').val();


    $.ajax({
      method: "POST",
      url: '/api/v1/jobs/',
      data: {
        title: title,
        employer: employer,
        hyperlink: hyperlink,
        description: description
      }
    }).done(function(data) {
      console.log('added Job', data)
      $('#add-job-modal').modal('hide');
      $('#jobs').append(`<div class="job"><h3><a href="${job.hyperlink}">${job.title}</a> at ${job.employer}</h3><p>${job.description}</p><button type="button" class="btn btn-danger" data-job-id="${job._id}">Remove Job</button></div>`)

    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log('request failed' + textStatus)
    }).always(function() {
      console.log('New job add completed')
    })
  })

loadJobs();
});
