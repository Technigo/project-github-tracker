const projects = document.getElementById('projects')
const API_URL = `https://api.github.com/users/sofiaringstedt/repos`

const options = {
    method: 'GET',
    headers: {
        Authorization: API_TOKEN
    }
}

const fetchRepos = () => {
    fetch(API_URL, options) 
    .then(res => res.json())
    .then(data => {
        const filteredRepos = data.filter(repo => repo.name.startsWith("project") && repo.fork === true)
        console.log(filteredRepos)

        filteredRepos.forEach((repo) => {
            projects.innerHTML += `
              <div class="repos">  
                <a href="${repo.html_url}">${repo.name}</a>
                <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
              </div>
            `
        })
    })
}

fetchRepos()

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
//           })
//     })
//   }