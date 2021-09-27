const projects = document.getElementById("projects");
const projectInfo = document.getElementById("projectsInfo");
const userInfo = document.getElementById("userInfo");

const API_KEY = "https://api.github.com/users/Meeteyes/repos";
let API_KEY_PULL = "";
let API_KEY_COMMENTS = [];

let repoArray = [];
let pullsByUser = [];
let comments = [];

//first function that runs a fetch and gets all the repos of the user
// it returns an array with only Meeteyes technigo repos
const getRepos = async () => {
  const res = await fetch(API_KEY);
  const data = await res.json();
  let array = data.filter(
    (item) => item.fork && item.full_name.includes("project-")
  );
  return array;
};

// this function will be invoked when we want to fetch pull requests from technigo
const fetchPulls = async (key) => {
  const res = await fetch(key);
  const data = await res.json();
  let filteredArray = data.filter((item) => item.user.login === "Meeteyes");
  return filteredArray[0];
  // return filteredArray.url;
};

const fetchDetails = async (key) => {
  const res = await fetch(key);
  const data = await res.json();
  return data;
};

// This is the function that controls the flow of the script.
// We run other function which fetches data and we display data with this function
const callDataInOrder = async () => {
  //returns array
  const myRepos = await getRepos();

  // this displays the user information, picture and username:
  userInfo.innerHTML = `
  <img src=${myRepos[0].owner.avatar_url} alt="user picture" class="user-image" />
  <p>${myRepos[0].owner.login}</p>
  `;

  myRepos.forEach((repo) => {
    API_KEY_PULL = `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`;
    const mySinglePull = fetchPulls(API_KEY_PULL);
    mySinglePull.then((data) => {
      console.log(data);
      const API_KEY_COMMITS = data.commits_url;
      const comsPerProject = fetchDetails(API_KEY_COMMITS);
      comsPerProject.then((data) => {
        document.getElementById(repo.name).innerHTML += `
        <p>Number of commits: ${data.length}</p>
        `;
      });

      API_KEY_COMMENTS = data.comments_url;
      const myComments = fetchDetails(API_KEY_COMMENTS);
      myComments.then((data) => {
        console.log(data);
      });
    });

    // allThePulls = allThePulls.filter((item) => item.user.login === "Meeteyes");

    projectInfo.innerHTML += `
    <div id=${repo.name} class="repo-card">
    <a href=${repo.svn_url}>${repo.name}</a>
    <p> Default branch: ${repo.default_branch}</p>
    <p>Latest push: ${repo.pushed_at.slice(0, 10)} at ${repo.pushed_at.slice(
      11,
      19
    )}</p>
    <p id="numberOfCommits></p>
    <div>
    `;
  });

  // console.log(myRepos);
  // for (let i = 0; i < myRepos.length; i++) {
  //   API_KEY_PULL = `https://api.github.com/repos/technigo/${myRepos[i].name}/pulls?per_page=100`;
  //   const allProjectPulls = await fetchData(API_KEY_PULL);
  //   const myPull = allProjectPulls.filter(
  //     (pull) => pull.user.login === "Meeteyes"
  //   );
  //   if (myPull.length === 0) {
  //     continue;
  //   }
  //   document.getElementById(`${myPull[0].head.repo.name}`).innerHTML += `
  //     <div>
  //       <p>Name of the pull request: ${myPull[0].title}</p>
  //       <p>Link to the pull: ${myPull[0].url}</p></div>
  //     `;
  //   const myCommitsPerProject = await fetchData(myPull[0].commits_url);
  //   document.getElementById(`${myPull[0].head.repo.name}`).innerHTML += `
  //     <div><p>Number of commits: ${myCommitsPerProject.length}</p></div>
  //   `;
  //   console.log(myCommitsPerProject);
  // }
};

callDataInOrder();

// getPullRequests(repoArray);
