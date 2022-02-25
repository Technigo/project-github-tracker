// DOM selectors
const projects = document.getElementById('projects')
const username = 'idanaslund'
const profile = document.getElementById('profile')

let API_URL = `https://api.github.com/users/${username}/repos`


//Get the token here!!
const options = {
    method: 'GET',
    headers: {
        Authorization: `token ${API_TOKEN}`
    }
}

const addingProfile = () => {
    fetch(`https://api.github.com/users/${username}`, options)
    .then((res) => res.json())
    .then((profileInfo) => {
        console.log (profileInfo)
        profile.innerHTML += `
        <img src="${profileInfo.avatar_url}">
        <a href="${profileInfo.html_url}">${profileInfo.login}</a>`
    }) 
}
addingProfile()

const addingRepos = () => {fetch(API_URL, options)
    .then((res) => res.json())
    .then((repos) => {
        console.log(repos)
        console.log(API_TOKEN)
    
        const forkedRepos = repos.filter(
            repo => repo.fork && repo.name.startsWith('project-')
            ) 
            
        forkedRepos.forEach((repo) => {
            console.log(forkedRepos)
            let updated = new Date(repo.updated_at)
        projects.innerHTML += `
        <div class="repos">
        <h4>${repo.name}</h4>
        <form label="projects">
         <ul>
            <li>Most recent update: ${updated}</li>
            <li>Default branch: ${repo.default_branch}</li>
            <li><a href=${repo.html_url} target="_blank">Link to repo</a></li>
            <li id=commit-${repo.name}>Number of commits:</li>
         </ul>
        </form>
        </div>`
      
     })
     findingPulls(forkedRepos)
    })
    
     }



const findingPulls = (repos) => {
        repos.forEach((repo) => {
            console.log("repo", repo)
      
    fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls`, options)
    .then((res) => res.json())
    .then((data) => {
        console.log(data, "data")

        const pulls = data.find((pull)=> pull.user.login === repo.owner.login)
        console.log("pulls", pulls)
        findingCommits(pulls.commits_url, repo.name)
        console.log(pulls.commits_url, "commits")
    })
    })
}

  const findingCommits = (myCommitsUrl, myRepoName) => {
        fetch(myCommitsUrl, options)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            document.getElementById(`commit-${myRepoName}`).innerHTML += data.length

        })
    }


addingRepos();



// Eventlisteners