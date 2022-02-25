//DOM selectors

const username = "SofiePellegrini";
const API_REPOS = `https://api.github.com/users/${username}/repos`;
const API_PROFILE = `https://api.github.com/users/${username}`;
const projects = document.getElementById("projects");
const fullName = document.getElementById("full-name");
const userName = document.getElementById("user-name");
const profilePic = document.getElementById("profile-pic");

//Fetch picture, name and username

fetch(API_PROFILE)
  .then((res) => res.json())
  .then((data) => {
    profilePic.src = data.avatar_url;
    fullName.innerHTML = `<h2>${data.name}</h2>`;
    userName.innerHTML = `<h3><a href=${data.html_url}>${data.login}</a></h3>`;
  })

  //Fetch repositories - then filter out only Technigo repositories

fetch(API_REPOS)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const technigoRepos = data.filter(
      (repo) => repo.fork && repo.name.startsWith("project-")
    )
    console.log(technigoRepos);
    makeChart(technigoRepos.length);

    technigoRepos.sort(function (oldestRepo, newestRepo) {
      return new Date(oldestRepo.pushed_at) - new Date(newestRepo.pushed_at);
    })

    //Create div for every repository

    technigoRepos.forEach((repo) => {
      projects.innerHTML += `
  <div class="repos">
  <a style="font-weight:bold"  href=${repo.html_url}>${repo.name}</a>
  <p>Last push: ${new Date(repo.pushed_at).toLocaleString("sv-SE", {
    dateStyle: "short",
  })}</p>
  <p>Default branch: ${repo.default_branch}</p>
  <p id="${repo.name}-commit">Commits: - </p> 
  <p id="pullrequests-${repo.name}">Pull requests: </p>
  </div>
  `


  //Fetch pullrequests and put them on the page

      API_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100&page=1`;
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          const myPulls = data.find(
            (pull) => pull.user.login === repo.owner.login
          )
          console.log(myPulls);

          if (myPulls) {
            getMyCommits(myPulls.commits_url, repo.name);
            document.getElementById(`pullrequests-${repo.name}`).innerHTML +=
              Object.length;
          } else {
            document.getElementById(
              `pullrequests-${repo.name}`
            ).innerHTML = `No pull requests were made by ${username}.`;
          }
        })
    })
  })

  //Fetch commits and put them on the page

const getMyCommits = (myCommitsUrl, repo) => {
  fetch(myCommitsUrl)
    .then((res) => res.json())
    .then((data2) => {
      document.getElementById(
        `${repo}-commit`
      ).innerHTML = `Commits: ${data2.length}`;
    })
}                                                                                                                   
