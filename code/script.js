/// All API:S ///
const USER = 'hejmaria'
const REPOS_URL = `http://api.github.com/users/${USER}/repos`;
const USER_URL = `http://api.github.com/users/${USER}`;

/// All DOM selectors ///
const projectContainer = document.getElementById('projects');
const profileContainer = document.getElementById('profile');


/// Fetching the user proile ///
const getProfile = () => {
    fetch(USER_URL)
    .then((res) => res.json())
    .then((data) => {
        profileContainer.innerHTML = `
    <div class="profile-box">
        <img src ="${data.avatar_url}" alt ="avatar picture" />
        </div>
        <div class="profile-box">
        <h3>Hi! I'm ${data.name}. This is my github tracker.</h3>
        <h3>Username: <a href="${data.html_url}">${data.login}</h3></a>
        
    </div>
    `;
    })
}

/// Fetching the repos ///
const getRepos = () => {
    fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {

    // data.forEach (repo => console.log(repo.name))

        const forkedRepos = data.filter(
            (repo) => repo.name.includes('project-') && repo.fork
            );
        
        /// Sort the projects ///
        forkedRepos.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
              );

        /// Putting the projects info into the html ///    
        forkedRepos.forEach((repo) => {
            projectContainer.innerHTML += `
            <div class="projects-box">
                <h4>${repo.name}</h4>
                <a href="${repo.html_url}">The project with default branch: ${repo.default_branch}</a>.
                <p>Most recent push: ${new Date(repo.pushed_at).toDateString()} </p>
                <p id="commit-${repo.name}">Number of commits: </p>
            </div> 
            `;
        });

        fetchPullRequestsArray(forkedRepos);
        drawChart(forkedRepos.length);
    });

};


/// Fetching the pull requests ///
const fetchPullRequestsArray = (allRepos) => {
    allRepos.forEach((repo) => {
        const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`;


        /// Sorting pullrequests and commits ///
        fetch(PULL_URL)
        .then ((res) => res.json())
        .then((data) => {            
            const userPullRequest = data.find(
                (pull) => pull.user.login === repo.owner.login);

            if (userPullRequest) {
                fetchCommits(userPullRequest.commits_url, repo.name);
            } else {
                document.getElementById(`commit-${repo.name}`).innerHTML = 
                `Nope, ${USER} hasn't done a pull request yet.`;
            }
        });
    });
};

/// Fetching the commits ///
const fetchCommits = (myCommitsUrl, MyRepoName) => {
    fetch(myCommitsUrl)
    .then((res) => res.json())
    .then((data) => {
        document.getElementById(`commit-${MyRepoName}`).innerHTML += data.length;
    });
};


getProfile()
getRepos()