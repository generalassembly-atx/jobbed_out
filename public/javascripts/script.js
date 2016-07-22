$(function(){
 var loadJobs = function(){

  // request JSON and process it
  $.ajax({
    url:'/api/v1/jobs',
    method:'GET',
    data:{},
    dataType:"json"
  }).done(function(data){
    //display all your concerts
    displayJobs(data);
    console.log(data);
  })
  .fail(function(jqXHR,textStatus,errorThrown){
    console.log("Request Failed:", textStatus)
  })
  .always(function(){
    console.log("Request completed")
  })
 }
var displayJobs = function(jobs){
  if(!jobs){
    console.log("no jobs to output");
  }
  //find section in the html to put concerts, go the index.ejs and create a new div
  $('#jobs').empty();

  //loop through the json data
  for (var i =0 ; i<jobs.length; i++){
    //display each oncert in html
    var job = jobs[i];
    $('#jobs').append(`<div class="job"><h3>${job.title}</h3><p>${job.employer}</p><p><a href="${job.hyperlink}">${job.hyperlink}</a></p><p>${job.description}</p><button type="button" class="btn btn-danger" data-job-id="${job._id}">Delete show</button></div>`)
  }
};
//delete from database
var deleteJob = function(deleteJobId){
  $.ajax({
    method:'DELETE',
    url:'/api/v1/jobs/' + deleteJobId,
    data:{}
  })
  .done(function(data){
    console.log('deleted',data)
  })
  .fail(function(jqXHR,textStatus,errorThrown){
    console.log("Request Failed:", textStatus)
  })
  .always(function(){
    console.log('delete completed')
  })
}

//delete from the view
$('#jobs').on('click', '.btn-danger', function(){
  var youSure = confirm("Are you sure you want to delete this show?")
  if (youSure){
  var deleteJobId = $(this).data('job-id');
    // console.log(deleteConcertId);
  $(this).parent().remove();
  //call back the delete function, this will invoke when you click the button
  deleteJob(deleteJobId);
  }
})

$('.btn-submit').click('.btn-create',function(){
  var title = $('#title').val();
  var employer = $('#employer').val();
  var hyperlink = $('#hyperlink').val();
  var description = $('#description').val();

  $.ajax({
    method:'POST',
    url:'/api/v1/jobs/',
    data:{
          title:title,
          employer:employer,
          hyperlink:hyperlink,
          description:description
   }
  })
  .done(function(data){
    console.log('created',data)
    $('#add-job-modal').modal('hide');
    $('#jobs').append(`<div class="job"><h3>${data.title}</h3><p>${data.employer}</p><p>${data.date}</p><p>${description}</p><button type="button" class="btn btn-danger" data-job-id="${data._id}">Delete show</button></div>`)

  })
  .fail(function(jqXHR,textStatus,errorThrown){
    console.log('request failed' + textStatus)
  })
  .always(function(){
    console.log('created complete')
  })
})
loadJobs();
});
