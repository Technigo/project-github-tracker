

//Endpoint to get all PRs from a Technigo repo `https://api.github.com/repos/technigo/${reponame}/pulls`

//To get the comments from a PR, you need to get the URL from the `review_comments_url` property in the PR json object. It might look something like this: `https://api.github.com/repos/Technigo/project-news-site/pulls/247/comments` and then do a fetch with that url.

//To get the commits from a PR, you need to get the URL  from the `commits_url` property in the PR json object. It might look something like this:`https://api.github.com/repos/Technigo/project-news-site/pulls/227/commits` and then do a fetch with that url.


const projects = document.getElementById("projects")
const profile = document.getElementById("profile")
const profileContainer = document.getElementById("profile-container")

//^^^^^^^^^^^^^^^^^^^^^^ REPOS ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
const repos = 'https://api.github.com/users/HedvigM/repos'
fetch(repos)
  .then(response => response.json())
  .then(data => {
  //Username and userpic
  profileContainer.innerHTML+= `
  <h2>${data[0].owner.login}</h2>
  <img src="${data[0].owner.avatar_url}" alt="profile picture">  
  `   
    const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project'))
      /* console.log(forkedRepos) */
      forkedRepos.forEach(repo => projects.innerHTML += `
      <div class="repos">
        <h3>${repo.name}</h3>
        <p>${repo.default_branch}</p>
        <a href="${repo.html_url}">Check the project out!</a>
        <p>${repo.pushed_at}</p>
        
      </div>
      `)
      drawChart(forkedRepos.length)
  })
  