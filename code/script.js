// API_URL = 'https://api.github.com';
const username = 'katiewu1';
const API_REPOS = `https://api.github.com/users/${username}/repos`;

const projectContainer = document.getElementById('projectContainer');

const getRepos = () => {
  fetch(API_REPOS)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);

      // filter out the repos that have been forked
      // in 'json[index].fork' we can find the boolean (true/false)
      // we want all the repo with boolean true
      const filteredForkedRepos = json.filter((repo) => repo.fork);
      console.log(filteredForkedRepos);

      // filter it one more time with just only repos from Technigo
      // the repos from Technigo always start with 'project-'
      const filteredTechnigoRepos = json.filter(
        (repo) => repo.name.includes('project-')
        // can also use repo.name.startsWith('project-')
      );
      console.log(filteredTechnigoRepos);

      const namesOfTheRepos = filteredTechnigoRepos.map((repo) => repo.name);

      console.log(namesOfTheRepos);

      namesOfTheRepos.forEach((projectName) => {
        projectContainer.innerHTML += `
          <div class="project-card">
              ${projectName} <div class="project-emoji">👆</div> 
          </div>
          `;
      });
    });
};

getRepos();
