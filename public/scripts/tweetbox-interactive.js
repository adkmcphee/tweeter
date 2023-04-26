$(document).ready(function() {

  ///adds shadow box when hovering over article
  $('article').on('mouseenter', function() {
    $(this).css('box-shadow', "0 5px 15px rgba(0, 0, 0, 0.2)");
  }).on('mouseleave', function() {
    $(this).css('box-shadow', 'none');
  });

  //adds highlight when hovering over flag icon
  $('.fa-solid.fa-flag').on('mouseenter', function() {
    $(this).css('color', "#E1C16E");
  }).on('mouseleave', function() {
    $(this).css('color', '');
  });

  //adds highlight when hovering over retweet icon
  $('.fa-solid.fa-retweet').on('mouseenter', function() {
    $(this).css('color', "#E1C16E");
  }).on('mouseleave', function() {
    $(this).css('color', '');
  });

  //adds highlight when hovering over heart icon
  $('.fa-solid.fa-heart').on('mouseenter', function() {
    $(this).css('color', "#E1C16E");
  }).on('mouseleave', function() {
    $(this).css('color', '');
  });



});



