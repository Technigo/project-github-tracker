
//DOM selectors

const myProjects = document.getElementById('projects')
const userInfo = document.getElementById('user-info')

// ### What to include

// - A list of all repos that are forked ones from Technigo
// - Your username and profile picture
// - Most recent update (push) for each repo
// - Name of your default branch for each repo
// - URL to the actual GitHub repo
// - Number of commit messages for each repo
// - All pull requests
// - A chart of how many projects you've done so far, compared to how many you will do


const username = 'Dorothea-B'
const API_URL_USER = `https://api.github.com/users/${username}`
const API_URL = `https://api.github.com/users/${username}/repos`
//const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`
//PR is for Pull Requests - not Projects! 

let reponame

fetch(API_URL_USER)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        //User info
        userInfo.innerHTML += 
        `<img class="userPicture" src=${data.avatar_url}
        <div class="userName">${data.name}</div>`
    })

fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        console.log(data)

        //HERE STARTS THE PROJECTS
        for (let i = 0; i < data.length; i++)

        myProjects.innerHTML += 
        `<div class="project">
        <div class="repoName">${data[i].name}</div>
        <div class="repoUrl">${data[i].git_url}</div>

        </div>`
        
        
        reponame = data[4].name
        //Later have to make a loop for this

       // console.log(data[5].name)
       // console.log(reponame)

       const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`

        fetch(API_URL_PR)
        .then(res => res.json())
            
        .then(data => {
             console.log(data)
        })   

    })


 