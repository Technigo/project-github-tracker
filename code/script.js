// DOM selectors
const main = document.getElementById("projects")


const username = 'Smelbows'
const USERS_REPOS_API = `https://api.github.com/users/${username}/repos`
const TEST_USERS_REPOS_API = `/code/test_data/sarahs-repos-testing.json`


const fetchUserRepos = (url) => {
    fetch(url)
    .then((res) => res.json())
    .then(filterForTechnigoRepos)
    .then((repos) => {
        console.log(repos)
        repos.forEach(writeHTMLForRepo)
    })
}

const filterForTechnigoRepos = (data) => {
    return data.filter(repo => repo.name.startsWith('project'))
}

const writeHTMLForRepo = (repo) => {
    main.innerHTML += `<p>${repo.name}</p>`
}

fetchUserRepos(TEST_USERS_REPOS_API)