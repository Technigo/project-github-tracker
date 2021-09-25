//Global variables
let username = "Zancotti";
let filteredRepos = [];
let repoName, commitsUrl, repoDefaultBranch;

//DOM selectors

// Used APIs
const myReposApi = `https://api.github.com/users/${username}/repos`;
const usernameAndPictureApi = `https://api.github.com/users/${username}`;
let pullRequestsApi;

const getUsernameAndPicture = () => {
  fetch(usernameAndPictureApi)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const pictureOfUser = data.avatar_url;
      const userBio = data.bio;

      userInformation.innerHTML = `
        <img class="user-information__picture" src="${pictureOfUser}" alt="Picture of gitHub-user"/>
        <div class="user-information__username-bio-container">
          <div class="user-information__username">${username}</div>
          <div class="user-information__bio">${userBio}</div>
        </div>`;
    });
};

const getRepos = () => {
  fetch(myReposApi)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((e) => {
        if (e.fork === true && e.name.includes(`project`)) {
          filteredRepos.push(e);
        }
      });

      // sort the filtered repoList after created dates and then reverse it.
      filteredRepos.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      filteredRepos = filteredRepos.reverse();

      filteredRepos.forEach((e) => {
        repoName = e.name;
        repoDefaultBranch = e.default_branch;
        repoCreateDate = e.created_at;
        projects.innerHTML += `<div class="projects__repo-container" id="${repoName}">
          <div>${repoName}</div>
        </div>`;

        repoDefaultBranch = e.default_branch;
        pullRequestsApi = `https://api.github.com/repos/technigo/${repoName}/pulls?head=${username}:${repoDefaultBranch}`;
        getPullRequests(repoName);
      });
    });
};

const getPullRequests = (repoName) => {
  console.log("pullRequestsApi", pullRequestsApi);
  fetch(pullRequestsApi)
    .then((res) => res.json())
    .then((data) => {
      console.log("pullRequestsApi data", data);

      if (data.length === 1) {
        commitsUrl = data[0].commits_url;
        getcommits(repoName);
      }
    });
};

const getcommits = (repoName) => {
  fetch(commitsUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log("getcommits data", data);
      let commitMessage = data[data.length - 1].commit.message;
      console.log(commitMessage);

      containerToChange = document.getElementById(repoName);
      containerToChange.innerHTML += `<div class="projects__repo-container-latest-commit">Latest commit message: ${commitMessage}</div>`;
    });
};

// const getPullRequests = (repos) => {
//   fetch("https://api.github.com/repos/technigo/" + repo.name + PULLS);
//   repos.forEach((repo) => {});
// };

/*- A list of all repos that are forked ones from Technigo
= done
- Your username and profile picture
= done

- Most recent update (push) for each repo
- Name of your default branch for each repo
- URL to the actual GitHub repo
- Number of commit messages for each repo
- All pull requests
- A chart of how many projects you've done so far, compared to how many you will do using [Chart.js](https://www.chartjs.org/). [Here](https://www.chartjs.org/docs/latest/getting-started/)'s documentation on how to get started, and in the left menu you can also find [example usage](https://www.chartjs.org/docs/latest/getting-started/usage.html).*/

getUsernameAndPicture();
getRepos();
