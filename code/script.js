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

// Fetching profile info
const addingProfile = () => {
    fetch(`https://api.github.com/users/${username}`, options)
    .then((res) => res.json())
    .then((profileInfo) => {
        profile.innerHTML += `
        <img src="${profileInfo.avatar_url}">
        <a class="userlink"href="${profileInfo.html_url}">${profileInfo.login}</a>`
    }) 
}
addingProfile()

// The first fetch of repos, calling the function below all other functions

const addingRepos = () => {fetch(API_URL, options)
    .then((res) => res.json())
    .then((repos) => {
    
    // Filtering all repos I've forked and that starts with the word project.
        const forkedRepos = repos.filter(
            repo => repo.fork && repo.name.startsWith('project-')
            ) 
    // For all filtered repos I put the following info on my page      
        forkedRepos.forEach((repo) => {
            let updated = new Date(repo.updated_at).toLocaleDateString()     //Turning date and time into date
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
     findingPulls(forkedRepos)                                // Bringing all filtered repos to the next function
    })
    
     }


const findingPulls = (repos) => {                   
        repos.forEach((repo) => {                   //For all filtered repos I fetch each pull request    
    fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls`, options)
    .then((res) => res.json())
    .then((data) => {

        const pulls = data.find((pull)=> pull.user.login === repo.owner.login)       //Comparing all pull requests from Technigo to show only the ones with me as owner
        console.log("pulls", pulls)
        if (pulls !== undefined ) {                                    // If pull requests exist = 
        findingCommits(pulls.commits_url, repo.name)                    //passing the commits of these pull requests to the next function
        console.log(pulls.commits_url, "commits")
        } else {                                                         // If pull requests does not exist = display this
         document.getElementById(`commit-${repo.name}`).innerHTML += ' Is either a group project or pull request does not exist'
        }
        
    })
    })
}

  const findingCommits = (myCommitsUrl, myRepoName) => {
        fetch(myCommitsUrl, options)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            document.getElementById(`commit-${myRepoName}`).innerHTML += data.length        //Getting the number of commits to be displayed on the page       

        })
    }


addingRepos();



// Eventlisteners