const USER = "waliem"
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const USER_INFO_URL = `https://api.github.com/users/${USER}`
// let repoName = repo.name

const projectsContainer = document.getElementById("projects")
const userContainer = document.getElementById("user-info")

const getUserInfo = () => {
  fetch(USER_INFO_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log("USER DATA HERE", data)
      userContainer.html += `<h2>User name: ${data.name}</h2>
     <img src="https://avatars.githubusercontent.com/u/84201089?v=4" alt="User profile picture">`
    })
}

const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      let forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      )
      forkedRepos.forEach(
        (repo) => (projectsContainer.innerHTML += `<h3>${repo.name}</h3>`)
      )
      drawChart(forkedRepos.length)
      getPullRequests(forkedRepos)
    })
}

//Remember to pass along your filtered repos as an argument when
//you are calling this function

const getPullRequests = (forkedRepos) => {
  forkedRepos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        const myPr = data.filter((pull) => pull.user.login === repo.owner.login)
        console.log("MY PRs", myPr)

        fetch(`https://api.github.com/repos/${USER}/${repo.name}/commits`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            const filterCommits = data.filter(
              (repo = repo.commit.committer.name === "Emelie")
            )
          })

        //2. Now you're able to get the commits for each repo by using
        // the commits_url as an argument to call another function
        //3. You can also get the comments for each PR by calling
        // another function with the review_comments_url as argument
      })
  })
}
getUserInfo()
getRepos()
