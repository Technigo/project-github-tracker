

const username = 'Kras053'
const API_URL =`https://api.github.com/users/${username}/repos`
const repoContainer = document.querySelector('.repo-container')

const options = {
    method: 'GET',
    headers: {
          Authorization: `token ${GITHUBTOKEN}`
      }
  }



//my repos in GitHub filtered on forks from Technigo
const myRepos = () => {

    fetch(API_URL, options)
    .then((response) => response.json())
    .then((data) => {
    console.log(data)

    const forkedRepos = data.filter(repo => repo.fork)
    const technigoRepos = data.filter(repo => repo.name.startsWith('project'))
    console.log(forkedRepos)    
    console.log(technigoRepos)

    //need to invoke this next function here already, passing along the filtered repos 
    //as an argument when calling the pull request function
    getPullRequests(technigoRepos)

})
}
myRepos()

const getPullRequests = (technigoRepos) => {
    //this fetches all the pull requests for each filtered project
    technigoRepos.forEach(repo => {
      fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`, options)
      .then(res => res.json())
      .then(data => {
          console.log(data)
              
//this finds the pull requests I made by comparing the user.login from the pull API
// with the owner.login in the filtered repo/data(?) API, and therefore we use pull in the
// find array method because that is the name of the array. 
// when undefined bc I did not do the pull request but my teammate

        const myPullRequests = data.find((pull) => pull.user.login === repo.owner.login)
        console.log(myPullRequests)

        if (myPullRequests) {
            getCommits(myPullRequests.commits_url, repo.name)
           /* console.log(myCommitsURL)*/
        }
        
        // från myPullrequests vill jag hämta från varje array alla 3 commits_URL:sen och ? comments_URl:sen 
        // och sedan göra en fetch för varje??

// To get the commits from a PR, you need to get the URL from the commits_url property in the PR json object. It might look something like this:
// https://api.github.com/repos/Technigo/project-news-site/pulls/227/commits
// and then do a fetch with that url.
          })   
    })
}

const getCommits = (URL, myRepo) => {
    fetch (URL, options)
    .then((res) => res.json())
    .then(data => {
   /*     document.getElementById(`${myRepo}`).innerHTML += `<p>${data.length}</p>`*/
        console.log(data.length)
    })
    }

    /* printing out my repos: 
    data.name.forEach(repo => {
        document.querySelector('.repo-container').innerHTML += `
          <div class="repo" id=${repo.name}>
            <h2>${repo.name}</h2>
          </div>
        `
      })*/
/*
    data.name.forEach((repo) => {
    repoContainer.innerHTML += `<p>${repo.name}</p>`
    })*/

    // repos.forEach(repo => {
//     document.getElementById('container').innerHTML += `
//       <div class="repo" id=${repo.name}>
//         <h2>${repo.name}</h2>
//       </div>
//     `
//   })
//   document.getElementById(repoName).innerHTML += 'New data to inject'

/*
step 1 worked: 
const username = 'Kras053'
const API_URL =`https://api.github.com/users/${username}/repos`

fetch(API_URL)
.then((response) => response.json())
.then((data) => {
    console.log('data', data)
})
*/