const USER = "pdetli"
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const projectsContainer = document.getElementById ("projects")

const getRepos = () => {
fetch (REPOS_URL)
.then (res => res.json())
.then (data => {
    console.log (data)  
    //to filter the data and to keep all the names start with project-  
    //repo.fork === true and repo.fork give the same result which "boolean is true"   
    const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith("project-"))
    //dispay the repo names in the browser
    forkedRepos.forEach(repo => 
        projectsContainer.innerHTML += 
        `<h3> Project name: ${repo.name} </h3>  
        `) 
    drawChart(forkedRepos.length)     
    });



}






getRepos()