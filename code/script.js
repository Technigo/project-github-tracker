const username = 'nadialefebvre'
const API_USER = `https://api.github.com/users/${username}`
const API_REPOS = `https://api.github.com/users/${username}/repos`
const userBox = document.getElementById('userBox')
const reposBox = document.getElementById('reposBox')
const sortingDropdown = document.getElementById('sortingDropdown')





const openTab = (event, tabName) => {
    let i
    let repoContent = event.currentTarget.parentNode.parentNode.getElementsByClassName("repo-content")
    for (i = 0; i < repoContent.length; i++) {
        repoContent[i].style.display = "none"
    }
    let tabButton = event.currentTarget.parentNode.getElementsByClassName("tab-button")
    for (i = 0; i < tabButton.length; i++) {
        tabButton[i].className = tabButton[i].className.replace(" active", "")
    }
    document.getElementById(tabName).style.display = "block"
    event.currentTarget.className += " active"
}











const createHeader = () => {
    fetch(API_USER)
        .then(res => res.json())
        .then(data => {
            userBox.innerHTML = `
                    <img src="${data.avatar_url}" class="user-picture">
                    <h2>${data.name}</h2>
            `
        })
}

const createRepoCard = (reposToUse = null) => {
    fetch(API_REPOS) // options object is passed as 2nd argument to fetch() function. // TO REMOVE BEFORE GIT PUSH
        .then(res => res.json())
        .then(data => {
            const selectSorting = () => {
                if (sortingDropdown.value === 'Z to A') {
                    sortByNameZA(filteredRepos)
                } else if (sortingDropdown.value === 'Recent to old') {
                    sortByDateRecentOld(filteredRepos)
                } else if (sortingDropdown.value === 'Old to recent') {
                    sortByDateOldRecent(filteredRepos)
                } else {
                    sortByNameAZ(filteredRepos)
                }
                reposBox.innerHTML = ''
                createRepoCard(filteredRepos)
            }

            let filteredRepos
            if (reposToUse === null) {
                filteredRepos = data.filter(repo => repo.fork === true && repo.name.startsWith('project-'))
                drawReposChart(filteredRepos.length)
                sortingDropdown.addEventListener('change', selectSorting)
            } else {
                filteredRepos = reposToUse
            }

            filteredRepos.forEach(repo => {
                setRepoCardStructure(repo)

                const options = { day: 'numeric', month: 'numeric', year: 'numeric' }
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

const setRepoCardStructure = (repo) => {
    reposBox.innerHTML += `
        <div class="repo-card">
            <div class="repo-tabs">
                <button class="tab-button" onclick="openTab(event, '${repo.name}-infos')" id="${repo.name}-defaultOpen">Data</button>
                <button class="tab-button" onclick="openTab(event, '${repo.name}-languages')">Languages</button>
                <button class="tab-button" onclick="openTab(event, '${repo.name}-commitMessages')">Commits</button>
                <button class="tab-button" onclick="openTab(event, '${repo.name}-pullComments')">Pull request</button>
            </div>

            <div class="repo-content" id="${repo.name}-infos">
                <h3>${repo.name}</h3>
                <div id=${repo.name}-repoInfos></div>
            </div>

            <div class="repo-content" id="${repo.name}-languages" style="display: none">
                <h3>${repo.name}</h3>
                <div id=${repo.name}-repoLanguages></div>
            </div>

            <div class="repo-content" id="${repo.name}-commitMessages" style="display: none">
                <h3>${repo.name}</h3>
                <h5>Messages</h5>
                <div id=${repo.name}-repoCommitMessages></div>
            </div>

            <div class="repo-content" id="${repo.name}-pullComments" style="display: none">
                <h3>${repo.name}</h3>
                <div id=${repo.name}-repoPullComments>(none)</div>
            </div>
        </div>
    `
}

const addCommits = (repo) => {
    fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`)
        .then(res => res.json())
        .then(data => {
            // why item.author.login === username doesn't work here??
            const userCommits = data.filter((item) => item.commit.author.name === 'Nadia Lefebvre')

            document.getElementById(`${repo.name}-repoInfos`).innerHTML += `
                <p>Fork commits: ${userCommits.length} (on ${data.length})</p>
            `

            // const userFiveLastCommits = userCommits.slice(1, 5)
            // userFiveLastCommits.forEach(item => {
            userCommits.forEach(item => {
                document.getElementById(`${repo.name}-repoCommitMessages`).innerHTML += `
                    <li>${item.commit.message}</li>
                `
            })
        })
}

const addLanguageChart = (repo) => {

    fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`)
        .then(res => res.json())
        .then(languages => {
            // variables so data will be 0 and not undefined if = 0
            const html = languages.HTML === undefined ? 0 : languages.HTML
            const css = languages.CSS === undefined ? 0 : languages.CSS
            const js = languages.JavaScript === undefined ? 0 : languages.JavaScript

            const idChart = `${repo.name}Chart`

            document.getElementById(`${repo.name}-repoLanguages`).innerHTML += `
            <div class="languages-chart">
            <canvas id=${idChart}></canvas>
            </div>
`

            drawLanguagesChart(html, css, js, idChart)
        })
}


const fetchPullRequest = (repo) => {
    // fix it because only 1 page of 30 PR is fetched, link: https://docs.github.com/en/rest/reference/pulls#list-pull-requests (added ?per_page=100&page=1 to URL, but it doesn't fix the problem for when the PR will go to page 2-3-4...)
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100&page=1`)
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
                <p><a href="${pull.html_url}">Pull request with code review</a></p>
                <h5>Code review comment</h5>    
                <p>"${data.body}"</p>
            `
        })
}


const sortByNameAZ = (filteredRepos) => {
    filteredRepos.sort(function (a, b) {
        const nameA = a.name.toLowerCase() // ignore upper and lowercase
        const nameB = b.name.toLowerCase() // ignore upper and lowercase
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        // names must be equal
        return 0
    })
}

const sortByNameZA = (filteredRepos) => {
    filteredRepos.sort(function (a, b) {
        const nameA = a.name.toLowerCase() // ignore upper and lowercase
        const nameB = b.name.toLowerCase() // ignore upper and lowercase
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

const sortByDateRecentOld = (filteredRepos) => {
    filteredRepos.sort(function (a, b) {
        return new Date(b.created_at) - new Date(a.created_at)
    })
}

const sortByDateOldRecent = (filteredRepos) => {
    filteredRepos.sort(function (a, b) {
        return new Date(a.created_at) - new Date(b.created_at)
    })
}


createHeader()
createRepoCard()



// sortByCommits()
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