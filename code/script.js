//DOM-selectors
const profileInfo = document.getElementById("profile")
const list = document.getElementById("list")

//Github
const USER = 'Elsa-Johanna'
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const API_MY_PROFILE = 'https://api.github.com/users/Elsa-Johanna'

//User
const getUser = () => {
    fetch(API_MY_PROFILE)
      .then((response) => response.json())
        .then((data) => {
              
            
        profileInfo.innerHTML = 
            `<img src="https://github.com/Elsa-Johanna.png" alt="Profile picture">
            <h4> ${data.name}</h4>
            <h4> <a href="${data.html_url}">${data.login}</a></h4>`  
    })
}

  //Fetches
const getRepos = () => {
    fetch(REPOS_URL)
    .then(response => response.json())
    .then(data => {
    
        const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
        const forkedSortedRepos = forkedRepos.sort(sortingFunctionFromStackOverflow)
        forkedSortedRepos.forEach(repo => list.innerHTML += `
                <div class="projects">
                 <h3><a href="${repo.html_url}">${repo.name} 
                 with default branch ${repo.default_branch}</h3></a>
                 <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
                 <p id="pull-request-${repo.name}"></p>
                 <p id="commits-${repo.name}"></p>
                </div>`)
        drawChart(forkedSortedRepos.length)
        fetchPullRequest(forkedSortedRepos)
        addCommits(forkedSortedRepos)
    })
}

const fetchPullRequest = (allRepos) => {
    allRepos.forEach(repo => {
        fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
        .then((res) => res.json())
        .then((data) => { 
            const myPullRequests = data.filter((pullRequest) => pullRequest.user.login === USER)
            document.getElementById(`pull-request-${repo.name}`).innerHTML = `Pull Requests: ${myPullRequests.length}`
        
        })
    })
}

const addCommits = (allRepos) => {
    allRepos.forEach(repo => {
        fetch(`https://api.github.com/repos/${USER}/${repo.name}/commits`)
        .then((res) => res.json())
        .then((data) => { 
            document.getElementById(`commits-${repo.name}`).innerHTML = `commits: ${data.length}`
        
        })
    })
}

function sortingFunctionFromStackOverflow(a, b) {
    return new Date(a.created_at) - new Date(b.created_at)
}

//invoking functions
getUser()
getRepos()