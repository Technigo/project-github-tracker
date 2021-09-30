console.log('hello from scrips.js')

const USER = 'annaester'
const MY_REPOS_URL = `https://api.github.com/users/${USER}/repos`
const MY_PROFILE_URL = `https://api.github.com/users/${USER}`

const projectContainer = document.getElementById('projects')
const infoBox = document.getElementById('user-box')

const getUserInfo = () => {
    fetch(MY_PROFILE_URL)
    .then(resp => resp.json())
    .then(data => {
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
        const forkedRepos = data.filter(repo => repo.fork && repo.name.includes('project-'))
        forkedRepos.forEach(repo => projectContainer.innerHTML += `
        <div class="project-card"> 
        <h3 class="project-name">${repo.name}</h3> 
        <a class="project-links" href="${repo.html_url}" target="_blank">${repo.name}</a> <br><i>With default branch ${repo.default_branch}</i>
        <p class="project-info">Latest push: ${new Date(repo.pushed_at).toDateString()}</p>
        <p class="project-info" id="commits-${repo.name}">Number of commits: </p>
        </div>
        `)
        
        getPullRequests(forkedRepos)
        drawChart(forkedRepos.length)
    })
    }

//Remember to pass along your filtered repos as an argument when
//you are calling this function

const getPullRequests = (allRepos) => {
    allRepos.forEach((repo) => {
      fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
      .then(resp => resp.json())
      .then(data => {
            const myPullRequests = data.find((pull) => pull.user.login === repo.owner.login)
           
            console.log('my pull requests', myPullRequests)


            if (myPullRequests) {
                fetchCommits(myPullRequests.commits_url, repo.name);
            } else {
                document.getElementById(`commits-${repo.name}`).innerHTML =
                    `No pull requests done by ${USER}`;
                
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
    .then (resp => resp.json ())
    .then (data => {
        document.getElementById(`commits-${myRepoName}`).innerHTML += data.length
        
        console.log('my commits', data.length)
    })
    }

  getRepos()