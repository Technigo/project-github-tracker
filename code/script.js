const username = "Mimmisen";
const API_URL = `https://api.github.com/users/${username}`;
const REPOS_URL = `https://api.github.com/users/${username}/repos`;
//const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`;
const numberOfProjects = document.getElementById("numberOfProjects");

const options = {
  method: "GET",
  headers: {
    Authorization: `token ${API_TOKEN}`, // you need to paste your token over here.
  },
};
//----------------------------------FETCH 1-------------------------------------
fetch(API_URL, options)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    headerBox.innerHTML += `
    <div id="profile" class="profile">
    <div class="profile-image">
    <a href="${API_URL}">
    <img src="${data.avatar_url}" alt="Avatar of ${data.login}">
    </a>
    </div>
    <a href="https://github.com/Mimmisen"><h1 class="username">${data.name}<h1></a>
    </div>
     `;
  });
//----------------------------------FETCH 2-------------------------------------
fetch(REPOS_URL, options)
  .then((res) => res.json())
  .then((data) => {
    console.log("repos", data);
    //To get my projects and filter them so only the ones starting with projects are displayed
    const technigoProjects = data.filter(
      (repo) => repo.name.startsWith("project-") && repo.fork
    );
    console.log("Technigo projects", technigoProjects);

    technigoProjects.forEach((repo) => {
      //Get the name of the repo
      const reponame = repo.name;

      //get the url fo each repo
      const projectUrl = repo.html_url;

      //get the latest push/update of the repo
      const latestPushRepo = new Date(repo.updated_at).toLocaleDateString(
        "sv-SE",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );

      document.getElementById("section-projects").innerHTML += `
      <div class="section-projects__card box-style">
      <div>
     <h3 class="repo-title bold-text"><a class="nav-link" href='${projectUrl}'>${reponame}</a></h3>
     <p><span class="bold-text">Latest update:</span> ${latestPushRepo}</p>
     <p id="commits-${reponame}"></p>
     </div>
     </div>
     `;
    });

    //Count the repos and show the chart
    showChart(technigoProjects.length);
    numberOfProjects.innerHTML = `I have finished ${countRepos} projects and have ${
      19 - countRepos
    } left.`;
    showChart(countRepos);
    //----------------------------------FETCH 3-------------------------------------

    data.forEach((repo) => {
      reponame = repo.name;
      fetch(
        `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`,
        options
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("forked", data);
          // if (repo.user.login === username) {
          //   let reponame = repo.base.repo.name;
          //   console.log(reponame);
          //   //get url for commits to use in new fetch
          //   const commitsUrl = repo.commits_url;
          //   displayCommits(commitsUrl, reponame);
          //   //get url for netlify
          //   //const netlifyUrl = repo.body;
          //   // displayLink(netlifyUrl, reponame);
          // } else if (
          //   repo.user.login === "sukiphan97" &&
          //   reponame === "project-chatbot"
          // ) {
          //   displayCommits(repo.commits_url, reponame);
          //   // displayLink("https://dr-strange-chatbot.netlify.app", reponame);
          // } else if (
          //   repo.user.login === "kolkri" &&
          //   reponame === "project-weather-app"
          // ) {
          //   displayCommits(repo.commits_url, reponame);
          //   // displayLink("https://hippos1-weatherapp.netlify.app/", reponame);
          // } else {
          //   document.getElementById(`commits-${reponame}`).innerHTML = "";
          // }
          // const displayCommits = (commitsUrl, reponame) => {
          //   fetch(commitsUrl, options)
          //     .then((res) => res.json())
          //     .then((data) => {
          //       document.getElementById(`commits-${reponame}`).innerHTML = `
          //          <p class="bold-text">Amount of commits: ${data.length}
          //          </p>`;
          //     });
          // const displayLink = (netlifyUrl, reponame) => {
          //   document.getElementById(`website-${reponame}`).innerHTML = `
          //   <a href="${netlifyUrl}" target="_blank">
          //   <button class= "netlify-button">Go to website</button>
          //   </a>
          //   `;
        });
    }); // forEach
    //}); // then from fetch 3
  }); // fetch from the repos
