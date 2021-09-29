console.log('hello from scrips.js')

const USER = 'annaester'
const MY_REPOS_URL = `https://api.github.com/users/${USER}/repos`
const MY_PROFILE_URL = `https://api.github.com/users/${USER}`

const projectContainer = document.getElementById('projects')
const infoBox = document.getElementById('user-box')

const getUserInfo = () => {
    fetch(MY_PROFILE_URL)
    .then((resp) => resp.json())
    .then((data) => {
         console.log('testar min nya url', data)
         infoBox.innerHTML = `
        
        <h2 class="user-name">${data.login}</h2>
        <img class="profile-pic" src="${data.avatar_url}" alt="profile picture"/>
        `
    }) 
}

getUserInfo()



const getRepos = () => {
    fetch(MY_REPOS_URL)
    .then(resp => resp.json())
    .then(data => {
        //console.log(data)
        //data.forEach(repo => console.log(repo.name))
        const forkedRepos = data.filter(repo => repo.fork && repo.name.includes('project-'))
        forkedRepos.forEach(repo => projectContainer.innerHTML += `
        <div class="project-card"> 
        <h3 class="project-name">${repo.name}</h3>
        <a href="${repo.html_url}" target="_blank">${repo.name}with default branch ${repo.default_branch}</a> 
        <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
        <p id="commits-${repo.name}">Commits amount: </p>

        </div>
        `)
        
        getPullRequests(forkedRepos)
        console.log('my repos', forkedRepos)

        drawChart(forkedRepos.length)
    })

}




//Remember to pass along your filtered repos as an argument when
//you are calling this function

const getPullRequests = (allRepos) => {
    //Get all the PRs for each project.
    allRepos.forEach((repo) => {
      fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
      .then(res => res.json())
      .then(data => {
            //console.log(`hello pullrequests ${repo.name}`, data)
            const myPullRequests = data.find((pull) => pull.user.login === repo.owner.login)
           
            console.log('my pull requests', myPullRequests)

            //fetchCommits(myPullRequests.commits_url, repo.name)

            if (myPullRequests) {
                fetchCommits(myPullRequests.commits_url, repo.name);
            } else {
                document.getElementById(`commits-${repo.name}`).innerHTML +=
                    'No pull request yet done :(';
            } 
            console.log('my commits 1', data.length)
              //TODO
          //1. Find only the PR that you made by comparing pull.user.login
              // with repo.owner.login
              //2. Now you're able to get the commits for each repo by using
              // the commits_url as an argument to call another function
              //3. You can also get the comments for each PR by calling
              // another function with the review_comments_url as argument
          }).catch(err => console.log("getPullRequests error:", err))
    })

  }

  const fetchCommits = (myCommitsUrl, myRepoName) => { 
    fetch(myCommitsUrl)
    .then ((res) => res.json ())
    .then ((data) => {
        document.getElementById(`commits-${myRepoName}`).innerHTML += data.length
        
        console.log('my commits', data.length)
    })
}




  getRepos()