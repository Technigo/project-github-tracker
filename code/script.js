//Global Dom Selectors
const header = document.querySelector('header')
const projects = document.getElementById('projects')

// Github Authentication
const username = 'michaelchangdk'
const GITHUB_API = `https://api.github.com/users/${username}/repos`
const GITHUB_TOKEN = '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'
const options = {
    method: 'GET',
    headers: {
          Authorization: `token ${GITHUB_TOKEN}`
      }
  }

fetch (GITHUB_API, options)
    .then((res) => res.json())
    .then((data => {

        // Function to Sort Projects By Created Date
        compareCreate = (a, b) => {
            if (a.created_at < b.created_at) {
                return -1;
            } if (a.created_at > b.created_at) {
                return 1;
            }
            return 0;
        };

        // Filter Technigo Projects Only & Sort by Date Created
        const technigoProjects = data.filter(item => item.archive_url.includes('project') === true).sort(compareCreate);
        console.log(technigoProjects);

        // fetch(technigoProjects[i].commits_url.replace("{/sha}", ""), options)
        // .then((res) => res.json())
        // .then((json) => {
        //     // console.log(json);
        //     let numberOfCommits = json.length;
        // })

        // Create Header Section
        header.innerHTML = `
        <div class="header-1">
        <img src="${technigoProjects[0].owner.avatar_url}" class="avatar" alt="profile picture" />
        <h1>michaelchangdk</h1>
        </div>
        <div class="header-2">
        <h1>Technigo Projects GitHub Tracker</h1>
        </div>
        `


        // Create Main Project Elements
        for (let i = 0; i < technigoProjects.length; i++) {
            console.log(technigoProjects[i]);
            let numberOfCommits
            fetch(technigoProjects[i].commits_url.replace("{/sha}", ""), options)
                .then((res) => res.json())
                .then((json) => {
                    // Function to Sort Commits by 1st Commit
                    // compareCommit = (a, b) => {
                    //     if (a[0].commit.author.date < b[0].commit.author.date) {
                    //         return -1;
                    //     } if (a[0].commit.author.date > b[0].commit.author.date) {
                    //         return 1;
                    //     }
                    //     return 0;
                    // };
                    console.log(json);
                    console.log(json[0].commit.author.date)
                    numberOfCommits = json.length;
                })

            projects.innerHTML += `
            <div class="technigo-projects ${technigoProjects[i].name}">
            <div class="project-header">
                <h4>Week ${i+1}: ${technigoProjects[i].name}</h4>
            </div>
            <div class="project-container">
            <p>${technigoProjects[i].name} can be found <a href="${technigoProjects[i].html_url}">here</a>.
            <p>Number of commits: ${numberOfCommits}</p>
            </div>
            </div>
            `
        }
    }))