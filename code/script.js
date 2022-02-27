const username = 'JenFi72'
let reponame = ' '

const profileBox= document.getElementById('profileBox');
const profileImage = document.getElementById('profileImage')
const projectBox = document.getElementById('projects')
const repoName = document.getElementById('reponame')

const API_URL  = `https://api.github.com/users/${username}/repos`;
const PULL_URL  = `https://api.github.com/repos/Technigo/${reponame}/pulls`;
const PROFILE_URL  = `https://api.github.com/users/${username}`


//TOKEN

const options = {
    method: 'GET',
    headers: {
          Authorization: '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' // my TOKEN
      }
  }

//FETCH PROFILE
 const fetchProfile = () =>{
     fetch(PROFILE_URL)
     .then(res => res.json())
     .then(profileData => {

        profileBox.innerHTML +=`
        <img src="${profileData.avatar_url}" class='profile-image'>
        <h2>NAME: ${profileData.name}</h2>
        <p>USERNAME: ${profileData.login}</p>`
     });
 }

 fetchProfile();

//FETCH REPOS

const getRepos = () => {
fetch (API_URL, options)
.then(res => res.json())
.then(data => {
    const technigoRepos =data.filter(
        (repo) => repo && repo.name.startsWith ('project-')
    );

technigoRepos.forEach((repo) => {
    projectBox.innerHTML += `
    <div id=${repo.name} class ="repo-card">
    <h2>${repo.name} </h2>
    <p>Branch: ${repo.default_branch}</p>  
    <p>URL: ${repo.html_url}</p>
    <p> Main Language: ${repo.language}</p> 
    <p>Last push: ${new Date(repo.pushed_at).toDateString()}</p>
    <p id="commit-${repo.name}"> Number of commits: </p>   
    </div>
    `;
    getPullRequests(technigoRepos);
    drawChart(technigoRepos.length);  //* if this one is commented out, more projects will appear. Do not know why. 
        });

});
};

//FETCH THE PULL REQUESTS
const getPullRequests = (allRepos) => {
    allRepos.forEach((repo) => {
      fetch (`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=150`)
        .then((res) => res.json())
        .then((data) => {
          const myPullRequest = data.find(
            (pull) => pull.user.login === repo.owner.login
          );
  
          if (myPullRequest) {
            fetchCommits(myPullRequest.commits_url, repo.name);
          } else {
            document.getElementById(`commit-${repo.name}`).innerHTML =
              'No pull requests or closed';
          }
        });
    });
  };

//FETCH COMMITS
const fetchCommits = (urlMyCommits, myRepoName) => {
    fetch(urlMyCommits)
    .then((res) => res.json ())
    .then ((data) => {
        document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;   
        
    })
};

getRepos();

