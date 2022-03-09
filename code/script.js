// DOM-selectors stored as variables
const userContainer = document.getElementById('user-container')
const projectsContainer = document.getElementById('projects-container')

// global variables + storing API
const username = 'mathildakarlsson'
const API_USER = `https://api.github.com/users/${username}`
const API_REPOS = `https://api.github.com/users/${username}/repos`

//personal token
const options = {
    method: 'GET',
    headers: {
          Authorization: `token ${GITHUBTOKEN}`
      }
  } 

// step 1 - fetch user
const getUser = () => {
    fetch(API_USER, options)
    .then(res => res.json())
    .then(data => {
        userContainer.innerHTML += `
        <img class="user-img"src="${data.avatar_url}">
        <div class="github-user">
            <a href="https://github.com/"><img class="github-logo" src="images/GitHub-Mark-32px.png"></a>
            <a href="https://github.com/mathildakarlsson" class="user-name">${data.login}</a>
        </div>
        `
    })
}
getUser()

//step 2 - fetch repos and filter + open/closing accordion
const getRepos = () => { 
    fetch(API_REPOS, options)
    .then(res => res.json())
    .then((data) => {
        const filteredRepos = data.filter((repo) => repo.fork && repo.name.startsWith('project'))
        filteredRepos.forEach((repo) => {
            projectsContainer.innerHTML += `
            <div class="repos">
                <button class="project-name">${repo.name}</button>
                <div class="panel">
                    <a href="${repo.html_url}">
                    <p>Link to repo</p></a>
                    <p>Branch: ${repo.default_branch}</p>
                    <p>Main language: ${repo.language}</p>
                    <p id="commit-${repo.name}"> Number of commits: </p>
                    <p>Latest push: ${new Date(repo.pushed_at).toDateString()}</p>
                </div>
            </div>
            `

        //open and close accordion with project info
        const acc = document.getElementsByClassName("project-name")
        let i
        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active")
                const panel = this.nextElementSibling
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px"
                } 
            })
        }
        })
    getPullRequests(filteredRepos)
    drawChart(filteredRepos.length) 
    })
}

getRepos()

// step 3 - fetch pull requests
const getPullRequests = (filteredRepos) => { 
    filteredRepos.forEach(repo => {
        fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`, options)
        .then(res => res.json())
        .then(data => {
            const myPullRequests = data.find((pull) => pull.user.login === repo.owner.login)
            if (myPullRequests) {
                getCommits(myPullRequests.commits_url, `${repo.name}`)
            } else {
                document.getElementById(`commit-${repo.name}`).innerHTML += 
                `commits made by group partner`
            }
        })

//step 4 - fetch commits and display number
const  getCommits = (URL, repoName) => { 
        fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`, options)
        .then(res => res.json())
        .then(data => {
            document.getElementById(`commit-${repo.name}`).innerHTML += data.length
        })
        }
    })
}
                    