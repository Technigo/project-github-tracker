const username = 'Nosslexa'
const imgWrapper = document.getElementById('imgWrapper')
//const img = document.getElementById('img')
const userDataWrapper = document.getElementById('userDataWrapper')
const API_URL = `https://api.github.com/users/${username}/repos`




// This function fetch all my repos and then filters() out the ones forked = true and starts with "project-"
const getRepos = () => {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        console.log(data[0].owner)
        
        const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith("project-"))
        console.log(forkedRepos)
        
         getPullRequests(forkedRepos)

        imgWrapper.innerHTML = 
        ` <div>
        <img class="img" src="${data[0].owner.avatar_url}" alt="userimage">
        </div>` 
        
        
        userDataWrapper.innerHTML += 
        `<h2>${data[0].owner.login}</h2>
        <p>${data[0].owner.url} </p>`

        
    })
}

//function to find() my pullrequests and comments
const getPullRequests = (forkedRepos) => {
    forkedRepos.forEach(repo => {
        fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`)
        .then(res => res.json())
        .then(data => {
            console.log(data)

          const myPullRequests = data.find((pull) => pull.user.login === repo.owner.login)
            console.log(myPullRequests)

            //const myCommits = 
        })
    })
}

getRepos()




/*
const fetchRepos = () => {
    fetch(API_URL, options) 
    .then(res => res.json())
    .then(data => {
        const filteredRepos = data.filter(repo => repo.name.startsWith("project") && repo.fork === true)
        
//console.log
(filteredRepos)

        filteredRepos.forEach((repo) => {
            projectsWrapper.innerHTML += `
              <div class="projects">  
                <table>
                  <tr>
                    <th><a href="${repo.html_url}">${
repo.name
}</a></th>
                    <th>Latest push: ${new Date(repo.pushed_at).toDateString()}</th>
                  </tr>
              </div>
            `
        })
        getPullRequests(filteredRepos)
    })
} 
*/











