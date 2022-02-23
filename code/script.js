const username = 'CamillaHallberg'
let reponame = ''

const API_URL = `https://api.github.com/users/${username}/repos`
const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`


fetch(API_URL)
.then(res => res.json())
.then(data => {
    console.log(data, 'my repos');
    // below I'm filtering out the forked repos from Technigo.
    const technigoRepos = data.filter(
        (repo) => repo.name.includes('project-') && repo.fork);
        console.log(technigoRepos, 'technigo repos') 

})  
