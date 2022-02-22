const projects = document.getElementById('projects')
const profile = document.getElementById('profile')
const repos = document.getElementById('repos')

const username = 'StephannieMedenilla'
const USER_PROFILE = `https://api.github.com/users/SteppbySteph`
const USER_REPO = `https://api.github.com/users/SteppbySteph/repos`



const GITHUB_TOKEN = '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'
const options = {
    method: 'GET',
    headers: {
          Authorization: `token ${GITHUB_TOKEN}`
    }
}    


//----USER NAME & PROFILE----//

const getProfile = () =>{
    fetch(USER_PROFILE, options)
        .then(res => res.json())
        .then(data => {
            //console.log('user', data)

            const user = data.name
            const avatar = data.avatar_url
            profile.innerHTML += `
              <h1>Username: ${user}</h1>
              <img class="avatar" src="${avatar}">
             `
            
         }) 
 }

getProfile()


 //----FETCHING ALL REPOS----//
// const getRepos = () => {
//     fetch(USER_REPO, options)
//         .then(res => res.json())
//         .then(data => {
//            console.log('repos', data)
          
//            forkedRepos = data.filter((repo) => repo.name.startsWith('project-'))
//            forkedRepos.forEach((repo) => {
            
//             const repoName = repo.name
//             projects.innerHTML += `
//             <h1>Forked repo:${repoName}</h1>
//             <p>description </p>
//             ` 
//             })
//             getPullRequests(forkedRepos)
//             const getPullRequests = (repos) => {
//                 const USER_PR = `https://api.github.com/repos/Technigo/${repoName}/pulls?per_page=100`
//                 forkedRepos.forEach(repo => {
//                     fetch(USER_PR, options)
//                     .then(res => res.json())
//                     .then(data => {
//                         console.log('PR', data)
              
//                     })
                
//     })
// }

const getRepos = () => {
    fetch(USER_REPO, options)
        .then(res => res.json())
        .then(data => {
            console.log('repos', data)

            // Creating constsant for my filtered repos
            forkedRepos = data.filter((repo) => repo.name.startsWith('project-'))

            // forEach function to create HTML elements & pull requests
            forkedRepos.forEach((repo) => {
                
                // Getting Repo Name
                repoName = repo.name;


                // Getting Most Recent Push Date
                pushDate = repo.pushed_at.substr(0, 10)

                //Getting the Default Branch
                defaultBranch = repo.default_branch

                //Getting the URL of the repo
                urlRepo = repo.html_url

                // Step: Find the necessary info and add it to your innerHTML section below:

                // Creating Project InnerHTML
                projects.innerHTML += `
                <h1>Forked repo:${repoName}</h1>
                <p>Most recent push date: ${pushDate}</p>
                <p>Name of default branch: ${defaultBranch}</p>
                <p>URL to the Github repo: <a href="${urlRepo}">${urlRepo}</a></p>
                <p id="commit-${repo.name}">Number of commits: </p>
                `
                
                // Fetch for all pull requests
                const USER_NAME = repo.owner.login
                const USER_PR = `https://api.github.com/repos/Technigo/${repoName}/pulls?per_page=100`;
                fetch(USER_PR, options)
                    .then(res => res.json())
                    .then(pullRequests => {
                    //console.log('PR', data)
                        const myPR = pullRequests.find((pull) =>
                            pull.user.login === repo.owner.login
                            )
                        console.log(myPR)

                        if(myPR) {
                            getCommitNr(myPR, repo.name)
                        } else {
                            document.getElementById(`commit-${repo.name}`).innerHTML += '0'
                        }

                        // pull.forEach((pull) => {
                        //     if (pull.user.login === repo.owner.login) {
                        //         console.log('step pull', pull)
                        //     }
                        // })

                    })
                    //console.log('PR user', )
                    //console.log('My pull requests', myPR)

            })

        })

    }

    const getCommitNr = (myPull, myRepoName) =>{
        fetch(myPull.commits_url)
            .then(res => res.json())
            .then((commit) => {
                document.getElementById(`commit-${myRepoName}`).innerHTML += commit.length
            })

            
    }

                // Here you need to filter your data to only include your own pull requests
                // After you have a filtered list of your pull requests, you need to add them to your innerHTML section above

                // Correct - you don't need to make a new fetch for every thing you need. Some of these fetches will include multiple data

                // I have one function which builds the header which includes my username and avatar, just like you.
                // It makes sense to make it as one function because it doesn't need to iterate

                // For the project sections, where you need to add information from mulitple fetches into the same "individual project block" (i don't know what to call it)
                // It makes better sense to keep it inside the same function / or inside the same "forEach" or "for" loop

        
            
            // const commitURL = repo.commits_url
            // console.log('commitURL', commitURL)
            // fetch(commitURL, options)
            //     .then(res => res.json())
            //     .then(data => {
            //         console.log('commits', data)        
            //     })
            
        
        


getRepos()

 //----FETCHING ALL PULL REQUESTS----//


//  These are the requirements for the project:

// A list of all repos that are forked from Technigo (You completed this! Yay)
// Your username and profile picture (You completed this! Yay)
// Most recent update (push) for each repo (I understood this as the date of the last push) (You completed this! Yay)
// Name of your default branch for each repo (I understood this as the name of the repo) (You completed this! Yay)


// URL to the actual github repo. You can find that in your USER_REPO fetch (repoLink = repo.html_url), insert in e.g. line 84
// Yes. for every repo which is why it should be inside the forEach loop.

// Number of commits for each repo. You need to do a fetch for this one inside your forEach loop. The url for this is repo.git_commits_url
//  ---- This will return an array with all of your commits for each repo. To get the number of commits, you can use array.length (replace array with the name of your json data)

// Last steps: Chart.js (I don't know anything about this, just started)

// Media Queries in CSS

// Before I leave:

// I'm going for blue too. No more haha.

// If you want to see the information I included in mine, click here:
// https://github-tracker-week7.netlify.app/
// The only thing I'm missing is the chart & media queries - so we're almost just as far as each other

// The link to my github repo is here, if you want to read the code (if you get stuck)
// https://github.com/michaelchangdk/project-github-tracker


















// pushDate = repo.pushed_at.substr(0, 10)

// This section is for fun :) >>>>>>
// pushYear = pushDate.substr(0, 4)
// pushMonthRaw = pushDate.substr(5, 2)
// pushDay = pushDate.substr(8, 2)
// console.log(pushYear)
// console.log(pushDate)

// if (pushDay < 10) {
//     pushDay = pushDay.replace("0", "")
// }