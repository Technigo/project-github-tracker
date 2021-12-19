let username = 'A1eksa';

const userPicture = `https://api.github.com/users/${username}`;
const REPOS_URL = `https://api.github.com/users/${username}/repos`;

const getUserPicture = () => {
  fetch(userPicture)
    .then((res) => res.json())
    .then((data) => {
      const picture = data.avatar_url;
      const location = data.location;
      const userBio = data.bio;
      const url = data.followers_url;

      userInfo.innerHTML += `
         
         <img class="user-info_picture" src="${picture}" alt="Picture of gitHub user"/>
         <div class="user-info_username">${username}</div>
         <div class="user-whole_name"> Aleksandra Safranko</div>
         <div class="user-info_location">Location: ${location} 🇸🇪 </div>
         <div class="user-info_bio">${userBio} 🐒</div>
        `;
    });
};
getUserPicture();

const projectsContainer = document.getElementById('projects');

const fetchRepo = () => {
  fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
      const technigoRepo = data.filter(
        (repo) => repo.name.includes('project-') && repo.fork
      );

      technigoRepo.forEach((repo) => {
        projectsContainer.innerHTML += `
             <div class="repo-card">
              <div class="link">
                <a href="${repo.html_url}">${repo.name}</a>
              </div>  
              <div class="branch">
                <p>default branch:${repo.default_branch}</p>
              </div> 
              <div class="push"> 
                <h4>most recent push:"${new Date(
                  repo.pushed_at
                ).toDateString()}"</h4>
              </div>  
              <p id="commit-${repo.name}">Commites amount:</p>
            `;
      });
      fetchPull(technigoRepo);
    });
};

const fetchPull = (allRepo) => {
  allRepo.forEach((repo) => {
    fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls`)
      .then((res) => res.json())
      .then((data) => {
        const myPullRequests = data.find(
          (pull) => pull.user.login === repo.owner.login
        );
        console.log('My Pull requests', myPullRequests);

        if (myPullRequests) {
          fetchCommits(myPullRequests.commits_url, repo.name);
        } else {
          document.getElementById(`commit-${repo.name}`).innerHTML +=
            'No pull request';
        }
      });
  });
};

const fetchCommits = (myCommitsUrl, myRepoName) => {
  fetch(myCommitsUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log('My commits', data);
      document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;
    });
};

fetchRepo();
