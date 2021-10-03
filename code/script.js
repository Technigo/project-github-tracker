const USER = 'lenisili'
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const USER_URL = `https://api.github.com/users/${USER}`

const projectsContainer = document.getElementById('projects');
const profileContainer = document.getElementById('profile-container')

const userProfile = () => {
    
    fetch (USER_URL)
    .then (response => response.json())
    .then (data => {
      profileContainer.innerHTML+= `
      <div class="profile-wrapper" id="profile-wrapper">
        <div class="profile-photo" id=" profile-image">
          <img src="https://avatars.githubusercontent.com/u/84474447?v=4" alt="Profile Picture of User" >
        </div>
        <div class="profile-username" id ="profile-username">
          <div class="user-name">Username: <span class="space">${data.login}</span></div>
          <div class="real-name">Name: <span class="space">${data.name}</span></div>
          <div class="location">Living and working in: <span class="space">${data.location}, CH</span></div>
        </div>
    </div>
    <div class="profile-text" id="profile-text">
      <p> ${data.bio}</p>
    </div>`
    })
  }
  userProfile()

const fetchRepositories = () => {
    fetch(REPOS_URL)
        .then((res) => res.json())
        .then((data) => {
            const technigoRepositories =data.filter(repo => 
                repo.name.includes('project-') && repo.fork === true
            );

            technigoRepositories.forEach(repo => {
                projectsContainer.innerHTML += `
                <div id ${repo.name} class="repo-card">
                    <h2>${repo.name}</h2>
                    <p>Branch: ${repo.default_branch}</p>  
                    <p> Main Language: ${repo.language}</p> 
                    <p>Last push: ${new Date(repo.pushed_at).toDateString()}</p>
                    <p id="commit-${repo.name}"> Number of commits: </p>    
                    <p> <a href="${repo.html_url}"> See repo</a></p>
                </div>
                `;
            });

            fetchPullRequests(technigoRepositories);
            drawChart(allRepositories.length);
        });
};

const fetchPullRequests = (allRepositories) =>{
    allRepositories.forEach((repo) => {
        const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`
        
        fetch(PULL_URL)
        .then((res) => res.json())
        .then ((data) => {
            const myPullRequest = data.find((pull) => 
                pull.user.login === repo.owner.login
            );
        fetchCommits(myPullRequest.commits_url, repo.name);
        });
    });
};

const fetchCommits = (myCommitsUrl, myRepoName) => {
        fetch(myCommitsUrl)
        .then((response) => response.json())
        .then (data => {
            document.getElementById(`commit-${myRepoName}`).innerHTML += data.length
      });
    }
fetchRepositories();

