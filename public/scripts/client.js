/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  //Test/ driver code (temp)
  const tweetData = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $("#tweet-container").prepend($tweetElement);
    }
  };

  const createTweetElement = (tweetData) => {
    const $tweetElement = $(`
  <article>
    <header class="tweet-header"> 
       <div class="left-header">
         <img src=${tweetData["user"].avatars}><div>${tweetData["user"].name}</div>
       </div>
     <div class="username">${tweetData["user"].handle}</div>
    </header>
      <div class="tweet-content">
    ${tweetData["content"].text}
      </div>
    <footer class="tweet-footer">
      <div>${tweetData["created_at"]}</div>
      <div><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></div>
    </footer>
  </article>
  
`);

    return $tweetElement;
  };

  renderTweets(tweetData);
});
