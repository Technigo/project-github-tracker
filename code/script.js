const username = 'Kras053'
const API_URL =`https://api.github.com/users/${username}/repos`

//my repos in GitHub filtered on forks from Technigo
const myRepos = () => {

    fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
    console.log(data)

    const forkedRepos = data.filter(repo => repo.fork)
    const technigoRepos = data.filter(repo => repo.name.startsWith('project'))
    console.log(forkedRepos)    
    console.log(technigoRepos)
})
}

myRepos()




/* later specific repos list
const getPullRequests = (repos) => {
    repos.forEach(repo => {
        fetch('API_URL')
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })

    })

}*/

/*

https://api.github.com/repos/Technigo/${reponame}/pulls

*/

/*
step 1 worked: 
const username = 'Kras053'
const API_URL =`https://api.github.com/users/${username}/repos`

fetch(API_URL)
.then((response) => response.json())
.then((data) => {
    console.log('data', data)
})
*/