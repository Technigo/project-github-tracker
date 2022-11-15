// main fetch and function and put the DOM here
const projectsContainer = document.getElementById('projects');
const headerContainer = document.getElementById('header');
const USER = 'DALA746';
const ALL_MY_REPOS = `https://api.github.com/users/${USER}/repos`;

const button = document.getElementById('button');

const searchProject = () => {
  let input = document.getElementById('searchbar').value;
  input = input.toLowerCase();
  let repo = document.getElementsByClassName('repo');

  for (i = 0; i < repo.length; i++) {
    if (!repo[i].innerHTML.toLowerCase().includes(input)) {
      repo[i].style.display = 'none';
    } else {
      repo[i].style.display = 'block';
    }
  }
};

const renderHTML = (repos) => {
  console.log(repos);
  repos.forEach((repo) => {
    headerContainer.innerHTML = `
    <div class="info-about-user">
      <img class="profile-img"src="${repo.owner.avatar_url}" />
    </div>
    <h3>${repo.owner.login}</h3>
    <div>SOME STATS</div>

  `;
    projectsContainer.innerHTML += `
    <div class="repo"> 
      <a href="${
        repo.clone_url
      }"  target="_blank"><div class="icon-container"><i class="fal fa-book" style="font-size:25px;color:var(--grey);"></i><h3>${
      repo.name
    }</h3></div> </a>
      <p id="commit-${repo.name}"><span class="bold">Commits amount: </span></p>
      <p><span class="bold">Language:</span> ${repo.language}</p>
      <p><span class="bold">Latest push update:</span> ${new Date(
        repo.pushed_at
      ).toDateString()}</p>
      <p><span class="bold">Default branch:</span> ${repo.default_branch}</p>
    </div>
  `;
  });
};

const getRepos = () => {
  fetch(ALL_MY_REPOS)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      const forkedRepos = json.filter(
        (repo) => repo.fork && repo.name.startsWith('project-')
      );
      drawChart(forkedRepos.length);
      renderHTML(forkedRepos);
      // getPullRequests(forkedRepos);
    });
};

getRepos();

// GETTING ALL MY PULL REQUESTS
// const getPullRequests = (forkedRepos) => {
//   forkedRepos.forEach((repo) => {
//     fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         const myPullRequests = data.find(
//           (pull) => pull.user.login === repo.owner.login
//         );
//         console.log(myPullRequests, 'data');
//         getCommits(myPullRequests.commits_url, repo.name);
//       });
//   });
// };

const getCommits = (url, myRepoName) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const numberOfCommits = data.length;
      document.getElementById(`commit-${myRepoName}`).innerHTML +=
        numberOfCommits;
    });
};

button.addEventListener('click', (e) => {
  e.preventDefault();
  searchProject();
});
