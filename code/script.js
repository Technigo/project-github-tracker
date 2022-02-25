const userBox = document.getElementById('userBox')
const reposBox = document.getElementById('reposBox')
const sortingDropdown = document.getElementById('sortingDropdown')

const username = 'nadialefebvre'
const API_USER = `https://api.github.com/users/${username}`
const API_REPOS = `https://api.github.com/users/${username}/repos`

const API_TOKEN = TOKEN
const options = {
    method: 'GET',
    headers: {
        Authorization: `token ${API_TOKEN}`
    }
}

// Function for the tab buttons in repo card
const openTab = (event, tabName) => {
    let i
    let repoContent = event.currentTarget.parentNode.parentNode.getElementsByClassName("repo-content") // targets the content on each individual repo card
    for (i = 0; i < repoContent.length; i++) {
        repoContent[i].style.display = "none" // not displayed at first
    }

    let tabButton = event.currentTarget.parentNode.getElementsByClassName("tab-button")
    // when another button is clicked, "active" class is removed from the other buttons of the same card
    for (i = 0; i < tabButton.length; i++) {
        tabButton[i].className = tabButton[i].className.replace(" active", "")
    }

    document.getElementById(tabName).style.display = "block"
    event.currentTarget.className += " active" // changes the classname on click to "active"
}

// Function to create the profile part of the header with user name and picture 
// -------------------------------------------------- FETCH 1 --------------------------------------------------
const createProfile = () => {
    fetch(API_USER, options)
        .then(res => res.json())
        .then(data => {
            userBox.innerHTML = `
                <img src="${data.avatar_url}" class="user-picture" alt="user picture">
                <h2>${data.name}</h2>
            `
        })
}

// Function to create all repo cards
// -------------------------------------------------- FETCH 2 --------------------------------------------------
const createRepoCard = (reposToUse = null) => {
    fetch(API_REPOS, options)
        .then(res => res.json())
        .then(data => {
            const selectSorting = () => {
                if (sortingDropdown.value === 'Z to A') {
                    sortByNameZA(filteredRepos)
                } else if (sortingDropdown.value === 'Latest') {
                    sortDateLatest(filteredRepos)
                } else if (sortingDropdown.value === 'Oldest') {
                    sortDateOldest(filteredRepos)
                } else {
                    sortByNameAZ(filteredRepos)
                }
                reposBox.innerHTML = ''
                // function to create all repo cards called after sorting
                createRepoCard(filteredRepos)
            }

            // conditionals so the repos chart from chart.js is drawn only once
            // filtering of the repos forked from technigo
            let filteredRepos
            if (reposToUse === null) {
                filteredRepos = data.filter(repo => repo.fork === true && repo.name.startsWith('project-'))
                drawReposChart(filteredRepos.length)
                sortingDropdown.addEventListener('change', selectSorting)
            } else {
                filteredRepos = reposToUse
            }

            filteredRepos.forEach(repo => {
                // function called to set the HTML structure of each repo card filtered
                setRepoCardStructure(repo)

                document.getElementById(`${repo.name}-repoData`).innerHTML += `
                    <p>URL: <a href="${repo.html_url}">${repo.name}</a></p>
                    <p>Default branch : ${repo.default_branch}</p>
                    <p>Last push: ${new Date(repo.pushed_at).toLocaleDateString('en-GB')}</p>
                `

                // get the element with id="defaultOpen" and click on it
                document.getElementById(`${repo.name}-defaultOpen`).click()

                // functions called after filtering the right repos
                addCommits(repo)
                addLanguageChart(repo)
                fetchPullRequest(repo)
            })
        })
}

// Function for the structure of each repo card with dynamic IDs
const setRepoCardStructure = (repo) => {
    reposBox.innerHTML += `
        <div class="repo-card">
            <div class="repo-tabs">
                <button class="tab-button" onclick="openTab(event, '${repo.name}-data')" id="${repo.name}-defaultOpen">Data</button>
                <button class="tab-button" onclick="openTab(event, '${repo.name}-languages')">Languages</button>
                <button class="tab-button" onclick="openTab(event, '${repo.name}-commitMessages')">Commits</button>
                <button class="tab-button" onclick="openTab(event, '${repo.name}-pullComments')">Pull request</button>
            </div>

            <div class="repo-content" id="${repo.name}-data">
                <h3 class="repo-name">${repo.name.replace('project-', '').replace('-', ' ')}</h3>
                <div id=${repo.name}-repoData></div>
            </div>

            <div class="repo-content" id="${repo.name}-languages" style="display: none">
                <h3 class="repo-name">${repo.name.replace('project-', '').replace('-', ' ')}</h3>
                <div id=${repo.name}-repoLanguages></div>
            </div>

            <div class="repo-content" id="${repo.name}-commitMessages" style="display: none">
                <h3 class="repo-name">${repo.name.replace('project-', '').replace('-', ' ')}</h3>
                <h5>Messages</h5>
                <div id=${repo.name}-repoCommitMessages></div>
            </div>

            <div class="repo-content" id="${repo.name}-pullComments" style="display: none">
                <h3 class="repo-name">${repo.name.replace('project-', '').replace('-', ' ')}</h3>
                <div id=${repo.name}-repoPullComments>(none)</div>
            </div>
        </div>
    `
}

// Function to add the commits data in the right place
// -------------------------------------------------- FETCH 3 (inside of FETCH 2) --------------------------------------------------
const addCommits = (repo) => {
    fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=100`, options)
        .then(res => res.json())
        .then(data => {
            // I need to solve why item.author.login === username doesn't work here
            const userCommits = data.filter((item) => item.commit.author.name === 'Nadia Lefebvre')

            document.getElementById(`${repo.name}-repoData`).innerHTML += `
                <p>Fork commits: ${userCommits.length} (on ${data.length})</p>
            `

            userCommits.forEach(item => {
                document.getElementById(`${repo.name}-repoCommitMessages`).innerHTML += `
                    <li>${item.commit.message}</li>
                `
            })
        })
}

// Function to add the language chart in each repo card
// -------------------------------------------------- FETCH 4 (inside of FETCH 2) --------------------------------------------------
const addLanguageChart = (repo) => {
    fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`, options)
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
            // function called from chart.js
            drawLanguagesChart(html, css, js, idChart)
        })
}

// Function to fetch the pull request for each repo card
// -------------------------------------------------- FETCH 4 (inside of FETCH 2) --------------------------------------------------
const fetchPullRequest = (repo) => {
    // only 1 page of 100 PR is fetched, this will be an issue when the PR will go to page 2
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100&page=1`)
        .then(res => res.json())
        .then(data => {
            fetchCodeReview(data, repo)
        })
}

// Function to fetch the code review data for each repo card
// -------------------------------------------------- FETCH 5 (inside of FETCH 4) --------------------------------------------------
const fetchCodeReview = (data, repo) => {
    const userPulls = data.filter((item) => item.user.login === username)
    userPulls.forEach(pull => {
        fetch(pull.review_comments_url)
            .then(res => res.json())
            .then(data => {
                if (data.length) {
                    const reviewID = data[0].pull_request_review_id
                    // function called to add code review data
                    addCodeReviewData(repo, pull, reviewID)
                }
            })
    })
}


// Function to add the code review data in each repo card
// -------------------------------------------------- FETCH 6 (inside of FETCH 5) --------------------------------------------------
const addCodeReviewData = (repo, pull, reviewID) => {
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls/${pull.number}/reviews/${reviewID}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById(`${repo.name}-repoPullComments`).innerHTML = `
                <p><a href="${pull.html_url}">Pull request with code review</a></p>
                <h5>Code review comment (if any)</h5>    
                <p>${data.body}</p>
            `
        })
}

// Sorting functions
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

const sortDateLatest = (filteredRepos) => {
    filteredRepos.sort(function (a, b) {
        return new Date(b.created_at) - new Date(a.created_at)
    })
}

const sortDateOldest = (filteredRepos) => {
    filteredRepos.sort(function (a, b) {
        return new Date(a.created_at) - new Date(b.created_at)
    })
}

// First functions called when accessing the page
createProfile()
createRepoCard()