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
     <p> Github: ${data.html_url} </p>
    `
    profileImage.src = data.avatar_url
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
            <h3 class="repo-name">${repo.name}</h3>
            <a href="${repo.html_url}">${repo.html_url}</a>
            <p><span class ="bolded"> Default branch: </span> ${repo.default_branch}</p>
            <p><span class ="bolded"> Pushed at:</span> ${new Date(repo.pushed_at).toDateString()}</p>
            <p><span class ="bolded"> Number of commits:</span> ${num}</p>
            <p><span class ="bolded"> Pull Request:</span> <a href="${myPullRequests.html_url}">${myPullRequests.html_url}</a></p>
          </div>   
        ` 
       } else if (repo.name === 'project-weather-app') {
         projectCard.innerHTML += `
         <div class="card">
           <h3 class="repo-name">${repo.name}</h3>
           <a href="${repo.html_url}">${repo.html_url}</a>
           <p><span class ="bolded"> Default branch: </span> ${repo.default_branch}</p>
           <p><span class ="bolded"> Pushed at:</span> ${new Date(repo.pushed_at).toDateString()}</p>
           <p><span class ="bolded"> Number of commits:</span> ${num}</p>
           <p><span class ="bolded"> Pull Request:</span> <a href="https://github.com/Technigo/project-weather-app/pull/215">https://github.com/Technigo/project-weather-app/pull/215</a></p>
         </div>   
         `
        } else {
          projectCard.innerHTML += `
          <div class="card">
            <h3 class="repo-name">${repo.name}</h3>
            <a href="${repo.html_url}">${repo.html_url}</a>
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

  