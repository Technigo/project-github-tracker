// DOM selectors
const userProfile = document.getElementById('profile');
const userProjects = document.getElementById('projects');
const progressChart = document.getElementById('chart')
const searchRepo = document.getElementById("search-repo")
 
//Global Variables
let userName = "nama0027";
//let cardBack;
let cardFront;
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
                let date = formateDate(repo.pushed_at)
                let languageIcon = textToIcon(repo.language)
                userProjects.innerHTML += `
                        <div class="card front">
                        <div class= "card-body">
                            <div class="content labels" >
                                <p class="content labels">View me live here:</p>
                                <p class=" content labels">Updated on:</p>
                                <p class="content labels">Commits: </p>
                            </div>
                            <div class="content value" id="commitNum-${repo.name}" >
                                <p class="content value" >
                                <a href = "${repo.html_url}">
                                <span> Visit me at github</span></a>
                                </p>
                                <p class="content value" >${date}</p>
                            </div>
                        </div>
                        <div class="card-overlay" >
                            <div class="card-header">
                                <img class="language"
                                src="${languageIcon}"
                                alt="people"
                            />
                            <div class="repo-info">
                                <h2 class="repo-name"> ${repo.name}</h2>
                                <p class="repo-branch"><b>${repo.default_branch}</b></p>
                            </div>
                            </div>
                            <p class="repo-comment" id="review-${repo.name}" ></p>
                            <p class="repo-comment" id="commit-${repo.name}" ></p>
                        </div>
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
            const userPullReq = data.find((pull) =>
                (repo.owner.login === pull.user.login || pull.title.includes('Naushin'))
            );
            if (userPullReq) {
                getCommits(userPullReq.commits_url, repo.name);
                getComments(userPullReq.review_comments_url,repo.name );
            } else {
                document.getElementById(`commitNum-${repo.name}`).innerHTML += `
                    <p class="content value"> No pull request yet!</p>
                `
                document.getElementById(`review-${repo.name}`).innerHTML =
                 `No review yet`
            }
            
                
        
    })
}
    



function getCommits  (commitUrl, repoName) {

    fetch(commitUrl)
    .then(res => res.json())
    .then(data => {
        const commitMessages = Array.from(data, msg => msg.commit.message)
        displayCommitMessages(commitMessages, repoName)
        document.getElementById(`commitNum-${repoName}`).innerHTML += `
        <p class="content value"> ${data.length}</p>
        `
                   
    })
    
}
const formateDate = (date) => {
    
    const formattedDate = new Date(date).toDateString()

return formattedDate


}

const textToIcon = (lang) => {
    
    if (lang === 'HTML') {
        
        return './assets/html-50.png'
    } else if (lang === 'JavaScript') {
        
        return './assets/javascript.svg'
    } else {
        return './assets/javascript.svg'
    }


}




const displayCommitMessages= ((commitData, repoName ) => {
    console.log ('commitData', commitData)
    document.getElementById(`commit-${repoName}`).innerHTML += `Latest commit:"${commitData[commitData.length-1]}`
    
})

const getComments = (commentsUrl,repoName) => {

    console.log(commentsUrl)
    fetch(commentsUrl)
        .then(res => res.json())
        .then(data => {
            if (data.length!== 0){
            console.log('review', data);
            document.getElementById(`review-${repoName}`).innerHTML += `From reviewer:"${data[0].body}`
        } else {
            document.getElementById(`review-${repoName}`).innerHTML = `No review yet`
        }
    
    })
}

//----------- search--------------------//
const search = () => {
    console.log('i am here')
    let src = searchRepo.value.toLowerCase()
    console.log(src)
    const allRepo = document.getElementsByClassName('card front')
    for (i = 0; i < allRepo.length; i++) {
        if (allRepo[i].innerHTML.toLowerCase().includes(src)) {
      allRepo[i].style.display = "flex";
    } else {
      allRepo[i].style.display = "none";
    }
  }
}
    

//event listener

searchRepo.addEventListener('keyup', search)




//function calls on loading
getRepos();
getUser();
