const username = 'EmmaaBerg'
const API_URL_REPOS = `https://api.github.com/users/${username}/repos`

fetch(API_URL_REPOS)
.then((resp) => resp.json())
.then((allRepos) =>{
    console.log(allRepos)
})
