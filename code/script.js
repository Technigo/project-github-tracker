// The DOM selectors
const projectContainer = document.getElementById('projects');

// URLs stored in variables
const USER = 'MT-dotse'; //my github name stored in the variable USER
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;

//Wapping the fetch REPOS_URL in a function
const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json()) //a placeholder waiting for the information
    .then((data) => {
      console.log(data);
      //data.forEach((repo) => console.log(repo.name));

      //Filtering out the projects that are both forked and starting with the name "project - "
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith('project-')
      );

      // printing out the filtered projects stored in forkedRepos
      // Adding += to show all the projects and not only just one
      forkedRepos.forEach(
        (repo) => (projectContainer.innerHTML += `<h3> ${repo.name} </h3>`)
      );

      drawChart(forkedRepos.length);
    });
};
getRepos();
