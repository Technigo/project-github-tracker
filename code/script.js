const projects = document.getElementById("projects")
const profile = document.getElementById("profile")
const profileContainer = document.getElementById("profile-container")
const projectContainer = document.getElementById("project-container")
const test = document.getElementById("test")
const userName = 'HedvigM'


//^^^^^^^^^^^^^^^^^^^^^^ REPOS ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//

const repos = `https://api.github.com/users/${userName}/repos`
fetch(repos)
  .then(response => response.json())
  .then(data => {

      //Fetching only the forked repos and the ones starts with "project" from my GitHub account. 
      const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project'))
      // change back to only "project" later 

    //Username and userpic
    profileContainer.innerHTML+= `
      <img class="img" src="${data[0].owner.avatar_url}" alt="profile picture"> 
      <h2 class="profile-name">${data[0].owner.login}</h2>
    ` 

    // Repos and fetched pulls from the functions down under.
    forkedRepos.forEach((repo) => projects.innerHTML += `
      <div class="repos" id="repos">
        <a href="${repo.html_url}"><h3>${repo.name.substring(8).replace("-"," ")}</h3></a>
        <p>The default branch is: ${repo.default_branch}</p>
        <p>The latest push: ${new Date(repo.pushed_at).toLocaleDateString()}</p>
        <p id="pull-${repo.name}">No pull request is yet made 🤷 </p>
        <p id="commits-${repo.name}">There are no commits yet...</p>
      </div>
    `)
  
    drawChart(forkedRepos.length)
    getPullRequests(forkedRepos)
    //getCommitsForPullRequests(forkedRepos)
  })
  

//^^^^^^^^^^^^^^^^^ fetching pull requests ^^^^^^^^^^^^^^^^^^^^^^^^^^//
const getPullRequests = (repos) => {
  //Get all the PRs for each project.
  repos.forEach(repo => {
    fetch('https://api.github.com/repos/technigo/' + repo.name + '/pulls?per_page=100')
    .then(res => res.json())
    .then(fetchedPulls => {
      const hedvigsPulls = fetchedPulls.filter(fetchedPull => fetchedPull.user.login === repo.owner.login) 
      //This fetch is fetching all the pulls at the technigo user, so we have to sort everyone exept my user out "of the bag". Only my pulls for each project will show after this "hedvigsPulls" function. 
          
      document.getElementById(`pull-${repo.name}`).innerHTML = `Pull request was made ${new Date (hedvigsPulls[0].created_at).toLocaleDateString()}`;
      //allt som skrivs inom parentesen efter get ElementById är en del av   ID:t.

      getCommitsForPullRequests(hedvigsPulls, repo)
      
    })
  })
}

//^^^^^^^^^^^^^^^ fetching commits from the pull requests ^^^^^^^^^^^^^^^^^//
//Funktionen skall ta infon från det sorterade pullrequestet(hedvigsPulls) och sortera fram mitt commit_url från det.
const getCommitsForPullRequests = (pullRequests, repo) => {
  pullRequests.forEach(pullRequest => {

    fetch(pullRequest.commits_url)
    .then(res => res.json())
    .then(fetchedCommits => {
  
      document.getElementById(`commits-${repo.name}`).innerHTML = `Number of commits: ${fetchedCommits.length}`;
      //Funktionen skall gå ner en nivå till och bara visa commits_URL

    })
  })
}




  
    
 
      
      
      

