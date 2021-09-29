//Global variables
let username = "Zancotti";
let filteredRepos = [];
let global__UserData, global__ReposData;
let global_ListCommitData = [];

//DOM selectors
let projectsPullRequest = document.getElementById(`projectsPullRequest`);

// Used APIs
const myReposApi = `https://api.github.com/users/${username}/repos`;
const usernamePictureAndBioApi = `https://api.github.com/users/${username}`;

// Functions
const toggleMenu = (menuName) => {
  console.log("toggle", menuName);
  let menu = document.getElementById(`${menuName}-menu`);
  menu.classList.toggle(
    "projects__commit-pulls-container__commits-accordion__active"
  );
};

const filter = (type) => {
  console.log(type);
  filteredRepos = [];

  if (type === `js`) {
    const projects = document.getElementsByClassName(`projects__HTML`);

    Array.from(projects).forEach((project) => {
      project.style.display = "none";
    });
  } else if (type === `html`) {
    const projects = document.getElementsByClassName(`projects__JavaScript`);

    Array.from(projects).forEach((project) => {
      project.style.display = "none";
    });
  } else {
    const projects = document.getElementsByClassName(
      `projects__repo-container`
    );
    Array.from(projects).forEach((project) => {
      project.style.display = "flex";
    });
  }
};

const toCapitalLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

//Function in which I fetch data from the json and save the data from the json into a global variable.
const getUsernameAndPicture = () => {
  fetch(usernamePictureAndBioApi)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      global__UserData = data;
    })
    .then(() => renderUsernameAndPicture());
};

// Function in which i render the information based on the data that i saved to the global variable.
const renderUsernameAndPicture = () => {
  const pictureOfUser = global__UserData.avatar_url;
  const userBio = global__UserData.bio;

  userInformation.innerHTML += `
    <img class="user-information__picture" src="${pictureOfUser}" alt="Picture of gitHub-user"/>
    <div class="user-information__username-bio-container">
      <div class="user-information__username-bio-container__username">${username}</div>
      <div class="user-information__username-bio-container__bio">${userBio}</div>
    </div>`;
};

// Function in which we fetch the repository data and filter them to the ones that includes `project` in the name.
const getRepos = () => {
  fetch(myReposApi)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      global__ReposData = data;
    })
    .then(() => renderRepos())
    .then(() => getCommits())
    .then(() => getPullRequests());
};

const renderRepos = () => {
  global__ReposData.forEach((e) => {
    if (e.fork === true && e.name.includes(`project`)) {
      filteredRepos.push(e);
    }
  });

  // sort the filtered repoList after created dates and then reverse it.
  filteredRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  filteredRepos = filteredRepos.reverse();

  // ForEach function over filteredRepos which picks up default branch and creation date and html Url.
  filteredRepos.forEach((e) => {
    const repoName = e.name;
    const repoNameDisplay = toCapitalLetter(repoName);
    const repoDefaultBranch = e.default_branch;
    const htmlUrl = e.html_url;
    let repoLanguage = e.language;

    if (repoLanguage === null) {
      repoLanguage = "";
    }

    // change the inner html and put the id of the projects__repo-container to the repoName. And make content with the values which we saved.
    projects.innerHTML += `
    <div class="projects__repo-container projects__${repoLanguage}" id="${repoName}">
      <div class="projects__repo-container__header">
        <div class="projects__repo-container__header__flex-box">
          <div class="projects__repo-container__header__flex-box__repo-name">${repoNameDisplay} ${repoDefaultBranch}</div>
          <div class="projects__repo-container__header__flex-box__html-url"><a href="${htmlUrl}" target="_blank">Go to ${repoName}</a></div>
          <div class="projects__repo-container__header__flex-box__language">Programming language: ${repoLanguage}</div> 
          </div>
        <div class="projects__repo-container__header__amount-commitmessages" id="${repoName}-amountCommitmessages"></div>
      </div>
      <div class="projects__commit-pulls-container" id="${repoName}-commit-pulls-container"></div>
    </div>`;
  });
};

// function that fetches the commits and sets the first commit message (which is the last made) until commit message. The last commit message and
// amount of commits is fetched and printed put by changing the innerHTML.
const getCommits = () => {
  filteredRepos.forEach((repo) => {
    const repoName = repo.name;
    const commitsUrl = repo.commits_url.slice(0, -6);

    fetch(commitsUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("getcommits data", data);
        global_ListCommitData.push(data);
        return data;
      })
      .then((data) => renderCommits(data, repoName));
  });
};

const renderCommits = (data, repoName) => {
  const commitMessage = toCapitalLetter(data[0].commit.message);
  const amountOfCommits = data.filter(
    (element) => element.author && element.author.login === username
  ).length;

  let containerToChange = document.getElementById(
    `${repoName}-commit-pulls-container`
  );

  containerToChange.innerHTML += `
      <div class="projects__commit-pulls-container__commits-accordion" onclick="toggleMenu('${repoName}')">${commitMessage}
        <ul class="projects__commit-pulls-container__commits-accordion__menu" id="${repoName}-menu"></ul>
      </div>`;

  const amountCommitmessages = document.getElementById(
    `${repoName}-amountCommitmessages`
  );
  amountCommitmessages.innerHTML += `${amountOfCommits}`;

  let menu = document.getElementById(`${repoName}-menu`);
  data
    .slice(1)
    .filter((element) => element.author && element.author.login === username)
    .forEach((element) => {
      menu.innerHTML += `<li class="option">${toCapitalLetter(
        element.commit.message
      )}</li>`;
    });
};

// function that gets the pullrequests. If data.length > 0 it changes the inner html of "container to change" else it writes "no pull request made"
const getPullRequests = () => {
  filteredRepos.forEach((repo) => {
    const repoDefaultBranch = repo.default_branch;
    const repoName = repo.name;

    // add reponame username and repodefault branch to the api to get into the right api adress depending on which repo.
    const pullRequestsApi = `https://api.github.com/repos/technigo/${repoName}/pulls?head=${username}:${repoDefaultBranch}`;

    fetch(pullRequestsApi)
      .then((res) => res.json())
      .then((data) => {
        console.log("pullRequestsApi data", data);
        return data;
      })
      .then((data) => renderPullRequest(data, repoName));
  });
};

const renderPullRequest = (data, repoName) => {
  if (data.length > 0) {
    const prTitle = data[0].title;
    const prUrl = data[0].url;
    let containerToChange = document.getElementById(
      `${repoName}-commit-pulls-container`
    );
    containerToChange.innerHTML += `<div class="projects__commit-pulls-container__pull-request"><div>Pull request:</div><a href="${prUrl}">${prTitle}</a></div>`;
  } else {
    let containerToChange = document.getElementById(
      `${repoName}-commit-pulls-container`
    );
    containerToChange.innerHTML += `<div class="projects__commit-pulls-container__pull-request">No pull request made</div>`;
  }
};

getUsernameAndPicture();
getRepos();

//### **🔴  Red Level (Intermediary Goals)**

// - Sort your list in different ways.
// **Example of what you can sort by:** creation date, name, most commits, followers or stargazers
// - Create the opportunity to filter the repos based on a condition, e.g. only JavaScript repos
// - Display the actual commit messages for each repo in a good way. Maybe by adding a modal (popup) or an accordion?
// - Display the comments you got from each pull request
// - When you're browsing through the repo object, you'll see that there's a lot of data that we can use. Create a chart over some of the data.
// **Example of data to use:** Repo size, people that starred your repo (stargazers) or amount of commits on each repo.

// ### **⚫  Black Level (Advanced Goals)**

// - Implement a search field to find a specific repo based on name
