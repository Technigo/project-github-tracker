const options = {
  method: `GET`,
  headers: {
    Authorization: `token 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`,
  },
};

//Global variables
let username = "Zancotti";
let filteredRepos = [];
let repoName, commitsUrl, repoDefaultBranch;

//DOM selectors
let projectsPullRequest = document.getElementById(`projectsPullRequest`);

// Used APIs
const myReposApi = `https://api.github.com/users/${username}/repos`;
const usernamePictureAndBioApi = `https://api.github.com/users/${username}`;
let pullRequestsApi;

//Function in which we fetch the username, picture and bio from github and change the innerhtml of userInformation to contain these values.
const getUsernameAndPicture = () => {
  fetch(usernamePictureAndBioApi)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const pictureOfUser = data.avatar_url;
      const userBio = data.bio;

      userInformation.innerHTML = `
        <img class="user-information__picture" src="${pictureOfUser}" alt="Picture of gitHub-user"/>
        <div class="user-information__username-bio-container">
          <div class="user-information__username-bio-container__username">${username}</div>
          <div class="user-information__username-bio-container__bio">${userBio}</div>
        </div>`;
    });
};

// Function in which we fetch the repository data and filter them to the ones that includes `project` in the name.
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

      // ForEach function over filteredRepos which picks up default branch and creation date and html Url.
      filteredRepos.forEach((e) => {
        repoName = e.name;
        repoDefaultBranch = e.default_branch;
        repoCreateDate = e.created_at;
        htmlUrl = e.html_url;

        // Function to make the first letter in the repo name into a uppercase one.
        const repoNameUppercase =
          repoName.charAt(0).toUpperCase() + repoName.slice(1);

        // change the inner html and put the id of the projects__repo-container to the repoName. And make content with the values which we saved.
        projects.innerHTML += `
        <div class="projects__repo-container" id="${repoName}">
          <div class="projects__repo-container__header">
            <div class="projects__repo-container__header__flex-box">
              <div class="projects__repo-container__header__flex-box__repo-name">${repoNameUppercase} ${repoDefaultBranch}</div>
              <div class="projects__repo-container__header__flex-box__html-url"><a href="${htmlUrl}" target="_blank">Go to ${repoName}</a></div>
            </div>
            <div class="projects__repo-container__header__amount-commitmessages" id="${repoName}-amountCommitmessages"></div>
          </div>
          <div class="projects__commit-pulls-container" id="${repoName}-commit-pulls-container"></div>
        </div>`;

        repoDefaultBranch = e.default_branch;
        // slice to take away the 6 chars not needed to fetch the commitsUrl.
        commitsUrl = e.commits_url.slice(0, -6);
        getcommits(repoName);

        // add reponame username and repodefault branch to the api to get into the right api adress depending on which repo.
        pullRequestsApi = `https://api.github.com/repos/technigo/${repoName}/pulls?head=${username}:${repoDefaultBranch}`;
        getPullRequests(repoName);
      });
    });
};

// function that gets the pullrequests. If data.length > 0 it changes the inner html of "container to change" else it writes "no pull request made"
const getPullRequests = (repoName) => {
  console.log("pullRequestsApi", pullRequestsApi);
  fetch(pullRequestsApi)
    .then((res) => res.json())
    .then((data) => {
      console.log("pullRequestsApi data", data);
      if (data.length > 0) {
        let prTitle = data[0].title;
        let prUrl = data[0].url;
        let containerToChange = document.getElementById(
          `${repoName}-commit-pulls-container`
        );
        containerToChange.innerHTML += `<div class="projects__commit-pulls-container__pull-request"><div>Pull request link:</div><a href="${prUrl}">${prTitle}</a></div>`;
      } else {
        let containerToChange = document.getElementById(
          `${repoName}-commit-pulls-container`
        );
        containerToChange.innerHTML += `<div class="projects__commit-pulls-container__pull-request">No pull request made</div>`;
      }
    });
};

// function that fetches the commits and sets the first commit message (which is the last made) until commit message. The last commit message and
// amount of commits is fetched and printed put by changing the innerHTML.
const getcommits = (repoName) => {
  fetch(commitsUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log("getcommits data", data);
      let commitMessage = data[0].commit.message;
      amountOfCommits = data.length;

      console.log(commitMessage);

      let containerToChange = document.getElementById(
        `${repoName}-commit-pulls-container`
      );
      containerToChange.innerHTML += `<div class="projects__commit-pulls-container__last-commit">Last commit message: ${commitMessage}</div>`;
      amountCommitmessages = document.getElementById(
        `${repoName}-amountCommitmessages`
      );
      amountCommitmessages.innerHTML += `${amountOfCommits}`;
    });
};

// - A chart of how many projects you've done so far, compared to how many you will do using [Chart.js](https://www.chartjs.org/). [Here](https://www.chartjs.org/docs/latest/getting-started/)'s documentation on how to get started, and in the left menu you can also find [example usage](https://www.chartjs.org/docs/latest/getting-started/usage.html).*/

getUsernameAndPicture();
getRepos();
