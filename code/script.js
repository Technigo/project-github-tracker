//Global variables
let username = "Zancotti";
let filteredRepos = [];
let global__UserData, global__ReposData;

// ------------Functions--------------------

// Function in which I toggleMenu to to put on an active class for the commits accordion.
const toggleMenu = (menuName) => {
  let menu = document.getElementById(`${menuName}-menu`);
  menu.classList.toggle(
    "projects__commit-pulls-container__commits-accordion__active"
  );
};

// Function in which I toggleMenu to to put on an active class for the comments accordion.
const toggleMenuComments = (menuName) => {
  let menu = document.getElementById(`${menuName}-comments-menu`);
  menu.classList.toggle(
    "projects__commit-comments-container__comments-accordion__active"
  );
};

// a filter function to function out repos depending on the language of them.
const filter = (type) => {
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

// A function to make the first character in a string into a capital letter.
const toCapitalLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

//Function in which I fetch data from the json and save the data from the json into a global variable.
const getUsernameAndPicture = () => {
  const usernamePictureAndBioApi = `https://api.github.com/users/${username}`;
  fetch(usernamePictureAndBioApi)
    .then((res) => res.json())
    .then((data) => {
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

// Function in which I fetch the repository data and save it into a global variable. I also after the data has been fetched
// call for the functions renderrepos, get commits and getpullrequests.
const getRepos = () => {
  const myReposApi = `https://api.github.com/users/${username}/repos`;
  fetch(myReposApi)
    .then((res) => res.json())
    .then((data) => {
      global__ReposData = data;
    })
    .then(() => renderRepos())
    .then(() => getCommits())
    .then(() => getPullRequests());
};

// Function in which I filter the repodata.
const renderRepos = () => {
  global__ReposData.forEach((e) => {
    if (e.fork === true && e.name.includes(`project`)) {
      filteredRepos.push(e);
    }
  });

  // I sort the filtered repoList after creation dates and then reverse it.
  filteredRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  filteredRepos = filteredRepos.reverse();

  // ForEach function over filteredRepos which picks up repoName, default branch, html Url and repoLanguage.
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
      <div class="projects__commit-comments-container" id="${repoName}-commit-comments-container"></div>
    </div>`;
  });
};

// function that fetches the commits from the repo data and saved the data unto a global variable. It also sends data through to the new function
// renderCommits.
const getCommits = () => {
  filteredRepos.forEach((repo) => {
    const repoName = repo.name;
    const commitsUrl = repo.commits_url.slice(0, -6);

    fetch(commitsUrl)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .then((data) => renderCommits(data, repoName));
  });
};

// A function which filter the amount of commits into just counting the ones that I have made in my name.
const renderCommits = (data, repoName) => {
  const commitMessage = toCapitalLetter(data[0].commit.message);
  const amountOfCommits = data.filter(
    (element) => element.author && element.author.login === username
  ).length;

  // Set the containerToChange into the dynamic reponame-commit-pulls-container and then switch the inner html of that container.
  let containerToChange = document.getElementById(
    `${repoName}-commit-pulls-container`
  );

  containerToChange.innerHTML += `
      <div class="projects__commit-pulls-container__commits-accordion" onclick="toggleMenu('${repoName}')">${commitMessage}
        <ul class="projects__commit-pulls-container__commits-accordion__menu" id="${repoName}-menu"></ul>
      </div>`;

  // Change the innerhtml of to registrer amount of commits on the website.
  const amountCommitmessages = document.getElementById(
    `${repoName}-amountCommitmessages`
  );
  amountCommitmessages.innerHTML += `${amountOfCommits}`;

  let menu = document.getElementById(`${repoName}-menu`);
  // I slice,filter and make a foreach and then change the innerhtml of menu (the commit message accordion)
  data
    .slice(1)
    .filter((element) => element.author && element.author.login === username)
    .forEach((element) => {
      menu.innerHTML += `<li class="option">${toCapitalLetter(
        element.commit.message
      )}</li>`;
    });
};

// function that for each repo set default branch and repo name and then fetch the pullrequests.
const getPullRequests = () => {
  filteredRepos.forEach((repo) => {
    const repoDefaultBranch = repo.default_branch;
    const repoName = repo.name;

    // add reponame username and repodefault branch to the api to get into the right api adress depending on repo.
    const pullRequestsApi = `https://api.github.com/repos/technigo/${repoName}/pulls?head=${username}:${repoDefaultBranch}`;

    fetch(pullRequestsApi)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .then((data) => {
        renderPullRequest(data, repoName);
        return data;
      })
      .then((data) => getCommentsOnPullRequest(data, repoName));
  });
};

// Function that renderPullrequest and changes the innerhtml of the dynamic containerToChange.
const renderPullRequest = (data, repoName) => {
  if (data.length > 0) {
    const prTitle = data[0].title;
    const prUrl = data[0].html_url;
    let containerToChange = document.getElementById(
      `${repoName}-commit-pulls-container`
    );
    containerToChange.innerHTML += `<div class="projects__commit-pulls-container__pull-request"><div>Pull request:</div><a href="${prUrl}" target="_blank">${prTitle}</a></div>`;
  } else {
    let containerToChange = document.getElementById(
      `${repoName}-commit-pulls-container`
    );
    containerToChange.innerHTML += `<div class="projects__commit-pulls-container__pull-request">No pull request made</div>`;
  }
};

// function that fetches the comments of the PR and then wait for the data and sends it through to the renderCommentsOnPullRequest function.
const getCommentsOnPullRequest = (data, repoName) => {
  if (data.length > 0) {
    const commentsOnPrApi = data[0].review_comments_url;

    fetch(commentsOnPrApi)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .then((data) => renderCommentsOnPullRequest(data, repoName));
  }
};

// Function that renders the information on the of the container to change and pick up the information through a foreach.
const renderCommentsOnPullRequest = (data, repoName) => {
  const containerToChange = document.getElementById(
    `${repoName}-commit-comments-container`
  );

  containerToChange.innerHTML += `
      <div class="projects__commit-comments-container__comments-accordion" onclick="toggleMenuComments('${repoName}')">Show all PR comments:
        <ul class="projects__commit-comments-container__comments-accordion__menu" id="${repoName}-comments-menu"></ul>
      </div>`;

  const commentsContainer = document.getElementById(
    `${repoName}-comments-menu`
  );

  data.forEach((comment) => {
    commentsContainer.innerHTML += `<li class="option">${comment.user.login}: ${comment.body}</li>`;
  });
};

// Start the website by calling these functions.
getUsernameAndPicture();
getRepos();
