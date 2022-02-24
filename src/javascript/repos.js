const projectsSection = document.getElementById("projects");

const REPOS_URL = `https://api.github.com/users/${username}/repos`;

const displayRepositories = (repositories) => {
  repositories.filter(repo => {
    let language = repo.language;
    const projectUrl = repo.html_url;
    const visibility = repo.visibility;
    const oneDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const projectDate = new Date(repo.pushed_at);
    let numberOfDays = Math.round(Math.abs((currentDate - projectDate) / oneDay));

    language === "HTML" ? language = `🔴 ${language}` : language = `🟡 ${language}`;

    if (repo.fork === true && repo.name !== "unit-tests") {
      projectsSection.innerHTML += `
      <a class="projects__links" href="${projectUrl}">${repo.name}</a><span class="projects__links--right">${visibility}</span>
      <p class="projects__paragraphs">Forked from Technigo/project-${repo.name}</p>
      <p class="projects__paragraphs">${language} <span class="projects__paragraphs--right">Updated ${numberOfDays} days ago</span></p>
      <hr>
      `;
    }
  })
}

fetch(REPOS_URL, options)
  .then(res => res.json())
  .then(displayRepositories)
  .catch(error => console.log(error))
