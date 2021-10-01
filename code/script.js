const USER_ID = "MarySnopok";
const REPOS_URL = `https://api.github.com/users/${USER_ID}/repos`;
const reposDataContainer = document.getElementById("projects");
const userDetails = document.getElementById("user-details");
const input = document.getElementById("request");
const searchButton = document.getElementById("search");
const toTopBtn = document.getElementById("to-top-btn");

const icons = {
  branch: "assets/branch.svg",
  commit: "assets/commit.svg",
  pull: "assets/pull.svg",
  update: "assets/update.svg",
  view: "assets/view.svg",
  github: "assets/github.svg",
};

// fetching all user repos
const fetchUserRepos = () => {
  fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
      searchButton.addEventListener("click", () => {
        const searchString = input.value;
        input.value = "";
        // checking input validity by searching for exact repo name =>
        const anyRepo = data.find((repo) => repo.name === searchString);
        reposDataContainer.innerHTML = "";
        if (searchString === "") {
          // if input is empty
          getReposDetails(data);
        } else {
          // if input is not empty and match for the repo name was found do this =>
          if (anyRepo) {
            getReposDetails([anyRepo]);
            // otherwise if returned as undefined do this =>
          } else {
            reposDataContainer.innerHTML = "repo not found";
          }
        }
      });
      getUserNameAndPic(data);
      getReposDetails(data);
    })
    .catch((error) => {
      console.error("fetchUserRepos", error);
    });
};

const getUserNameAndPic = (data) => {
  userDetails.innerHTML = `<div class="avatar-container"><img class="avatar" src="${data[0].owner.avatar_url}"/></div>
        <h3 class=user-name>${data[0].owner.login}</h3>`;
};

const getReposDetails = (data) => {
  // filtering out user forked repaos
  const userForkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith("project-"));
  // sorting repos by creation date
  const sortedRepos = userForkedRepos.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  sortedRepos.forEach((repo) => {
    const lastUpdate = new Date(repo.updated_at).toLocaleDateString("nb-NO", { day: "2-digit", month: "2-digit", year: "2-digit" });
    fetch(repo.commits_url.replace("{/sha}", ""))
      .then((response) => response.json())
      .then((commits) => {
        reposDataContainer.innerHTML += `
    <h3 class="repo-heading">${repo.name}</h3>
    <a href="${repo.html_url}">view on Github   <img class="icon-bigger" src=${icons.github}></a>
    <div class="repos-stats" id="${repo.name}">
    <div class="stats"><img class="icon" src=${icons.branch}>   ${repo.default_branch}</div>
    <div class="stats link"><img class="icon-bigger" src=${icons.commit}>   ${commits.length}</div>
    <div class="stats"><img class="icon" src=${icons.view}>   ${repo.watchers}</div>
    <div class="stats"><img class="icon" src=${icons.update}>   ${lastUpdate}</div>
    </div>
    `;
      })
      .catch((error) => {
        console.error("repo commits url", error);
      });
  });
  drawChart(sortedRepos);
  getPullRequests(sortedRepos);
};

const getPullRequests = (sortedRepos) => {
  sortedRepos.forEach((repo) => {
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`)
      .then((res) => res.json())
      .then((pulls) => {
        const userPRs = pulls.filter((pull) => pull.user.login === repo.owner.login);
        userPRs.forEach((pull) => {
          const COMMENTS_URL = pull.review_comments_url;
          const pullDate = new Date(pull.updated_at).toLocaleDateString("nb-NO", { day: "2-digit", month: "2-digit", year: "2-digit" });
          document.getElementById(`${repo.name}`).innerHTML += `
        <div id="pull-${repo.name}">
        <div class="stats"><img class="icon-bigger" src=${icons.pull}>  ${pullDate}</div>
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
      renderComments(comments, repo);
    })
    .catch((error) => {
      console.error("getComments", error);
    });
};

const renderComments = (comments, repo) => {
  // separating code review comments from user answers
  const filteredComments = comments.filter((com) => !com.in_reply_to_id);
  // withdrawing from execution if no comments were available
  if (filteredComments.length === 0) {
    return;
  }
  const reposStats = document.getElementById(`${repo.name}`);
  const commentsButton = document.createElement("button");
  commentsButton.innerText = "Comments";
  reposStats.appendChild(commentsButton);
  commentsButton.className = "comments-button";
  const commentContainer = document.createElement("div");
  commentContainer.classList.add("comment-container");
  reposStats.appendChild(commentContainer);

  filteredComments.forEach((comment) => {
    commentContainer.innerHTML += `
    <p class="comments">${comment.body}</p>
   `;
  });
  commentsButton.addEventListener("click", () => classToggle(commentContainer));
};

// showing comments container when active class applied
const classToggle = (commentContainer) => {
  commentContainer.classList.toggle("active");
};

//"go to top" button
window.onscroll = () => {
  scrollToTop();
};

const scrollToTop = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    toTopBtn.style.display = "block";
  } else {
    toTopBtn.style.display = "none";
  }
};

const topFunction = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
topFunction();

fetchUserRepos();
