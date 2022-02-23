const userProfile = document.getElementById("profile");
const allProjects = document.getElementById("projects");

const username = "TereseClaesson";
//let reponame = ''

//All my repos from github
const API_USER = `https://api.github.com/users/${username}`;
const API_URL = `https://api.github.com/users/${username}/repos`;
//const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`

const userInfo = () => {
  fetch(API_USER)
    .then((res) => res.json())
    .then((profile) => {
      console.log(profile);
      userProfile.innerHTML += `
        <img src = ${profile.avatar_url}>
        <h3>${profile.name}</h3>
        `;
    });
};

fetch(API_URL)
  .then((Response) => Response.json())
  .then((repos) => {
    console.log(repos);

    //Use the array method Filter() to filter the array and create a new array,
    //with the object properties that has been forked from Technigo
    //repos is the name of the array, repo is the name of every object in the array
    //fork is the keyname of the property, true is the keyvalue that the new arrays properties has
    //const repoForked = repos.filter(repoFork => repoFork.fork === true)

    const repoForked = repos.filter(
      (repo) => repo.fork && repo.name.startsWith("project-")
    );
    repoForked.forEach((repo) => {
      allProjects.innerHTML += `
        <div>
        <p>${repo.name}</p>
        <h3>PUSH ${repo.pushed_at}</h3> //slice -take away the last part of push
        <p> main branch ${repo.default_branch}</p>
        <a href = ${repo.html_url}><p>${repo.name}</p></a>
        <p>${repo.commits_url}</p>
        </div>
        `;
    });
    console.log(repoForked);

    getPullRequest(repoForked);
  });

const getPullRequest = (repoForked) => {
  repoForked.forEach((repo) => {
    fetch("https://api.github.com/repos/Technigo/" + repo.name + "/pulls")
      .then((res) => res.json())
      .then((pullreqs) => {
        console.log(pullreqs)
        pullreqs.forEach((pull) => {
          if (pull.user.login === username) {
            console.log(pull);
            
            comments(pull);
            commits(pull);

            repoForked.innerHTML += `
            <div> 
            <p>Commit messages ${pullreqs.commitNumber}</p>
            </div>
            `
          }
        });
      });
  });
};

const comments = (pullReq) => {
  fetch(pullReq.review_comments_url)
    .then((res) => res.json())
    .then((commentrev) => {
      console.log(commentrev);
    });
};

const commits = (pullReq) => {
  fetch(pullReq.commits_url)
    .then((res) => res.json())
    .then((commitNumber) => {
      console.log(commitNumber);
    });
};

userInfo();
