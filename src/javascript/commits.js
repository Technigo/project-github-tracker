const commitsSection = document.getElementById("commits");

const REPOS_URL = `https://api.github.com/users/${username}/repos`;
const COMMITS_URL = `https://api.github.com/repos/${username}/`;

const fetchRepositories = (repositories) => {
  repositories.filter(repo => {
    if (repo.fork && repo.name !== "unit-tests") {
      fetchCommits(repo)
    }
  })
}

const fetchCommitMessages = (commits, repository) => {
  const repositoryName = repository.name;

  document.addEventListener("click", function (e) {
    if (e.target && e.target.id == repositoryName) {
      const repoClassname = `.${repository.name}`;
      document.querySelectorAll(repoClassname).forEach(name => {
        if (name.style.display === "none") {
          name.style.display = "block";
        } else {
          name.style.display = "none";
        }
      })
    }
  });

  commitsSection.innerHTML += `
    <div class="commits__text">
    <div><p><a href="${repository.html_url}" target="_blank">${username}/${repositoryName}</a></p></div>
    <div class="progress"><div class="progress-bar bg-success" role="progressbar" style="width: ${commits.length * 3}%" aria-valuenow="${commits.length}" aria-valuemin="0" aria-valuemax="100"></div></div>
    <div><button type="button" id=${repositoryName} class="btn btn-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">${commits.length} commits </button></div>
    </div>
    `

  for (let i = 0; i < commits.length; i++) {
    const { message, committer, author } = commits[i].commit;
    const { avatar_url } = commits[i].author;
    const date = new Date(committer.date);
    const formattedDate = date.toDateString().split(' ').slice(1).join(' ');

    commitsSection.innerHTML += `
      <div id="messageWrapper" class=${repositoryName} style="display: none">
      <p class="text">${message}</p>
      <p class="subtext"><img class="icons circle" src=${avatar_url} alt=${author.name}> 
      <span class="bold-text">${author.name} </span> <span class="hide-text">committed on ${formattedDate}</span></p>
      </div>
      `
  }
}

fetch(REPOS_URL, options)
  .then(res => res.json())
  .then(fetchRepositories)
  .catch(error => console.log(error))

const fetchCommits = (repo) => {
  fetch(`${COMMITS_URL}${repo.name}/commits`, options)
    .then(res => res.json())
    .then(commits => fetchCommitMessages(commits, repo))
    .catch(error => console.log(error))
}