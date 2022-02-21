const profileDetails = document.getElementById("aside");
const projects = document.getElementById("projects");

const username = "savannah-hayes"
const USER_URL = `https://api.github.com/users/${username}`

const displayProfileData = (data) => {
  console.log(data)
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


fetch(USER_URL)
  .then(res => res.json())
  .then(displayProfileData)
