// Endpoint to get all your repos
// https://api.github.com/users/HedvigM/repos (repos)

//Endpoint to get all PRs from a Technigo repo `https://api.github.com/repos/technigo/${reponame}/pulls`

//To get the comments from a PR, you need to get the URL from the `review_comments_url` property in the PR json object. It might look something like this: `https://api.github.com/repos/Technigo/project-news-site/pulls/247/comments` and then do a fetch with that url.

//To get the commits from a PR, you need to get the URL  from the `commits_url` property in the PR json object. It might look something like this:`https://api.github.com/repos/Technigo/project-news-site/pulls/227/commits` and then do a fetch with that url.

const repos = 'https://api.github.com/users/HedvigM/repos'
fetch(repos)
  .then(response => response.json())
  .then(data => console.log(data[0].name));

  fetch(repos)
  .then(response => response.json())
  .then(data => console.log(data[1].name));

  fetch(repos)
  .then(response => response.json())
  .then(data => console.log(data[2].name));

  fetch(repos)
  .then(response => response.json())
  .then(data => console.log(data[3].name));

  fetch(repos)
  .then(response => response.json())
  .then(data => console.log(data[4].name));

  fetch(repos)
  .then(response => response.json())
  .then(data => console.log(data[5].name));

  fetch(repos)
  .then(response => response.json())
  .then(data => console.log(data[6].name));

  fetch(repos)
  .then(response => response.json())
  .then(data => console.log(data[7].name));

  fetch(repos)
  .then(response => response.json())
  .then(data => console.log(data[8].name));

  fetch(repos)
  .then(response => response.json())
  .then(data => console.log(data[9].name));


  fetch(repos)
  .then(response => response.json())
  .then(data => console.log(data));