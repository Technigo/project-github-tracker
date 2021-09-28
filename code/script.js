// main fetch and function and put the DOM here
const projectsContainer = document.getElementById('projects')
const headerContainer = document.getElementById('header')
const ALL_MY_REPOS = `https://api.github.com/users/DALA746/repos`



const getRepos = () => {
    fetch(ALL_MY_REPOS)
        .then(res => res.json())
        .then((json) => { // This json shows all of my repos on GitHub
            // console.log(json)
            // filter repos so I can only get tehcnigos repos 
            const forkedRepos = json.filter(repo => repo.fork && repo.name.startsWith('project-'))
            drawChart(forkedRepos.length)
            console.log(forkedRepos.length)

            forkedRepos.forEach((repo) => { 
                // console.log(repo)

                // need to do convert to right format? 
                const pushUpdates = repo.pushed_at
                const defaultBranch = repo.default_branch
                const gitHubRepo = repo.clone_url 

                // header container 
                headerContainer.innerHTML = `
                <div>
                    <h1>${repo.owner.login}</h1>
                    <img class="profile-img"src="${repo.owner.avatar_url}" />
                </div>` 

                // project container 
                projectsContainer.innerHTML += `

                <h3>Project Name: ${repo.name}</h3>
                <p>Latest push update: ${pushUpdates}</p>
                <p>Default branch: ${defaultBranch}</p>
                <p>GitHub link: ${gitHubRepo}</p>
                `
            })
            // console.log(forkedRepos)
            getPullRequests(forkedRepos) // passing all my forked repos to this function 

        })
}

// calling getRepos function
getRepos()

// GETTING ALL MY PULL REQUESTS 
const getPullRequests = (forkedRepos) => { // repos är samma som forkedRepos
    forkedRepos.forEach(repo => {
        // console.log(repo) // alla mina forked pull requests 
        fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`) // getting all pullrequest to the specific project
            .then(res => res.json())
            .then(data => {
                const myPullRequests = data.find(pull => pull.user.login === repo.owner.login) // there is a different between filter and find function
                // console.log(myPullRequests)
                getCommits(myPullRequests.commits_url) // link 
            })
    })
}

const getCommits = (url) => {
    console.log(url)
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const numberOfCommits = data.length
            projectsContainer.innerHTML += `
            <p>Number of commits ${numberOfCommits}</p>

            `
            console.log(data.length)
        })
}






