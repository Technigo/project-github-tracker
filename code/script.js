//Global DOM Selectors
const header = document.querySelector('header')
const projects = document.getElementById('projects')

// Github API
const username = 'michaelchangdk'
const GITHUB_API = `https://api.github.com/users/${username}/repos`

// GITHUB Authentication
const options = {
    method: 'GET',
    headers: {
          Authorization: `token ${API_KEY}`
      }
}

// Function to Sort Projects By Created Date
compareCreateDate = (a, b) => {
    if (a.created_at < b.created_at) {
        return -1;
    } if (a.created_at > b.created_at) {
        return 1;
    }
    return 0;
};

// Function for opening and closing the projects items
const openSesame = (projectID) => {
    let projectHeader = document.getElementById(projectID);
    let projectBody = projectHeader.nextElementSibling;
    if (getComputedStyle(projectBody).display === "none") {
        projectBody.style.display = "block";
        projectHeader.classList.add("project-header--active")
    } else {
        projectBody.style.display = "none";
        projectHeader.classList.remove("project-header--active")
    }
}

const getProjects = async () => {
    const projectsWait = await fetch(GITHUB_API, options);
    const data = await projectsWait.json();

    // Filter Technigo Projects Only & Sort by Date Created
    const technigoProjects = data.filter(item => item.archive_url.includes('project') === true).sort(compareCreateDate);
    
    // Length of completed projects and sending the number to chart.js
    const completedNumber = data.filter(item => item.archive_url.includes('project') === true).length
    completedProjects(completedNumber)

    // Create Header Section
    header.innerHTML = `
    <img src="${technigoProjects[0].owner.avatar_url}" class="avatar" alt="profile picture" />
    <h1>${technigoProjects[0].owner.login}</h1>
    `

    // For Loop to Create Main Project Elements || & Fetch Number of Commits as well as Pull Requests
    for (let i = 0; i < technigoProjects.length; i++) {

        // Creating Project classname & project ID
        let projectName = technigoProjects[i].name.replaceAll("-","");
        let projectID = technigoProjects[i].id

        // Create DIV in the correct sorted order
        projects.innerHTML += `
        <div id="${technigoProjects[i].id}" class="project-wrapper">
        </div>
        `

        // Creating the Project Elements
        document.getElementById(projectID).innerHTML += `
            <button class="project-header ${projectName}" id="${projectName}" onclick="openSesame('${projectName}')">
                Week ${i+2}: ${technigoProjects[i].name}
            </button>
            <div class="project-info" id="${projectID}2">
                <p>Repo can be found <a href="${technigoProjects[i].html_url}" target="_blank">here</a>.</p>
            </div>
            `

        // Fetching Commit Data
        commitFetch(technigoProjects[i], projectID);

        // Fetching Pull Requests
        pullFetch(technigoProjects[i].name, projectID)
    }
    }

// Function for Fetching Commits and Live Link
const commitFetch = (projects, projectsID) => {
    const GIT_COMMIT_API = projects.commits_url.replace("{/sha}", "")
    fetch(GIT_COMMIT_API, options)
        .then(res => res.json())
        .then(data => {

        const filteredCommits = []

        for (let i = 0; i < data.length; i++) {
            let author = data[i].commit.author.name
            if (author === "Michael Dohmann Chang") {
                filteredCommits.push('1')
            }
        };

        // Defining number of commits
        let numberOfCommits = filteredCommits.length;

        // Last Commit Message - Committed Netlify Link to add to live link.
        let lastCommitLink = data[0].commit.message

        // Formatting the DATES
        // Last Commit Date which is NOT the Netlify commit (Index 1 instead of 0)
        // Formatting DAYS
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
        let lastCommitMonthNumber
        if (lastCommitDateRaw.substring(5,7) !== 10) {
            lastCommitMonthNumber = lastCommitDateRaw.substring(5,7).replace("0","")
        } else {
            lastCommitMonthNumber = lastCommitDateRaw.substring(5,7)
        }
        let lastCommitMonth = months[lastCommitMonthNumber - 1]
        // Extracting YEAR
        let lastCommitYear = lastCommitDateRaw.substring(0,4)

        let commitDate = `${lastCommitMonth} ${lastCommitDay}, ${lastCommitYear}`

        // Creating the Project Elements
        document.getElementById(`${projectsID}2`).innerHTML += `
                <p>Number of commits: ${numberOfCommits}</p>
                <p>Last commit date: ${commitDate}</p>
            `

        // If statement to check if last commit includes netlify link
        if (lastCommitLink.includes('https://') === true) {
            document.getElementById(`${projectsID}2`).innerHTML += `
            <p>View it live <a href="${lastCommitLink}" target="_blank">here</a>.
            `
        } else {
            document.getElementById(`${projectsID}2`).innerHTML += `
            <p>No live link available.</p>
            `
        }
    })
}

// Fetching the pull requests
const pullFetch = (projectName, projectsID) => {
    const GIT_FETCH_API = `https://api.github.com/repos/technigo/${projectName}/pulls?per_page=100`
    fetch(GIT_FETCH_API, options)
        .then(res => res.json())
        .then(data => {

        // Filter Pull Requests by my username
        const filteredPR = data.filter(function (pr) {
            return pr.user.login === username
        })

        // Check if there is a pull request with my username
        let exist = false
        for (let i = 0; i < data.length; i++) {
            if (data[i].user.login === username) {
                exist = true
            }
        }

        // Conditional for pull request innerHTML
        if (exist === true) {
            document.getElementById(`${projectsID}2`).innerHTML += `
            <p>Pull request with comments <a href="${filteredPR[0].html_url}" target="_blank">here</a>.</p>
            `
        } if (exist === false) {
            document.getElementById(`${projectsID}2`).innerHTML += `
            <p>Pull request unavailable.</p>
            `
        }
        
        // Fetch Comments - Commented out because I didn't want them, but left it here to show how to do it
        // pullComments(filteredPR, projectsID);

    })
}

// Fetch Comments - Commented out because I didn't want them, but left it here to show how to do it
// const pullComments = (pullRequests, projectsID) => {
//     for (let i = 0; i < pullRequests.length; i++) {
//     fetch(pullRequests[0].review_comments_url, options)
//     .then(res => res.json())
//     .then(data => {
//         document.getElementById(`${projectsID}2`).innerHTML += `
//         <br>
//         <p>Review comments:</p>
//         `
//         for (let i = 0; i < data.length; i++) {
//             if (data[i].user.login !== username) {
//             document.getElementById(`${projectsID}2`).innerHTML += `
//             <ul>
//             <li>${data[i].body}</li>
//             </ul>
//             `
//         }
//         }
//     })
//     }
// }

getProjects();
