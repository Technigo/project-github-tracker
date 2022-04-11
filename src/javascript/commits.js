const commitsSection = document.getElementById("commits");

const REPOS_URL = `https://api.github.com/users/${username}/repos`;
const COMMITS_URL = `https://api.github.com/repos/${username}/`;

const fetchRepositories = (repositories) => {
  const myRepos = repositories.filter((repo) => repo.fork && repo.name !== "unit-tests").length;
  repositories.filter(repo => {
    if (repo.fork && repo.name !== "unit-tests") {
      fetchCommits(repo)
    }
  })
  displayChart(myRepos)
};

const fetchCommitMessages = (commits, repository) => {
  const repositoryName = repository.name;
  const allCommits = commits.map(commit => commit);
  const newCommits = allCommits.filter(commits => commits.commit.author.date.includes("2022"));

  document.addEventListener("click", (event) => {
    if (event.target.id === repositoryName) {
      const repoClassname = `.${repository.name}`;
      document.querySelectorAll(repoClassname).forEach(name => {
        if (name.style.display === "none") {
          name.style.display = "block";
        } else {
          name.style.display = "none";
        }
      })
    };
  });

  commitsSection.innerHTML += `
    <div class="commits__text">
    <div><p><a href="${repository.html_url}/commits" target="_blank">${username}/${repositoryName}</a></p></div>
    <div class="progress"><div class="progress-bar bg-success" role="progressbar" style="width: ${newCommits.length * 3}%" aria-valuenow="${newCommits.length}" aria-valuemin="0" aria-valuemax="100"></div></div>
    <div><button type="button" id=${repositoryName} class="btn btn-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">${newCommits.length} commits </button></div>
    </div>
    `

  for (let i = 0; i < newCommits.length; i++) {
    const { message, committer, author } = newCommits[i].commit;
    const { avatar_url } = newCommits[i].author;
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
};

fetch(REPOS_URL, options)
  .then(res => res.json())
  .then(data => fetchRepositories(data))
  .catch(error => console.log(error))

const fetchCommits = (repo) => {
  fetch(`${COMMITS_URL}${repo.name}/commits`, options)
    .then(res => res.json())
    .then(data => fetchCommitMessages(data, repo))
    .catch(error => console.log(error))
};