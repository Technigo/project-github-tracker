// DOM SELECTORS
const projectsContainer = document.getElementById('projects')

// GLOBAL VARIABLES
const username = 'joannalodell19'
let filteredRepo = [] // Probably not needed

// let reponame = ''
const API_URL = `https://api.github.com/users/${username}/repos`
const API_PROFILE = `https://api.github.com/users/${username}`

const API_TOKEN = TOKEN || process.env.API_KEY;

const options = {
    method: 'GET',
    headers: {
        Authorization: `token ${API_TOKEN}`
    }
}

const profilePic = () => {
    fetch(API_PROFILE)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            picture = data.avatar_url
    let profilePicture =    `<div class = "photobox">
                            <p>${username}</p>
                                <img class = "photo" src="${picture}" />
                            </div>`;
    return (projects.innerHTML = profilePicture)
})
}

profilePic() 

const getRepos = () => {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        console.log('unfiltered data', data)

        const forkedRepos = data.filter(repo => repo.fork = true)
        console.log('data filtered by forks', forkedRepos)

        const filteredRepo = forkedRepos.filter(repo => repo.name.startsWith('project-') === true)
        console.log('data filtered on projects', filteredRepo)

        filteredRepo.forEach(repo => {
            console.log(repo.commits_url)
            projectsContainer.innerHTML += `
            <div class="repo" id=${repo.name}>
            <a href="${repo.html_url}"><h3>${repo.name}</h3></a>
            <p> Default branch: ${repo.default_branch}</p>
            <p> Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
            <p id='commit-${repo.name}'> Number of commits: </p>
            </div>
            `  
        })
        getPullRequests(forkedRepos);
        // drawChart(forkedRepos.length);
    })
}


getRepos()

// Pull requests for each project
const getPullRequests = (repos) => {
    repos.forEach((repo) => {
      const PULLREQUEST_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`;
      fetch(PULLREQUEST_URL, options)
        .then((res) => res.json())
        .then((pull) => {
          const myPullRequest = pull.find(
            (pull) => pull.user.login === repo.owner.login
          );
  
          // If pull request done by user, getCommits function is invoked
          if (myPullRequest) {
            getCommits(myPullRequest.commits_url, repo.name);
          } else {
            document.getElementById(`commit-${repo.name}`).innerHTML =
              "No pull request done by user";
          }
        });
    });
  };
  
  const getCommits = (myCommitsUrl, myRepoName) => {
    fetch(myCommitsUrl)
      .then((res) => res.json())
      .then((commit) => {
        document.getElementById(`commit-${myRepoName}`).innerHTML +=
          commit.length;
      });
  };