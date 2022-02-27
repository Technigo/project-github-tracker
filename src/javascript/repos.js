const projectsSection = document.getElementById("projects");
const searchForm = document.getElementById("searchForm")

const REPOS_URL = `https://api.github.com/users/${username}/repos`;

searchForm.innerHTML = `
  <div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Find a repository..." 
  aria-label="Repositories"aria-describedby="basic-addon1">
  </div>
  <div class="dropdown">
  <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" 
  id="dropdownMenuButton1"data-bs-toggle="dropdown" aria-expanded="false">Type</button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  <li><a class="dropdown-item" href="#">All</a></li>
  <li><a class="dropdown-item" href="#">Public</a></li>
  <li><a class="dropdown-item" href="#">Private</a></li>
  </ul>
  <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1"
  data-bs-toggle="dropdown" aria-expanded="false">Language
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  <li><a class="dropdown-item" href="#">All</a></li>
  <li><a class="dropdown-item" href="#">JavaScript</a></li>
  <li><a class="dropdown-item" href="#">HTML</a></li>
  </ul>
  <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1"
  data-bs-toggle="dropdown" aria-expanded="false">Sort
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  <li><a class="dropdown-item" href="#">Last Updated</a></li>
  <li><a class="dropdown-item" href="#">Name</a></li>
  </ul>
  </div>
`

const displayRepositories = (repositories) => {
  repositories.filter(repo => {
    let language = repo.language;
    const projectUrl = repo.html_url;
    const visibility = repo.visibility;
    const oneDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const projectDate = new Date(repo.pushed_at);
    const numberOfDays = Math.round(Math.abs((currentDate - projectDate) / oneDay));

    language === "HTML" ? language = `🔴 ${language}` : language = `🟡 ${language}`;

    if (repo.fork === true && repo.name !== "unit-tests") {
      projectsSection.innerHTML += `
      <a class="projects__links" href="${projectUrl}" target="_blank">${repo.name}</a><span class="projects__links--right">${visibility}</span>
      <p class="projects__paragraphs">Forked from Technigo/project-${repo.name}</p>
      <p class="projects__paragraphs">${language} 
      <span class="projects__paragraphs"><img class="small-icon projects__paragraphs--right" src="./images/fork.png"></img>Branch ${repo.default_branch}</span>
      <span class="projects__paragraphs--right">Updated ${numberOfDays} days ago</span></p>
      <hr>
      `;
    }
  })
}

fetch(REPOS_URL, options)
  .then(res => res.json())
  .then(displayRepositories)
  .catch(error => console.log(error))
