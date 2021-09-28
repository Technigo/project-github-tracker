const USER = "amandatilly";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const NEWSSITE_URL =
  "https://api.github.com/repos/Technigo/project-news-site/pulls/222/commits";

const projectContainer = document.getElementById("projects");

const getRepos = () => {
  fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );
      forkedRepos.forEach(
        (repo) => (projectContainer.innerHTML += `<h3>${repo.name}</h3>`)
      );
      getPullRequests(forkedRepos);
    });
};

const getPullRequests = (repos) => {
  repos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        //   console.log(data);
        const userPullRequests = data.filter(
          (pull) => pull.user.login === repo.owner.login
        );
        console.log(userPullRequests);
      });
  });
};

getRepos();
