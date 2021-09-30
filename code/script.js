const USER = 'silvertejp89'
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const PROFILE_URL = `https://api.github.com/users/${USER}`
const projectContainer = document.getElementById('projects')
const profileInfo = document.getElementById("profile");

const getProfile = () => {
    fetch(PROFILE_URL)
    .then(Response => Response.json())
    .then(data => {
        console.log(data)
    }) 
}
getProfile() //testing to show profile info like repos 


const getRepos = () => {
    fetch(REPOS_URL)
    .then(response => response.json())
    .then(data => {
        console.log(data) //so we can see all the info 

        
        const forkedRepos = data.filter(
            (repo) => repo.name.includes('project-') && repo.fork
			);

        forkedRepos.forEach(repo => 
        projectContainer.innerHTML += `
        <div>
          <a href="${repo.html_url}">${repo.name} with default branch ${repo.default_branch} </a>
        <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>      
          </div
        `) //create div for card

        
        // const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-')) 
        // forkedRepos.forEach(repo => projectContainer.innerHTML += `<h3>${repo.name}</h3>`) //create div for card



        drawChart(forkedRepos.length) // needs to see const forkedRepos
 
    })
}
getRepos() //invoking getRepos







