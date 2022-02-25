

const username = 'EmmaSprings'
const projects = document.getElementById('projects')
const API_URL_USER = `https://api.github.com/users/${username}`
const API_URL_REPO = `https://api.github.com/users/${username}/repos`



const fetchUser = () => {

    const options = {
        method: 'GET',
        headers: {
              Authorization: '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' 
          }
      }

    fetch(API_URL_USER, options)
     .then((res) => res.json())
     .then((data) => {
         projects.innerHTML += `
         <div class="header-container">
            <img src="https://avatars.githubusercontent.com/u/94292545?v=4"/>
                <h1>GitHub tracker for Emma Springs</h1>
                <h2>user: <a href="https://api.github.com/users/EmmaSprings" class="login-name"> ${data.login}</a> <br>
                ${data.bio}
                </h2>
                
                  <p class="title">projects = [</p>
         </div>  
            `
            console.log(data)  //remove 
        
        fetchRepos();
        
        
    })
    

    
    const fetchRepos = (myProjects) => {
        fetch(API_URL_REPO, options)
        .then((res) => res.json())
        .then((data) => {

            const myProjects = data.filter((repo) => repo.name.startsWith("project-") && repo.fork);
       
            myProjects.forEach((repo => {
                projects.innerHTML += `
                <li> 
                 <a href="${repo.html_url}" target="_blank" class="repo-link">${repo.name}</a>
                  <p class="repo-info">
        <!-- This is ${repo.name} -->
                   </p>
                    <p class="latest-push">
                    latest push: ${new Date(repo.pushed_at).toDateString()}</p>
                    <p class="extra-info">main language: ${repo.language}<br>
                     branch: ${repo.default_branch}<br> 
                     commits amount: ${repo.commits_url.length}<br>
                     <p id ="${repo.name}">Commits made by team member</p>
                     pr: ${length}
                     </p>
            
                     <li>
                `
            }))

                        projects.innerHTML += `
                        <p class="title">]</p>
                        <h3>hello</h3>
                        <!--<p>total repos = </p>-->
                        ` 

            drawChart(myProjects.length);
            fetchPullRequests(myProjects);
            console.log(myProjects)
        })
    }; 
    
            const fetchPullRequests = (myProjects) => {
                // const API_URL_PRS = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`
                
                myProjects.forEach(repo => {
                    fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
                    .then((res) => res.json())
                    .then((data) => {
                        const myPullRes = data.find(pull => pull.user.login === repo.owner.login);

                        const myCommitsURL = data.commits_url
                        const repoName = repo.name
                        fetchCommits(myCommitsURL, repoName);
                        console.log(myPullRes)
    

                        
                    })
                })
            }
         
        };
        
        
        
        fetchUser();
        
        
        
        
        
        const fetchCommits = (myCommitsURL, repoName) => {
            
            fetch(myCommitsURL, repoName)
            .then((res) => res.json())
            .then((data) => {
                document.getElementById(repoName).innerHTML =`Number of commit: ${data.length}`
                // document.getElementById(`commit-${dataName}`).innerHTML += data.length
            })
        }    
            
            
            
            
            
            
    
    
    // const myProjects = data.filter((data) => data.name.includes("project-") && data.fork));
    //   const userRepos = data[0].name;
    //   for (i = 0; i < data.length; i++){
        //       projects.innerHTML += `
        //       <li> 
        //       <a href="${data[i].html_url}" target="_blank">${data[i].name}</a>
        //       <p>
        //       This is ${data[i].name}
        //       </p>
        //       <li>
        //       `
        
        //     };
        
        
        
        
        
        // const fetchPulls = () => {
        
        //     const API_URL_PRS = `https://api.github.com/repos/Technigo/project-chatbot/pulls?per_page=100`
            
        //     fetch(API_URL_PRS)
        //     .then((res) => res.json())
        //     .then((data) => {
        
        //         const myPulls = data.filter((repo) => repo.login.includes(`${username}`)
        
        //         myPulls.forEach((repo {
        
        //         }))
              
        //         // projects.innerHTML += `
        //         // <p>hello total repos = ${data[1].base.label} </p>
        //         // `
        //         console.log(data)
        
        //     fetchPullRequests(myProjects)
        
        //     });
        
        // }