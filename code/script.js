// API URLs and URL builders
const USER = 'ariallahyar'; 
const userUrl = 'https://api.github.com/users/ariallahyar';
const repoUrl = 'https://api.github.com/users/ariallahyar/repos';
const pullUrl = (repoName) => {return `https://api.github.com/repos/Technigo/${repoName}/pulls?per_page=100`}; //look into pagination
const commitUrl = (repoName) => {return `https://api.github.com/repos/ariallahyar/${repoName}/commits`}; //look into pagination

const fetcher = (url, token, callback) => {
  fetch(url, token)
  .then((response) => {
    return response.json();
  })
  .then((repositories) => {
    callback(repositories);
  })
  .catch((error) => {
    console.log(error);
  })
}

// WORKING, BUT WILL REDO SETUP
fetcher (userUrl, PAT, ((userProfile) => {
  console.log(userProfile);
  // Profile picture and username
  document.getElementById('profile').innerHTML += `
    <img class="profile-pic" src="${userProfile.avatar_url}" alt="profile-pic">
    <h2 class="username">Username: ${userProfile.login}</h2>
    `;
}))

fetcher(repoUrl, PAT, (repositories) => {
  let forkedReps = repositories.filter((repo) => {
    return repo.fork === true && repo.name.startsWith("project-")
  });

  forkedReps.forEach((rep) => {
    // Name, last update, default branch, URL
    document.getElementById('projects').innerHTML += `
      <div class="repo" id=${rep.name}>
        <h2>${rep.name}</h2>
        <p>Updated: ${rep.pushed_at}</p>
        <p>Default branch: ${rep.default_branch}</p>
        <a href="${rep.svn_url}">Link to repository</a>
      </div>
    `;
    // Commits
    fetcher(commitUrl(rep.name), PAT, ((commits) => {
      document.getElementById(rep.name).innerHTML += `<p>${commits.length} commits</p>`
    }));

    // Pull requests
    fetcher(pullUrl(rep.name), PAT, ((pullRequests) => {
      const myPulls = pullRequests.filter((pull) => {
        return pull.user.login === USER;
      })
      document.getElementById(rep.name).innerHTML += `<p>Pull requests: ${myPulls.length}</p>`
    }));
  })
})