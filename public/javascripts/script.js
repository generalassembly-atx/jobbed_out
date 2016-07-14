$(function(){

  var loadJobs = function(){
    //request JSON
    $.ajax({
      url: '/api/v1/jobs',
      method: 'GET',
      data: {},
      dataType: 'JSON'
    }).done(function(data) {
      //display jobs
      //displayJobs()
      displayJobs(data)
      console.log("success", data);
    }) .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("request failed", textStatus);
    }).always(function() {
      console.log("complete");
    })
  }


var displayJobs = function(jobs){
  if (!jobs){
    console.log("no music here");
  }
  //find that section in html to display
$('#jobs').empty();
  // loop through json data to create viewable list
  for (var i = 0 ; i< jobs.length; i++) {
   //display through html
    var job = jobs[i];
    $('#jobs').append(`<div class="job"><h3>${job.title}</h3><p>${job.employer}</p><p><a href="${job.hyperlink}">${job.hyperlink}</a></p><p>${job.description}</p><button type="button" class="btn btn-danger" data-job-id="${job._id}">Delete Show</button></div>`)
  };
};


var deleteJob = function(deleteJobId){
  $.ajax({
      url: '/api/v1/jobs/' + deleteJobId,
      method: 'DELETE',
      data: {},
    }).done(function(data) {
      console.log("delted", data);
    }) .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("request failed", textStatus);
    }).always(function() {
      console.log("delete complete");
    })
}


$('#jobs').on('click', '.btn-danger', function(){
  var youSure = confirm('Are you sure you want to delete')

  if (youSure){
  var deleteJobId = $(this).data('job-id');
  $(this).parent().remove();
  deleteJob(deleteJobId);
  }
})



//create

$('.btn-create').click(function(){
  // console.log(job);
  var title = $('#title').val()
  var employer = $('#employer').val()
  var hyperlink = $('#hyperlink').val()
  var description = $('#description').val()
  $.ajax({
      url: '/api/v1/jobs/',
      method: 'POST',
      data: {
        title: title,
        employer: employer,
        hyperlink: hyperlink,
        description: description
      },
    }).done(function(data) {
      console.log("created", data);
      $('#myModal').modal('hide');

          $('#jobs').append(`<div class="job"><h3>${data.title}</h3><p>${data.employer}</p><p>${data.hyperlink}</p><p>${data.description}</p><button type="button" class="btn btn-danger" data-job-id="${data._id}">Delete Show</button></div>`)

    }) .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("request failed", textStatus);
    }).always(function() {
      console.log("created complete");
    })

})






loadJobs();







});
