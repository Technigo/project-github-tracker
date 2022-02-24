
//DOM SELECTORS
const username = 'HWallberg'
const testUser = //Fyll i något här

//let reponame

//REPO API
const API_REPOS = `https://api.github.com/users/${username}/repos`


fetch(API_REPOS)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        
        reponame = data[1].name

        const API_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`
        
        fetch(API_PR)
            .then(res => res.json())
            .then(data => {
                console.log(data2)

        const allPRs = data2.filter(item => item.head.user.login === testUser)
        console.log()

        const API_COMMENTS = allPRs[0].commits_url
        fetch(API_COMMENTS)
            .then(res => res.json())
            .then(data3 => console.log(data3))
    })

})



//FÖrsökt skriva som E

const commits = pullRequest[0].commits_url

getCommits(commits)
    