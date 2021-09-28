// DOM selectors
const userProfile = document.getElementById('profile');
const userProjects = document.getElementById('projects');
const progressChart = document.getElementById('chart')

//Global Variables
let userName = "nama0027";

// API variables
const USER_REPO_URL = `https://api.github.com/users/${userName}/repos`;
const USER_URL = `https://api.github.com/users/${userName}`;


//-------------functions deceleration----------------------------//

//---- for fetch----//

const getUser = () => {
    fetch(USER_URL)
        .then((res)=>{return res.json()})
        .then((data) => {
            console.log('user', data)
            userProfile.innerHTML = `
            <div class= "user">
            <img class= "photo" src= "${data.avatar_url}" alt= "${data.name} avatar" />
            <h2 class = "name"> ${data.name}</h2>
            </div>
            <a href="${data.html_url}" class="link-github">
                <span class="connect-label"> My GitHub Page </span>
            </a>
            `

        }) 
}

const getRepos = () =>{
    fetch(USER_REPO_URL)
        .then ((res) => {
            return res.json();

    })
        .then((data) => {
            console.log(data);
            const technigoProjects = data.filter(item => (item.fork && item.name.startsWith('project-') ))
            technigoProjects.forEach((repo) => {
                console.log(repo.name);
                userProjects.innerHTML += `
                <div class ="repo-card"> 
                    <h3> ${repo.name}</h3>
                </div>
                `
            })
            drawChart(technigoProjects.length)
    })
}

getRepos();
getUser();
