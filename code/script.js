const REPOS_URL = "https://api.github.com/users/themisk84/repos";
const NEWS_SITE_COMMITS =
  "https://api.github.com/repos/Technigo/project-news-site/pulls/214/commits";
const projects = document.getElementById("projects");
const profileImage = document.getElementById("profileImage");
const userName = document.getElementById("userName");

// const forkedRepos = (data) => {
//   const Reposforked = data.filter(
//     (repo) => repo.fork && repo.name.startsWith("project")
//   );
//   Reposforked.forEach(
//     (repo) =>
//       (projects.innerHTML += `<div class="repo" id="${repo.name}">
//       <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
//       </div>`)
//   );
// };

const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project")
      );
      forkedRepos.forEach(
        (repo) =>
          (projects.innerHTML += `<div class="repo" id="${repo.name}"> 
               <h3><a href="${repo.html_url}" target="_blank">${
            repo.name
          }</a></h3>
               <h4>${repo.default_branch}</h4>
               <ha>Last updated: ${new Date(
                 repo.updated_at
               ).toLocaleString()}</h4>
               </div>`)
      );
      const profileImg = data.forEach(
        (profile) => (profileImage.src = profile.owner.avatar_url)
      );
      const profileName = data.forEach(
        (nickname) => (userName.innerHTML = nickname.owner.login)
      );
      getPullRequest(forkedRepos);
    });
};

const getPullRequest = (forkedRepos) => {
  forkedRepos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const myPulls = data.filter(
          (pulls) => pulls.user.login === repo.owner.login
        );
        console.log(myPulls);
        const commitsURL = myPulls[0].commits_url;
        // console.log(commitsURL);
        getCommits(commitsURL, repo);

        // const myComments =
      });
  });
};

const getCommits = (commitsURL, repo) => {
  fetch(commitsURL)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.length);
      document.getElementById(
        `${repo.name}`
      ).innerHTML += `<h4> Number of commits: ${data.length}</h4>`;
    });
};

getRepos();
