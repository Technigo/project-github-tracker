//DOM selectors
const profileInfo = document.getElementById('profile')
const allProjects = document.getElementById('projects')

const username = 'EmmaaBerg'
const API_USER = `https://api.github.com/users/${username}`
const API_URL_REPOS = `https://api.github.com/users/${username}/repos`

//Function to get the username and profilepicture
const userInfo = () => {
    fetch(API_USER)
        .then((res) => res.json())
        .then(profile => {
            profileInfo.innerHTML = `
        <h2>GitHub Tracker</h2>
        <img src = "${profile.avatar_url}">
        <h3> ${profile.name}</h3>
        `
        })
}

//Invok the userInfo function
userInfo()

fetch(API_URL_REPOS)
    .then((resp) => resp.json())
    .then((allRepos) => {
        //A function for filtering out the forked projects from technigo.
        //Repo is the "name for each object" in the array. Fork and name are two properties within
        // the object 
        const forkedRepos = allRepos.filter((repo) => repo.fork && repo.name.startsWith('project-'))
        forkedRepos.forEach((repo) => {
            allProjects.innerHTML += `
            <div>
            <h6> Project Name: ${repo.name} </h6>
            <p> Latest push: ${repo.pushed_at}</p>
            <p> Main branch: ${repo.default_branch}</p>
            <a href = ${repo.html_url}> ${repo.name}</a>
            </div>
            `
        })
        pullRequests(forkedRepos);
    })

const pullRequests = (forkedRepos) => {
    forkedRepos.forEach((repo) => {
        fetch('https://api.github.com/repos/Technigo/' + repo.name + '/pulls')
            .then((res) => res.json())
            .then((pullReqs) => {
                //console.log(pullReqs);// loop foeach data är en array
                pullReqs.forEach((pull) => {
                    if (pull.user.login === username) {
                        comments(pull);
                        commits(pull);
                    }
                    
                    
        allProjects.innerHTML += `
        <div>
        <p> Commit messages: ${pullReq.commits_url.length}</p>

        </div>
        `
                })
            })

    })
}
//function to get review comments for each project
const comments = (pullReq) => {
    //console.log(pullReq)
    fetch(pullReq.review_comments_url)
        .then((res) => res.json())
        .then((rewComment) => {
            console.log(rewComment);
        })
}

//function to get commit number for each project
const commits = (pullReq) => {
    fetch(pullReq.commits_url)
        .then((res) => res.json())
        .then((commitNumber) => {
            console.log(commitNumber[commitNumber.length])
        })
}

