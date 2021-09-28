const USER_ID = "MarySnopok";
const REPOS_URL = `https://api.github.com/users/${USER_ID}/repos`;
const reposDataContainer = document.getElementById("projects");
const userDetails = document.getElementById("user-details");

// - A list of all repos that are forked once from Technigo
const fetchUserRepos = () => {
  fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(data[0].owner.login);
      console.log(data[0].owner.avatar_url);
      getUserNameAndPic(data);
      getReposDetails(data);
    });
};
fetchUserRepos();

const getUserNameAndPic = (data) => {
  userDetails.innerHTML = `<img class="avatar" src="${data[0].owner.avatar_url}"/>
        <h3 class=user-name>${data[0].owner.login}</h3>`;
};

const getReposDetails = (data) => {
  const userForkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith("project-"));
  userForkedRepos.forEach((repo) => {
    fetch(repo.commits_url.replace("{/sha}", ""))
      .then((response) => response.json())
      .then((commits) => {
        reposDataContainer.innerHTML += `
    <h3 class="repo-heading">${repo.name}</h3>
    <a class="repo-links" href="${repo.url}">View on Github</a>
    <div class="repos-stats">
    <p class="stats">branch: ${repo.default_branch}<p>
    <p class="stats">last update: ${repo.updated_at}<p>
    <a class="stats link">commits: ${commits.length}<p>
    <p class="stats">views: ${repo.watchers}<p>
    </div>
    
    `;
      });
  });
};

// - URL to the actual GitHub repo first fetch  OK
// - Name of your default branch for each repo -  first fetch OK
// number of views OK
// - Most recent update (push) for each repo - first fetch
// - Number of commit messages for each repo - OK

// - All pull requests
// - A chart of how many projects you've done so far, compared
// to how many you will do using [Chart.js](https://www.chartjs.org/).
// [Here](https://www.chartjs.org/docs/latest/getting-started/)'s documentation
// on how to get started, and in the left menu you can also find [example usage]
// (https://www.chartjs.org/docs/latest/getting-started/usage.html).
// - Sort your list in different ways.
// **Example of what you can sort by:** creation date, name, most commits, followers or stargazers
// - Create the opportunity to filter the repos based on a condition, e.g. only JavaScript repos
// - Display the actual commit messages for each repo in a good way. Maybe by adding a modal (popup) or an accordion?
// - Display the comments you got from each pull request
// - When you're browsing through the repo object, you'll see that there's a lot of data that we can use. Create a chart over some of the data.
// **Example of data to use:** Repo size, people that starred your repo (stargazers) or amount of commits on each repo.

// ### **  Black Level (Advanced Goals)**

// - Implement a search field to find a specific repo based on name

// Endpoint to get all your repos
// `https://api.github.com/users/${username}/repos`

// Endpoint to get all PRs from a Technigo repo `https://api.github.com/repos/technigo/${reponame}/pulls`

// To get the comments from a PR, you need to get the URL from the `review_comments_url` property in the PR json object. It might look something like this:
// `https://api.github.com/repos/Technigo/project-news-site/pulls/247/comments`
// and then do a fetch with that url.

// To get the commits from a PR, you need to get the URL  from the `commits_url` property in the PR json object. It might look something like this:
// `https://api.github.com/repos/Technigo/project-news-site/pulls/227/commits`
// and then do a fetch with that url.

// DONE
// - Your username and profile picture first fetch DONE
