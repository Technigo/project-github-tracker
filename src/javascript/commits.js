const commitsSection = document.getElementById("commits");

const REPOS_URL = `https://api.github.com/users/${username}/repos`;
const COMMITS_URL = `https://api.github.com/repos/${username}/`;

const fetchRepo = (repositories) => {
  repositories.filter(repo => {
    if (repo.fork === true && repo.name !== "unit-tests") {
      fetchCommits(repo)
    }
  })
}

fetch(REPOS_URL, options)
  .then(res => res.json())
  .then(fetchRepo)
  .catch(error => console.log(error))

const fetchCommits = (repo) => {
  fetch(`${COMMITS_URL}${repo.name}/commits`, options)
    .then(res => res.json())
    .then(commits => {
      commitsSection.innerHTML += `
      <div class="commits__text">
      <div><p ><a href="${repo.html_url}">${username}/${repo.name}</a></p></div>
      <div class="progress"><div class="progress-bar bg-success" role="progressbar" style="width: ${commits.length * 3}%" aria-valuenow="${commits.length}" aria-valuemin="0" aria-valuemax="100"></div></div>
      <div><button type="button" id=${repo.name} class="btn btn-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">${commits.length} commits </button></div>
      </div>
      `

      for (let i = 0; i < commits.length; i++) {
        const commitMessages = commits[i].commit.message;
        const author = commits[i].commit.author.name;
        const authorPicture = commits[i].author.avatar_url;
        const date = new Date(commits[i].commit.committer.date);
        const formattedDate = date.toDateString().split(' ').slice(1).join(' ');
        commitsSection.innerHTML += `
        <div id="messageWrapper" class=${repo.name}>
        <p class="text">${commitMessages}</p>
        <p class="subtext"><img class="icons circle" src=${authorPicture} alt=${author}> <span class="bold-text">${author} </span> committed on ${formattedDate}</p>
        </div>
        `
      }


    
      const chatbot = document.getElementById("chatbot");
      const weatherApp = document.getElementById("weather-app");
      const newsSite = document.getElementById("news-site");
      const guessWho = document.getElementById("guess-who");
      const businessSite = document.getElementById("business-site");
      const githubTracker = document.getElementById("github-tracker");

      const chatbotItems = document.querySelectorAll(".chatbot");
      const weatherItems = document.querySelectorAll(".weather-app");
      const newsSiteItems = document.querySelectorAll(".news-site");
      const guessWhoItems = document.querySelectorAll(".guess-who");
      const businessItems = document.querySelectorAll(".business-site");
      const githubTrackerItems = document.querySelectorAll(".github-tracker");

      chatbot.addEventListener("click", () => {
        chatbotItems.forEach(item => {
          item.classList.toggle("active");
        })
      })

      weatherApp.addEventListener("click", () => {
        weatherItems.forEach(item => {
          item.classList.toggle("active");
        })
      })

      newsSite.addEventListener("click", () => {
        newsSiteItems.forEach(item => {
          item.classList.toggle("active");
        })
      })

      guessWho.addEventListener("click", () => {
        guessWhoItems.forEach(item => {
          item.classList.toggle("active");
        })
      })

      businessSite.addEventListener("click", () => {
        businessItems.forEach(item => {
          item.classList.toggle("active");
        })
      })

      githubTracker.addEventListener("click", () => {
        githubTrackerItems.forEach(item => {
          item.classList.toggle("active");
        })
      })
    })
    .catch(error => console.log(error))
}