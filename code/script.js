//DOM selectors
const userContainer = document.getElementById ('userContainer')
const projectContainer = document.getElementById ('projectContainer')

//Global selectors
const user = 'josse79'
const API_USER = `https://api.github.com/users/${user}`
const API_REPOS_LIST = `https://api.github.com/users/${user}/repos`

//The TOKEN function
const options = {
  method: 'GET',
  headers: {
    Authorization: 'API_KEY'
  }
}

//1st function and fetch to get the user details
const getUser = () => {
  fetch(API_USER, options)
  .then(res => res.json())
  .then(data => {
    userContainer.innerHTML = `
     <img class='user-image' src='${data.avatar_url}'/>
     <h2 class='user-name'> ${data.login}</h2>`
  })
  getRepos ()
}
//2nd function and fetch to get the repo list
const getRepos = () => {
  fetch(API_REPOS_LIST, options)
  .then(res => res.json())
  .then(data => {
    //Filtering out the forked repos & repos starting with project
    const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith('project'))
     forkedRepos.forEach((repo) => {
       //Positioning the information in HTML also with dynamic ID repo.name
      projectContainer.innerHTML += `
        <div class='repos' id=${repo.name}>
            <h1>${repo.name}</h1>
            <a href='${repo.html_url}' target='_blank'>${repo.html_url}</a>
            <p>Default branch ${repo.default_branch}</p>
            <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
         </div>`
      })
      //Passing the filtered repos to next function
     getPullRequests(forkedRepos)
     //Passing the filtered repos length to chartfunction in chart.js
     activateChart(forkedRepos.length)
   })

   //3rd function and fetch to get all the pulls with help of repo.name
  const getPullRequests = (repos) => {
    repos.forEach(repo => {
      fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`, options)
      .then(res => res.json())
      .then(data => {
        //Filter my own pulls by comparing user login and repo owner
        const filteredPulls = data.find((pull) => pull.user.login === repo.owner.login)
        //Passing the filtered pulls to next functions
          if (filteredPulls) {
            //Passing the commits_url and review_comments_url as arguments to next functions
            //Also passing along the dynamic ID repo.name to be able to positioning in HTML
            getCommits(filteredPulls.commits_url, repo.name)
            getReview(filteredPulls.review_comments_url, repo.name)
          } else {
             document.getElementById(`${repo.name}`).innerHTML += `
               <p>No pull request made</p>`
           }
      })
    })
  }

  //4th function and fetch. Fetch (commits_url declared in getPullRequests function
  //therefore activated by argument URL and repoName
  const getCommits = (URL, repoName) => {
    fetch(URL, options)
    .then(res => res.json())
    .then(data => {
      //Positioning by dynamic ID repoName
      document.getElementById(repoName).innerHTML += `
        <p>Number of commits: ${data.length}</p>`
    })
  }

  //5th function and fetch. Fetch (commits_url declared in getPullRequests function
  //therefore activated by argument URL and repoName
  const getReview = (URL, repoName) => {
    fetch(URL, options)
    .then(res => res.json())
    .then(data => {
      //If any review made - positioning data by dynamic ID repoName
      if (`${data[0].user.login} == ''`) {
        document.getElementById(repoName).innerHTML += `
          <p>Review made by: ${data[0].user.login}</p>`
      } else {
             }
      })
  }
}
//Invoking first function
getUser ()
