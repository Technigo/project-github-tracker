const profileDetails = document.getElementById("aside");
const projects = document.getElementById("projects");

const username = "savannah-hayes";
const USER_URL = `https://api.github.com/users/${username}`;
const REPOS_URL = `https://api.github.com/users/${username}/repos`;

const displayProfileData = (data) => {
  const image = data.avatar_url;
  const name = data.name;
  const username = data.login;
  const bio = data.bio;
  const followers = data.followers;
  const following = data.following;
  const location = data.location;

  profileDetails.innerHTML = `
    <img src="${image}" class="profile-image" alt="image of ${name}"></img>
    <h2 class="profile-header">${name}</h2>
    <p>${username}</p>
    <p>${bio}</p>
    <p>👥 ${followers} followers · ${following} following</p>
    <p><img class="location-icon" src="./images/location.png"></img> ${location}</p>
  `;
}

const displayRepositories = (repositories) => {
  console.log(repositories);
  repositories.filter(repo => {
    let language = repo.language;
    const visibility = repo.visibility;
    const oneDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const projectDate = new Date(repo.pushed_at);
    let numberOfDays = Math.round(Math.abs((currentDate - projectDate) / oneDay));

    language === "HTML" ? language = `🔴 ${language}` : language = `🟡 ${language}`;

    if (repo.fork === true && repo.name !== "unit-tests") {
      projects.innerHTML += `
      <p>${repo.name} ${visibility}</p>
      <p>Forked from Technigo/project-${repo.name}</p>
      <p>${language} Updated ${numberOfDays} days ago</p>
      `;
    }
  })
}

fetch(USER_URL)
  .then(res => res.json())
  .then(displayProfileData)

fetch(REPOS_URL)
  .then(res => res.json())
  .then(displayRepositories)
