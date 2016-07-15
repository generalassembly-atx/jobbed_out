$(function() {

  var loadJobs = function(){
    //request JSON and process it
    $.ajax({
      url: '/api/v1/jobs',
      method: 'GET',
      data: {},
      dataType: "json"
    }).done(function(data){
      //display all our jobs

      //displayJobs()
      displayJobs(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown){
      console.log("request failed: ", textStatus)
    })
    .always(function(){

    })
  }

  var displayJobs = function(jobs){
      if (!jobs){
        alert("NO JOBS!!!!!!!!!");
      }
      $('#jobs').empty();
      // loop throught the JSON data
      for (var i=0; i<jobs.length; i++){
        var job = jobs[i];
        $('#jobs').append(`<div class="job"><a href="${job.hyperlink}"><h3>${job.title}</a> at ${job.employer}</h3><p>${job.description}</p><button type="button" class="btn btn-danger" data-job-id="${job._id}">Remove Job</button></div>`)
      }
    };

    //deletes job from the database
  var deleteJob = function(deleteJobId){
    $.ajax({
      method: 'DELETE',
      url: '/api/v1/jobs/' + deleteJobId,
      data: {}
    })
    .done(function(data){
      console.log("deleted:", deleteJobId)
    })
    .fail(function(jqXHR, textStatus, errorThrown){
      console.log("request failed", textStatus)
    })
    .always(function(){
      console.log('deleted completed')
    })
  }


  //deletes job from the view
  $('#jobs').on('click', '.btn-danger', function(){
    var youSure = confirm("Are you sure you want to delete this job?");
    if (youSure) {
      var deleteJobId = $(this).data('job-id');
      $(this).parent().remove();
      deleteJob(deleteJobId);
    }
  })

    //creates job to the database
  var createJob = function(title, employer, hyperlink, description){
    $.ajax({
      method: 'POST',
      url: '/api/v1/jobs/',
      data: {
        title: title,
        employer: employer,
        hyperlink: hyperlink,
        description: description
      }
    })
    .done(function(data){

      $('#add-job-modal').modal('hide');

      $('#jobs').append(`<div class="job"><a href="${data.hyperlink}"><h3>${data.title}</a> at ${data.employer}</h3><p>${data.description}</p><button type="button" class="btn btn-danger" data-job-id="${data._id}">Remove Job</button></div>`)

    })
    .fail(function(jqXHR, textStatus, errorThrown){
      console.log("post failed")
    })
    .always(function(){
      console.log('post completed')
    })
  }

  //creates job
  $('.btn-create').click(function(){
      var title = $('#title').val();
      var employer = $('#employer').val();
      var hyperlink = $('#hyperlink').val();
      var description = $('#description').val();

    createJob(title, employer, hyperlink, description);

  })

loadJobs();
});
