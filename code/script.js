//DOMs
const MY_REPOS = 'https://api.github.com/users/anndimi/repos'
const projectsContainer = document.getElementById("projects")
const commitsContainer = document.getElementById("commits")
const user = 'anndimi'
const USER_URL = `https://api.github.com/users/${user}`
const userContainer = document.getElementById("userProfile")



const userProfile = () => {
    fetch(USER_URL)
        .then(res => res.json())
        .then(data => {
            userContainer.innerHTML = `
        <h2>Username: ${data.login}<h2>
        <p>Full name: ${data.name}</p>
        <p>Location: ${data.location}<p>
        <img src="${data.avatar_url}"/>
        `
        })
}

//Function to fetch my repos
const fetchRepos = () => {
    fetch(MY_REPOS)
        .then((res) => res.json())
        .then((data) => {
            //console.log(data)
            const forkedRepos =
                data.filter(repo => repo.fork && repo.name.startsWith("project-"))


            const commitDate = new Date()
            const formattedDate = commitDate.toISOString().split('T')[0]
            console.log(formattedDate)

            forkedRepos.forEach(repo => {
                projectsContainer.innerHTML += `
                      <div class="repo" id=${repo.name}>
                        <h2>${repo.name}</h2>
                        <p>${repo.default_branch}</p>
                        <a href="${repo.html_url}" target="blank">Click here to see!</a>
                        <p>${repo.updated_at}</p>
                      </div>
                    `
            })


            drawChart(forkedRepos.length)
            fetchPullRequests(forkedRepos)
            console.log(forkedRepos)
        })


}

const fetchPullRequests = (repos) => {
    repos.forEach(repo => {
        fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
            .then(res => res.json())
            .then((data) => {
                const myPull =
                    data.find(pull => pull.user.login === repo.owner.login)
                console.log(myPull)
                fetchCommits(myPull.commits_url)

            })
    })
}

const fetchCommits = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            //document.getElementById(repoName).innerHTML += commits_url.length
        })

}



userProfile()
fetchRepos()



