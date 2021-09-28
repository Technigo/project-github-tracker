// DOM selectors
const userProfile = document.getElementById('profile');
const userProjects = document.getElementById('projects');
const progressChart = document.getElementById('chart')

//Global Variables
let userName = "nama0027";

// API variables
const USER_REPO_URL = `https://api.github.com/users/${userName}/repos`;
const USER_URL = `https://api.github.com/users/${userName}`;


//-------------functions deceleration----------------------------//

//---- for fetch----//

const getUser = () => {
    fetch(USER_URL)
        .then((res)=>{return res.json()})
        .then((data) => {
            console.log('user', data)
            userProfile.innerHTML = `
            <div class= "user">
            <img class= "photo" src= "${data.avatar_url}" alt= "${data.name} avatar" />
            <h2 class = "name"> ${data.name}</h2>
            </div>
            <a href="${data.html_url}" class="link-github">
                <span class="connect-label"> My GitHub Page </span>
            </a>
            `

        }) 
}

const getRepos = () =>{
    fetch(USER_REPO_URL)
        .then ((res) => {
            return res.json();

    })
        .then((data) => {
            console.log(data);
            const technigoProjects = data.filter(item => (item.fork && item.name.startsWith('project-') ))
            technigoProjects.forEach((repo) => {
                console.log(repo.name);
                getPullRequests(repo)
                userProjects.innerHTML += `
                <div class ="repo-card" id= "${repo.name}"> 
                    <a href = "${repo.html_url}"> 
                    <span>  ${repo.name}</span>
                    </a>
                    <label > Default branch:
                        <span>  ${repo.default_branch} </span>
                    </label>
                    
                    <label > Last updated at:
                        <span>  ${repo.pushed_at} </span>
                    </label>
                </div>
                `
            })
            drawChart(technigoProjects.length)
           
    })
}

const getPullRequests = (repo) => {
    //Get all the PRs for each project.
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const userPullReq = data.filter((item) => (repo.owner.login === item.user.login || item.title.includes('Naushin')));
            userPullReq.forEach((item) => {
                getCommits(item.commits_url, repo.name);
                getComments(item.review_comments_url);
                
        })
    })
}
    



function getCommits  (commitUrl, repoName) {

    //console.log(commitUrl)
    

    fetch(commitUrl)
    .then(res => res.json())
    .then(data => {
        //console.log(data.length)
        
        document.getElementById(repoName).innerHTML +=`
        <label > Number of Commits:
        <span>  ${data.length} </span>
        </label>
    `
                
    })
   
}

const getComments = (commentsUrl) => {

    console.log (commentsUrl)
    
}

getRepos();
//getUser();
