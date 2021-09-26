const GITHUB_REPO = "https://api.github.com/users/Lundgreneddie/repos";


//const getGitUrl = (url) => {
    //Get all the PRs for each project.
    //getGitUrl.forEach(url => {
      fetch(GITHUB_REPO)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        
          })
    //})
 // }




