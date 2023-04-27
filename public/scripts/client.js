/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  //function to render tweet from back-end, prepend to existing html
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $("#tweet-container").prepend($tweetElement);
    }
  };


  //function to prevent XSS attack
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  //function to create dynamic tweet HTML
  const createTweetElement = (tweet) => {
    const $tweetElement = $(`
      <article>
        <header class="tweet-header"> 
          <div class="left-header">
            <img src=${escape(tweet["user"].avatars)}>
            <div>${escape(tweet["user"].name)}</div>
          </div>
        <div class="username">
          ${escape(tweet["user"].handle)}
        </div>
        </header>
          <div class="tweet-content">
            ${escape(tweet["content"].text)}
          </div>
        <footer class="tweet-footer">
          <div>${escape(timeago.format(tweet.created_at))}</div>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    
      `);

    return $tweetElement;

  };


  //function to fetch tweets from /tweets
  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
    }).then((tweets) => {
      renderTweets(tweets);
    });
  };


  //make a GET request to load initial tweets
  loadTweets();


  // grab the form from the DOM
  const $form = $("#new-tweet-form");


  //add a submit handler to the form
  $form.on("submit", (event) => {
    event.preventDefault();
    const maxCharacters = 140;
    const data = $form.serialize();
    const tweetText = $form.find("#tweetForm").val();


    //error message if tweet form is empty
    if (!tweetText) {
      $("#error-message").text("Please fill in the form below.").slideDown();
      return;
    }


    //error message if tweet length exceeds maximum characters
    if (tweetText.length > maxCharacters) {
      $("#error-message")
        .text("Your tweet exceeds the maximum number of characters")
        .slideDown();
      return;
    }


    $.ajax({
      method: "POST",
      url: "/tweets",
      data: data,
    }).then(() => {
      loadTweets();
      $("#tweetForm").val("");
      $("#error-message").slideUp();
      $(".counter").val(maxCharacters);

      
    });
  });
});
