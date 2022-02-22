//Username
const username = "lisabergstrom";
//API
const API_URL = `https://api.github.com/users/${username}/repos`;

// This function fetch all my repos and then filters out the ones forked = true and starts with "project-"
const getRepos = () => {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );
      console.log(forkedRepos);
      getPullRequests(forkedRepos);
    });
};
const getPullRequests = (forkedRepos) => {
  //Get all the PRs for each project.
  forkedRepos.forEach((repo) => {
    fetch("https://api.github.com/repos/technigo/" + repo.name + "/pulls")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  });
};
getRepos();
