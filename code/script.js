const OPTIONS = {
  method: 'GET',
  headers: {
    Authorization: TOKEN
  }
}

const USER = 'ariallahyar'; 

const url = {
  user: 'https://api.github.com/users/ariallahyar',
  repo: 'https://api.github.com/users/ariallahyar/repos',
  pulls: (repoName) => {return `https://api.github.com/repos/Technigo/${repoName}/pulls?per_page=100`},
  commits: (repoName) => {return `https://api.github.com/repos/ariallahyar/${repoName}/commits?per_page=100`}
}

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
};

fetcher (url.user, OPTIONS, ((userProfile) => {
  document.getElementById('profile').innerHTML += `
    <img class="profile-pic" src="${userProfile.avatar_url}" alt="profile-pic">
    <h2 class="profile-name">${userProfile.name}</h2>
    <h2 class="profile-username">${userProfile.login}</h2>
    <p class="profile-bio">${userProfile.bio}</p>
    `;
}));

fetcher(url.repo, OPTIONS, ((repositories) => {
  let forkedReps = repositories.filter((repo) => {
    return repo.fork === true && repo.name.startsWith("project-")
  });

  renderChart(forkedReps.length);

  forkedReps.forEach((rep) => {

    document.getElementById('projects').innerHTML += `
      <div class="project" id=${rep.name}>
      <h2 class="project-name">${rep.name.replace('project-', '').replace('-', ' ')}</h2>
        <img class="github" src="./images/github_icon.png">
          <span><a class="project-url" href="${rep.svn_url}">${rep.name}</span></a>
        <p>Updated: ${new Date(rep.pushed_at).toLocaleDateString('en-SE', {year: 'numeric', month: 'short', day: 'numeric'})}</p>
        <p>Default branch: ${rep.default_branch}</p>
      </div>
    `;

    fetcher(url.commits(rep.name), OPTIONS, ((commits) => {
      document.getElementById(rep.name).innerHTML += `<p>Number of commits: ${commits.length}</p>`
    }));

    fetcher(url.pulls(rep.name), OPTIONS, ((pullRequests) => {
      const myPulls = pullRequests.filter((pull) => {
        return pull.user.login === USER;
      })
      document.getElementById(rep.name).innerHTML += `<p>Pull requests: ${myPulls.length}</p>`
    }));
  });
}));