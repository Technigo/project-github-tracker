//console.log('JS is here') // just test if JS is here

const USER = 'dandeloid'
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const profileContainer = document.getElementById('profile')
const projectsContainer = document.getElementById('projects')
const pullContainer = document.getElementById('pullRequests')

//fetch for profile name and profile picture
const getProfile = () => {
fetch (`https://api.github.com/users/${USER}`)
    .then(response => response.json())
    .then(data => {
        profileContainer.innerHTML = `
        <h2>${data.login}</h2>
        <img src=${data.avatar_url}>
        `
    })
}
getProfile()


//fetch for Technigo forked repos
const getRepos = () => {
    fetch (REPOS_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // data.forEach(repo => console.log(repo.name)) // logs all repos
            const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
            //forkedRepos.forEach(repo => console.log(repo.name))  //logs all filtered repo

            forkedRepos.forEach(repo => projectsContainer.innerHTML += `
            <h3>${repo.name}</h3>
            <h3>${repo.pushed_at.slice(0, 10)} - ${repo.pushed_at.slice(11, 16)}</h3>
            <h3>${repo.default_branch}</h3>
            <a href="${repo.html_url}">GitHub address</a>
            `)
            

            
            
            drawChart(forkedRepos.length)
            

        })

}
getRepos()









//fetch for Technigo pull requests
/* const getPullRequests = (repos) => {
    repos.forEach(repo => {
        fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls`)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            
            const pullReq = data.map(pull => pull.user.login.includes(repo.owner.login))
            pullReq.forEach(repo => pullContainer.innerHTML += `<h3>${repo.name}</h3>`)

        
        })
    })
} */
// getPullRequests(forkedRepos) <<< neeed to be in getRepos to invoke from there

