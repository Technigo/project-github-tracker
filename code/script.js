const name = "Zancotti";
const myReposApi = `https://api.github.com/users/${name}/repos`;
const usernameAndPictureApi = `https://api.github.com/users/${name}`;
let filteredRepos = [];

const getUsernameAndPicture = () => {
  fetch(usernameAndPictureApi)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const username = `${data.login}`;
      const pictureOfUser = `${data.avatar_url}`;

      usernamePicture.innerHTML = `
        <img class="username-picture__picture" src="${pictureOfUser}" alt="Picture of gitHub-user"/>
        <div class="username-picture__username">${username}</div>`;
    });
};

const getRepos = () => {
  fetch(myReposApi)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((e) => {
        if (e.fork === true && e.full_name.includes(`project`)) {
          filteredRepos.push(e);
        }
      });

      // sort the filtered repoList after created dates and then reverse it.
      filteredRepos.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      filteredRepos = filteredRepos.reverse();

      filteredRepos.forEach((e) => {
        repoName = e.full_name;
        repoCreateDate = e.created_at;
        const myDate = new Date(repoCreateDate);

        console.log(repoCreateDate);
        console.log(myDate);

        projects.innerHTML += `<div>${repoName}</div>`;
      });
    });
};

// const getPullRequests = (repos) => {
//   fetch("https://api.github.com/repos/technigo/" + repo.name + PULLS);
//   repos.forEach((repo) => {});
// };

/*- A list of all repos that are forked ones from Technigo
- Your username and profile picture
- Most recent update (push) for each repo
- Name of your default branch for each repo
- URL to the actual GitHub repo
- Number of commit messages for each repo
- All pull requests
- A chart of how many projects you've done so far, compared to how many you will do using [Chart.js](https://www.chartjs.org/). [Here](https://www.chartjs.org/docs/latest/getting-started/)'s documentation on how to get started, and in the left menu you can also find [example usage](https://www.chartjs.org/docs/latest/getting-started/usage.html).*/

getUsernameAndPicture();
getRepos();
