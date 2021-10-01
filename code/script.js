// define DOM selectors
const projectsContainer = document.getElementById('projects');
const generalInfoContainer = document.getElementById('generalInfo')


// URLs defined in variables
const USERNAME = 'JuliaNiki'
const REPOS_URL = `https://api.github.com/users/${USERNAME}/repos`
const GENERAL_URL = `https://api.github.com/users/${USERNAME}`


const getRepos = () => {
    fetch(REPOS_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
            console.log('forked Repos', forkedRepos)
            //sorted repos by creation date
            forkedRepos.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
            forkedRepos.forEach(repo => {
                console.log(repo)
                //console.log('owner login', repo.owner.login)
                projectsContainer.innerHTML += `<div class ="my-divs" id='${repo.name}'>
                <a class="links" href ="${repo.html_url}" target="_blank"><h3 class="repo-name">${repo.name}</h3></a>
                <span class="repo-language"></span>
                <span class="language-name">${repo.language}</span>
                <h5>Updated: ${new Date(repo.pushed_at).toDateString()}</h5>
                <h5>${repo.default_branch}</h5>
                </div>`
                const repoLanguage = document.querySelectorAll('.repo-language')
                //Nodelist is like an array, only forEach method
                repoLanguage.forEach(span => {
                    if (span.nextElementSibling.innerText === 'JavaScript') {
                        span.style.backgroundColor = "#f1e05a"
                    } else if (span.nextElementSibling.innerText === 'HTML') {
                        span.style.backgroundColor = "#e34c26"
                    }
                })
            })
            getPullRequests(forkedRepos)
            drawChart(forkedRepos.length)
            drawChartTwo(forkedRepos)
        })
}
getRepos()

const getGeneralInfo = () => {
    fetch(GENERAL_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            generalInfoContainer.innerHTML += `
            <img class="profile-image" src = "${data.avatar_url} alt ="avatar"/>

            <div class="names" >
            <h1 class="username">${data.login}</h1></div >
            <p class="bio">${data.bio}</p>
            <div class="location-info"><img class="location-icon" src="images/location.png" alt="location" /><p> ${data.location}</p></div>
            <div class="linkedin-info">
            <img class="linkedin-icon" src="images/chain.png" alt="location" /><a class="link-linkedin" href="${data.blog}" target="_blank">https://www.linkedin.com/in/julia-nikitinashlm/</a>
            </div>
                `
        })
}
getGeneralInfo()

const getPullRequests = (forkedRepos) => {
    forkedRepos.forEach((repo) => {
        fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`)
            .then(response => response.json())
            .then(data => {
                const myPulls = data.find(pulls => pulls.user.login === repo.owner.login)
                console.log(myPulls)
                //display pull request name
                // document.getElementById(`${repo.name}`).innerHTML += `<a class="links" href="${myPulls._links.html.href}">Pull request: ${myPulls.title}</a>`
                const commitsURL = myPulls.commits_url
                const commentsURL = myPulls.review_comments_url
                console.log('Comments', commentsURL)
                console.log(commitsURL)
                getCommits(commitsURL, repo)
                getComments(commentsURL, repo)
            })
    })
}
// display Number of commit messages for each repo
getCommits = (commitsURL, repo) => {
    fetch(commitsURL)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(data.length)
            document.getElementById(`${repo.name}`).innerHTML += `<h5>This repo has been committed ${data.length} times</h5>
            <h5>Latest commit message: "${data[data.length - 1].commit.message}"</h5>`

        })
}

/*------Tried to do accordion, but did not have time to style it----*/
// here is the function to display commit messages
// getComments = (commentsURL, repo) => {
//     fetch(commentsURL)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             document.getElementById(`${repo.name}-container-comments`).innerHTML += `
//             <div class="comments-container-accordion">
//             <ul class="accordion-container-list" id="${repo.name}-commentsList"></ul>
//             </div>`

//             const unorderedList = document.getElementById(`${repo.name}-commentsList`)

//             data.forEach((comment) => {
//                 unorderedList.innerHTML += `<li>${comment.body}</li>`
//             })
//         })
// }
// getComments()