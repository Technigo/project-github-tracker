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
            <p class= "user-info-bio"> < ${userBio} />   </p>
            <p class= "user-info-bio" style= "color:grey"> ${userLocation}    </p>
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
                        <span class="repo-language"></span>
                        <span class="language-name"> ${repo.language}</span>
                        <p>Default branch: ${repo.default_branch} </p> 
                        <p> Recent push: ${new Date(
                          repo.pushed_at
                        ).toDateString()}</p>
                        <p class= "commits-info"id="commit-${repo.name}"> </p>
                     `

        const repoLanguage = document.querySelectorAll(".repo-language")
        //An array for only forEach method
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
                   2. Now you're able to get the commits for each repo by using the commits_url as an argument to call another function
                   3. You can also get the comments for each PR by calling another function with the review_comments_url as argument */
      })
  })
}
const fetchCommits = (myCommitsUrl, myRepoName) => {
  fetch(myCommitsUrl)
    .then((res) => res.json())
    .then((data) => {
      let commitMessage = data[0].commit.message
      document.getElementById(
        `commit-${myRepoName}`
      ).innerHTML += ` <p class= commits-info> Number of commits: ${data.length} </p> `

      /* <h3 class= commits-message> ${commitMessage} </h3>   */
    })
}

getUsernameAndImage()
getRepos()

/* 
🔵  Blue Level (Minimum Requirements)**

Your page should include:

- A list of all repos that are forked from Technigo
- Your username and profile picture
- Most recent update (push) for each repo
- Name of your default branch for each repo
- URL to the actual GitHub repo
- Number of commits for each repo
- It should be responsive (mobile first)
- A visualisation, for example through a pie chart, of how many projects you've done so far, compared to how many you will do (in total it will be 19 weekly projects 🥳) using [Chart.js](https://www.chartjs.org/).

Make sure you've committed and pushed a version of your project before starting with the intermediary and advanced goals.

🔴  Red Level (Intermediary Goals)**

- Sort your list in different ways.
**Example of what you can sort by:** creation date, name, most commits, followers or stargazers
- Create the opportunity to filter the repos based on a condition, e.g. only JavaScript repos
- Display the actual commit messages for each repo in a good way. Maybe by adding a modal (popup) or an accordion?
- Display the comments you got from each pull request
- When you're browsing through the repo object, you'll see that there's a lot of data that we can use. Create a chart over some of the data.
**Example of data to use:** Repo size, people that starred your repo (stargazers) or amount of commits on each repo.

⚫  Black Level (Advanced Goals)**

- Implement a search field to find a specific repo based on name */
