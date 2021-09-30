const REPOS_URL = "https://api.github.com/users/themisk84/repos";
const NEWS_SITE_COMMITS =
  "https://api.github.com/repos/Technigo/project-news-site/pulls/214/commits";
const projects = document.getElementById("projects");
const profileImage = document.getElementById("profileImage");
const userName = document.getElementById("userName");

const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project")
      );
      console.log(forkedRepos);
      forkedRepos.forEach(
        (repo) =>
          (projects.innerHTML += `
          <div class="repo" id="${repo.name}"> 
               <a class="repo-item1" href="${repo.html_url}" target="_blank">${
            repo.name
          }</a>
               <div class="repo-item2"><span class="branch">${
                 repo.default_branch
               }</span></div>
               <h4 class="repo-item3">Last updated: ${new Date(
                 repo.updated_at
               ).toLocaleDateString()}</h4>
               <h5 class="repo-item4">${repo.language}</h5>
               </div>
          `)
      );

      drawChart(forkedRepos.length);
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
        const myPulls = data.find(
          (pulls) => pulls.user.login === repo.owner.login
        );
        console.log(myPulls);
        if (myPulls) {
          const commitsURL = myPulls.commits_url;
          getCommits(commitsURL, repo);
        } else
          document.getElementById(
            `${repo.name}`
          ).innerHTML += `<h4 class="repo-item5">Group assignment or not yet pulled</h4>`;
      });
  });
};

const getCommits = (commitsURL, repo) => {
  fetch(commitsURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById(
        `${repo.name}`
      ).innerHTML += `<h4 class="repo-item5"> Number of commits: ${data.length}</h4>`;
    });
};

getRepos();
