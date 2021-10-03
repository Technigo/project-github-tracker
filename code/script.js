const USER = 'silvertejp89'
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const PROFILE_URL = `https://api.github.com/users/${USER}`
const projectContainer = document.getElementById('projects')
const profileInfo = document.getElementById("profile");

const getProfile = () => {
    fetch(PROFILE_URL)
    .then(Response => Response.json())
    .then(data => {
        // console.log('Profiluris', data)
        profileInfo.innerHTML += `
        <img src=${data.avatar_url}></img>
        <p>${USER}</p>

        `
    }) 
}
getProfile() //invoking


const getRepos = () => {
    fetch(REPOS_URL)
    .then(response => response.json())
    .then(data => {
        console.log("Här är vi!", data) //so we can see all the info 

        
        const forkedRepos = data.filter(
            (repo) => repo.name.includes('project-') && repo.fork
			);

        forkedRepos.forEach(repo => projectContainer.innerHTML += `
            <div class='card'>
                <a href="${repo.html_url}"><h3>${repo.name}</h3></a>  
                <p> Default branch: ${repo.default_branch}</p>
                <p> Recent push: ${new Date(repo.pushed_at).toDateString()}</p>  
                <p id='commit-${repo.name}'> Number of commits:</p> 
                   
            </div>
            

        `) //create div for card

        
        // const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-')) 
        // forkedRepos.forEach(repo => projectContainer.innerHTML += `<h3>${repo.name}</h3>`) //create div for card

        fetchPullRequestsArray(forkedRepos);

        drawChart(forkedRepos.length) // needs to see const forkedRepos
 
    })

}


const fetchPullRequestsArray = (allRepositories) => {
    allRepositories.forEach((repo) => {
        const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`;
       
        fetch(PULL_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const myPullRequest = data.find(
                (pull) => pull.user.login === repo.owner.login 
            );
        console.log('pull request', myPullRequest)
        
        if (myPullRequest) {
            fetchCommits(myPullRequest.commits_url, repo.name);
        } else {
            document.getElementById(`commit-${repo.name}`).innerHTML =
                'No pull request yet done :(';

        }
        })
    })
}
const fetchCommits = (myCommitsUrl, myRepoName) => {
	fetch(myCommitsUrl)
		.then(res => res.json())
		.then(data => {
			document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;
		});
};

getRepos() //invoking getRepos



