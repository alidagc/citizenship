$(document).ready(function() {

// STUDY/questions PAGE ============================================
  $('#answers-list').hide();
  $('.checklist-answers').hide();
  $('#right-wrong-buttons').hide();

  $('#show-answer').click(function(){
    $('#answers-list').show();
    $('#right-wrong-buttons').show();
    $('#show-answer').hide();
  });

$('.show-answer-checklist').click(function(){
  $('.checklist-answers').show();
});


}); // END of Doc Ready
