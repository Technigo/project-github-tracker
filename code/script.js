//DOM selectors
const main = document.getElementById("projects"); // main portion of the site, contains all projects
const usr = document.getElementById("usr"); // section in header that holds username and profile pic

//Global variables
const usrName = 'amandatange';
let forkedRepos = []; // will contain filtered list of repos that have been forked
let projectRepos = []; // will contain filtered list of forked repos with names that start with "project"

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

        const profilePic = data[0].owner.avatar_url;
        const LinkToProfile = data[0].owner.html_url;

        // for the user presentation
        usr.innerHTML = `
            <img class='avatar_url_pic' src='${profilePic}'/>
            <h1><a href='${LinkToProfile}'>@${usrName}</a></h1>
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

        //  since not all projects have a PR I don't have access to the commits from the PR API for all of them 
        //  so I chose to use the commits api from the first fetch
        //  but I think this way the number of commits includes those made by the technigo team before I forked the project?
        const API_COMMITS = repo.commits_url.replace("{/sha}", ""); 

        fetch(API_PR, options)
            .then((resPR) => resPR.json())
            .then((dataPR) => {
                //filter for every PR to match my profile (or in the case of the weather app, to michael's profile and id for the PR)
                const pull = dataPR.filter(pr => pr.url.includes(repo.name) 
                && (pr.user.login === repo.owner.login || pr.user.login === "michaelchangdk" && pr.id === 856976386))
                
                fetch(API_COMMITS, options)
                    .then((commits_res) => commits_res.json())
                    .then((commits_data) => {
                        //  sending the PR, repo and number of commits to the function that posts the data on the site
                        postInfo(pull, repo, commits_data.length)
                    })
            })
    }
}


const postInfo = (pull, repo, numberOfCommits) => {

    const update = new Date(repo.pushed_at).toLocaleDateString('en-GB');

    //  the tags have classes that aren't used right now 
    //  but I would like to try using them to style the layout with a more a advanced grid layout
    main.innerHTML += `
        <section id='${repo.name}' class='project'>
            <h3 class='repo-name'>${repo.name}</h3>
            <p id='repoURL' class='repo-url'>Link to repo: <a href='${repo.html_url}'><span>here</span></a></p>
            <p id='defaultBranch' class='default-branch'>Default branch: <span>${repo.default_branch}</span></p>
            <p id='recentPush' class='recent-push'>Most recent update: <span>${update}</span></p>
            <p id='numberCommits' class='number-commits'>Number of commits: <span>${numberOfCommits}</span></p>
        </section>`;
    //If the repo doesn't have a PR it won't add this data
    if (pull.length !== 0) {
        const PRLink = pull[0].html_url;
        document.getElementById(`${repo.name}`).innerHTML += `
        <p>Pull request: <a href='${PRLink}'><span>here</span></a></p>`
    }
}

fetchData()
