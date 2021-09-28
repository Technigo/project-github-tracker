// DOM selectors
const userProfile = document.getElementById('profile');
const userProjects = document.getElementById('projects');
const progressChart = document.getElementById('chart')

//Global Variables
let userName = 'nama0027'

// API variables
const USER_REPO_URL = `https://api.github.com/users/nama0027/repos`



//-------------functions deceleration----------------------------//

//---- for fetch----//


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
                <h2> ${repo.name}</h2>
            </div>
            `
        })
})
}

getRepos();
