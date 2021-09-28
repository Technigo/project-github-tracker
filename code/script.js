//GLOBAL VARIABLES
const userName = "Fatima-Gamero-Romero";
//APIs
const API_GITHUB = `https://api.github.com/users/${userName}/repos`; //Here we use backticks instead of quotes because we are injecting a variable
//DOM SELECTORS
const projectsContainer = document.getElementById("projects");

const getRepos = () => {
  fetch(API_GITHUB)
    .then((resp) => resp.json())
    .then((data) => {
      // console.log(data)
      const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith("project-")); // Filtering the repos that are forked from Technigo
    //   console.log(forkedRepos[1].name);
      forkedRepos.forEach((repo) => (projectsContainer.innerHTML += `<h3>${repo.name}</h3>`)); // Inserting the repos in the html file
      drawChart(forkedRepos.length); // Function being called with the length of the repos which is needed in the chart

forkedRepos.forEach((repo)=> {

      const API_PR = `https://api.github.com/repos/technigo/${repo.name}/pulls`
      fetch(API_PR)
      .then((resp) => resp.json())
      .then((data)=> {
          console.log(data)
      })
    })



    });
};
getRepos();

// repos.forEach(repo => {
//     fetch('https://api.github.com/repos/technigo/' + repo.name + PULLS)
//     .then(res => res.json())
//     .then(data => {