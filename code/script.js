

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
            // console.log(data)  //remove 
        
        fetchRepos();
   
    })

    const fetchRepos = () => {
        fetch(API_URL_REPO, options)
        .then((res) => res.json())
        .then((data) => {

            

            
            
            const myProjects = data.filter((repo) => repo.name.startsWith("project-") && repo.fork);
            
            myProjects.forEach((repo => {
                
                // -----will continue working on this to get the idea of dynamic ID and how to use it-------

                // fetch(`https://api.github.com/repos/EmmaSprings/${repo.name}/commits`, options)
                // .then((res) => res.json())
                // .then((repo) => {

                //     document.getElementById('repoName').innerHTML += `<p>commits made: ${repo.length}</p>`
             
                // //  projects.innerHTML += `<p>commits made: ${repo.length}</p>`
                //  console.log(repo.length)
                // })
                    

                projects.innerHTML += `
                <li id≈"${repo.name}"> 
                
                <a href="${repo.html_url}" target="_blank" class="repo-link">${repo.name}</a>
                <p class="repo-info">
                <!-- This is ${repo.name} -->
                </p>
                <p class="latest-push">
                latest push: ${new Date(repo.pushed_at).toDateString()}</p>
                <p class="extra-info">main language: ${repo.language}<br>
                branch: ${repo.default_branch}<br> 
                commits amount: <!--${repo.commits_url.length}--> <br>
                pull requests:  ${data.length}<br>
                </p>
                
                <li>
                `

            }))

            
            drawChart(myProjects.length);
            fetchPullRequests(myProjects);
            
            
            // console.log(myProjects) // remove
            
        })
        
    }; 
    
    
    
            
            
    
    // will work on this to get the correct value displayes instead of total amount
    const fetchPullRequests = (myProjects) => {
        
        
        myProjects.forEach(repo => {
            fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
            .then((res) => res.json())
            .then((data) => {
                const myPullRes = data.find((pull) => pull.user.login === repo.owner.login);
                
                // projects.innerHTML += `<p>pull requests: ${data.length}</p>`
                // console.log(myPullRes) //remove
            })
        })
    }
    
};


fetchUser();













