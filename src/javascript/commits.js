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
    <p class="commits__text"><a href="${repo.html_url}">${username}/${repo.name}</a>
    <button type="button" id=${repo.name} class="btn btn-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">${commits.length} commits </button>
    </p>
  `

      for (let i = 0; i < commits.length; i++) {
        const commitMessages = commits[i].commit.message;
        commitsSection.innerHTML += `
      <p class=${repo.name}>- ${commitMessages}</p>
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