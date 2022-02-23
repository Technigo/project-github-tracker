// Use token locally or from build environment
const PAT = {
  method: 'GET',
  headers: {
    Authorization: TOKEN //|| process.env.API_KEY // variable name when deploying
  }
}

// API URLs and URL builders
const USER = 'ariallahyar'; 
const userUrl = 'https://api.github.com/users/ariallahyar';
const repoUrl = 'https://api.github.com/users/ariallahyar/repos';
const pullUrl = (repoName) => {return `https://api.github.com/repos/Technigo/${repoName}/pulls?per_page=100`}; //look into pagination
const commitUrl = (repoName) => {return `https://api.github.com/repos/ariallahyar/${repoName}/commits?per_page=100`}; //look into pagination

const fetcher = (url, token, callback) => {
  fetch(url, token)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    callback(data);
  })
  .catch((error) => {
    console.log(error);
  })
}

fetcher (userUrl, PAT, ((userProfile) => {
  // Profile picture and username
  console.log(userProfile)
  document.getElementById('profile').innerHTML += `
    <img class="profile-pic" src="${userProfile.avatar_url}" alt="profile-pic">
    <h2 class="profile-name">${userProfile.name}</h2>
    <h2 class="profile-username">${userProfile.login}</h2>
    <p class="profile-bio">${userProfile.bio}</p>
    `;
}))

fetcher(repoUrl, PAT, (repositories) => {
  let forkedReps = repositories.filter((repo) => {
    return repo.fork === true && repo.name.startsWith("project-")
  });

  renderChart(forkedReps.length);

  forkedReps.forEach((rep) => {
    // Name, last update, default branch, URL
    document.getElementById('projects').innerHTML += `
      <div class="project" id=${rep.name}>
      <h2 class="project-name">${rep.name}</h2>
        <p>URL: <span><a class="project-url" href="${rep.svn_url}">${rep.name}</span></a>
        <p>Updated: ${new Date(rep.pushed_at).toLocaleDateString('en-SE', {year: 'numeric', month: 'short', day: 'numeric'})}</p>
        <p>Default branch: ${rep.default_branch}</p>
      </div>
    `;
    // Commits
    fetcher(commitUrl(rep.name), PAT, ((commits) => {
      document.getElementById(rep.name).innerHTML += `<p>Number of commits: ${commits.length}</p>`
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