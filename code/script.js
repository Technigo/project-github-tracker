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

// my user info from GitHub wrapped in clickable link to my GitHub page
const userProfile = () => {
	fetch(USER_URL, options)
	.then((res) => res.json())
	.then((data) => {
	userContainer.innerHTML += `
	<a href="${data.html_url}">
    <img class="profile-image" src="${data.avatar_url}"/>
    <span class="profile-name">Github tracker for ${data.login}
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

    // gets info from the filtered repos arrays and displays them on my page
    // using repo.name as dynamic ID to also insert commits

    technigoRepos.forEach((repo) => {
        repoContainer.innerHTML += `

            <div class="repo-cards" id="${repo.name}">
                <h3><a href="${repo.html_url}"><b>${repo.name}</b></a> 
                 (${repo.default_branch})</h3>
                <p>Most recent push: ${new Date(repo.pushed_at).toDateString()}</p>
            </div> 
            `
        })

    //need to invoke this next function here already, passing along the filtered repos 
    //as an argument when calling the pull request function
    getPullRequests(technigoRepos)

         //Passing the filtered repos length to the chart in the file chart.js
         doughnutCounter(technigoRepos.length)

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

        const myPullRequests = data.find((pull) => pull.user.login === repo.owner.login)
        console.log(myPullRequests)
        /*console.log(myPullRequests.html_url)*/
       

        // here the pull request link is printed or if no link a default message. In log it would say undefined. 
        if (myPullRequests) {
            document.getElementById(`${repo.name}`).innerHTML += 
            `<a href="${myPullRequests.html_url}"> Pull request</a>`
        } else {
            document.getElementById(`${repo.name}`).innerHTML += 
            `<p> Pull request made by teammate</p>`
        }

        //here is a first step to get the commits for each pull request, and we add the dynamic id to pass on
        // or default message that teammate did the commits
        if (myPullRequests) {
            getCommits(myPullRequests.commits_url, repo.name) 

        } else {
            document.getElementById(`${repo.name}`).innerHTML += 
            `<p> Commits made by teammate</p>`
        }
      
          })   

  
       

          // To get the commits from a PR we get the URL from the commits_url property in the PR json object 
// and then do a fetch with that url.
const getCommits = (URL, repoName) => {
    fetch (URL, options)
    .then((res) => res.json())
    .then(data => {
        document.getElementById(`${repo.name}`).innerHTML += `<p>Number of commits: ${data.length}</p>`
        console.log(data.length)
    })
    }
    })
    }

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