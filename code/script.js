const username = 'Kras053'
const USER_URL =`https://api.github.com/users/${username}`
const REPOS_URL =`https://api.github.com/users/${username}/repos`
const repoContainer = document.querySelector('.repo-container')
const userContainer = document.querySelector('.user-container')

//Token from GitHub
const options = {
    method: 'GET',
    headers: {
          Authorization: `token ${GITHUBTOKEN}`
      }
  }

// my user info from GitHub 
const userProfile = () => {
	fetch(USER_URL, options)
		.then((res) => res.json())
		.then((data) => {
			userContainer.innerHTML += `
			  <a href="${data.html_url}">
          <img class="profile-image" src="${data.avatar_url}"/>
          <span class="profile-name">
            ${data.login}
          </span>
        </a>
		  `;
		});
};

userProfile();

//my repos in GitHub filtered on forks from Technigo
const myRepos = () => {

    fetch(REPOS_URL, options)
    .then((response) => response.json())
    .then((data) => {
    console.log(data)

    const forkedRepos = data.filter(repo => repo.fork)
    const technigoRepos = data.filter(repo => repo.name.startsWith('project'))
    console.log(forkedRepos)    
    console.log(technigoRepos)

    technigoRepos.forEach(repo => {
        repoContainer.innerHTML += `<p>Projects: ${data.name}</p>`
        console.log(data.name)

        })
/*
    if (technigoRepos) {
        repoContainer.innerHTML += `<p>Projects: ${data[0].name}</p>`
        console.log(data[0].name)
    }*/

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
// find array method because that is the name of the array?
// when undefined bc I did not do the pull request but my teammate

        const myPullRequests = data.find((pull) => pull.user.login === repo.owner.login)
        console.log(myPullRequests)

        if (myPullRequests) {
            getCommits(myPullRequests.commits_url, repo.name)
           /* console.log(myCommitsURL)*/
        }

          })   

          // To get the commits from a PR we get the URL from the commits_url property in the PR json object 
// and then do a fetch with that url.
const getCommits = (URL, myRepo) => {
    fetch (URL, options)
    .then((res) => res.json())
    .then(data => {
   repoContainer.innerHTML += `<p>Number of commits: ${data.length}</p>`
        console.log(data.length)
    })
    }

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