const username = 'bostrombundock'
const API_URL = `https://api.github.com/users/${username}`
const REPOS_URL= `https://api.github.com/users/${username}/repos`
const commitsContainer=document.getElementById("commits")

//DOM-selector
const projectContainer = document.getElementById('project')
const profileContainer = document.getElementById("project")

const getUser = () => {
fetch(API_URL)
    .then(res => res.json())
    .then(data => {
profileContainer.innerHTML=`
    <h2> ${data.name}</h2>
    <img class="profile-picture" src="${data.avatar_url}" alt ="profile picture" />
    `
    })
}
    
 getUser()
 const getRepos = () => {
     fetch(REPOS_URL)
     .then(res => res.json())
     .then(data => {
    
       const forkedRepos = data.filter((repo) => {
           repo.fork && repo.name.startsWith('project-') 
           if(repo.name !=="Buzzfeed" && repo.name !=="unit-tests") {
            const date = new Date(repo.pushed_at).toLocaleDateString()
           projectContainer.innerHTML+=`
           <h3> <a href="${repo.html_url}" >   ${repo.name} </a> </h3>
           <p> updated at ${date} </p>
           `
           getCommits(repo)
           
        }
       })
     }) 
 
 }
getRepos()

const getCommits =(repo) => {

const COMMITS_URL= `https://api.github.com/repos/${username}/${repo.name}/commits`
            fetch(COMMITS_URL)
            .then(res => res.json())
            .then(data => {
            commitsContainer.innerHTML+=`
            <p>${repo.name} ${data.length} commits </p>
            `    
            })
        } 




