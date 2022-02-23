// Endpoint to get all your repos
// https://api.github.com/users/${username}/repos

// Endpoint to get all PRs from a Technigo repo https://api.github.com/repos/Technigo/${reponame}/pulls

// To get the comments from a PR, you need to get the URL from the review_comments_url property in the PR json object. It might look something like this: https://api.github.com/repos/Technigo/project-news-site/pulls/247/comments 
// and then do a fetch with that url.

// To get the commits from a PR, you need to get the URL from the commits_url property in the PR json object. It might look something like this:
// https://api.github.com/repos/Technigo/project-news-site/pulls/227/commits
// and then do a fetch with that url.

//<-------- START HERE ------->
// const projects = document.getElementById('projects')
const projectName = document.getElementById('projectName')

const GET_REPOS = ('https://api.github.com/users/rawisou/repos')

    fetch(GET_REPOS) 
      .then((res) => res.json()) 
      .then((data) => {
        technigoProjects = data.filter(
        (project) => project.fork && project.full_name.includes("project-")
      )
        technigoProjects.forEach((item) => {
          projectName.innerHTML += `<h2>${item.full_name.replace('rawisou/', '')}</h2> 
          `
          console.log(item.full_name)
        })
    }
  )




  // Another way of doing it
  // for (let n = 0; n < technigoProjects.length; n++) {
  //   numProjects.innerHTML = `<h2>${technigoProjects[n].full_name}</h2>`
  // }
  

  // console.log(technigoProjects)
  // technigoProjects.forEach((item) => {
  //   numProjects.innerHTML = `<h2>${item.full_name.replace('rawisou/', '')}</h2> 
  //   `
  //   console.log(item.full_name)
  // })