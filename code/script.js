const username = 'katiewu1';
const API_REPOS = `https://api.github.com/users/${username}/repos`;
const API_USER = `https://api.github.com/users/${username}`;

const projectContainer = document.getElementById('projectContainer');
const profile = document.getElementById('profile');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.getElementById('closeBtn');
const modalProject = document.getElementById('modalProject');

// function to get the repositories
const getRepos = () => {
  fetch(API_REPOS)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // filter out the repos that have been forked
      // in 'json[index].fork' we can find the boolean (true/false)
      // we want all the repo with boolean true

      // we also want to filter and find the projects from Technigo
      // the repos from Technigo always start with 'project-'
      const filteredTechnigoRepos = json.filter(
        (repo) => repo.fork && repo.name.includes('project-')
      );

      // store the project names in a new array called namesOfTheRepos
      const namesOfTheRepos = filteredTechnigoRepos.map((repo) => repo.name);

      // for each project, create a button element and class project-card
      // inside each card display the project name and a emoji
      // with append we push each project card
      // and add an eventListener so we can click on each card and get a modal(popup)
      namesOfTheRepos.forEach((projectName) => {
        const projectCard = document.createElement('button');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `${projectName} <div class="project-emoji">👆</div>`;
        projectContainer.append(projectCard);
        projectCard.addEventListener('click', () => getModal(projectName));
      });

      // invoke a function to draw a chart, where we can see finished and unfinished project throughout the boot camp
      // the function is declared in chart.js
      drawProgressChart(filteredTechnigoRepos.length);
    });
};

// function to get information about the GitHub user
const getUserInfo = () => {
  fetch(API_USER)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // display profile image, user and contact info
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
        <img class="profile-image" src="${json.avatar_url}" alt="profile image"/>
        <div class="contact-icons"> 
          <a href="https://www.linkedin.com/in/katie-wu-213a82150/" target="blank">
            <img class="icon" src="./assets/linkedin.png" alt="linkedin icon" width="16px" height="16px"/>
          </a>
          <a href="https://github.com/katiewu1/" target="blank">
            <img class="icon" src="./assets/github.png" alt="github icon" width="16px" height="16px"/>
          </a>
          <a href="mailto:katiewu.92@gmail.com">
            <img class="icon" src="./assets/email.png" alt="email icon" width="16px" height="16px"/>
          </a>
        </div>
      </div>

      `;
    });
};

// function to get a modal(popup)
const getModal = (projectName) => {
  // put a loading gif so the user know that it's fetching the data that will present in the modal
  // there is some delay because we are fetching new data when switching project card
  modalContent.innerHTML = `
  <img src="./assets/loading.gif" class="loading-gif" alt="loading gif"/>
  `;

  modalProject.style.display = 'block'; // pop up the modal when clicking on a project card
  document.body.style.overflow = 'hidden'; // disable the scrolling on the main page

  fetch(`https://api.github.com/repos/${username}/${projectName}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // get the latest push (date and time)
      const pushDateTime = new Date(json.pushed_at);

      // a function where we put an 0 before each number that is < 10
      const addZero = (i) => {
        if (i < 10) {
          i = '0' + i;
        }
        return i;
      };

      const getPullRequest = (projectName) => {
        // fetch(`https://api.github.com/repos/technigo/${projectName}/pulls`)
        // couldn't fetch all the pull requests because of the max limit at 30
        // I used the search method instead and type in the project name and the username
        // use a 'return' fetch to give a promise, so it will wait for the fetch before moving on to the next step
        return fetch(
          `https://api.github.com/search/issues?q=repo:Technigo/${projectName}+author:${username}+type:pr`
        )
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            // if we get no PR from the fetch (the user didn't do a PR) then display some message
            if (json.items.length === 0) {
              return [`found no pull request by ${username}`, '0'];
            }
            // do a new fetch when we know the PR number so we can get the count of commit messages
            return fetch(
              `https://api.github.com/repos/Technigo/${projectName}/pulls/${json.items[0].number}/commits`
            )
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                // store the length of the data, because it's equal to amount of commit messages
                const commitLength = data.length;
                // if we get a fetch, return the PR url and commitLength
                const pullRequestUrl = json.items[0].pull_request.html_url;
                return [pullRequestUrl, commitLength];
                // }
              });
          });
      };

      // function to get a chart of language use of each repo
      const getLanguagesChart = (projectName) => {
        fetch(
          `https://api.github.com/repos/${username}/${projectName}/languages`
        )
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            // if we have a value in json.'language' then the value will be store in a variable
            // if we don't have a value then the variable will get a value of 0
            const html = json.HTML || 0;
            const css = json.CSS || 0;
            const js = json.JavaScript || 0;

            // get the sum of all values so we can divide with the total to get a percentage
            const total = html + css + js;

            // get the percentage of each language and with one decimal
            const html_percent = ((html / total) * 100).toFixed(1);
            const css_percent = ((css / total) * 100).toFixed(1);
            const js_percent = ((js / total) * 100).toFixed(1);

            // draw the language chart with three arguments. The function is declared in chart.js
            drawLanguagesChart(html_percent, css_percent, js_percent);
          });
      };

      // invoke function getPullRequest and it will return a promise
      // wait until the fetch is done and 'then' use the pullRequestUrl and commitLength we get
      getPullRequest(projectName).then(([pullRequestUrl, commitLength]) => {
        // the loading gif will be replaced by the below innerHTML
        modalContent.innerHTML = `
        <div class="project-name">${projectName}</div>
        <div class="modal-div">
          Most recent push: ${pushDateTime.getFullYear()}-
          ${addZero(pushDateTime.getMonth() + 1)}-
          ${addZero(pushDateTime.getDate())}
        </div>
        <div class="modal-div">Default branch: ${json.default_branch}</div>
        <div class="modal-div">
          URL to the GitHub repo: 
            <a href="${json.html_url}" 
              target="blank">
              ${json.html_url}
            </a>
        </div>
        <div class="modal-div">Number of commit messages: ${commitLength} </div>
        <div class="modal-div">
          URL to the pull request: 
            <a href="${pullRequestUrl}" 
              target="blank">
              ${pullRequestUrl}
            </a>
        </div>
        <div class="languages-chart">
        <canvas id="languagesChart"></canvas>
        </div>
      `;
        // invoke the function getLanguageChart
        getLanguagesChart(projectName);
      });
    });
};

// these two functions will be invoked in the beginning
getRepos();
getUserInfo();

const closeModal = () => {
  modalProject.style.display = 'none'; //close the modal
  document.body.style.overflow = 'auto'; //enable the scrolling on the main page
};

// can close the modal with close button and when clicking outside of the modal content
closeBtn.addEventListener('click', () => closeModal());
modalProject.addEventListener('click', () => closeModal());
// added an EventListener for esc-key so we can close the modal with esc-key too
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    return closeModal();
  }
});

// prevent closing the modal when clicking inside of the modal content
modalContent.onclick = (event) => {
  event.stopPropagation();
};
