const profileDetails = document.getElementById("aside");

const username = "savannah-hayes"
const USER_URL = `https://api.github.com/users/${username}`;
const TOKEN = config.GITHUB_TOKEN || process.env.API_TOKEN

const options = {
  method: "GET",
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
    <p class="header-content__paragraph header-content__paragraph--grey">
    <img class="icons group-icon" src="./images/group.png">
    <span class="header-content__paragraph--bold">${followers}</span>  followers · 
    <span class="header-content__paragraph--bold">${following}</span> following</p>
    <p class="header-content__paragraph"><img class="icons" src="./images/location.png"></img> ${location}</p>
    </section>
  `;
}

fetch(USER_URL, options)
  .then(res => res.json())
  .then(displayProfileData)
  .catch(error => console.log(error))