

const username = 'LovisaBrorson'
const USER_INFO = `https://api.github.com/users/${username}` //Profilepicture and username
const API_URL_REPOS = `https://api.github.com/users/${username}/repos` // Get the forked repos
const userContainer = document.getElementById('userContainer')
//const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls` // ej klar, gör en loop för att hämta upp alla mina rep.
// const API_KEY =

//let reponame

//const API_TOKEN = TOKEN || process.env.API_KEY;
//console.log(TOKEN)

const options = { //opject
    method: 'GET', //Kan också var apost, patch, delete
     headers: {
        //Authorization: `token ${API_TOKEN}`
    }
}

//User information, profilepicture and username
 const profileInfo = () => {
    fetch(USER_INFO, options)
     .then((res) => res.json())
     .then((profileData) => {
         userContainer.innerHTML +=
         `<img src="${profileData.avatar_url}" class="user-image" alt="Profile picture"/>
         <h2 class="user-name"> Username: ${profileData.login}</h2>`
        console.log(profileData)
     })
 }

 profileInfo()

//Funktion that get the repos from Github
const getRepos = () => {

    fetch(API_URL_REPOS)
    .then((res) => res.json())
    .then((reposData) => {
        console.log(reposData)
        const forkedRepos = reposData.filter((repo) => repo.fork && repo.name.startsWith("project-"))
        
        forkedRepos.forEach(repo => {
        projectsContainer.innerHTML += 
       `
       <a class="project-link" href="${repo.html_url}" target="_blank"> 
       <div class="forkedrepo-div">
            <h2 class="project-name"> ${repo.name}</h2>
            <p class="project-info"> Default branch: ${repo.default_branch}</p>
            <p class="project-info"> Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
            <p class="project-info" id="commits-${repo.name}"> Amount of commits: </p>  
        </div> `
       })
    })

}    

getRepos()