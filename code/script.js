const username = 'Nosslexa'
//let reponame = ''
const API_URL = `https://api.github.com/users/${username}/repos`




// This function fetch all my repos and then filters out the ones forked = true and starts with "project-"
const getRepos = () => {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        console.log(data[0].owner)
        
        const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith("project-"))
        console.log(forkedRepos)
        
        
        getPullRequests(forkedRepos)
        
    })
}

const getPullRequests = (forkedRepos) => {
    forkedRepos.forEach(repo => {
        fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    })
}

getRepos()




















