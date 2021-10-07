const USER = 'JessicaNordahl';
const USER_URL = `https://api.github.com/users/${USER}`
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;

const projectsContainer = document.getElementById('projects');
const profileContainer = document.getElementById('profile-container')

const userProfile = () => {
    fetch(USER_URL)
    .then((res) => res.json())
    .then((data) => {
      profileContainer.innerHTML+= /*html*/`
        <div class="profile-card" id="profile-wrapper">
            <div class="profile-photo" id=" profile-image">
                <img src="https://avatars.githubusercontent.com/u/80691341?v=4" alt="Profile Picture of User" >
        </div>
            <div class="profile-username" id ="profile-username">
            <div class="user-name">Username: <span class="space">${data.login}</span></div>
            <div class="real-name">Name: <span class="space">${data.name}</span></div>
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
        const myTechnigo = data.filter((repo => 
            repo.name.includes("project-") && 
            repo.fork)
            );

            myTechnigo.forEach((repo => {
                projectsContainer.innerHTML += /*html*/`
                 <div class="repos">  
                    <a href="${repo.html_url}">${repo.name} with default branch ${repo.default_branch}</a>
                        <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
                        <p id="commit-${repo.name}">Commits amount: </p>
                 </div>
                `;
            }));
        fetchPullRequests(myTechnigo);    
    });
};

const fetchPullRequests = (allRepositories) => /*html*/{
  console.log('allRepositories', allRepositories);
     allRepositories.forEach(repo => {
        fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
        .then((res) => res.json ())
        .then((data) => {
            const myPullRequest = data.find(pull => pull.user.login===repo.owner.login
                );

             fetchCommits(myPullRequest.commits_url, repo.name);
         });    
    });
};

const fetchCommits = (myCommitsUrl, myRepoName) => {
    fetch(myCommitsUrl)
    .then((res) => res.json ())
    .then(data => {
      document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;
    });
    console.log(fetchCommits)
};

fetchRepositories(); 
drawChart(allRepositories.length);

//Above is according to M video


