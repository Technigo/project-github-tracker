// define DOM selectors
const projectsContainer = document.getElementById('projects');
const generalInfoContainer = document.getElementById('generalInfo')


// URLs defined in variables
const USERNAME = 'JuliaNiki'
const REPOS_URL = `https://api.github.com/users/${USERNAME}/repos`
const GENERAL_URL = `https://api.github.com/users/${USERNAME}`


const getRepos = () => {
    fetch(REPOS_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
            forkedRepos.forEach(repo => {
                console.log(repo)
                //console.log('owner login', repo.owner.login)
                projectsContainer.innerHTML += `<div class ="my-divs" id='${repo.name}'>
                <a class="links" href ="${repo.html_url}" target="_blank"><h3 class="repo-name">${repo.name}</h3></a>
                <span class="repo-language-color"></span>
                <span class="language-name">${repo.language}</span>
                <h5>Updated: ${new Date(repo.pushed_at).toDateString()}</h5>
                <h5>Default branch: ${repo.default_branch}</h5>
                </div>`
                const repoLanguage = document.querySelector(".repo-language-color")
                console.log(repoLanguage)
                repoLanguage.style.backgroundColor = "yellow"
            })
            getPullRequests(forkedRepos)
            drawChart(forkedRepos.length)

        })
}
getRepos()

const getGeneralInfo = () => {
    fetch(GENERAL_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            generalInfoContainer.innerHTML += `
            <img class="profile-image" src = "${data.avatar_url} alt ="avatar"/>
            <div class="names" ><h1 class="name">${data.name}</h1>
            <h1 class="username">${data.login}</h1></div >
            <p class="bio">${data.bio}</p>
            <div class="location-info"><img class="location-icon" src="location.png" alt="location" /><p> ${data.location}</p></div>
            <div class="linkedin-info">
            <img class="linkedin-icon" src="chain.png" alt="location" /><a class="link-linkedin" href="${data.blog}">https://www.linkedin.com/in/julia-nikitinashlm/</a>
            </div>
                `
        })
}
getGeneralInfo()

const getPullRequests = (forkedRepos) => {
    forkedRepos.forEach((repo) => {
        fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                const myPulls = data.find(pulls => pulls.user.login === repo.owner.login)
                console.log(myPulls)
                const commitsURL = myPulls.commits_url
                console.log(commitsURL)
                getCommits(commitsURL, repo)
            })
    })
}
// display Number of commit messages for each repo
getCommits = (commitsURL, repo) => {
    fetch(commitsURL)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(data.length)
            //console.log('INFO', document.getElementById(`${repo.name}`))
            document.getElementById(`${repo.name}`).innerHTML += `<h5>This repo has been committed ${data.length} times</h5>`
            // console.log(data[data.length - 1].commit.message)
        })

}

