//DOMs
const MY_REPOS = 'https://api.github.com/users/anndimi/repos'
const projectsContainer = document.getElementById("projects")
const commitsContainer = document.getElementById("commits")
const user = 'anndimi'
const USER_URL = `https://api.github.com/users/${user}`
const userContainer = document.getElementById("userProfile")

const checkHTML = document.getElementById("HTML")
const checkCSS = document.getElementById("CSS")
const checkJavaScript = document.getElementById("JavaScript")
let selectedLanguages = ['HTML', 'CSS', 'JavaScript']
let chartDrawn = false

//Create link images to social media
const createSocialMediaImg = (url, alt) => {
    let image = document.createElement("img")
    image.src = url
    image.alt = alt
    return image
}

const linkedinIcon = createSocialMediaImg("./assets/linkedin-icon.png", "linkedin")
const githubIcon = createSocialMediaImg("./assets/github-icon.png", "github")
const facebookIcon = createSocialMediaImg("./assets/facebook-icon.png", "facebook")

//Function to fetch and display profile information
const userProfile = () => {
    fetch(USER_URL)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            userContainer.innerHTML = `
        <img src="${data.avatar_url}" class="avatar"/>
        <p class="full-name">${data.name}</p>
        <p class="username">Username: ${data.login}</p>
        <p class="location">${data.location}</p>
        <a href="${data.html_url}" target="blank"><img src="${githubIcon.src}" alt="${githubIcon.alt}"  class="github-icon"/></a>
        <a href="${data.blog}" target="blank"><img src="${linkedinIcon.src}" alt="${linkedinIcon.alt}" class="linkedin-icon"/></a>
        <a href="https://www.facebook.com/anna.dimitrakopoulos" target="blank"><img src="${facebookIcon.src}" alt="${facebookIcon.alt}" class="facebook-icon"/></a>
        `
        })
}

//Function to fetch and display my repos
const fetchRepos = () => {
    fetch(MY_REPOS)
        .then((res) => res.json())
        .then((data) => {
            projectsContainer.innerHTML = `` //Clear innerHTML to prevent duplicated repos
            const forkedRepos =
                data.filter(repo => {
                    return repo.fork && repo.name.startsWith("project-") && selectedLanguages.includes(repo.language)
                })
            //Function to sort repos by latest date
            forkedRepos.sort(function (a, b) {
                return new Date(b.pushed_at) - new Date(a.pushed_at)
            })
            forkedRepos.forEach(repo => {
                projectsContainer.innerHTML += `
                      <div class="repo" id=${repo.name}>
                        <p>Name: ${repo.name} </p> 
                        <a href="${repo.html_url}" target="blank">Go to repo!</a> 
                        <p>Branch: ${repo.default_branch}</p>
                        <p>Latest push: ${new Date(repo.pushed_at).toDateString()}</p>
                        <p id="commit-${repo.name}">Amount of commits: </p> 
                      </div>
                        `
            })

            fetchPullRequests(forkedRepos)

            //Only draw the chart once
            if (!chartDrawn) {
                drawChart(forkedRepos.length)
                chartDrawn = true
            }
        })
}

const fetchPullRequests = (repos) => {
    repos.forEach(repo => {
        const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`

        fetch(PULL_URL)
            .then(res => res.json())
            .then((data) => {
                const myPullRequest =
                    data.find(pull => pull.user.login === repo.owner.login)
                if (myPullRequest) {
                    fetchCommits(myPullRequest.commits_url, repo.name);
                } else {
                    document.getElementById(`commit-${repo.name}`).innerHTML =
                        "No pull request yet!";
                }
            })
    })
}

const fetchCommits = (myCommitsUrl, myRepoName) => {
    fetch(myCommitsUrl)
        .then(res => res.json())
        .then(data => {
            document.getElementById(`commit-${myRepoName}`).innerHTML += data.length
        })
}

const filterLanguages = (event) => {
    console.log(event)
    const language = event.target.id
    const checked = event.target.checked

    console.log(language, checked)

    //Adds language string in array if checked language is missing
    if (checked && !selectedLanguages.includes(language)) {
        selectedLanguages.push(language)
        //Removes language string in array if unchecked language is in array     
    } else if (!checked && selectedLanguages.includes(language)) {
        for (let i = 0; i < selectedLanguages.length; i++) {
            console.log("i=", i)
            console.log("selectedLanguages[i]=", selectedLanguages[i])
            if (selectedLanguages[i] === language) {
                selectedLanguages.splice(i, 1)
                break
            }
        }
    }

    fetchRepos()
}


checkHTML.addEventListener('change', filterLanguages)

checkCSS.addEventListener('change', filterLanguages)

checkJavaScript.addEventListener('change', filterLanguages)

userProfile()
fetchRepos()



