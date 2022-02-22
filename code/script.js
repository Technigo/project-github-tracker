const username = "Mimmisen";
let reponame = "";

const API_URL = `https://api.github.com/users/${username}/repos`;

fetch(API_URL)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    reponame = data[1].name;

    const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`;

    fetch(API_URL_PR)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  });

//Array.map((item, index) => {})
