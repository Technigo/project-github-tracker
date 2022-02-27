// Token
const options = {
    method: 'GET',
    headers: {
        Authorization: `TOKEN ${API_TOKEN}`
    }
}

// DOM selectors
const projectInfo = document.getElementById('projectInfo')
const userInfo = document.getElementById('userInfo')
const aboutUser = document.getElementById('aboutUser')
const profilePicture = document.getElementById('profilePicture')
const mainContent = document.getElementById('mainContent')


// Github API
const username = 'emmajosefina'
const API_URL = `https://api.github.com/users/${username}/repos`
const API_USER = `https://api.github.com/users/${username}`



 //------------------ FIRST FETCH - USER PROFILE -----------------------//
const getProfile = () => {
    fetch(API_USER, options)
      .then((res) => res.json())
      .then((data) => {
        mainContent.innerHTML +=
        `
        <section class="profile-box">
            <img src="${data.avatar_url}" id="profilePicture" class="profile-picture" />
            <p class="full-name">${data.name}</p>
            <p class="username">${data.login}</p>
        </section>
        <div class="status-box">
        ${data.bio} 👩‍💻
        </div>
          `;
      });
  };
  getProfile();


   //------------------ SECOND FETCH - ALL REPOS -----------------------//
const findingAllRepos = (repos) => {
    fetch(API_URL, options)
       .then((res) => res.json())
       .then((data) => {



    // Fetches only repositories from Technigo //
    const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith('project-'))


    forkedRepos.forEach((repo) =>
    projectInfo.innerHTML +=

    `
    <div class="projectContainer">
        <p class="smallerContainer">
            <span class="header-project">
            ${repo.name.replace('project-', '').replace('-', ' ')}
            </span>
        </p>
        <p class="smallerContainer">
            <span class="styledHeadingsProject"> Updated:</span>
           <span class="dataFetch"> ${new Date(repo.pushed_at).toLocaleDateString('en-SE', {year: 'numeric', month: 'short', day: 'numeric'})}</span>
        </p>
        <p class="smallerContainer">
            <span class="styledHeadingsProject">
            Default branch: </span>
            <span class="dataFetch">${repo.default_branch}</span>
        </p>
        <p class="smallerContainer" id="commit-${repo.name}" style="color: #24292f; font-size: 15px">
            <span class="styledHeadingsProject">
            Number of commits:
            </span>
        </p>
        <p class="smallerContainer" id="pull-request-${repo.name}" style="color: #24292f; font-size: 15px">
            <span class="styledHeadingsProject">Pull requests: </span>
            <span class="dataFetch"></span>
        </p>
        <p class="smallerContainer">
            <img src="images/github-logo-extra-big.png" alt="github-logo" width="15px" />
            <span class="dataFetch"><a class="project-url" href="${repo.svn_url}">
            ${repo.name}</span>
            </a>
        </p>
    </div>
    `
)
getPullRequest(forkedRepos)
renderChart(forkedRepos.length)
})
}
findingAllRepos()



const getCommits = (myCommitsUrl, myRepoName) => {
        fetch(myCommitsUrl, options)
        .then((res) => {
        return res.json()
          })
        .then((data) => {

        document.getElementById(`commit-${myRepoName}`).innerHTML += data.length
      })
      }

 //------------------ THIRD FETCH - PULL REQUESTS -----------------------//
const getPullRequest = (repos) => {
    repos.forEach((repo) => {
      fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`, options)
        .then((res) => res.json())
        .then((data) => {
        //   console.log('pull request third fetch', data);

        //Filter out pullrequests
          const pulls = data.find((pull) => pull.user.login === repo.owner.login)
          const myPullRequests = data.filter((pullRequest) => {
            return pullRequest.user.login === username
            })
            document.getElementById(`pull-request-${repo.name}`).innerHTML = `Pull Request: ${myPullRequests.length}`
            if (pulls) {
            getCommits(pulls.commits_url, repo.name)
            } else {
            document.getElementById(
              `commit-${repo.name}`).innerHTML += `no commits visible, pull request unavailable.`;
          }
        });

    });
  };
