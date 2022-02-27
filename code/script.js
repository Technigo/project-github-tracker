const projectCard = document.getElementById('projectCard')
const profile = document.getElementById('profile')
const profileImage = document.getElementById('profileImage')

// Github Profile
  fetch('https://api.github.com/users/rawisou')
   .then((res) => res.json()) 
   .then((data) => {
    profile.innerHTML = `
    <h1>GitHub Tracker</h1>
     <h2>${data.name}</h2> 
     <img class="profile-image" id="profileImage" src="${data.avatar_url}" alt="Github Profile Image">
     <p><img class="ghlogo" src=./github.png><a href="${data.html_url}"> Github account: ${data.login}</a></p>
    `
   })
  .catch((err) => console.log(err))

  // Repos forked from Technigo
  fetch('https://api.github.com/users/rawisou/repos') 
   .then((res) => res.json()) 
   .then((data) => {
     const technigoRepos = data.filter(
        (repos) => repos.fork && repos.full_name.includes('project-')
      )
      getPullRequests(technigoRepos)
      drawChart(technigoRepos.length)
    })
   .catch((err) => console.log(err))


   const getPullRequests = (repos) => {
    repos.forEach(repo => {
     fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
     .then((res) => res.json())
     .then((pull) => {
        const myPullRequests = pull.find( 
          (pull) => pull.user.login === repo.owner.login 
         )

         fetch(`https://api.github.com/repos/rawisou/${repo.name}/commits?per_page=100`)
         .then((res) => res.json())
         .then((myCommits) => {
         let num = myCommits.length
  
       if (myPullRequests != undefined) {projectCard.innerHTML += `
          <div class="card">

            <h3><a href="${repo.html_url}"><span>${repo.full_name.replace('rawisou/project-', '').replace('-', ' ')}</span></a></h3>
            <p><span class ="bolded"> Default branch: </span> ${repo.default_branch}</p>
            <p><span class ="bolded"> Pushed at:</span> ${new Date(repo.pushed_at).toDateString()}</p>
            <p><span class ="bolded"> Number of commits:</span> ${num}</p>
            <p><a href="${myPullRequests.html_url}"><img class="pointing-right" src=./pointing-right.png> View the pull request</a></p>
          </div>   
        ` 
       } else if (repo.name === 'project-weather-app') {
         projectCard.innerHTML += `
         <div class="card">
           <h3><a href="${repo.html_url}"><span>${repo.full_name.replace('rawisou/project-', '').replace('-', ' ')}</span></a></h3>
           <p><span class ="bolded"> Default branch: </span> ${repo.default_branch}</p>
           <p><span class ="bolded"> Pushed at:</span> ${new Date(repo.pushed_at).toDateString()}</p>
           <p><span class ="bolded"> Number of commits:</span> ${num}</p>
           <p><a href="https://github.com/Technigo/project-weather-app/pull/215"><img class="pointing-right" src=./pointing-right.png> View the pull request</a></p>
         </div>   
         `
        } else {
          projectCard.innerHTML += `
          <div class="card">
            <h3><a href="${repo.html_url}"><span>${repo.full_name.replace('rawisou/project-', '').replace('-',' ')}</span></a></h3>
            <p><span class ="bolded"> Default branch: </span> ${repo.default_branch}</p>
            <p><span class ="bolded"> Pushed at:</span> ${new Date(repo.pushed_at).toDateString()}</p>
            <p><span class ="bolded"> Number of commits:</span> ${num}</p>
            <p><span class ="bolded"> Pull Request:</span> No pull request </p>
          </div>   
          `
             }
          })
       })
     })
   }

  