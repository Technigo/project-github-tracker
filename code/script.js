const username = 'CamillaHallberg'
let reponame = ''

const API_URL = `https://api.github.com/users/${username}/repos`
const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`

const API_TOKEN = TOKEN;
// console.log(TOKEN)

const options = {
    method: 'GET',
    headers: {
        Authorization: `${API_TOKEN}`
    }
}

fetch(API_URL, options)
.then(res => res.json())
.then(data => {
    console.log(data, 'my repos');
    // below I'm filtering out the forked repos from Technigo.
    const technigoRepos = data.filter(
        (repo) => repo.name.includes('project-') && repo.fork);
        console.log(technigoRepos, 'technigo repos') 

    const getPullRequests = (repos) => {
        repos.forEach(repo => {
            fetch('https://api.github.com/repos/technigo/' + repo.name + '/pulls?per_page=150', options)
            .then(res => res.json())
            .then(data2 => {
                console.log(data2, 'every pull for each project')
            })
        })
    }
        getPullRequests(technigoRepos);
})  




// const getPullRequests = (repos) => {
//     //Get all the PRs for each project.
//     repos.forEach(repo => {
//       fetch('https://api.github.com/repos/technigo/' + repo.name + '/pulls')
//       .then(res => res.json())
//       .then(data => {
//               //TODO
//           //1. Find only the PR that you made by comparing pull.user.login
//               // with repo.owner.login
//               //2. Now you're able to get the commits for each repo by using
//               // the commits_url as an argument to call another function
//               //3. You can also get the comments for each PR by calling
//               // another function with the review_comments_url as argument
// //           })
//     })
//   }
