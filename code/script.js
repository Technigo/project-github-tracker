// API_URL = 'https://api.github.com';
const username = 'katiewu1';
const API_REPOS = `https://api.github.com/users/${username}/repos`;
const API_USER = `https://api.github.com/users/${username}`;

const projectContainer = document.getElementById('projectContainer');
const profile = document.getElementById('profile');

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

const getUserInfo = () => {
  fetch(API_USER)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // display profile image
      profile.innerHTML += `
      <div class="profile-info">
        <table> 
          <tr>
            <td>Username:</td>
            <td>${json.login}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>${json.name}</td>
          </tr>        
          <tr>
            <td>Location:</td>
            <td>${json.location}</td>
          </tr>
        </table>
        <p>Bio: ${json.bio}</p>
      </div>
      <div class="profile-image-icons">
        <img class="profile-image" src="${json.avatar_url}"/>
        <div class="contact-icons"> 
          <a href="https://www.linkedin.com/in/katie-wu-213a82150/" target="blank">
            <img class="icon" src="./linkedin.png" alt="linkedin icon" width="16px" height="16px"/>
          </a>
          <a href="https://github.com/katiewu1/" target="blank">
            <img class="icon" src="./github.png" alt="github icon" width="16px" height="16px"/>
          </a>
          <a href="mailto:katiewu.92@gmail.com">
            <img class="icon" src="./email.png" alt="email icon" width="16px" height="16px"/>
          </a>
        </div>
      </div>

      `;
    });
};

getRepos();
getUserInfo();
