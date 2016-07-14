$(function() {

loadJobs = function(){
    // request JSON and process it
    $.ajax ({
      method: "GET",
      url: '/api/v1/jobs',
      data: {},
      dataType: "json"
    })
    .done(function(data){
      displayJobs(data);

    })
    .fail(function(jqXHR, text, errorThrown){
      console.log("Request failed: ", textStatus)
    })
    .always(function(){
      console.log("Request completed")
    })
  }

  var displayJobs = function(jobs){
    if (!jobs){
      console.log("No jobs listed.");
    }
    //find section in the html to put jobs
    $('#jobs').empty();
    // loops through json data
    for (var i=0; i<jobs.length; i++){
      // display each job in html
      var job = jobs[i];
      $('#jobs').append(`<div class="job"><h3>${job.title}</h3><p>${job.employer}</p><p>${job.hyperlink}</p><p>${job.description}</p><button type="button" class="btn btn-danger" data-job-id="${job._id}">Delete This Job</button></div>`);
    }
  }

  var deleteJob = function(deleteJobId){
    $.ajax({
      method: 'DELETE',
      url: '/api/v1/jobs/' + deleteJobId,
      data: {}
    })
    .done(function(data){
      console.log('deleted', data)
    })
    .fail(function(jqXHR, text, errorThrown){
      console.log("Request failed: " + textStatus)
    })
    .always(function(){
      console.log("Request completed")
    })
  }

  $('#jobs').on('click', '.btn-danger', function(){
    var youSure = confirm("Are you sure you want to delete this job?")
    if (youSure) {
      var deleteJobId = $(this).data('job-id');
      $(this).parent().remove();
      deleteJob(deleteJobId);
    }
  })

  $('.btn-create').click(function(){
    var newTitle = $('#title').val();
    var newEmployer = $('#employer').val();
    var newHyperlink = $('#hyperlink').val();
    var newDescription = $('#description').val();
    $.ajax({
      method: 'POST',
      url: '/api/v1/jobs/',
      data: {
        title: newTitle,
        employer: newEmployer,
        hyperlink: newHyperlink,
        description: newDescription
      }
    })
    .done(function(data){
      console.log('created', data)
      $('#add-job-modal').modal('hide');
      $('#jobs').append(`<div class="job"><h3>${job.title}</h3><p>${job.employer}</p><p>${job.hyperlink}</p><p>${job.description}</p><button type="button" class="btn btn-danger" data-job-id="${job._id}">Delete This Job</button></div>`);

    })
    .fail(function(jqXHR, text, errorThrown){
      console.log("Request failed: " + textStatus)
    })
    .always(function(){
      console.log("Request completed")
    })
  })

loadJobs();

});
