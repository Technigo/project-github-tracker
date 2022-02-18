const username = 'nadialefebvre'
const API_USER = `https://api.github.com/users/${username}`
const API_REPOS = `https://api.github.com/users/${username}/repos` // const or let ?
const profile = document.getElementById('profile')
const projects = document.getElementById('projects')





const createProfile = () => {
    fetch(API_USER)
        .then(res => res.json())
        .then(data => {
            profile.innerHTML = `
                <h2>${data.name}</h2>
                <img src="${data.avatar_url}" class="profile-picture">
            `
        })
}








const createRepoCard = () => {
    fetch(API_REPOS) // options object is passed as 2nd argument to fetch() function. // TO REMOVE BEFORE GIT PUSH
        .then(res => res.json())
        .then(data => {
            const filteredRepos = data.filter(repo => repo.fork === true && repo.name.startsWith('project-'))
            drawProjectsChart(filteredRepos.length)
            filteredRepos.forEach(repo => {
                const options = { day: 'numeric', month: 'long', year: 'numeric' }
                projects.innerHTML += `
                    <div class="repo" id=${repo.name}>
                        <p>Repo name: ${repo.name}</p>
                        <p>Repo URL: <a href="${repo.html_url}">${repo.name}</a></p>
                        <p>Default branch: ${repo.default_branch}</p>
                        <p>Repo last push: ${new Date(repo.pushed_at).toLocaleDateString('en-GB', options)}</p>
                    </div>
                `
                fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        const userCommits = data.filter((item) => item.commit.author.name === 'Nadia Lefebvre')

                        document.getElementById(repo.name).innerHTML += `
                            <p>Number of commits from the user: ${userCommits.length} on a total of ${data.length}</p>
                            <p>Commit messages: </p>
                        `
                        userCommits.forEach(item => {
                            document.getElementById(repo.name).innerHTML += `
                            <li>${item.commit.message}</li>
                        `
                        })
                    })
            })
        })
}


createProfile()
createRepoCard()






//Remember to pass along your filtered repos as an argument when
//you are calling this function

const getPullRequests = (repos) => {
    //Get all the PRs for each project.
    repos.forEach(repo => {
      fetch('https://api.github.com/repos/technigo/' + repo.name + '/pulls')
      .then(res => res.json())
      .then(data => {
              //TODO
          //1. Find only the PR that you made by comparing pull.user.login
              // with repo.owner.login
              //2. Now you're able to get the commits for each repo by using
              // the commits_url as an argument to call another function
              //3. You can also get the comments for each PR by calling
              // another function with the review_comments_url as argument
          })
    })
  }
