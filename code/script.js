// DOM selectors
const projects = document.getElementById('projects')
const username = 'idanaslund'
const profile = document.getElementById('profile')
const formRepos = document.getElementById('formRepos')
const sortRepos = document.getElementById('sortRepos')

let API_URL = `https://api.github.com/users/${username}/repos`

// Fetching profile info
const addingProfile = () => {
    fetch(`https://api.github.com/users/${username}`)   
    .then((res) => res.json())
    .then((profileInfo) => {
        profile.innerHTML += `
        <img src="${profileInfo.avatar_url}">
        <a class="userlink" href="${profileInfo.html_url}" target="_blank">${profileInfo.login}</a>
        <p>${profileInfo.bio}</p>
        `
    }) 
}
addingProfile()

// The first fetch of repos, calling the function below all other functions

const addingRepos = () => {fetch(API_URL)  
    .then((res) => res.json())
    .then((repos) => {
       
     // Filtering all repos I've forked and that starts with the word project
        const forkedRepos = repos.filter(
            repo => repo.fork && repo.name.startsWith('project-')
            ) 
    // For all filtered repos I put the following info on my page      
        forkedRepos.forEach((repo) => {
            let updated = new Date(repo.updated_at).toLocaleDateString()            //Turning date and time into date
            let upperCase = `${repo.name[0].toUpperCase()}${repo.name.slice(1)}`    //Making first letter of string to uppercase
        projects.innerHTML += [`
        <div class="repos">
        <h4>${upperCase}</h4>
        <form label="projects">
         <ul>
            <li><span class="title">Most recent update:</span> ${updated}</li>
            <li><span class="title">Default branch:</span> ${repo.default_branch}</li>
            <li><a class="repo-link" href=${repo.html_url} target="_blank">Link to repository</a></li>
            <li id=commit-${repo.name}><span class="title">Number of commits:</span> </li>
         </ul>
        </form>
        </div>`]
    
     })
     findingPulls(forkedRepos)                              // Bringing all filtered repos to the next function
     callingChart (forkedRepos.length)                        //Bringing all filtered repos to the chart   
    })
    
     }

 const findingPulls = (repos) => {                   
        repos.forEach((repo) => {                   //For all filtered repos I fetch each pull request    
    fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls`)    //, options
    .then((res) => res.json())
    .then((data) => {

        const pulls = data.find((pull)=> pull.user.login === repo.owner.login)       //Comparing all pull requests from Technigo to show only the ones with me as owner
        if (pulls !== undefined ) {                                    // If pull requests exist = 
        findingCommits(pulls.commits_url, repo.name)                    //passing the commits of these pull requests to the next function
        } else {                                                         // If pull requests does not exist = display this
         document.getElementById(`commit-${repo.name}`).innerHTML += ' Group project/no pull request'
        }      
    })
  })
}

  const findingCommits = (myCommitsUrl, myRepoName) => {
        fetch(myCommitsUrl)
        .then((res) => res.json())
        .then((data) => {
            document.getElementById(`commit-${myRepoName}`).innerHTML += data.length        //Getting the number of commits to be displayed on the page       

        })
    }

addingRepos()
