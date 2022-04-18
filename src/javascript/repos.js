const projectsSection = document.getElementById("projects");

const displayRepositories = (repositories) => {

  repositories.filter(repo => {
    const { fork, name, html_url, visibility, default_branch, pushed_at, language } = repo;
    let projectLanguage = language;
    let updatedTime;
    const DAY_IN_MS = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const projectDate = new Date(pushed_at);
    const seconds = Math.round((currentDate - projectDate) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60)
    const numberOfDays = Math.round(Math.abs((currentDate - projectDate) / DAY_IN_MS));

    if (seconds < 5) {
      updatedTime = 'now';
    } else if (seconds < 60) {
      updatedTime = `${seconds} seconds ago`;
    } else if (minutes < 60) {
      updatedTime = `${minutes} minutes ago`;
    } else if (hours < 24) {
      updatedTime = `${hours} hours ago`;
    } else if (hours < 48) {
      updatedTime = `about 1 day ago`
    } else {
      updatedTime = `${numberOfDays} days ago`;
    }
    
    projectLanguage === "HTML" ? projectLanguage = `🔴 ${projectLanguage}` : projectLanguage = `🟡 ${projectLanguage}`;

    if (fork && name !== "unit-tests") {
      projectsSection.innerHTML += `
      <a class="projects__links" href="${html_url}" target="_blank">${name}</a>
      <span class="projects__links--right">${visibility}</span>
      <p class="projects__paragraphs">Forked from Technigo/project-${name}</p>
      <p class="projects__paragraphs">${projectLanguage} 
        <span class="projects__paragraphs">
          <img class="small-icon projects__paragraphs--right" src="./images/fork.png"></img>
            Branch ${default_branch}
        </span>
        <span class="projects__paragraphs--right">
          Updated ${updatedTime}
        </span>
      </p>
      <hr>
      `;
    }
  })
};

fetch(REPOS_URL, options)
  .then(res => res.json())
  .then(data => displayRepositories(data))
  .catch(error => console.log(error))
