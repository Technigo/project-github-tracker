//DOM selectors
const main = document.getElementById("projects");
const usr = document.getElementById("usr");

//Global variables
usrName = 'amandatange';
let forkedRepos = []; // will contain filtered list of repos that have been forked
let projectRepos = []; // will contain filtered list of repos with names that start with "project"
let projectNames = []; // will contain a list with the section IDs for each project
let pullRequests = [];
let projectCounter = 0;
let PRCounter = 0; // counts pullrequests to get the index to match the PR data to the project section id
const API_REPOS = `https://api.github.com/users/${usrName}/repos`
// const API_PR = `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`


const API_TOKEN = TOKEN || process.env.API_KEY;

const options = {
    method: 'GET',
    headers: {
        Authorization: `token ${API_TOKEN}`
    }
}

const fetchData =  async () => {
    await fetch(API_REPOS, options)
    .then((res) => res.json())
    .then((data) => { 
        forkedRepos = data.filter(repo => repo.fork);
        projectRepos = forkedRepos.filter(repo => repo.name.startsWith('project'));
        console.log(projectRepos[0])
        // console.log(projectRepos[1])
        // console.log(projectRepos[2])
        // console.log(projectRepos[3])
        // console.log(projectRepos[4])
        // console.log(projectRepos[5])

        // for the user presentation
        usr.innerHTML = `
            <img class='avatar_url_pic' src='${projectRepos[0].owner.avatar_url}'/>
            <h1>@${usrName}</h1>
        `;

        ///for the projects sections
        // console.log(projectRepos.length)
        // const postInfo = async (dataPR) => {
        //     for (let i = 0; i < projectRepos.length; i++) {
        //         let repo = projectRepos[i];
        //         let pull = dataPR[i];  
        //         let p_login = pull.user.login;
        //         let r_login = repo.owner.login;
        //         console.log(p_login, r_login)
        //         if (p_login === r_login || p_login === "michaelchangdk" && pull.id === 856976386) {
        //             console.log(p_login, r_login)
        //             main.innerHTML += `
        //                     <section id='${repo.name}_${i+1}' class='project'>
        //                         <h3>${repo.name}</h3>
        //                         <p>Name of your default branch for each repo</p>
        //                         <a href='${repo.html_url}'>Link to repo</a>
        //                     </section>
        //                     `;
        //         }
        //     }
        // }


        const fetchPR =  async () => {
            for (let i = 0; i < projectRepos.length; i++) {
                let repo = projectRepos[i];
                await fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`, options)
                .then((resPR) => resPR.json())
                .then((dataPR) => {
                    // console.log(dataPR)
                    // let p_login = pull.user.login;
                    // let r_login = repo.owner.login;
                    let filteredDataPR = dataPR.filter(pr => pr.user.login === repo.owner.login || pr.user.login === "michaelchangdk" && pr.id === 856976386)
                    // console.log(filteredDataPR)
                    // postInfo(dataPR)
                    // console.log("hej" , i) 
                    const pull = filteredDataPR;
                    console.log(pull)

                    // let htmlPR = ""
                    // if (pull.length !== 0) {
                    //     htmlPR = pull[0].html_url // fix this in a better way maybe
                    // }
                    // console.log(pull)
                    // let p_login = pull[0].user.login;
                    // let r_login = repo.owner.login;
                    // console.log(p_login, r_login)
                    // if (p_login === r_login || p_login === "michaelchangdk" && pull.id === 856976386) {
                    // console.log(p_login, r_login)
                    main.innerHTML += `
                            <section id='${repo.name}_${i+1}' class='project'>
                                <h3>${repo.name}</h3>
                                <p>Default branch: ${repo.default_branch}</p>
                                <p><a href='${repo.html_url}'>Link to repo</a></p>
                                <p>Most recent update (push) for each repo</p>
                                
                                
                            </section>
                            `;
                    if (pull.length !== 0) {
                        console.log(pull[0]._links.commits)
                        document.getElementById(`${repo.name}_${i+1}`).innerHTML += `
                            <p>Number of commits: ${pull[0]._links.commits.length}</p>
                            <p><a href='${pull[0].html_url}'>Pull request</a></p>`
                    }
                    // } 
                })
            }
                
            }
        fetchPR()
        
    })
}


// fetch(`https://api.github.com/users/${usrName}/repos`, options) //maybe make it possible to enter your own github username?
//     .then((res) => res.json())
//     .then((data) => {
//         forkedRepos = data.filter(repo => repo.fork);
//         projectRepos = forkedRepos.filter(repo => repo.name.startsWith('project'));
//         // console.log(data)
//         // console.log(forkedRepos)
//         console.log(projectRepos);

//         usrName = projectRepos[0].owner.login;

//         // for the user presentation
//         usr.innerHTML = `
//             <h2>
//                 ::${usrName} 
//             </h2>
//             <!-- <img class='avatar_url_pic' src='${projectRepos[0].owner.avatar_url}'/> -->
//         `
//         // console.log(projectRepos[0])


//         // getPullRequests(projectRepos);
//         projectRepos.forEach((repo) => {
//             main.innerHTML += `
//                 <section id='${repo.name}_${projectCounter}' class='project'>
//                     <h3>${repo.name}</h3>
//                     <p>Name of your default branch for each repo</p>
//                     <a href='${repo.html_url}'>Link to repo</a>
//                 </section>
//             `;
//             projectCounter++
//             projectNames.push(`${repo.name}`)
//         })


//         projectRepos.forEach(repo => {
//             // console.log(repo)
//             fetch('https://api.github.com/repos/technigo/' + repo.name + '/pulls?per_page=100')
//             .then(res => res.json())
//             .then(data => {
//                 // console.log(data);
//                 data.forEach(pull => {
//                     let p_login = pull.user.login;
//                     let r_login = repo.owner.login;
//                     if (p_login === r_login || p_login === "michaelchangdk" && pull.id === 856976386) { //the id is for the pull request that is done from michael's account
//                         pullRequests.push(pull);
//                         fetch(`${pull.commits_url}`)
//                         .then(response => response.json())
//                         .then(json_data => {
//                             let numberOfCommits = json_data.length
//                             document.getElementById(`${repo.name}_${PRCounter}`).innerHTML += `
//                             <p>Most recent update (push) for each repo</p>
//                             <p>The repo has ${numberOfCommits} commits</p>
//                             <a href='${pull.html_url}'>Link to pull request</a>
//                         `;
//                         }) 
                        
//                     };
//                 })
//             PRCounter++;
//             });
//         });
        
//         console.log(pullRequests)
    
//         // console.log(projectNames)
//     }
        
// );

// const getPullRequests = async (repos) => {
//     //Get all the PRs for each project.
//     await repos.forEach(repo => {
//         // console.log(repo)
//         fetch('https://api.github.com/repos/technigo/' + repo.name + '/pulls?per_page=100')
//         .then(res => res.json())
//         .then(data => {
//             // console.log(data);
//             data.forEach(pull => {
//                 let p_login = pull.user.login;
//                 let r_login = repo.owner.login;
//                 if (p_login === r_login || p_login === "michaelchangdk" && pull.id === 856976386) { //the id is for the pull request that is done from michael's account
//                     pullRequests.push(pull);
//                     fetch(`${pull.commits_url}`)
//                     .then(response => response.json())
//                     .then(json_data => {
//                         let numberOfCommits = json_data.length
//                         document.getElementById(`${repo.name}_${PRCounter}`).innerHTML += `
//                         <p>Most recent update (push) for each repo</p>
//                         <p>The repo has ${numberOfCommits} commits</p>
//                         <a href='${pull.html_url}'>Link to pull request</a>
//                     `;
//                     }) 
                    
//                 };
//             })
//         PRCounter++;
//         });
//     });
    
//     console.log(pullRequests)

//     // console.log(projectNames)
// }    
                //TODO
                //1. Find only the PR that you made by comparing pull.user.login
                // with repo.owner.login
                //2. Now you're able to get the commits for each repo by using
                // the commits_url as an argument to call another function
                //3. You can also get the comments for each PR by calling
                // another function with the review_comments_url as argument
    



    // "MDQ6VXNlcjg5OTMwMzM2"
    // MDQ6VXNlcjg5OTMwMzM2

fetchData()
