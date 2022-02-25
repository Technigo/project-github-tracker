//DOM selectors
const main = document.getElementById("projects");
const usr = document.getElementById("usr");

//Global variables
usrName = 'amandatange';
let forkedRepos = []; // will contain filtered list of repos that have been forked
let projectRepos = []; // will contain filtered list of repos with names that start with "project"

const API_REPOS = `https://api.github.com/users/${usrName}/repos`

const options = {
    method: 'GET',
    headers: {
        Authorization: `token ${API_TOKEN}`
    }
}

const fetchData = () => {
    fetch(API_REPOS, options)
    .then((res) => res.json())
    .then((data) => { 
        forkedRepos = data.filter(repo => repo.fork);
        projectRepos = forkedRepos.filter(repo => repo.name.startsWith('project'));

        // for the user presentation
        usr.innerHTML = `
            <img class='avatar_url_pic' src='${data[0].owner.avatar_url}'/>
            <h1><a href='${data[0].owner.html_url}'>@${usrName}</a></h1>
        `;

        //Send completed projects length to build chart
        myChart(projectRepos.length)

        //Call function to fetch pull requests
        fetchPR()
    })
}

const fetchPR = () => {
    for (let i = 0; i < projectRepos.length; i++) {
        const repo = projectRepos[i];
        const API_PR = `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
        const API_COMMITS = repo.commits_url.replace("{/sha}", "");

        fetch(API_PR, options)
            .then((resPR) => resPR.json())
            .then((dataPR) => {
                const pull = dataPR.filter(pr => pr.url.includes(repo.name) 
                && (pr.user.login === repo.owner.login || pr.user.login === "michaelchangdk" && pr.id === 856976386))
                
                fetch(API_COMMITS, options)
                    .then((commits_res) => commits_res.json())
                    .then((commits_data) => {
                        postInfo(pull, repo, commits_data.length)
                    })
            })
    }
}

const postInfo = (pull, repo, commitsLength) => {
    main.innerHTML += `
        <section id='${repo.name}' class='project'>
            <h3 class='repo-name'>${repo.name}</h3>
            <p class='repo-url'>Link to repo: <a href='${repo.html_url}'><span>here</span></a></p>
            <p class='default-branch'>Default branch: <span>${repo.default_branch}</span></p>
            <p class='recent-push'>Most recent update: <span>${new Date(repo.pushed_at).toLocaleDateString('en-GB')}</span></p>
            <p>Number of commits: <span>${commitsLength}</span></p>
        </section>`;

    //If the repo doesn't have a PR it won't add this data
    if (pull.length !== 0) {
        document.getElementById(`${repo.name}`).innerHTML += `
        <p>Pull request: <a href='${pull[0].html_url}'><span>here</span></a></p>`
    }
}

fetchData()
