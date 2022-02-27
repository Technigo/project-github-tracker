const profileDetails = document.getElementById("aside");

const username = "savannah-hayes"
const USER_URL = `https://api.github.com/users/${username}`;
const API_TOKEN = TOKEN || process.env.API_KEY

const options = {
  method: "GET",
  headers: {
    Authorization: `token ${API_TOKEN}`
  }
}

const displayProfileData = (profileData) => {
  const image = profileData.avatar_url;
  const name = profileData.name;
  const username = profileData.login;
  const bio = profileData.bio;
  const followers = profileData.followers;
  const following = profileData.following;
  const location = profileData.location;

  profileDetails.innerHTML = `
    <section class="aside__header">
    <img src="${image}" class="aside__image" alt="image of ${name}"></img>
    <div class="aside__text">
    <h2 class="aside__title">${name}</h2>
    <p class="aside__sub-title">${username}</p>
    </div>
    </section>
    <section class="aside-content">
    <p class="aside-content__paragraph aside-content__paragraph--top">${bio}</p>
    <p class="aside-content__paragraph aside-content__paragraph--grey">
    <img class="icons icons-left" src="./images/group.png">
    <span class="aside-content__paragraph--bold">${followers}</span>  followers · 
    <span class="aside-content__paragraph--bold">${following}</span> following</p>
    <p class="aside-content__paragraph"><img class="icons icons-left" src="./images/location.png"></img> ${location}</p>
    </section>
  `;
}

fetch(USER_URL, options)
  .then(res => res.json())
  .then(displayProfileData)
  .catch(error => console.log(error))