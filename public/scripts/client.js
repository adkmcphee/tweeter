/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $("#tweet-container").prepend($tweetElement);
    }
  };

  const createTweetElement = (tweet) => {
    const $tweetElement = $(`
      <article>
        <header class="tweet-header"> 
          <div class="left-header">
            <img src=${tweet["user"].avatars}>
            <div>${tweet["user"].name}</div>
          </div>
        <div class="username">
          ${tweet["user"].handle}
        </div>
        </header>
          <div class="tweet-content">
            ${tweet["content"].text}
          </div>
        <footer class="tweet-footer">
          <div>${timeago.format(tweet.created_at)}</div>
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

    if (!tweetText) {
      alert("Error: Please provide some content.");
      return;
    }

    if (tweetText.length > maxCharacters) {
      alert("Error: Too many characters.");
      return;
    }

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: data,
    }).then(() => {
      $("#tweetForm").val('')
      loadTweets();
    });
  });
});
