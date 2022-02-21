//Global Dom Selectors
const header = document.querySelector('header')
const projects = document.getElementById('projects')

// Github API
const username = 'michaelchangdk'
const GITHUB_API = `https://api.github.com/users/${username}/repos`

// Function to Sort Projects By Created Date
compareCreateDate = (a, b) => {
    if (a.created_at < b.created_at) {
        return -1;
    } if (a.created_at > b.created_at) {
        return 1;
    }
    return 0;
};

const getProjects = async () => {
    const projectsWait = await fetch(GITHUB_API);
    const data = await projectsWait.json();

    // Filter Technigo Projects Only & Sort by Date Created
    const technigoProjects = data.filter(item => item.archive_url.includes('project') === true).sort(compareCreateDate);
    console.log(technigoProjects);

    // Create Header Section
    header.innerHTML = `
    <img src="${technigoProjects[0].owner.avatar_url}" class="avatar" alt="profile picture" />
    <h1>${technigoProjects[0].owner.login}</h1>
    `

    // Create Main Project Elements & Fetch Number of Commits
    for (let i = 0; i < technigoProjects.length; i++) {
        fetch(technigoProjects[i].commits_url.replace("{/sha}", ""))
            .then(res => res.json())
            .then(data => {
                // console.log('commit data', data)

                // Number of Commits
                let numberOfCommits = data.length;

                // Last Commit Message - Committed Netlify Link to add to live link.
                let lastCommitLink = data[0].commit.message

                // Last Commit Date which is NOT the Netlify commit (Index 1 instead of 0)
                // Formatting dates to look nice for the tracker
                let lastCommitDateRaw = data[1].commit.committer.date.substring(0,10)
                // Removing the 0 from dates before the 10th for DAYS
                let lastCommitDayRaw = lastCommitDateRaw.substring(8,10)
                let lastCommitDay
                if (lastCommitDayRaw < 10) {
                    lastCommitDay = lastCommitDayRaw.replace("0", "")
                } else {
                    lastCommitDay = lastCommitDayRaw;
                }
                // Formatting MONTHS
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                let lastCommitMonthNumber = lastCommitDateRaw.substring(5,7).replace("0","")
                let lastCommitMonth = months[lastCommitMonthNumber - 1]

                // Extracting YEAR
                let lastCommitYear = lastCommitDateRaw.substring(0,4)

                // Creating Project ID
                let projectName = technigoProjects[i].name.replaceAll("-","");

                // Creating the Project Elements
                projects.innerHTML += `
                <div class="project-wrapper">
                    <button class="project-header ${projectName}" id="${projectName}" onclick="openSesame('${projectName}')">
                        Week ${i+2}: ${technigoProjects[i].name}
                    </button>
                    <div class="project-info" id="${projectName}2">
                        <p>Number of commits: ${numberOfCommits}</p>
                        <p>Last commit date: ${lastCommitMonth} ${lastCommitDay}, ${lastCommitYear}</p>
                        <p>Repo can be found <a href="${technigoProjects[i].html_url}" target="_blank">here</a>.
                        <p>View it live <a href="${lastCommitLink}" target="_blank">here</a>.
                    </div>
                </div>
                `

                // Fetching the pull requests
                fetch('https://api.github.com/repos/technigo/' + technigoProjects[i].name + '/pulls?per_page=100')
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        const filteredPR = data.filter(function (el) {
                            return el.user.login === "michaelchangdk"
                        })
                        document.getElementById(`${projectName}2`).innerHTML += `
                        <p>Pull request with comments <a href="${filteredPR[0].html_url}" target="_blank">here</a>.
                        `
                        // console.log(filteredPR[0].review_comments_url)
                })
        })
    }
}

// Function for opening and closing the projects list
const openSesame = (param) => {
    // console.log('you got clicked! bitch')
    let projectID = param;
    let projectHeader = document.getElementById(`${projectID}`);
    let projectBody = projectHeader.nextElementSibling;
    if (projectBody.style.display === "none") {
        projectBody.style.display = "block";
        projectHeader.classList.add("project-header--active")
    } else {
        projectBody.style.display = "none";
        projectHeader.classList.remove("project-header--active")
    }
}

//Remember to pass along your filtered repos as an argument when you are calling this function

// const getPullRequests = (repos) => {
//     //Get all the PRs for each project.
//     repos.forEach(repo => {
//       fetch('https://api.github.com/repos/technigo/' + repo.name + '/pulls')
//       .then(res => res.json())
//       .then(data => {
//               //TODO
//           //1. Find only the PR that you made by comparing pull.user.login
//               // with repo.owner.login
//               //2. Now you're able to get the commits for each repo by using
//               // the commits_url as an argument to call another function
//               //3. You can also get the comments for each PR by calling
//               // another function with the review_comments_url as argument
//           })
//     })
//   }

getProjects();
