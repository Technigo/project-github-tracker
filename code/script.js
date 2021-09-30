const USER_ID = "MarySnopok";
const REPOS_URL = `https://api.github.com/users/${USER_ID}/repos`;
const reposDataContainer = document.getElementById("projects");
const userDetails = document.getElementById("user-details");
const input = document.getElementById("request").value;
// const commentsContainer = document.getElementById("comments");

// - A list of all repos that are forked once from Technigo
const fetchUserRepos = () => {
  fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data);
      getUserNameAndPic(data);
      getReposDetails(data);
    })
    .catch((error) => {
      console.error("fetchUserRepos", error);
    });
};
fetchUserRepos();

const getUserNameAndPic = (data) => {
  userDetails.innerHTML = `<img class="avatar" src="${data[0].owner.avatar_url}"/>
        <h3 class=user-name>${data[0].owner.login}</h3>`;
};

const getReposDetails = (data) => {
  const userForkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith("project-"));
  // const smth = UserForkedRepos sort here
  // smth.for echa
  // chartData.datasets.data[1].push(userForkedRepos.length);
  drawChart(userForkedRepos);
  userForkedRepos.forEach((repo) => {
    const lastUpdate = new Date(repo.updated_at).toLocaleDateString("nb-NO", { day: "2-digit", month: "2-digit", year: "2-digit" });
    fetch(repo.commits_url.replace("{/sha}", ""))
      .then((response) => response.json())
      .then((commits) => {
        reposDataContainer.innerHTML += `
    <h3 class="repo-heading">${repo.name}</h3>
    <a class="repo-links" href="${repo.html_url}">View on Github</a>
    <div class="repos-stats" id="each-${repo.name}">
    <p class="stats">branch: ${repo.default_branch}<p>
    <p class="stats">last update: ${lastUpdate}<p>
    <p class="stats link">commits: ${commits.length}<p>
    <p class="stats">views: ${repo.watchers}<p>
    </div>
    `;
      })
      .catch((error) => {
        console.error("repo commits url", error);
      });
  });
  getPullRequests(userForkedRepos);
};

const getPullRequests = (userForkedRepos) => {
  userForkedRepos.forEach((repo) => {
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`)
      .then((res) => res.json())
      .then((pulls) => {
        console.log("technigo", pulls);
        const userPRs = pulls.filter((pull) => pull.user.login === repo.owner.login);
        console.log("userPR review ", userPRs);
        userPRs.forEach((pull) => {
          const COMMENTS_URL = pull.review_comments_url;
          const pullDate = new Date(pull.updated_at).toLocaleDateString("nb-NO", { day: "2-digit", month: "2-digit", year: "2-digit" });
          document.getElementById(`each-${repo.name}`).innerHTML += `
        <div class="repos-stats" id="pull-${repo.name}">
        <p class="stats">PR date: ${pullDate}<p>
        </div>`;
          getComments(COMMENTS_URL, repo);
        });
      })
      .catch((error) => {
        console.error("getPullRequests", error);
      });
  });
};

const getComments = (COMMENTS_URL, repo) => {
  fetch(COMMENTS_URL)
    .then((res) => res.json())
    .then((comments) => {
      console.log("comments", comments);
      renderComments(comments, repo);
    })
    .catch((error) => {
      console.error("getComments", error);
    });
};

const renderComments = (comments, repo) => {
  // separating code review comments from user answers
  const filteredComments = comments.filter((com) => !com.in_reply_to_id);
  if (filteredComments.length === 0) {
    return;
  }
  const reposStats = document.getElementById(`each-${repo.name}`);

  const commentsButton = document.createElement("button");
  commentsButton.innerText = "Comments";
  reposStats.appendChild(commentsButton);
  commentsButton.className = "comments-button";
  const commentContainer = document.createElement("div");
  commentContainer.classList.add("comment-container");
  reposStats.appendChild(commentContainer);

  filteredComments.forEach((comment) => {
    commentContainer.innerHTML += `
    <p>${comment.body}</p>
   `;
  });

  commentsButton.addEventListener("click", () => classToggle(commentContainer));
};

const classToggle = (commentContainer) => {
  commentContainer.classList.toggle("active");
};

// - Sort your list in different ways.
// **Example of what you can sort by:** creation date, name, most commits, followers or stargazers
// - Implement a search field to find a specific repo based on name

// DONE
// - Your username and profile picture first fetch DONE
// - URL to the actual GitHub repo first fetch  OK
// - Name of your default branch for each repo -  first fetch OK
// number of views OK
// - Most recent update (push) for each repo - first fetch OK
// - Number of commit messages for each repo - OK
// - visualise projects via chart js
// - PRs
// - comments via pop ups
