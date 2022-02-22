const username = "isabellwastfelt";
const API_URL = `https://api.github.com/users/${username}/repos`;

const options = {
  method: "GET",
  headers: {
    Authorization: "token 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",
  },
};

let reponame;

fetch(API_URL, options)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    reponame = data[2].name;

    const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`;

    fetch(API_URL_PR)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  });
