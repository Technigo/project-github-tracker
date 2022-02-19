const username = 'nadialefebvre'
const API_USER = `https://api.github.com/users/${username}`
const API_REPOS = `https://api.github.com/users/${username}/repos` // const or let ?
const profile = document.getElementById('profile')
const projects = document.getElementById('projects')
const projects2 = document.getElementById('projects2')




function openCity(evt, cityName) {
    var i, tabcontent, tablinks
    tabcontent = document.getElementsByClassName("tabcontent")
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none"
    }
    tablinks = document.getElementsByClassName("tablinks")
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "")
    }
    document.getElementById(cityName).style.display = "block"
    evt.currentTarget.className += " active"
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

const addCommits = (repo) => {
    fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`, options)
        .then(res => res.json())
        .then(data => {
            const userCommits = data.filter((item) => item.commit.author.name === 'Nadia Lefebvre')
            // document.getElementById(repo.name).innerHTML += `
            //                 <p>Number of commits from the user: ${userCommits.length} on a total of ${data.length}</p>
            //                 <p>Commit messages: </p>
            //             `

            // TEST
            document.getElementById(`${repo.name}-repoInfos`).innerHTML += `
                        <p>Number of commits from the user: ${userCommits.length} on a total of ${data.length}</p>
                        `


            const userFiveLastCommits = userCommits.slice(1, 5)
            console.log(userFiveLastCommits)
            userFiveLastCommits.forEach(item => {
                // document.getElementById(repo.name).innerHTML += `
                //             <li>${item.commit.message}</li>
                //         `

                // TEST
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

            // gros paquet de gogosses pour calculer les pourcentages : reste à ajouter le % maintenant...
            const html = languages.HTML === undefined ? 0 : languages.HTML
            const css = languages.CSS === undefined ? 0 : languages.CSS
            const js = languages.JavaScript === undefined ? 0 : languages.JavaScript
            const htmlPercentage = Math.round(html / (html + css + js) * 1000) / 10
            const cssPercentage = Math.round(css / (html + css + js) * 1000) / 10
            const jsPercentage = Math.round(js / (html + css + js) * 1000) / 10

            const idChart = `${repo.name}Chart`

            // TEST
            document.getElementById(`${repo.name}-repoLanguages`).innerHTML += `
            <div class="chart-container">
            <canvas id=${idChart}></canvas>
            </div>
`




            // document.getElementById(repo.name).innerHTML += `
            //                 <div class="chart-container">
            //                 <canvas id=${idChart}></canvas>
            //                 </div>
            //             `
            drawLanguagesChart(htmlPercentage, cssPercentage, jsPercentage, idChart)
        })
}




// À ARRANGER
const addPullComments = (repo) => {
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls`, options)
        .then(res => res.json())
        .then(data => {
            const userPulls = data.filter((item) => item.user.login === 'nadialefebvre')
            userPulls.forEach(pull => {
                fetch(pull.review_comments_url)
                    .then(res => res.json())
                    .then(data => {
                        console.log(repo.name)
                        console.log(data)
                        data.forEach(comment => {
                            // document.getElementById(repo.name).innerHTML += `
                            //             <p>Comments from PR: ${comment.body}</p>
                            //         `


                            // TEST
                            document.getElementById(`${repo.name}-repoPullComments`).innerHTML = `
                                        <li>${comment.body}</li>
`


                        })
                    })
            })
        })
}




const createRepoCard = () => {
    fetch(API_REPOS, options) // options object is passed as 2nd argument to fetch() function. // TO REMOVE BEFORE GIT PUSH
        .then(res => res.json())
        .then(data => {
            const filteredRepos = data.filter(repo => repo.fork === true && repo.name.startsWith('project-'))
            drawProjectsChart(filteredRepos.length)
            filteredRepos.forEach(repo => {
                const options = { day: 'numeric', month: 'long', year: 'numeric' }
                // projects.innerHTML += `
                //     <div class="repo" id=${repo.name}>
                //         <p>Name: ${repo.name}</p>
                //         <p>URL: <a href="${repo.html_url}">${repo.name}</a></p>
                //         <p>Default branch: ${repo.default_branch}</p>
                //         <p>Last push: ${new Date(repo.pushed_at).toLocaleDateString('en-GB', options)}</p>
                //     </div>
                // `




                // TEST
                projects.innerHTML += `
                    <div class="tab-card">
                        <div class="tab">
                            <button class="tablinks" onclick="openCity(event, '${repo.name}-infos')" id="${repo.name}-defaultOpen">${repo.name}</button>
                            <button class="tablinks" onclick="openCity(event, '${repo.name}-languages')">Languages</button>
                            <button class="tablinks" onclick="openCity(event, '${repo.name}-commitMessages')">Commit messages</button>
                            <button class="tablinks" onclick="openCity(event, '${repo.name}-pullComments')">PR comments</button>
                        </div>

                        <div id="${repo.name}-infos" class="tabcontent">
                            <h3>Name: ${repo.name}</h3>
                            <div id=${repo.name}-repoInfos></div>
                        </div>

                        <div id="${repo.name}-languages" class="tabcontent">
                            <h3>Languages</h3>
                            <div id=${repo.name}-repoLanguages></div>
                        </div>

                        <div id="${repo.name}-commitMessages" class="tabcontent">
                            <h3>Commit messages</h3>
                            <div id=${repo.name}-repoCommitMessages></div>
                        </div>

                        <div id="${repo.name}-pullComments" class="tabcontent">
                            <h3>Code review comments:</h3>
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
                addPullComments(repo)
                addLanguageChart(repo)


            })
        })
}









createProfile()
createRepoCard()
