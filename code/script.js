const repos = document.getElementById("repos");
const profile = document.getElementById("profile");

// Global variables:
const userName = "JustineZwiazek";
const API_USER = `https://api.github.com/users/${userName}`;
const API_REPOS = `https://api.github.com/users/${userName}/repos`;

const createProfile = () => {
  fetch(API_USER)
    .then((res) => res.json())
    .then((data) => {
      profile.innerHTML = `
      <img src="${data.avatar_url}" class="user-img">
      <h2>${data.name}</h2>`;
    });
};

const createRepos = () => {
  fetch(API_REPOS).then((res) => res.json().then((data) => {}));
};

createProfile();
