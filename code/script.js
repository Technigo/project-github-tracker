const projects = document.getElementById('projects')

const username = 'SteppbySteph'
const USER_URL = `https://api.github.com/users/${username}/repos`

//const USER_URL =('https://api.github.com/users/SteppbySteph/repos')
// const REPOS_URL = 


//----FETCHING ALL REPOS----//
const fetchUserRepos = () => {
    fetch(USER_URL)
        .then(res => res.json())
        .then(data => {
            console.log('repos', data)
        })
}

fetchUserRepos()