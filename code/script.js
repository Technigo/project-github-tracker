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
                <div class="user-wrapper">
                    <div class="avatar-wrapper">
                        <img class="avatar" src="${data.avatar_url}"/>
                    </div>
                    <div class="links-text">${data.name}</div>
                    <div class="text">${data.login}</div>
                    <div class="location">
                        <img src="./assets/location_icon.svg">
                        <div class="text">${data.location}</div>
                    </div>
                    <div class="text">${data.bio}</div>
                </div>
            `
        })
}

const getRepos = () => {
    fetch(API_REPOS)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
            // console.log(forkedRepos)
            forkedRepos.forEach(repo =>
                fetch(`https://api.github.com/repos/elsisco/${repo.name}/commits`)
                    .then(res => res.json())
                    .then(commits => {
                        // Formatting the title of projects to start all words with capital letter
                        let projectName = `${repo.name}`
                        const formattedProjectName = projectName.split("-")
                        for (let i = 0; i < formattedProjectName.length; i++) {
                            formattedProjectName[i] = formattedProjectName[i][0].toUpperCase() + formattedProjectName[i].substr(1);
                        }
                        let newProjectName = formattedProjectName.join(" ")
                        // Date for most recent update of project
                        let latestCommit = `${new Date(repo.pushed_at).toLocaleString("zh-TW", { dateStyle: 'short' })}`   
                        
                        // Tried to use moment.js
                        // console.log(moment(latestCommit).format('LL'))

                        // Trying to calculate and display the language percentage per project
                        const calculateLanguagePercentage = () => {
                            fetch(`https://api.github.com/repos/elsisco/${repo.name}/languages`)
                                .then(res => res.json())
                                .then(json => {
                                    const html = json.HTML || 0;
                                    const css = json.CSS || 0;
                                    const js = json.JavaScript || 0;
                                    const total = html + css + js;

                                    const js_percent = ((js / total) * 100).toFixed(1);
                                    const css_percent = ((css / total) * 100).toFixed(1);
                                    const html_percent = ((html / total) * 100).toFixed(1);
                                    // languages.forEach(language => {
                                    //     let sum = JavaScript.value + CSS.value + HTML.value
                                    //     console.log(sum)
                                    // })
                                    console.log('JS ' + js_percent)
                                    console.log('CSS ' + css_percent)
                                    console.log('HTML ' + html_percent)

                                    projectsContainer.innerHTML += /*html*/ `
                                        <div class="project-card" id="${repo.name}">
                                            <p class="project-headline">${newProjectName}</p>
                                            <p class="links-text"><a href="${repo.html_url}">GitHub repository ➔</a> | <a href="${repo.homepage}">View it live ➔</a></p>
                                            <p class="text">Updated ${latestCommit} | ${commits.length} commits</p>
                                            <p class="text">Default branch: ${repo.default_branch}</p>
                                            <div class="languages">
                                                <p class="small-headline">Languages</p>

                                                <div class="progress">
                                                    <div class="progress-html" style="width:${html_percent}%;"></div>
                                                    <div class="progress-css" style="width:${css_percent}%;"></div>
                                                    <div class="progress-js" style="width:${js_percent}%;"></div>
                                                    
                                                </div>
                                                
                                                <section class="the-languages">
                                                    <div class="html-wrapper">
                                                        <div class="language-dot" style="background-color:#56B093;"></div>
                                                        <div class="language-text">HTML</div>
                                                    </div>
                                                    <div class="css-wrapper">
                                                        <div class="language-dot" style="background-color:#EBBC4E;"></div>
                                                        <div class="language-text">CSS</div>
                                                        </div>
                                                    <div class="js-wrapper">
                                                        <div class="language-dot" style="background-color:#F59B99;"></div>
                                                        <div class="language-text">JavaScript</div>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    `
                                })
                        }
                        calculateLanguagePercentage()

                        // Adding content to the projects
                        
                    })
            )
            drawChart(forkedRepos.length)
        })
}

getUser()
getRepos()