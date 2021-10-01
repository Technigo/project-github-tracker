const USER = 'annaester'
const MY_PROFILE_URL = `https://api.github.com/users/${USER}`
const MY_REPOS_URL = `https://api.github.com/users/${USER}/repos`

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
        forkedRepos.sort(function (oldestRepo, newestRepo) {
            return new Date(oldestRepo.created_at) - new Date(newestRepo.created_at);
            });
        forkedRepos.forEach(repo => projectContainer.innerHTML += `
            <div class="project-card"> 
            <h3 class="project-name">${repo.name}</h3> 
            <a class="project-links" href="${repo.html_url}" target="_blank">${repo.name}</a> <br><i>With default branch ${repo.default_branch}</i>
            <p class="project-info"><b>Created:</b> ${new Date(repo.created_at).toDateString()}</>
            <p class="project-info"><b>Latest push:</b> ${new Date(repo.pushed_at).toDateString()}</p>
            <p class="project-info" id="commits-${repo.name}"><b>Number of commits:</b> </p>
            </div>
            `)

        getPullRequests(forkedRepos)
        drawChart(forkedRepos.length)
    })
    }
    
    
const getPullRequests = (allRepos) => {
    allRepos.forEach((repo) => {
      fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
      .then(resp => resp.json())
      .then(data => {
            const myPullRequests = data.find((pull) => pull.user.login === repo.owner.login)
           
            if (myPullRequests) {
                fetchCommits(myPullRequests.commits_url, repo.name);
            } 
            else {
                document.getElementById(`commits-${repo.name}`).innerHTML =
                    `No pull requests done by ${USER}`;
            } 
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