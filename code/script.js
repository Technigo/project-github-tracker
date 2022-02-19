

const personalInfo = document.getElementById('personalInfo');
const projectsContainer=document.getElementById('projects');
const USER='jessicatf';
const USER_URL = `https://api.github.com/users/${USER}`;
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;



//User data

const getUserData = () => {
    fetch(USER_URL)
      .then((response) => response.json())
      .then((data) => {
        personalInfo.innerHTML = `
        <div class="personal-info">    
        <img class="img" src="${data.avatar_url}">
        <h2 class="info"> ${data.login}</h2>
      </div
       `
      })
  }

  //get repositories from Technigo starting with "project"

const fetchRepositories = () => {
    fetch(REPOS_URL)
    .then ((res)=>res.json())
    .then((data) => {
       
      const technigoRepositories = data.filter(
          (repo) => repo.name.includes('project-')&& repo.fork
          );
            
            drawChart(technigoRepositories.length)
            
            technigoRepositories.forEach(repo=>{
            projectsContainer.innerHTML += `
            <div class="commits-row">
            <a href="${repo.html_url}">
            <h6>${repo.name} </h6></a>
                <p>Default branch:  ${repo.default_branch}</p>
                
                <p>Recent push: ${new Date(repo.pushed_at).toDateString(
                    
                )}</p>
                <p id="commit-${repo.name}">Commits amount: </p>
            </div>
            `;
           
        });

        fetchPullRequestsArray(technigoRepositories); 
    });
};


const fetchPullRequestsArray = (allRepositories) => {
   allRepositories.forEach((repo) => {
       const PULL_URL=`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`
    
    fetch(PULL_URL)
    .then((res) => res.json())
    .then((data) => {
      
        
        const myPullRequest = data.find(
            (pull) => pull.user.login===repo.owner.login
    );
     
   
				if (myPullRequest) {
					fetchCommits(myPullRequest.commits_url, repo.name);
				} else {
					document.getElementById(`commit-${repo.name}`).innerHTML =
						'No pull request or commits done.';
				}
    
            });
        });
};   


const fetchCommits =  (myCommitsUrl,myRepoName) => {
    fetch(myCommitsUrl)
    .then((res)=>res.json())
    .then((data)=> {
    document.getElementById(`commit-${myRepoName}`).innerHTML+=data.length;
    });                 
    
};

fetchRepositories();
getUserData();




















/*Jennie
const projectsContainer=document.getElementById('projects')
const repoName= document.getElementById(repoName)




//Jennies
const getRepos = () => {

    fetch(REPOS_URL,options)
    .then(response =>response.json())
    .then(data => {
        console.log(data)
        const repoName=data.forEach(repo => console.log(repo.name))
        const forkedRepos = data.filter(repo => 
            repo.fork && repo.name.startsWith('project-'))
        forkedRepos.forEach(repo =>  projectsContainer.innerHTML += `<h3>${repo.name}</h3>` )
        drawChart(forkedRepos.length)
        getPullRequests (forkedRepos)
        
    })
}
getRepos()

*/

