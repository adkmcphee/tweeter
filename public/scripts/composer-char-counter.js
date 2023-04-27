$(document).ready(function() {

  const tweetForm = document.getElementById('tweetForm');
  const maxCharacters = 140;

  $('#tweetForm').on('input', function() {
    const totalCharacters = $(this).val().length;
    const remainingCharacters = maxCharacters - totalCharacters;
    const counter = $(this).parent().find('output');
    const counterValue = counter.val(remainingCharacters);

    if (remainingCharacters < 0) {
      counter.css('color', '#FF0000');
    } else{
      counter.css('color', '#545149')
    }

  });

});
