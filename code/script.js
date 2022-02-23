//DOM selectors
const profileInfo = document.getElementById('profile')

const username = 'EmmaaBerg'
const API_USER = `https://api.github.com/users/${username}`
const API_URL_REPOS = `https://api.github.com/users/${username}/repos`

//Function to get the username and profilepicture
const userInfo = () => {
    fetch(API_USER)
        .then((res) => res.json())
        .then(profile => {
            profileInfo.innerHTML = `
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
        console.log(allRepos)

        //A function for filtering out the forked projects from technigo.
        //Repo is the "name for each object" in the array. Fork and name are two properties within
        // the object 
        const forkedRepos = allRepos.filter((repo) => repo.fork && repo.name.startsWith('project-'))
        console.log(forkedRepos);
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
                        console.log(pull)
                        comments(pull);
                        commits(pull);
                    }
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
            console.log(commitNumber)
        })
}
