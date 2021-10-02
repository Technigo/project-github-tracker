// API`S and GLOBALS
const username = "pdetli"
const REPOS_URL = `https://api.github.com/users/${username}/repos`
const USER_BIO_API = `https://api.github.com/users/${username}`

// DOM SELECTORS
const projectsContainer = document.getElementById("projects")
const userInfoContainer = document.getElementById("userInfoContainer")

// FUNCTIONS

//fetch the username, bio and picture from github with json
const getUsernameAndImage = () => {
  fetch(USER_BIO_API)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      const pictureOfUser = data.avatar_url
      const userBio = data.bio
      const userLocation = data.location
      userInfoContainer.innerHTML += `
        <img class="user-picture" src="${pictureOfUser}" alt="Picture of gitHub-user"/>
        <div class= "user-information-container"> 
            <a class= "user-info-name" href="https://github.com/${username}" target="_blank"> @${username} </a>
            <p class= "user-info-bio"> < ${userBio} /> </p>
            <p class= "user-info-bio" style= "color:grey"> ${userLocation} </p>
         </div>
        `
    })
}

const getRepos = () => {
  fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      //to filter the data and to keep all the names start with project-
      //repo.fork === true and repo.fork gives the same result with "boolean is true"
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      )
      //dispay the repo names in the browser
      forkedRepos.forEach((repo) => {
        projectsContainer.innerHTML += `
                    <div class= project-card>
                        <a class= "project-names-with-pr" href="${
                          repo.html_url
                        }" target="_blank">${repo.name}</a>
                        <p> <a href="${
                          repo.homepage
                        }" target="_blank" class="view-live" >View it Live ▶ </a> </p>
                        <span class="repo-language"></span>
                        <span class="language-name"> ${repo.language}</span>
                        <p>Default branch: ${repo.default_branch} </p> 
                        <p> Recent push: ${new Date(
                          repo.pushed_at
                        ).toDateString()}</p>
                        <p class= "commits-info"id="commit-${repo.name}"> </p>
                    </div> 
                     `

        // display the most used language for each project and change the color depending on the language
        const repoLanguage = document.querySelectorAll(".repo-language")

        repoLanguage.forEach((span) => {
          if (span.nextElementSibling.innerText === "JavaScript") {
            span.style.backgroundColor = "#f1e05a"
          } else if (span.nextElementSibling.innerText === "HTML") {
            span.style.backgroundColor = "#e34c26"
          } else if (span.nextElementSibling.innerText === "CSS") {
            span.style.backgroundColor = "#664e88"
          }
        })
      })

      getPullRequests(forkedRepos)
      drawChart(forkedRepos.length) // draw chart with the forkedRepos data
    })
}

const getPullRequests = (allRepos) => {
  //Get all the PRs for each project.
  allRepos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        const myPullRequest = data.find(
          (pull) => pull.user.login === repo.owner.login
        )
        // Detect if we have pull request or not.
        // If yes - call fetchCommits function
        // If no - inform user that no pull request was yet done
        if (myPullRequest) {
          fetchCommits(myPullRequest.commits_url, repo.name)
        } else {
          document.getElementById(`commit-${repo.name}`).innerHTML =
            "No pull request yet done :("
        }

        /* 1. Find only the PR that you made by comparing pull.user.login with repo.owner.login
        2. Get the commits for each repo by using the commits_url as an argument to call another function
        3. we can also get the comments for each PR by calling another function with the review_comments_url as argument */
      })
  })
}

// fetch the number of commits
const fetchCommits = (myCommitsUrl, myRepoName) => {
  fetch(myCommitsUrl)
    .then((res) => res.json())
    .then((data) => {
      let commitMessage = data[0].commit.message
      document.getElementById(
        `commit-${myRepoName}`
      ).innerHTML += ` <p class= commits-info> Number of commits: ${data.length} </p> `
    })
}

getUsernameAndImage()
getRepos()
