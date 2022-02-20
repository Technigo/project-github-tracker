const username = 'nadialefebvre'
const API_USER = `https://api.github.com/users/${username}`
const API_REPOS = `https://api.github.com/users/${username}/repos`
const profile = document.getElementById('profile')
const projects = document.getElementById('projects')




const openTab = (event, tabName) => {
    let i
    let tabContent = event.currentTarget.parentNode.parentNode.getElementsByClassName("tab-content")
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none"
    }
    let tabButton = event.currentTarget.parentNode.getElementsByClassName("tab-button")
    for (i = 0; i < tabButton.length; i++) {
        tabButton[i].className = tabButton[i].className.replace(" active", "")
    }
    document.getElementById(tabName).style.display = "block"
    event.currentTarget.className += " active"
}





const createProfile = () => {
    fetch(API_USER, options)
        .then(res => res.json())
        .then(data => {
            profile.innerHTML = `
                <h2>${data.name}</h2>
                <img src="${data.avatar_url}" class="profile-picture">
            `
        })
}

const createRepoCard = () => {
    fetch(API_REPOS, options) // options object is passed as 2nd argument to fetch() function. // TO REMOVE BEFORE GIT PUSH
        .then(res => res.json())
        .then(data => {
            const filteredRepos = data.filter(repo => repo.fork === true && repo.name.startsWith('project-'))
console.log(filteredRepos)
            // sortByDate(filteredRepos)
            // sortByReverseDate(filteredRepos)
            // sortByReverseName(filteredRepos)
            // sortByCommits()

            drawProjectsChart(filteredRepos.length)
            filteredRepos.forEach(repo => {
                const options = { day: 'numeric', month: 'long', year: 'numeric' }
                projects.innerHTML += `
                    <div class="tab-card">
                        <div class="tab" id="${repo.name}-tab">
                            <button class="tab-button" onclick="openTab(event, '${repo.name}-infos')" id="${repo.name}-defaultOpen">${repo.name}</button>
                            <button class="tab-button" onclick="openTab(event, '${repo.name}-languages')">Languages</button>
                            <button class="tab-button" onclick="openTab(event, '${repo.name}-commitMessages')">Commits</button>
                            <button class="tab-button" onclick="openTab(event, '${repo.name}-pullComments')">Pull request</button>
                        </div>

                        <div id="${repo.name}-infos" class="tab-content">
                            <h3>Name: ${repo.name}</h3>
                            <div id=${repo.name}-repoInfos></div>
                        </div>

                        <div id="${repo.name}-languages" class="tab-content" style="display: none">
                            <h3>Languages</h3>
                            <div id=${repo.name}-repoLanguages></div>
                        </div>

                        <div id="${repo.name}-commitMessages" class="tab-content" style="display: none">
                            <h3>Last messages</h3>
                            <div id=${repo.name}-repoCommitMessages></div>
                        </div>

                        <div id="${repo.name}-pullComments" class="tab-content" style="display: none">
                            <h3>Code review comment:</h3>
                            <div id=${repo.name}-repoPullComments>(none)</div>
                        </div>
                    </div>
                `

                document.getElementById(`${repo.name}-repoInfos`).innerHTML += `
                    <p>URL: <a href="${repo.html_url}">${repo.name}</a></p>
                    <p>Default branch : ${repo.default_branch}</p>
                    <p>Last push: ${new Date(repo.pushed_at).toLocaleDateString('en-GB', options)}</p>
                `

                // Get the element with id="defaultOpen" and click on it
                document.getElementById(`${repo.name}-defaultOpen`).click()

                addCommits(repo)
                fetchPullRequest(repo)
                addLanguageChart(repo)
            })
        })
}


const addCommits = (repo) => {
    fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`, options)
        .then(res => res.json())
        .then(data => {
            // why item.author.login === username doesn't work here??
            const userCommits = data.filter((item) => item.commit.author.name === 'Nadia Lefebvre')

            document.getElementById(`${repo.name}-repoInfos`).innerHTML += `
                <p>Number of commits from the user: ${userCommits.length} on a total of ${data.length}</p>
            `

            const userFiveLastCommits = userCommits.slice(1, 5)
            userFiveLastCommits.forEach(item => {
                document.getElementById(`${repo.name}-repoCommitMessages`).innerHTML += `
                    <li>${item.commit.message}</li>
                `
            })
        })
}

const addLanguageChart = (repo) => {

    fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`, options)
        .then(res => res.json())
        .then(languages => {
            // many variables for percentage calculation : needs to find a way to add % now...
            const html = languages.HTML === undefined ? 0 : languages.HTML
            const css = languages.CSS === undefined ? 0 : languages.CSS
            const js = languages.JavaScript === undefined ? 0 : languages.JavaScript
            const htmlPercentage = Math.round(html / (html + css + js) * 1000) / 10
            const cssPercentage = Math.round(css / (html + css + js) * 1000) / 10
            const jsPercentage = Math.round(js / (html + css + js) * 1000) / 10

            const idChart = `${repo.name}Chart`

            document.getElementById(`${repo.name}-repoLanguages`).innerHTML += `
            <div class="chart-container">
            <canvas id=${idChart}></canvas>
            </div>
`

            drawLanguagesChart(htmlPercentage, cssPercentage, jsPercentage, idChart)
        })
}


const fetchPullRequest = (repo) => {
    // fix it because only 1 page of 30 PR is fetched, link: https://docs.github.com/en/rest/reference/pulls#list-pull-requests (added ?per_page=100&page=1 to URL, but it doesn't fix the problem for when the PR will go to page 2-3-4...)
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100&page=1`, options)
        .then(res => res.json())
        .then(data => {
            const userPulls = data.filter((item) => item.user.login === username)
            userPulls.forEach(pull => {
                fetch(pull.review_comments_url)
                    .then(res => res.json())
                    .then(data => {
                        const reviewID = data[0].pull_request_review_id
                        addCodeReviewInfos(repo, pull, reviewID)
                    })
            })
        })
}

const addCodeReviewInfos = (repo, pull, reviewID) => {

    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls/${pull.number}/reviews/${reviewID}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById(`${repo.name}-repoPullComments`).innerHTML = `
                <p>${data.body}</p>
                <p><a href="${pull.html_url}">Full code review</a></p>
            `
        })
}



const sortByDate = (filteredRepos) => {
    filteredRepos.sort(function (a, b) {
        return new Date(a.created_at) - new Date(b.created_at)
    })
}

const sortByReverseDate = (filteredRepos) => {
    filteredRepos.sort(function (a, b) {
        return new Date(b.created_at) - new Date(a.created_at)
    })
}

const sortByReverseName = (filteredRepos) => {
    filteredRepos.sort(function (a, b) {
        var nameA = a.name.toUpperCase() // ignore upper and lowercase
        var nameB = b.name.toUpperCase() // ignore upper and lowercase
        if (nameA > nameB) {
            return -1
        }
        if (nameA < nameB) {
            return 1
        }
        // names must be equal
        return 0
    })
}

// const sortByCommits = () => {
//     fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`, options)
//         .then(res => res.json())
//         .then(data => {
//             // why item.author.login === username doesn't work here??
//             const userCommits = data.filter((item) => item.commit.author.name === 'Nadia Lefebvre')
//             console.log(userCommits.length)

//             userCommits.sort(function (a, b) {
//                 return a.length - b.length
//             })
//         })
// }

createProfile()
createRepoCard()