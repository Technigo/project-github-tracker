const USER = 'mamite100'
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const projectsContainer = document.getElementById('projects')


const getRepos = () => {
    fetch (REPOS_URL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
       // data.forEach( repo => console.log (repo.name))
       const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-') && ! repo.name.endsWith('github-tracker'))
       forkedRepos.forEach(repo =>  
       projectsContainer.innerHTML +=`<h3> ${repo.name}</h3>`)
    })

}
getRepos() 

//Endpoint to get all PRs from a Technigo repo `https://api.github.com/repos/technigo/${reponame}/pulls`

//To get the comments from a PR, you need to get the URL from the `review_comments_url` property in the PR json object. It might look something like this: `https://api.github.com/repos/Technigo/project-news-site/pulls/247/comments` 
//and then do a fetch with that url.

//To get the commits from a PR, you need to get the URL  from the `commits_url` property in the PR json object. It might look something like this:
//`https://api.github.com/repos/Technigo/project-news-site/pulls/227/commits`
// and then do a fetch with that url.