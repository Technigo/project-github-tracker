let repoName = 'project-weather-app'

const API_REPOS = `https://api.github.com/users/elsisco/repos`
const API_USER = `https://api.github.com/users/elsisco`
const API_PR = `https://api.github.com/repos/technigo/${repoName}/pulls`


const projectsContainer = document.getElementById('projects')
const profileContainer = document.getElementById('profile')

const getUser = () => {
    fetch(API_USER)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            profileContainer.innerHTML += /*html*/ `
                <img class="avatar" src="${data.avatar_url}"/>
                <div>${data.name} (${data.login})</div>
                <div>${data.bio}</div>
            `
        })
}

getUser()


const getRepos = () => {
    fetch(API_REPOS)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
            // console.log(forkedRepos)
            
            forkedRepos.forEach(repo =>
                fetch(`https://api.github.com/repos/elsisco/${repo.name}/commits`)
                    .then(res => res.json())
                    .then(commits => {
                        let projectName = `${repo.name}`
                        const formattedProjectName = projectName.split("-")
                        for (let i = 0; i < formattedProjectName.length; i++) {
                            formattedProjectName[i] = formattedProjectName[i][0].toUpperCase() + formattedProjectName[i].substr(1);
                        }

                        let newProjectName = formattedProjectName.join(" ")

                        let latestCommit = `${new Date(repo.pushed_at).toLocaleString()}`    
                        // console.log(moment(latestCommit).format('LL'))
                        projectsContainer.innerHTML += /*html*/ `
                            <div class="project-card">
                                <h3>${newProjectName} | <a href="${repo.homepage}">Live ➔</a> | <a href="${repo.git_url}">GitHub ➔</a></h3>
                                <p>Default branch: ${repo.default_branch}</p>
                                <p>Commits: ${commits.length} | Latest commit: ${latestCommit}</p>
                            </div>
                        `

                        fetch(`https://api.github.com/repos/elsisco/${repo.name}/languages`)
                        .then(res => res.json())
                        .then(languages => {
                            console.log(languages)
                        })
                    })
            )
            drawChart(forkedRepos.length)
        })
}

getRepos()

// const getUserInfo = () => {
//     fetch(API_USER)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             profileContainer.innerHTML += /*html*/ `<div>${data.name} | ${data.login}</div>`
            
//         })
// }

// getUserInfo()

