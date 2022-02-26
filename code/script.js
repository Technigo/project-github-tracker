// Fetching API from Github to add                              X
// A list of all repos that are forked ones from Technigo
// Your username and profile picture                            X
// Most recent update (push) for each repo                      X
// Name of your default branch for each repo                    X
// URL to actual GitHub repo                                    X
// Number of commit messages for each repo
// All pull requests
// A chart of how many project you've done so far, compared with how many you will do using chart.js.

// Token
const options = {
    method: 'GET',
    headers: {
        Authorization: `TOKEN ${API_TOKEN}`
    }
}

// DOM selectors
const projectInfo = document.getElementById('projectInfo')
const userInfo = document.getElementById('userInfo')
const aboutUser = document.getElementById('aboutUser')
const profilePicture = document.getElementById('profilePicture')
const mainContent = document.getElementById('mainContent')


// Github API
const username = 'emmajosefina'
const API_URL = `https://api.github.com/users/${username}/repos`




const findingAllRepos = (repos) => { 
 //------------------ FIRST FETCH - ALL REPOS -----------------------//
    fetch(API_URL, options) 
       .then((res) => res.json()) 
       .then((data) => { 


        // Fetches only repositories from Technigo //
        const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith('project-'))
        console.log(forkedRepos, 'forked repos')

        mainContent.innerHTML += `
        <section class="profile-box"> 
        <img src="${data[0].owner.avatar_url}" id="profilePicture" class="profile-picture" />
        <p class="full-name">Emma Lindell</p>
        <p class="username">emmajosefina</p>
      </section>
      <div class="status-box">
      <span class="inside-status-box">👩‍💻 Edit status</span>
      </div>

    <p class="presentation-text">
      Frontend Developer from Technigo Bootcamp. Always curious to learn more about technology and design.
      </p>

      `
        console.log(data) 
        forkedRepos.forEach((repo) => 
        projectInfo.innerHTML += 
        
        `
        <div class="projectContainer">
            <p class="smallerContainer">
                <span class="header-project">

                ${repo.name.replace('project-', '').replace('-', ' ')}
                </span>

            </p>
            <p class="smallerContainer">
                <span class="styledHeadingsProject">
                Updated:
                </span>
                ${new Date(repo.pushed_at).toLocaleDateString('en-SE', {year: 'numeric', month: 'short', day: 'numeric'})}
             </p>
            
             <p class="smallerContainer">
                <span class="styledHeadingsProject">
                Default branch: </span>
                ${repo.default_branch}
            </p>

            <p class="smallerContainer">
            <span class="styledHeadingsProject">
           Number of commits: </span>
            </p>

            <p class="smallerContainer">
            <span class="styledHeadingsProject">
           Pull requests: </span>
            </p>


            <p class="smallerContainer">
            <p>
            <span>
            <img src="images/github-logo-extra-big.png" alt="github-logo" width="15px" />
            <a class="project-url" href="${repo.svn_url}"> ${repo.name}</span></a>
            </p>


        </div>
        ` 
        )
       })
    }

findingAllRepos()

 //------------------ SECOND FETCH - ALL REPOS -----------------------//