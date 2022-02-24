const commitsSection = document.getElementById("commits");

const REPOS_URL = `https://api.github.com/users/${username}/repos`;
const COMMITS_URL = `https://api.github.com/repos/${username}/`

const fetchRepo = (repositories) => {
  repositories.filter(repo => {
    if (repo.fork === true && repo.name !== "unit-tests") {
      fetchCommits(repo)
    }
  })
}

fetch(REPOS_URL, options)
  .then(res => res.json())
  .then(fetchRepo)
  .catch(error => console.log(error))

const fetchCommits = (repo) => {
  fetch(`${COMMITS_URL}${repo.name}/commits`, options)
    .then(res => res.json())
    .then(commits => {
      commitsSection.innerHTML += `
    <p><a href="${repo.html_url}">${username}/${repo.name}</a> ${commits.length} commits</p>
    `
    })
    .catch(error => console.log(error))
}

