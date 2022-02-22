const owner = 'joannaringqvist';
const API_URL_USERNAME = `https://api.github.com/users/${owner}`;
const API_URL_REPOS = `https://api.github.com/users/${owner}/repos`;
const projects = document.getElementById('projects');
const username = document.getElementById('username');
const picture = document.getElementById('picture');

fetch(API_URL_REPOS)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json);

        username.innerHTML = json[0].owner.login;
        picture.src = json[0].owner.avatar_url;

        json.forEach((repo) => {

            if (repo.fork === true && repo.name.startsWith('project')) {
                projects.innerHTML += `<tr><td>${repo.name}</td><td>${repo.updated_at}</td><td>${repo.default_branch}</td><td>${repo.url}</td></tr>`
            }
        });
    })
