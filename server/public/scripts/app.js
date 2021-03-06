var displayedStudent = 0;
var currentStudent = 0;
var time = 10;

$(document).ready(function(){
  setInterval(function() {

    if(time==0){
      if (currentStudent<16) {
      currentStudent = Number(currentStudent)+ 1;
      showStudent(currentStudent);
      time = 11
    } else {
      currentStudent = 0;
      showStudent(currentStudent);
      time = 11
    }
    }
    time--;
    console.log((time));
  }, 1000);

  $.ajax({
    type: "GET",
    url: "/data",
    success: function(data){
      showStudent(currentStudent);
    }
  });

  $('.people').on('click', function() {
    currentStudent = $(this).attr('id');
    console.log(currentStudent);
    time = 10;
    showStudent(currentStudent);
  });

  $('#nextButton').on('click', function() {
    console.log("Next button was clicked");
    time = 10;
    $('highlighted').removeClass();
    if (currentStudent<16) {
      currentStudent = Number(currentStudent) +1;
      showStudent(currentStudent);
    } else {
      currentStudent = 0;
      showStudent(currentStudent);
    }
  });

  $('#previousButton').on('click', function() {
    console.log("Previous button was clicked");
    time = 10;
    $('highlighted').removeClass();
    if (currentStudent>0) {
      currentStudent = Number(currentStudent) -1;
      showStudent(currentStudent);
    } else {
      currentStudent = 16;
      showStudent(currentStudent);
    }
  });

    function showStudent(currentStudent) {
      $.ajax({
        type: "GET",
        url: "/data",
        success: function(data){
          $('.highlighted').removeClass('highlighted');
          console.log("GET /data returns", data);
          $('#stage').fadeOut('slow');
          $('#stage').empty();
          $('#stage').hide();
          displayedStudent = data[currentStudent];
          console.log(displayedStudent);
          appendDom(displayedStudent);
          $('#stage').fadeIn('slow');
          $('#'+currentStudent).addClass('highlighted');
          }
        });
      }
    function appendDom(data){
      var $studentDiv = $('<div class="student"></div>');
      $studentDiv.append('<h1>' + data.name + '</h1>');
      $studentDiv.append('<h2>' + data.githubUserName + '</h2>');
      $studentDiv.append('<h2>' + data.shoutout + '</h2>');

      $('#stage').append($studentDiv);
      };

});
