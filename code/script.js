const username = "mamite100";
const repoApi = `https://api.github.com/users/${username}/repos`;
const projectsContainer = document.getElementById("projects");
const profileContainer = document.getElementById("profile-container")
const image = document.getElementById("image");
const userName = document.getElementById("userName");
const chartSection = document.getElementById("projectsInfo");
const commentsApi = `https://api.github.com/repos/Technigo/project-news-site/pulls/247/comments`;
const commitApi = `https://api.github.com/repos/Technigo/project-news-site/pulls/227/commits`; 

const getRepos = () => {
    fetch (repoApi)
        .then((res) => res.json())
        .then((data) => {
        console.log(data);

        const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-") 
        );

        //console.log(forkedRepos)

        forkedRepos.forEach(
        (repo) =>
          (projects.innerHTML += 
            `<div class="repo" id="${repo.name}"> 
               <a class="repo-item1" href="${repo.html_url}" target="_blank">${
              repo.name}</a>
               <span class="repo-item2">${repo.default_branch}</span>
               <h4 class="repo-item3">Last updated: ${new Date(
                 repo.updated_at).toLocaleDateString()}</h4>
               </div>`)
        );
        drawChart(forkedRepos.length);
   
        getPullRequest(forkedRepos);
      });
    };
const getInfo =()=> {
    fetch (repoApi)
    .then ((res) => res.json())
    .then((data) => {
    image.src = data.avatar_url;
    projectsContainer.innerHTML += ` <div>
    <tr><h1> ${data.name}</h1></tr>
    <tr><h5> ${ data.login}</h5></tr>
    <tr><h5> ${ data.bio}</h1></tr>
    </div>`;
  });
};
getInfo();
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
      ).innerHTML += `<h4 class="repo-item4"> Number of commits: ${data.length}</h4>`;
    });
};

getRepos();