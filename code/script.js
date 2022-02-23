// DOM selectors
const projects = document.getElementById('projects')
const username = 'idanaslund'


//const API_TOKEN = TOKEN OR process.env.API_KEY
//console.log(TOKEN)

let API_URL = `https://api.github.com/users/${username}/repos`

//Get the token here!!
//const options = {
   // method: 'GET',
   // headers: {
        //Authorization: `token ${API_TOKEN}`
    //}
//}

const addingProfile = () => {
    profile.innerHTML += `Username: ${username}`
}
addingProfile()

const findingAllRepos = () => {

fetch(API_URL)
.then((res) => res.json())
.then((repos) => {
    console.log(repos)


    repos.forEach((repo) => {
    projects.innerHTML += `<div class="repos"><h4>${repo.name}<h4></div>`}) 
})

 //How to get the reponame here?
 let API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`

    fetch(API_URL_PR)
     .then((res) => res.json())
     .then((pulls) => {
    console.log(pulls)
    

 })

}
findingAllRepos()



// Eventlisteners