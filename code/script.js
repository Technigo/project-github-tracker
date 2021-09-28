const { intlFormat } = require("date-fns");

const username = "mamite100";
const repoApi = `https://api.github.com/users/${username}/repos`;
const projectsContainer = document.getElementById("projects");
const headerContainer =document.getElementById ("header")
//const info = document.getElementById("info");
const chartSection = document.getElementById("projectsInfo");
const gitApi = `https://api.github.com/users/${username}`;
const commentsApi = `https://api.github.com/repos/Technigo/project-news-site/pulls/247/comments`;
const commitApi = `https://api.github.com/repos/Technigo/project-news-site/pulls/227/commits`; 

const getRepos = () => {
    fetch (repoApi)
        .then((res) => res.json())
        .then((data) => {
        console.log(data);
 // data.forEach( repo => console.log (repo.name))

        const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-") 
        );
        //console.log(forkedRepos)

       forkedRepos.forEach((repo) => { 
       projectsContainer.innerHTML +=
       `<div id= "${
           repo.name
        }" class= "projects-cards">
        <h3> ${repo.name}</h3>
        <h5> Most recent push: ${ new Date (repo.pushed_at) .toLocaleDateString()}</h5>

        <h5>Default branch: ${repo.default_branch}</h5>

        <h5>Link to my GitHub repository: <a href ="${repo.html_url}" target ="_blank"> Link </a> </h5>
        </div>`
    })
getPullRequests(forkedRepos)
drawChart (forkedRepos.length);
});
};
chartSection.innerHTML += ``