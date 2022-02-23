const profileDetails = document.getElementById("aside");
const projects = document.getElementById("projects");

const username = "savannah-hayes";
const USER_URL = `https://api.github.com/users/${username}`;
const REPOS_URL = `https://api.github.com/users/${username}/repos`;
const TOKEN = config.GITHUB_TOKEN || "Token"

const options = {
  method: 'GET',
  headers: {
    Authorization: `token ${TOKEN}`
  }
}

const displayProfileData = (data) => {
  const image = data.avatar_url;
  const name = data.name;
  const username = data.login;
  const bio = data.bio;
  const followers = data.followers;
  const following = data.following;
  const location = data.location;

  profileDetails.innerHTML = `
    <section class="header">
    <img src="${image}" class="header__image" alt="image of ${name}"></img>
    <div class="header__text">
    <h2 class="header__title">${name}</h2>
    <p class="header__sub-title">${username}</p>
    </div>
    </section>
    <section class="header-content">
    <p class="header-content__paragraph header-content__paragraph--top">${bio}</p>
    <p class="header-content__paragraph header-content__paragraph--grey"><img class="icons group-icon" src="./images/group.png"><span class="header-content__paragraph--bold">${followers}</span>  followers · <span class="header-content__paragraph--bold">${following}</span> following</p>
    <p class="header-content__paragraph"><img class="icons" src="./images/location.png"></img> ${location}</p>
    </section>
  `;
}

const displayRepositories = (repositories) => {
  console.log(repositories);
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
      projects.innerHTML += `
      <a class="projects__links" href="${projectUrl}">${repo.name}</a><span class="projects__links--right">${visibility}</span>
      <p class="projects__paragraphs">Forked from Technigo/project-${repo.name}</p>
      <p class="projects__paragraphs">${language} <span class="projects__paragraphs--right">Updated ${numberOfDays} days ago</span></p>
      <hr>
      `;
    }
  })
}

fetch(USER_URL, options)
  .then(res => res.json())
  .then(displayProfileData)

fetch(REPOS_URL, options)
  .then(res => res.json())
  .then(displayRepositories)

