const projects = document.getElementById("projects");
const projectInfo = document.getElementById("projectsInfo");
const userInfo = document.getElementById("userInfo");

const API_KEY = "https://api.github.com/users/Meeteyes/repos";
let API_KEY_PULL = "";
let API_KEY_COMMENTS = [];

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

// This function will get comments, commits, etc
const fetchDetails = async (key) => {
  const res = await fetch(key);
  const data = await res.json();
  return data;
};

// This is the function that controls the flow of the script.
// We run other functions which fetches data and we display data with this function
const callDataInOrder = async () => {
  //returns array
  const myRepos = await getRepos();

  // this displays the user information, picture and username:
  userInfo.innerHTML = `
  <img src=${myRepos[0].owner.avatar_url} alt="user picture" class="user-image" />
  <h2 class="user-name">${myRepos[0].owner.login}</h2>
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

      //Haven't done anything with this yet
      API_KEY_COMMENTS = data.comments_url;
      const myComments = fetchDetails(API_KEY_COMMENTS);
      myComments.then((data) => {
        console.log(data);
      });
    });

    projectInfo.innerHTML += `
    <div id=${repo.name} class="repo-card">
    <a href=${repo.svn_url} class="link">${repo.name}</a>
    <p> Default branch: ${repo.default_branch}</p>
    <p>Latest push: ${repo.pushed_at.slice(0, 10)}</p>
    <p id="numberOfCommits></p>
    <div>
    `;
  });
};

callDataInOrder();

// getPullRequests(repoArray);
