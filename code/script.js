const username = "Mimmisen";
//let reponame = "";
const API_URL = `https://api.github.com/users/${username}/repos`;

//const API_TOKEN = TOKEN || process.env.API_KEY; // variable called TOKEN is local OR API_KEY is on the deployed site

const options = {
  method: "GET",
  headers: {
    Authorization: `token ${API_TOKEN}`, // you need to paste your token over here.
  },
};

fetch(API_URL, options)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    let forkedProjects = data.filter((element) => element.fork === true);
    console.log("Forked projects:", forkedProjects);

    let technigoProjects = forkedProjects.filter((element) =>
      element.name.startsWith("project")
    );
    console.log("Technigo projects", technigoProjects);

    //function to display profile picture and username
    const userData = (data) => {
      document.getElementById("profile-picture").innerHTML = `
      <img class="profile-picture" src="${data[0].owner.avatar_url}" alt="image of Mimmisen at GitHub">
        `;
      document.getElementById("username").innerHTML = `
           username: ${data[0].owner.login}
           `;
    };
    console.log("userData", data);
  });
//getPullRequests(technigoProjects);

//Remember to pass along your filtered repos as an argument when
//you are calling this function

const getPullRequests = (repos) => {
  //   //Get all the PRs for each project.
  repos.forEach((repo) => {
    fetch("https://api.github.com/repos/Technigo/${reponame}/pulls", options)
      .then((res) => res.json())
      .then((data) => {
        //         //1. Find only the PR that you made by comparing pull.user.login
        //         // with repo.owner.login
        const myPullRequests = data.filter(
          (element) => element.user.login === username
        );
        console.log("my pull requests", myPullRequests);
        // //         //2. Now you're able to get the commits for each repo by using
        // //         // the commits_url as an argument to call another function
        // let commitsUrl = myPullRequests[0].commits_url;
        // console.log("commits url", commitsUrl);
        // myCommits(commitsUrl);
        // //         //3. You can also get the comments for each PR by calling
        // //         // another function with the review_comments_url as argument
        // let reviewCommentsUrl = myPullRequests[0].review_comments_url;
        // console.log("review comments url", reviewCommentsUrl);
        // reviewCommentsUrl(reviewCommentsUrl);
        //         document.getElementById("projects").innerHTML += `
        //         <h3>${repo.name}</h3>
        //         `;
      });
  });
};
// reponame = data[5].name;

// const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`;

// fetch(API_URL_PR, options)
//   .then((res) => res.json())
//   .then((data2) => {
//     console.log(data2);
//   });
