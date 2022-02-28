
//DOM selectors

const myProjects = document.getElementById('projects')
const userInfo = document.getElementById('user-info')
// const body = document.getElementById('body')



const username = 'Dorothea-B'
const API_URL_USER = `https://api.github.com/users/${username}`
const API_URL_REPO = `https://api.github.com/users/${username}/repos`

//let reponame


//------------api key(token) is hidden in secret.js file so it doesn't break on git push
const options = {
    method: 'GET',
    headers: {
          Authorization: `token ${API_TOKEN}` 
      }
    }



//------------------fetching & printing USER INFO
fetch(API_URL_USER, options)
    .then(res => res.json())
    .then(data => {
        console.log('User info:', data)
        userInfo.innerHTML += 
        `
        <img class="userPicture" src=${data.avatar_url}<br>
        <div class="username">${username}</div>
        <h2>Bootcamp tracker</h2>
        `
    })

    // <img class="userPictureBorder" src=${data.avatar_url}>



//-------------------------HERE STARTS THE PROJECTS


fetch(API_URL_REPO, options)
    .then(res => res.json())
    .then(data => {
        console.log('All repos:', data)
       
       
        //-------filter out only technigo projects by including those starting with "project-"

        const myTechnigoRepos = data.filter(repo => repo.name.includes('project-'));

            //------function that generates the inner html
                //------------------PRINTING EACH REPO WITH DYNAMIC ID

                const printProjects = (data) => {

                //this is invoking(drawing) the chart, using the filtered number of repos as arguments within the chart.js-file
                drawChart(data.length)

                myTechnigoRepos.forEach(repo => {

                myProjects.innerHTML += 
                // Started w. making a new div for each project . Also divided into two child divs.
                `<div class="project">
                
                <div class="left">
                <div class="repoName">${repo.name} </div>

                <div id="github-link-${repo.name}"><a href="${repo.svn_url}"><img class="giticon" src="./assets/GitHub-Mark-64px.png"> ${repo.name} </a></div>
                <div id="updated-at-${repo.name}">Updated: ${new Date(repo.updated_at).toLocaleDateString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'})} </div>
                </div>

                <div class="right">
                <div id="def-branch-${repo.name}">Default branch: ${repo.default_branch} </div>
                <div id="latest-${repo.name}">Latest push: </div>
                <div id="num-commits-${repo.name}">Commits: </div>
                <div id="pull-req-${repo.name}"><img class="giticon" src="./assets/git_pull_request_icon_175163.svg">Pull requests: Loading...</div>
                </div>

                </div>`
                })
        } 

        //------invoking the print projects-function with only filtered repos
        printProjects(myTechnigoRepos)


        myTechnigoRepos.forEach(repo => {
            
            //-------------FETCHING EACH PROJECT's COMMITS 

            const API_REPO_COMMITS = `https://api.github.com/repos/${username}/${repo.name}/commits`

            
            fetch(API_REPO_COMMITS, options)
            .then(res => res.json())
                
            .then(data => {
                console.log('Repo commits:', data)


                //for (let y = 0; y < data.length; y++)

                //console.log("Num of commits:", data[y].commit)
                // const limit = (commitmsg) => {
                        
                //     let max_chars = 15;

                //     if(commitmsg.length > max_chars) {
                //         commitmsg = commitmsg.substr(0, max_chars);
                //     }
                // }


            //-------printing the number of commits as well as the message of the latest one (the one with index[0])

                document.getElementById(`num-commits-${repo.name}`).innerHTML = `Total commits: ${data.length}`

                //some of the commit messages were so long they messed up my design so I made it clip to 25 characters.
                let pushMessage = `${data[0].commit.message}`;

                if(pushMessage.length > 25) {pushMessage = pushMessage.substring(0,25)};

                
                document.getElementById(`latest-${repo.name}`).innerHTML = `Latest push: <a href="${data[0].html_url}"><span style="font-style: italic; ">${pushMessage}</span></a>`

                // let latestPush = limit(data[0].commit.message)
            })
                

                

                // body.innerHTML += `
                // <div class="project-object" id=${repo.name}>
                // <div class="latest">'Latest commit: ', ${data[0].commit.message}</div>

                // <div class="numOfCommits"> Total commits: ${data.length} </div>
                // </div>

                // `
           

            //-------------FETCHING EACH PROJECT's PULL REQUESTS 

            const API_PULL_REQS = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=200`
            
            fetch(API_PULL_REQS, options)
            .then(res => res.json())
                
            .then(pulls => {
                console.log('Pull requests', pulls)


            //--------------Filter to only my pulls and then print to  HTML

                pulls.forEach(pull => {

                    if(pull.user.login === username ) {

                    //-------printing the pull requests

                    document.getElementById(`pull-req-${repo.name}`).innerHTML = `<img class="giticon" src="./assets/git_pull_request_icon_175163.svg"> <a href="${pull._links.html.href}">Pull requests</a>`

                    }   

                })    

            })

        })
        
    })

        








