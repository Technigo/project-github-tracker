
//DOM selectors

const myProjects = document.getElementById('projects')
const userInfo = document.getElementById('user-info')
const body = document.getElementById('body')

// ### What to include

// - A chart of how many projects you've done so far, compared to how many you will do


const username = 'Dorothea-B'
const API_URL_USER = `https://api.github.com/users/${username}`
const API_URL_REPO = `https://api.github.com/users/${username}/repos`
let reponame


const options = {
    method: 'GET',
    headers: {
          Authorization: `token ${API_TOKEN}` // you need to paste your token over here.
      }
    }

//const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`




//--------------------------------------USER INFO
fetch(API_URL_USER, options)
    .then(res => res.json())
    .then(data => {
        console.log('User info:', data)
        userInfo.innerHTML += 
        `<img class="userPicture" src=${data.avatar_url} <br>
        <div class="userName">${username}</div>`
    })


//---------------------------------HERE STARTS THE PROJECTS

fetch(API_URL_REPO, options)
    .then(res => res.json())
    .then(data => {
        console.log('All repos:', data)
       
       
        //-------filter out only technigo projects

        const myTechnigoRepos = data.filter(repo => repo.name.includes('project-'));
        console.log('Filtered:', myTechnigoRepos)



        //------function that generates projects html
        const printProjects = (data) => {

        //for (let i = 0; i < data.length; i++)
        myTechnigoRepos.forEach(repo => {


        myProjects.innerHTML += 
        `<div class="project">
        <div class="repoName">${repo.name} </div>

        <div id="github-link-${repo.name}"><a href="${repo.svn_url}"><img class="giticon" src="./assets/GitHub-Mark-64px.png"> ${repo.name} </a></div>
        <div id="def-branch-${repo.name}">Default branch: ${repo.default_branch} </div>
        <div id="updated-at-${repo.name}">Updated: ${new Date(repo.updated_at).toLocaleDateString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'})} </div>
        <div id="latest-${repo.name}">Latest push: </div>
        <div id="num-commits-${repo.name}">Commits: </div>
        <div id="pull-req-${repo.name}">Pull requests: Loading...</div>

        </div>`
        })
        } 
        //------invoking the print function with only filtered repos
        printProjects(myTechnigoRepos)


       
     //------------------PRINTING EACH REPO WITH DYNAMIC ID-------------

        myTechnigoRepos.forEach(repo => {


            // body.innerHTML += `
            //    <div class="project-object" id=${repo.name}>
            //      <h2>${repo.name}</h2>

            //    </div>
            //  `
            console.log('for each repo name:', repo.name)


            
            
            //-------------FETCHING EACH PROJECT's COMMITS 


            const API_REPO_COMMITS = `https://api.github.com/repos/${username}/${repo.name}/commits`

            
            fetch(API_REPO_COMMITS, options)
            .then(res => res.json())
                
            .then(data => {
                console.log('Repo commits:', data)


                //for (let y = 0; y < data.length; y++)

                //console.log("Num of commits:", data[y].commit)
                document.getElementById(`num-commits-${repo.name}`).innerHTML = `Total commits: ${data.length}`
                document.getElementById(`latest-${repo.name}`).innerHTML = `Latest push: <span style="color:blue; font-style: italic; ">${data[0].commit.message}</span>`


                // body.innerHTML += `
                // <div class="project-object" id=${repo.name}>
                // <div class="latest">'Latest commit: ', ${data[0].commit.message}</div>

                // <div class="numOfCommits"> Total commits: ${data.length} </div>
                // </div>

                // `
            })

            //-------------FETCHING EACH PROJECT's PULL REQUESTS 

            const API_PULL_REQS = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=200`
            
            fetch(API_PULL_REQS, options)
            .then(res => res.json())
                
            .then(pulls => {
                //console.log(pulls)

            //--------------Filter to only my pulls
            //const myTechnigoPulls = pulls.filter(pull => pull.user.login === repo.owner.login)
                pulls.forEach(pull => {

                    if(pull.user.login === username ) {
                        //console.log('filtered pullrequests:', pull)

                        document.getElementById(`pull-req-${repo.name}`).innerHTML = `Pull requests: <a href="${pull._links.html.href}">${pull.html_url}</a>`

        
                    }
                    // else {
                    //     console.log('no pulls')
                    //     document.getElementById(`pull-req-${repo.name}`).innerHTML = `Pull requestz: 0`

                    // }

                } )
            
                
                
                //pull.name.includes('project-'));

                //if(myTechnigoPulls === '')



            })



          })

          


        
    })

        

        
















        //data.forEach((repo) => {reponame = repo.name})
       // reponame = data[2].name
        // const fetchCommits = () => {

        //     data.forEach((repo) => {
        //     reponame = repo.name 
        //     })
        // }
        // fetchCommits(data)

       


    // for (let y = 0; y < data.length; y++)

    // reponame = data[y].name

    // console.log('Reponame:', reponame)
    // //Later have to make a loop for this


     
    // data.forEach((repo) => {
    //     reponame = repo.name
    // })

    // console.log(reponame)
    //Later have to make a loop for this