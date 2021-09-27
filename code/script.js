console.log("script works?");

const userName = "Loulunds";
const USER_URL = `https://api.github.com/users/${userName}`;
const REPOS_API_URL = `https://api.github.com/users/${userName}/repos`;
const userContainer = document.getElementById("userInfo");
const reposContainer = document.getElementById("projects");
const commentsContainer = document.getElementById("comments");

const getUserData = () => {
  fetch(USER_URL)
    .then((response) => response.json())
    .then((data) => {
      reposContainer.innerHTML = `
      <h1> Username: ${data.login}</h1>
      <img src="${data.avatar_url}"/>
      `;
    })
    .catch(() => {
      reposContainer.innerHTML = `<h3>Sorry, we could not find the information</h3>`;
    });
};

getUserData();

const fetchRepos = () => {
  fetch(REPOS_API_URL)
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);

      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );
      forkedRepos.forEach(
        (repo) =>
          (reposContainer.innerHTML += `
        <h3>${repo.name}</h3>
        <p><a href="${repo.html_url}" target="blank">${repo.html_url}</a></p>
        <p>${repo.default_branch}</p>
        `)
      );
      getPullRequests(forkedRepos);
      //   console.log(forkedRepos);
    })
    .catch(() => {
      reposContainer.innerHTML = `<h3>Sorry, we could not find the information</h3>`;
    });
};
fetchRepos();

const getPullRequests = (repos) => {
  console.log(repos);
  //Get all the PRs for each project.
  repos.forEach((repo) => {
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        const filteredPulls = data.filter(
          (pull) => pull.user.login === repo.owner.login
        );

        console.log(filteredPulls);
        const COMMENTS_URL = filteredPulls[0].review_comments_url;
        const COMMITS_URL = filteredPulls[0].commits_url;
        //TODO
        //1. Find only the PR that you made by comparing pull.user.login
        // with repo.owner.login
        //2. Now you're able to get the commits for each repo by using
        // the commits_url as an argument to call another function
        //3. You can also get the comments for each PR by calling
        // another function with the review_comments_url as argument
        // showComments(COMMENTS_URL);
        console.log(COMMENTS_URL);
        console.log(COMMITS_URL);
      });
  });
};

getPullRequests();

const showComments = (urlList) => {
  console.log(urlList);
  urlList.forEach((url) => {
    fetch(`'${url}'`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const comments = data.body;
        commentsContainer.innerHTML += `${comments}`;
      });
  });
};

showComments();
