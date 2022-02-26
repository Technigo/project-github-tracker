// DOM-selectors stored as variables
const container = document.getElementById('container')


// global variables
const username = 'mathildakarlsson'
let reponame = ''
const API_REPOS = `https://api.github.com/users/${username}/repos`


//Fetch 1

const getRepos = () => { 

    fetch(API_REPOS)
    .then(res => res.json())
    .then(data => {
        
    const filteredRepos = data.filter((repo) => repo.fork && repo.name.startsWith('project'))
   
    filteredRepos.forEach((repo) => {
        container.innerHTML += `
          <div class="repos" id=${repo.id}>
            <p>${repo.name}</p>
          </div>
        `
        // console.log(filteredRepos)
    })
    getPullRequests(filteredRepos)
})




//Fetch 2
const API_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`
const getPullRequests = (repos) => { 
    
    repos.forEach(repo => { 
        fetch(API_PR)
        .then(res => res.json())
        .then(data => {
            
            const myPullRequests = data.find((pull) => pull.user.login === repo.owner.login)
            if (myPullRequests) {
                getCommits(myPullRequests.commits_url, repo.name)
            } else {
                document.getElementById(`${repo.name}`).innerHTML += `
                <p>Is this working? </p>
                `
            }
        })
    })
}
}

        getRepos()



        //         const myCommitsURL = myPullRequests.commits_url
        //             console.log(myCommitsURL)
        //         })
        //     })
        
        //     const getCommits = (myCommitsURL, myRepo) => {
            //         fetch (myCommitsURL)
            //         .then((res) => res.json())
            //         .then(data => {
                //             document.getElementById('commit-${myRepo}').innerHTML += [data.length]
                //         })
                //     }
                //         // data.forEach(repo => {
                    //         //     document.getElementById('container').innerHTML += `
                    //         //       <div class="repoPR">
                    //         //         <p>${repo.name}</p>
                    //         //       </div>
                    //         //     `
                    //        // })
                    //     }
                    
                    // getPullRequests()
                    
                    //closing brackets
                    