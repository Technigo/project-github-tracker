const GITHUB_URL = "https://api.github.com/users/efstasia/repos";

fetch(GITHUB_URL)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
  });

// const getPullRequests = (repos) => {
//     //Get all the PRs for each project.
//     repos.forEach((repo) => {
//       fetch(GITHUB_URL)
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//           //TODO
//           //1. Find only the PR that you made by comparing pull.user.login
//           // with either USER or repo.owner.login
//           //2. Now you're able to get the commits for each repo by using
//           // the commits_url as an argument to call another function
//           //3. You can also get the comments for each PR by calling
//           // another function with the review_comments_url as argument
//         });
//     });
//   };
