const projectsContainer = document.getElementById("projects");
const heading = document.getElementById("headingWrapper");
const chartSection = document.getElementById("chartWrapper");
const contact = document.getElementById("contact");
const username = "HelenaW86";
const gitApi = `https://api.github.com/users/${username}`;
const repoApi = `https://api.github.com/users/${username}/repos`;

// Filtering out my repos that are forked from Technigo
const getRepos = () => {
  fetch(repoApi)
    .then((response) => response.json())
    .then((data) => {
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );
      //Making a container for each repo
      forkedRepos.forEach((repo) => {
        projectsContainer.innerHTML += `<div id="${
          repo.name
        }" class="projects-cards">
        <h3><a href="${repo.homepage}">${repo.name}</a></h3>
        <p>Recent Push: ${new Date(repo.pushed_at).toDateString()}</p>
        <p>Default Branch: ${repo.default_branch}</p>
        <p>Github Repo: <a href="${repo.html_url}">Visit</a></p>
        <p>Size Of Repo: ${repo.size} byte</p>
        <p>Language: ${repo.language}</p>`;
      });

      getPulls(forkedRepos);
      drawChart(forkedRepos.length);
    });
};
//Getting information from my github acount API
const getinfo = () => {
  fetch(gitApi)
    .then((response) => response.json())
    .then((data) => {
      heading.innerHTML += `
      <img class="profile-img" src="${data.avatar_url}"/>
      <div class="heading-text">
      <h3>${data.login}</h3>
      <p>${data.name} </p>
      </div>`;
      contact.innerHTML += `
      <div class="contact-logo">
      <a href="${data.blog}"><i class="fab fa-linkedin"></i></a>
      <a href="${data.email}"><i class="fas fa-envelope-square"></i></a>
    <div>Technigo Projects:</div>
      </div>
      `;
    });
};
// Finding only mine pullrequests
const getPulls = (forkedRepos) => {
  forkedRepos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((response) => response.json())
      .then((data) => {
        const myPulls = data.filter(
          (pulls) => repo.owner.login === pulls.user.login
        );
        const commitsURL = myPulls[0].commits_url;
        const commentsURL = myPulls[0].review_comments_url;
        getCommits(commitsURL, repo);
        getComment(commentsURL, repo);
      });
  });
};
//Writing the numbers of commits
const getCommits = (commitsURL, repo) => {
  fetch(commitsURL)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(
        `${repo.name}`
      ).innerHTML += `<p>Number of comitt messages: ${data.length}</p>
      `;
    });
};
// Adding a comment button width hidden kontext
const getComment = (commentsURL, repo) => {
  fetch(commentsURL)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(`${repo.name}`).innerHTML += `
      <button id="my${repo.name}" class="comment-button">Repo Comment</button>
      <p id="coment" class="comment">${data[1].body}</p>`;

      //Show the comment when clicking on the button
      function toggle() {
        this.classList.toggle("active");
      }
      document.getElementById(`my${repo.name}`).onclick = toggle;
    });
};
getRepos();
getinfo();
