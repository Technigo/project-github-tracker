// DOM selectors
const projects = document.getElementById('projects')
const username = 'idanaslund'
const profile = document.getElementById('profile')

let API_URL = `https://api.github.com/users/${username}/repos`


//Get the token here!!
const options = {
    method: 'GET',
    headers: {
        Authorization: `token ${API_TOKEN}`
    }
}

const addingProfile = () => {
    fetch(`https://api.github.com/users/${username}`, options)
    .then((res) => res.json())
    .then((profileInfo) => {
        console.log (profileInfo)
        profile.innerHTML += `
        <img src="${profileInfo.avatar_url}">
        <a href="${profileInfo.html_url}">${profileInfo.login}</a>`
    }) 
}
addingProfile()

const findingRepos = () => {

fetch(API_URL, options)
.then((res) => res.json())
.then((repos) => {
    console.log(repos)
    console.log(API_TOKEN)

    const forkedRepos = repos.filter(
        repo => repo.fork && repo.name.startsWith('project-')
        ) 
        
    forkedRepos.forEach((repo) => {
        console.log(forkedRepos)
        let updated = new Date(repo.updated_at)
    projects.innerHTML += `
    <div class="repos" id="repoDiv">
    <h4>${repo.name}</h4>
    <form id="repoForm" label="projects">
     <ul id="list">
        <li>Most recent update: ${updated}</li>
        <li>Default branch: ${repo.default_branch}</li>
        <li><a href=${repo.html_url} target="_blank">Link to repo</a></li>
     </ul>
    </form>
    </div>`

 })
})
   // findingCommits(forkedRepos)
}
    findingRepos()


const findingPulls = (repo) => {
    fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls`, options)
    .then((res) => res.json())
    .then((data) => {
        const commits = document.getElementById(`commit-${repo.name}`)

        const pulls = data.fins((pull)=> pull.user.login === repo.owner.login)

        fetchCommits(pulls.commits_url, repo.name)
        console.log(pulls.commits_url)

    })

}

findingPulls()

  const findingCommits = (myCommitsUrl, myRepoName) => {
        fetch(myCommitsUrl, options)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            document.getElementById(`commit-${myRepoName}`).innerHTML += data.length

})
}
findingCommits()






// Eventlisteners