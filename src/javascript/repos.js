const projectsSection = document.getElementById("projects");
const searchForm = document.getElementById("searchForm")

const REPOS_URL = `https://api.github.com/users/${username}/repos`;

const displaySearchForm = () => {
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
}

displaySearchForm()

const displayRepositories = (repositories) => {
  repositories.filter(repo => {
    const { fork, name, html_url, visibility, default_branch, pushed_at } = repo;
    let language = repo.language;
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
    } else if (hours < 60) {
      updatedTime = `${hours} hours ago`;
    } else {
      updatedTime = `${numberOfDays} days ago`;
    }
    
    language === "HTML" ? language = `🔴 ${language}` : language = `🟡 ${language}`;

    if (fork === true && name !== "unit-tests") {
      projectsSection.innerHTML += `
      <a class="projects__links" href="${html_url}" target="_blank">${name}</a><span class="projects__links--right">${visibility}</span>
      <p class="projects__paragraphs">Forked from Technigo/project-${name}</p>
      <p class="projects__paragraphs">${language} 
      <span class="projects__paragraphs"><img class="small-icon projects__paragraphs--right" src="./images/fork.png"></img>Branch ${default_branch}</span>
      <span class="projects__paragraphs--right">Updated ${updatedTime}</span></p>
      <hr>
      `;
    }
  })
}

fetch(REPOS_URL, options)
  .then(res => res.json())
  .then(displayRepositories)
  .catch(error => console.log(error))
