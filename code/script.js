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
      // Adding += to show the other projects
      forkedRepos.forEach(
        (repo) => (projectContainer.innerHTML += `<h3> ${repo.name} </h3>`)
      );
      getPullRequests(forkedRepos); //calling the next function getPullRequests
      drawChart(forkedRepos.length);
    });
};

//A function to fetch pull requests
//Passing repos as an argument
const getPullRequests = (repos) => {
  repos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((response) => response.json())
      .then((data) => {
        const myPullRequests = data.filter(
          (pull) => pull.user.login === repo.owner.login
        );
        console.log(myPullRequests);
      });
  });
};
getRepos();

// getPullRequests(repos);
