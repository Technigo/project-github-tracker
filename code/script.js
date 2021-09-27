// main fetch and function and put the DOM here

const projects = document.getElementById('projects')

const ALL_MY_REPOS = `https://api.github.com/users/DALA746/repos`

const getRepos = () => {
    fetch(ALL_MY_REPOS)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
            forkedRepos.forEach(repo => projects.innerHTML += `<h3>${repo.name}</h3>`)
            console.log(forkedRepos)
            getPullRequests(forkedRepos)
        })
}

getRepos()

// GETTING MY COMMENTS FUNCTION 
const getCommits = (commit) => {
    const COMMITS = commit.commits_url 
    console.log(COMMITS)

    console.log(commit)
}




// GETTING ALL MY PULL REQUESTS 
const getPullRequests = (repos) => { // repos är samma som forkedRepos
    repos.forEach(repo => {
        console.log(repo) // alla mina forked pull requests 
        fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls`) // getting all pullrequest to the specific project
            .then(res => res.json())
            .then(data => {
                console.log(data) // 
                const myPullRequest = data.filter(pull => pull.user.login === repo.owner.login) // sorting data by comparing my user name 
                console.log(myPullRequest)
                getCommits(myPullRequest)
            })

    })
}






