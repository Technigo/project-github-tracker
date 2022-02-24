const username = "Mimmisen";
let reponame = "";
const API_URL = `https://api.github.com/users/${username}/repos`;

//const API_TOKEN = TOKEN || process.env.API_KEY; // variable called TOKEN is local OR API_KEY is on the deployed site

const options = {
  method: "GET",
  headers: {
    Authorization: `token ${API_TOKEN}`, // you need to paste your token over here.
  },
};
//console.log(API_TOKEN);

fetch(API_URL, options)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    reponame = data[1].name;

    const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`;

    fetch(API_URL_PR, options)
      .then((res) => res.json())
      .then((data2) => {
        console.log(data2);
      });
  });

//Array.map((item, index) => {})
