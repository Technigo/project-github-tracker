const projects = document.getElementById('projects')

fetch('https://api.github.com/users/jakobxlindstrom/repos')
  .then((res) => res.json())
  .then((repos) => {
    console.log(repos)
    repos.forEach((repos) => {
      projects.innerHTML += `<p> my Repo ${repos.name}</p>`
    })
  })

const filter = (fork) => {
  if (fork === true) {
    projects.innerHTML = `These are my FORKED repos${repos.fork}`
  } else {
    console.log(`not there yet`)
  }
}
filter()

// fetch('https://api.github.com/repos/technigo/jakobxlindstrom/pulls')
//   .then((res) => res.json())
//   .then((pulls) => {
//     console.log(pulls)
//   })

//   ### What to include

//   - A list of all repos that are forked ones from Technigo
//   - Your username and profile picture
//   - Most recent update (push) for each repo
//   - Name of your default branch for each repo
//   - URL to the actual GitHub repo
//   - Number of commit messages for each repo
//   - All pull requests
//   - A chart of how many projects you've done so far,
//   compared to how many you will do using
//   [Chart.js](https://www.chartjs.org/).
//   [Here](https://www.chartjs.org/docs/latest/getting-started/)'s
//   documentation on how to get started, and in the left menu you can also find
//   [example usage](https://www.chartjs.org/docs/latest/getting-started/usage.html).
