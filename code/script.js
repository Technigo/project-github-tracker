//DOM selectors
const profileInfo = document.getElementById('profile')
const allProjects = document.getElementById('projects')

const username = 'EmmaaBerg'
const API_PROFILE = `https://api.github.com/users/${username}`
const API_URL_REPOS = `https://api.github.com/users/${username}/repos`

//Function to get the username and profilepicture
const userProfile = () => {
    fetch(API_PROFILE)
        .then((res) => res.json())
        .then(profileData => {
            profileInfo.innerHTML += `
        <img src = '${profileData.avatar_url}' alt='profile image of Emma Berg'>
        <div class='profile-name'>
        <h3> ${profileData.name}</h3>
        <h4> <a href = ${profileData.html_url}>${profileData.login}</h4>
        </div>
        `
        })
}

// Repos
const repositories = () => {
    fetch(API_URL_REPOS)
        .then((resp) => resp.json())
        .then((allRepos) => {
            //A function for filtering out the forked projects from technigo.
            //Repo is the "name for each object" in the array. Fork and name are two properties within
            // the object 
            const forkedRepos = allRepos.filter((repo) => repo.fork && repo.name.startsWith('project-'))

            forkedRepos.forEach((repo) => {
                allProjects.innerHTML += `
                    <div class='card'>
                        <hr>
                        <h3> <a href = ${repo.html_url}> ${repo.name}</a></h3>
                        <hr>
                        <ul>
                            <li> <p> Latest push: ${new Date(repo.pushed_at).toLocaleString('sv-SE', { dateStyle: 'short', })}</p> </li>
                            <li><p> Default branch: ${repo.default_branch}</p></li>
                            <li><p id='pull-${repo.name}'></p></li>
                            <li><p id='commit-${repo.name}'>Commits: </p></li>
                        </ul>
                    </div>
                    `
                commits(repo.commits_url, repo.name)
            })
            pullRequests(forkedRepos);
            drawChart(forkedRepos.length);

        })
}

const pullRequests = (forkedRepos) => {
    forkedRepos.forEach((repo) => {
        const PULL_PR = `https://api.github.com/repos/Technigo/${repo.name}/pulls?
        per_page=100`

        fetch(PULL_PR)
            .then((res) => res.json())
            .then((pullReqs) => {
                let groupProject = true
                pullReqs.forEach((pull) => {
                    if (pull.user.login === username) {
                        groupProject = false
                        document.getElementById(`pull-${repo.name}`).innerHTML = `
                            <a href = ${pull.html_url}> Go to pull request </a>
                            `
                    }
                })

                if (groupProject === true) {
                    document.getElementById(`pull-${repo.name}`).innerHTML = `
                        <p> No pull request, group project </p>
                        `
                }
            })
    })
}

//function to get commit number for each project
const commits = (myCommits, repoName) => {
    let commitUrl = myCommits.replace('{/sha}', '')
    fetch(commitUrl)
        .then((res) => res.json())
        .then((commitNumber) => {
            document.getElementById(`commit-${repoName}`).innerHTML += commitNumber.length;
        })
}

//Invok the userProfile function and repositorie fetch
userProfile()
repositories()

