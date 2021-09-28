console.log('hello from scrips.js')

const USER = `annaester`
const MY_REPOS_URL = `https://api.github.com/users/${USER}/repos`

const projectContainer = document.getElementById('projects')

const getRepos = () => {
    fetch(MY_REPOS_URL)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        //data.forEach(repo => console.log(repo.name))
        const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
        forkedRepos.forEach(repo => projectContainer.innerHTML += `<h3>${repo.name}</h3>`)
        
        getPullRequests(forkedRepos)
        
        drawChart(forkedRepos.length)
    })

}

getRepos()



//Remember to pass along your filtered repos as an argument when
//you are calling this function

const getPullRequests = (repos) => {
    //Get all the PRs for each project.
    repos.forEach(repo => {
      fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls`)
      .then(res => res.json())
      .then(data => {
            console.log('hello pullrequests', data)
            const myPullRequests = data.filter(pull => pull.user.login === repo.owner.login)
            console.log(myPullRequests)
              //TODO
          //1. Find only the PR that you made by comparing pull.user.login
              // with repo.owner.login
              //2. Now you're able to get the commits for each repo by using
              // the commits_url as an argument to call another function
              //3. You can also get the comments for each PR by calling
              // another function with the review_comments_url as argument
          })
    })
  }

  getPullRequests()