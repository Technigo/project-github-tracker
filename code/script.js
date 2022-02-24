const username = 'vanhaj';
const projects = document.getElementById('projects');
// let reponame;
const API_URL = `https://api.github.com/users/${username}/repos`;

fetch(API_URL)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    reponame = data[2].name;

    const API_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`;

    fetch(API_PR)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        let hej = `<p class='test'>${username}</>
        <p class='test2'>${reponame}</p>`;
        return (projects.innerHTML = hej);
      });
  });
