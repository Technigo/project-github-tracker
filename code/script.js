const projects = document.getElementById("projects")
const profile = document.getElementById("profile")
const profileContainer = document.getElementById("profile-container")
const test = document.getElementById("test")
const userName = 'HedvigM'


//^^^^^^^^^^^^^^^^^^^^^^ REPOS ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//

const repos = `https://api.github.com/users/${userName}/repos`
fetch(repos)
  .then(response => response.json())
  .then(data => {

      //Fetching only the forked repos
      const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project'))

    //Username and userpic
    profileContainer.innerHTML+= `
      <img class="img" src="${data[0].owner.avatar_url}" alt="profile picture"> 
      <h2 class="profile-name">${data[0].owner.login}</h2>
    ` 

    // Repos and pulls
    forkedRepos.forEach((repo) => projects.innerHTML += `
      <div class="repos" id="repos">
        <a href="${repo.html_url}"><h3>${repo.name}</h3></a>
        <p>The default branch is: ${repo.default_branch}</p>
        <p>The latest push: ${repo.pushed_at.substring(0, 10)}</p>
        <p id="pull-${repo.name}">No pull request is yet made 🤷 </p>
        <p id="commit-${repo.name}">ooops, there are no commits in this projet</p>
      </div>
    `)
   
      // substring(0, 10) - betyder att vi tar bort de tecknen som kommer efter 10st. 

    drawChart(forkedRepos.length)
    getPullRequests(forkedRepos)
    getCommitsForPullRequests(forkedRepos)
  })
  





//^^^^^^^^^^^^^^^^^ fetching pull requests ^^^^^^^^^^^^^^^^^^^^^^^^^^//
const getPullRequests = (repos) => {
  //Get all the PRs for each project.
  repos.forEach(repo => {
    fetch('https://api.github.com/repos/technigo/' + repo.name + '/pulls?per_page=100')
    .then(res => res.json())
    .then(fetchedPulls => {
      const hedvigsPulls = fetchedPulls.filter(fetchedPull => fetchedPull.user.login === repo.owner.login) 
          
         document.getElementById(`pull-${repo.name}`).innerHTML =
        `Pull request was made ${hedvigsPulls[0].created_at.substring(0, 10)}`;
        //allt som skrivs inom parentesen efter get ElementById är en del av   ID:t.

      getCommitsForPullRequests(hedvigsPulls)
      
    })
  })
}



const getCommitsForPullRequests = (pullRequests, hedvigsPulls) => {
  pullRequests.forEach(pullRequest => {
    fetch(pullRequest.commits_url)
    .then(res => res.json())
    .then(fetchedCommits => {
     /*  console.log('FETCHED COMMITS', fetchedCommits)
      document.getElementById(`commit-${repo.name}`).innerHTML =
      `Number of commits in this project: ${fetchedCommits.length}`; */ 
      projects.innerHTML += `
      <p>Number of commits in this project: ${fetchedCommits.length}</p>
      `
      
    })
  })
} 



















