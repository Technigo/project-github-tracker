const USER = 'hejmaria'
const REPOS_URL = `http://api.github.com/users/${USER}/repos`;


const projectContainer = document.getElementById('projects');



const getRepos = () => {
    fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
    console.log('The data', data)

    data.forEach (repo => console.log(repo.name))

        const forkedRepos = data.filter(
            (repo) => repo.name.includes('project-') && repo.fork
            );
        
        forkedRepos.forEach((repo) => {
            projectContainer.innerHTML += `
            <div>
                <h3>${repo.name}</h3>
                <a href="${repo.html_url}">${repo.name} with defalut branch ${repo.default_branch}</a>.
                <p>Most recent push: ${new Date(repo.pushed_at).toDateString()} </p>
                <p id="commit-${repo.name}">Commits ammount: </p>
            </div> 
            `;
        });
        
        fetchPullRequestsArray(forkedRepos);
        drawChart(forkedRepos.length);
        
        
    });

};

const fetchPullRequestsArray = (allRepos) => {
    allRepos.forEach((repo) => {
        const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`;

        fetch(PULL_URL)
        .then ((res) => res.json())
        .then((data) => {
            console.log(`mama repo of ${repo.name}`, data); 
            
            const userPullRequest = data.find(
                (pull) => pull.user.login === repo.owner.login);
            console.log('MIN MACKA', userPullRequest)

            if (userPullRequest) {
                fetchCommits(userPullRequest.commits_url, repo.name);
            } else {
                document.getElementById(`commit-${repo.name}`).innerHTML = 
                'Nope, no pull request done yet. You just wait.';
            }
        });
    });
};
const fetchCommits = (myCommitsUrl, MyRepoName) => {
    fetch(myCommitsUrl)
    .then((res) => res.json())
    .then((data) => {
        document.getElementById(`commit-${MyRepoName}`).innerHTML += data.length;
    });
};


getRepos()