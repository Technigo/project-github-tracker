const projects = document.getElementById('projects')
const profile = document.getElementById('profile')
const repos = document.getElementById('repos')

const username = 'StephannieMedenilla'
const USER_PROFILE = `https://api.github.com/users/SteppbySteph`
const USER_REPO = `https://api.github.com/users/SteppbySteph/repos`



// const options = {
//     method: 'GET',
//     headers: {
//           Authorization: `token ${GITHUB_TOKEN}`
//     }
// }    


//----USER NAME & PROFILE----//

const getProfile = () => {
    fetch(USER_PROFILE)
        .then(res => res.json())
        .then(data => {
            const user = data.name
            const avatar = data.avatar_url
            profile.innerHTML += `
            <div class="profile-info">  
                <img class="avatar" src="${avatar}">
                <p>${user}</p>
            </div>
             `
         }) 
}

getProfile()

//----REPOSITORIES WITH DATA OF NAME, PUSH DATE, DEFAULT BRANCH, URL, PULL REQUESTS AND getCommitNr ()----//

const getRepos = () => {
    fetch(USER_REPO)
        .then(res => res.json())
        .then(data => {
            // Creating constsant for my filtered repos
            forkedRepos = data.filter((repo) => repo.name.startsWith('project-'))

            // Creating variable to pass on to showChart().
            allMyRepos = forkedRepos.length
            
            // forEach function to create HTML elements & pull requests
            forkedRepos.forEach((repo) => {
                      
                // Getting Repo Name
                repoName = repo.name;

                // Getting Most Recent Push Date which will be formated according to 'substr' method.
                pushDate = repo.pushed_at.substr(0, 10)

                // Getting the Default Branch                 
                defaultBranch = repo.default_branch

                // Getting the URL of the repo
                urlRepo = repo.html_url

                // Creating innerHTML to insert above info
                projects.innerHTML += `
                    <div class="projectblock">
                        <h3>Repository name: <br>${repoName}</h3>
                        <p>Most recent push date: ${pushDate}</p>
                        <p>Name of default branch: ${defaultBranch}</p>
                        <p>Github repo <a href="${urlRepo}">URL</a></p>
                        <p id="commit-${repo.name}"></p>
                    </div>
                    `   
                // Fetch for all pull requests.
                const USER_PR = `https://api.github.com/repos/Technigo/${repoName}/pulls?per_page=100`;
                fetch(USER_PR)
                    .then(res => res.json())
                    .then(AllpullRequests => {
                        const myPR = AllpullRequests.find((pull) => pull.user.login === repo.owner.login)
                        
                        // My pull requests are saved in the variable myPR which is passed on and invokes the function getCommit. 
                        // If there are no commits it should return 'No pull requests made'.
                        if(myPR) {
                            getCommitNr(myPR, repo.name)
                        } else {
                            document.getElementById(`commit-${repo.name}`).innerHTML += 'No pull request made'
                        }
                    })
            })
            showChart(allMyRepos)
        })
} 
    
// After extracting the pull requests done by owner(see above) we now fetch data from each of the pull request (myPR ---> myPull) from the API URL commit_url.
//This is displayed in the innerHTML with the value from commit.length.   
const getCommitNr = (myPull, myRepoName) => {
    fetch(myPull.commits_url)
        .then(res => res.json())
        .then((commit) => {
            document.getElementById(`commit-${myRepoName}`).innerHTML += `
            <p> Number of commits: ${commit.length}</p>
            `
        })
}
// Invoking function.
getRepos()
