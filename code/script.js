// DOM selectors

// Buttons to choose which language to filter by (to do!!)
const hTMLButton = document.getElementById("HTML-button");
const CSSButton = document.getElementById("CSS-button");
const javascriptButton = document.getElementById("Javascript-button");

// HTML sections to inject into
const main = document.getElementById("projects");
const userInfo = document.getElementById("user-info");

const username = "Smelbows";
const USERS_REPOS_API = `https://api.github.com/users/${username}/repos`;

const fetchUserRepos = (userUrl) => {
  fetch(userUrl)
    .then((res) => res.json())
    .then(filterForTechnigoRepos)
    .then((repos) => {
      console.log(repos);
      userInfo.innerHTML = createHTMLForUser(repos[0]);
      repos.forEach((repo) => {
        main.innerHTML += createHTMLForRepo(repo);
        fetchPullRequests(repo);
      });
      drawChart(repos);
    });
};

const filterForTechnigoRepos = (data) => {
  return data.filter((repo) => repo.name.startsWith("project"));
};

// Not up and running yet
// const filterByLanguage = (data, language) => {
//   return data.filter((repo) => repo.language === `${language}`);
// };

const createHTMLForUser = (repo) => {
  return `<img class="avatar" src=${repo.owner.avatar_url} alt="github avatar"/><p class="name">${repo.owner.login}</p>`;
};

const createHTMLForRepo = (repo) => {
  return `<a href="${repo.html_url}" class="repo-container ${
    repo.language
  }" id="${repo.name}"><p class="repo-name">${
    repo.name
  }</p><p>Default branch: ${repo.default_branch}</p><p>Last pushed: ${new Date(
    repo.pushed_at
  ).toDateString()}</p><div id="commit-${repo.name}"></div></a>`;
};

// This is for the flip cards, which I haven't deleted as I want to come back to it later.
// const createHTMLForRepo = (repo) => {
//   return `<div class="flip-card ${repo.language}" id="${repo.name}">
//             <div class="flip-card-inner">
//             <div class="flip-card-front">
//                 <p class="repo-name">${repo.name}</p>
//                 <p>Default branch: ${repo.default_branch}</p>
//                 <p>Last pushed: ${new Date(repo.pushed_at).toDateString()}</p>
//                 <div id="commit-${repo.name}">
//                  </div>
//             </div>
//             <div class="flip-card-back">
//                 <div>
//                     <a 
//                     href="${repo.html_url}">
//                         <p>Go to: project-business-site</p>
//                     </a>
//                 </div>
//                 <div>
//                     <p>Show commit messages</p>
//                 </div>

//             </div>
//         </div>
//     </div>`;
// };

const fetchPullRequests = (repo) => {
  fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
    .then((res) => res.json())
    .then((data) => {
      myPullRequest = findMyPullRequest(data, repo.name);
    //   Only continues to fetch commit data if there is a pull request there
      if (myPullRequest === undefined) {
        document.getElementById(`commit-${repo.name}`).innerHTML +=
          "<p>No pull request made yet</p>";
      } else {
        fetchCommits(myPullRequest.commits_url, repo.name);
      }
    });
};

const findMyPullRequest = (pullsData, repoName) => {
    // this project was pulled from Anna's fork
  if (repoName === "project-weather-app") {
    return pullsData.find((pull) => pull.user.login === "anndimi");
  } else {
    return pullsData.find((pull) => pull.user.login === username);
  }
};

const fetchCommits = (url, name) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById(
        `commit-${name}`
      ).innerHTML += `<p>Number of commits: ${
        data.length
      }</p><p>Last commit message: ${data[data.length - 1].commit.message}</p>`;
    });
};

// To hide the filtered projects, to do
// const hideProject = (project) => {
//   project.style.display === "none";
// };

fetchUserRepos(USERS_REPOS_API);

// Event Listeners
hTMLButton.addEventListener("click", () => {
//   document.querySelectorAll("HTML").forEach((project) => hideProject(project));
});

CSSButton.addEventListener("click", () => {
//   document.querySelectorAll("CSS").forEach((project) => {
//     hideProject(project);
//   });
});

javascriptButton.addEventListener("click", () => {
  document
    // .querySelectorAll("JavaScript")
    // .forEach((project) => hideProject(project));
});
