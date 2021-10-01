// main fetch and function and put the DOM here
const projectsContainer = document.getElementById('projects')
const headerContainer = document.getElementById('header')
const USER = 'DALA746'
const ALL_MY_REPOS = `https://api.github.com/users/${USER}/repos`

const button = document.getElementById('button')


const getRepos = () => {
    fetch(ALL_MY_REPOS)
        .then(res => res.json())
        .then((json) => { // This json shows all of my repos on GitHub
            // console.log(json)
            // filter repos so I can only get tehcnigos repos 
            const forkedRepos = json.filter(repo => repo.fork && repo.name.startsWith('project-')) // or you can use includes method 
            drawChart(forkedRepos.length)

            forkedRepos.forEach((repo) => { 

                // header container 
                headerContainer.innerHTML = `
                <div class="info-about-user">
                    <img class="profile-img"src="${repo.owner.avatar_url}" />
                    <h2>Darya Lapata</h2>
                    <h3>${repo.owner.login}</h3>
                    <p>Location: Stockholm</p>
                </div>` 
                // project container 
                projectsContainer.innerHTML += `
                <div class="repo"> 
                    <a href="${repo.clone_url }"  target="_blank"><h3>${repo.name}</h3> </a>
                    <p id="commit-${repo.name}">Commits amount: </p>
                    <p>Latest push update: ${ new Date(repo.pushed_at).toDateString()}</p>
                    <p>Default branch: ${repo.default_branch}</p>

                </div>
                `
                // getLanguages(repo.languages_url)
            })

            getPullRequests(forkedRepos) // passing all my forked repos to this function 

        })
}

// calling getRepos function
getRepos()

// const getLanguages = (languageUrl) => {
//     fetch(languageUrl)
//         .then(res => res.json())
//         .then(data => {
//             showLanguages(data.HTML, data.CSS, data.JavaScript)
//             console.log(data.CSS)
//         })
// }


// GETTING ALL MY PULL REQUESTS 
const getPullRequests = (forkedRepos) => { // repos är samma som forkedRepos
    forkedRepos.forEach(repo => {
        // console.log(repo) // alla mina forked pull requests 
        fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`) // getting all pullrequest to the specific project
            .then(res => res.json())
            .then(data => {

                const myPullRequests = data.find(pull => pull.user.login === repo.owner.login) // there is a different between filter and find function, with find you get a sandwich with a name on
                getCommits(myPullRequests.commits_url, repo.name) // link 

            })
    })
}

const getCommits = (url, myRepoName) => {
    // fetching url for commits 
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const numberOfCommits = data.length
            document.getElementById(`commit-${myRepoName}`).innerHTML += numberOfCommits
        })
}








