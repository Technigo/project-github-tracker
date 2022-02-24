
//DOM selectors

const myProjects = document.getElementById('projects')
const userInfo = document.getElementById('user-info')

// ### What to include

// - A list of all repos that are forked ones from Technigo
// - Your username and profile picture
// - Most recent update (push) for each repo
// - Name of your default branch for each repo
// - URL to the actual GitHub repo
// - Number of commit messages for each repo
// - All pull requests
// - A chart of how many projects you've done so far, compared to how many you will do


const username = 'Dorothea-B'
const API_URL_USER = `https://api.github.com/users/${username}`
const API_URL_REPO = `https://api.github.com/users/${username}/repos`
//const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`
//PR is for Pull Requests - not Projects! 

let reponame

//User info

fetch(API_URL_USER)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        userInfo.innerHTML += 
        `<img class="userPicture" src=${data.avatar_url}
        <div class="userName">${data.name}</div>`
    })

//HERE STARTS THE PROJECTS

fetch(API_URL_REPO)
    .then(res => res.json())
    .then(data => {
        console.log(data)

        for (let i = 0; i < data.length; i++)

        myProjects.innerHTML += 
        `<div class="project">
        <div class="repoName"> Name: ${data[i].name} </div>
        <a href="http://${data[i].git_url}"> Repo url </a>
        <div class="defBranch"> Default branch: ${data[i].default_branch} </div>
        </div>`

        
        
        
       

        const fetchCommits = () => {

            data.forEach((repo) => {
            reponame = repo.name 
            })
        }
        fetchCommits(data)


       const API_REPO_COMMITS = `https://api.github.com/repos/${username}/${data.name}/commits`
        
            
            fetch(API_REPO_COMMITS)
            .then(res => res.json())
                
            .then(data => {
                console.log(data)


                //for (let y = 0; y < data.length; y++)

                //console.log("Num of commits:", data[y].commit)

                myProjects.innerHTML += 

            `   <div class="latest">'Latest commit: ', data[0].commit.message, " ", 'Total commits:', data.length </div>

                <div class="numOfCommits"> Commits: ${data.length} </div>
            `
            })



       
        console.log('Name of repo:', reponame)


    //    const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls?per_page=200`

    //     fetch(API_URL_PR)
    //     .then(res => res.json())
            
    //     .then(data => {
    //          console.log(data)

    //        // filter pull requests 


    //         })   

    })


    // for (let y = 0; y < data.length; y++)

    // reponame = data[y].name

    // console.log('Reponame:', reponame)
    // //Later have to make a loop for this


     
    // data.forEach((repo) => {
    //     reponame = repo.name
    // })

    // console.log(reponame)
    //Later have to make a loop for this