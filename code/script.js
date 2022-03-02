const username = "Mimmisen";
const API_URL = `https://api.github.com/users/${username}`;
const REPOS_URL = `https://api.github.com/users/${username}/repos`;

// function for token
const options = {
  method: "GET",
  headers: {
    Authorization: `token ${API_TOKEN}`,
  },
};
//----------------------------------FETCH 1-------------------------------------
// getting profile pic,user name and link to my github
fetch(API_URL, options)
  .then((res) => res.json())
  .then((data) => {
    headerBox.innerHTML += `
    <div>
    <a href="${API_URL}">
    <img src="${data.avatar_url}" alt="Avatar of ${data.login}">
    </a>
    </div>
    <a href="https://github.com/Mimmisen"><h1 class="username">${data.login}<h1></a>
    <div class="my-name">Mimmi Fordal Uddin</div>

    `;
  });

//----------------------------------FETCH 2-------------------------------------
fetch(REPOS_URL, options)
  .then((res) => res.json())
  .then((data) => {
    //To get my projects and filter them so only the ones starting with projects are displayed
    const technigoProjects = data.filter(
      (repo) => repo.name.startsWith("project-") && repo.fork
    );
    console.log("repos", data);

    showChart(technigoProjects.length);

    technigoProjects.forEach((repo) => {
      const reponame = repo.name;

      fetchTechnigo(reponame);

      const projectUrl = repo.html_url;

      const defaultBranch = repo.default_branch;

      const latestPushRepo = new Date(repo.updated_at).toLocaleDateString(
        "sv-SE",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );

      //displaying project url, name and latest push
      document.getElementById("section-projects").innerHTML += `
      <div class="section-projects__card box-style">
      <div>
     <h3 class="repo-title bold-text"><a class="nav-link" href='${projectUrl}'>${reponame}</a></h3>
     <p><span class="bold-text">Latest update:</span> ${latestPushRepo}</p>
     <p id="commits-${reponame}"></p>
     <p> default branch: ${defaultBranch}</p>
     </div>
     </div>
     `;
    });
  });

// function for the commits url and name
const displayCommits = (commitsUrl, reponame) => {
  fetch(commitsUrl, options)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById(`commits-${reponame}`).innerHTML = `
        <p class="bold-text">Amount of commits: ${data.length}
        </p>
        `;
    });
};

//function to get the latest push to repo
const fetchTechnigo = (reponame) => {
  fetch(
    `https://api.github.com/repos/Technigo/${reponame}/pulls?per_page=100`,
    options
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach((repo) => {
        const commitsUrl = repo.commits_url;
        if (repo.user.login === username) {
          displayCommits(commitsUrl, reponame);
        } else if (
          repo.user.login === "sukiphan97" &&
          reponame === "project-chatbot"
        ) {
          displayCommits(repo.commits_url, reponame);
        } else if (
          repo.user.login === "kolkri" &&
          reponame === "project-weather-app"
        ) {
          displayCommits(repo.commits_url, reponame);
        } else {
          document.getElementById(`commits-${reponame}`).innerHTML =
            "No commits for this repo";
        }
      });
    });
};
