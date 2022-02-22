const username = 'CamillaHallberg'
const API_REPOS_URL = `https://api.github.com/users/${username}/repos`

fetch(API_REPOS_URL)
.then(res => res.json())
.then(data => {
    console.log(data, 'my repos');
})

