const username = 'Kras053'
const API_URL =`https://api.github.com/users/${username}/repos`


//my repos in GitHub filtered on forks from Technigo
const myRepos = () => {

    fetch(API_URL)
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
      fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`)
      .then(res => res.json())
      .then(data => {
          console.log(data)
              
          //this finds the pull requests I made by comparing the user.login from the pull API
              // with the owner.login in the filtered repo API, and therefore we use pull in the
              // find array method because that is the name of the array. 
              // when undefined bc I did not do the pull request but my teammate

              const myPullRequests = data.find((pull) => pull.user.login === repo.owner.login)
              console.log(myPullRequests)
              
              //2. Now you're able to get the commits for each repo by using
              // the commits_url as an argument to call another function
              //3. You can also get the comments for each PR by calling
              // another function with the review_comments_url as argument
          })   
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