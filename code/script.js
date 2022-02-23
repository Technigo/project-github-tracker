const username = 'EmmaaBerg'
const API_URL_REPOS = `https://api.github.com/users/${username}/repos`

fetch(API_URL_REPOS)
    .then((resp) => resp.json())
    .then((allRepos) => {
        console.log(allRepos)

        //A function for filtering out the forked projects from technigo.
        //Repo is the "name for each object" in the array. Fork and name are two properties within
        // the object 
        const forkedRepos = allRepos.filter((repo) => repo.fork && repo.name.startsWith('project-'))
        console.log(forkedRepos);
        pullRequests(forkedRepos);
    })

const pullRequests = (forkedRepos) => {
    forkedRepos.forEach(repo => {
        fetch('https://api.github.com/repos/Technigo/' + repo.name + '/pulls')
            .then(res => res.json())
            .then(pullReqs => {
                //console.log(pullReqs);// loop foeach data är en array
                pullReqs.forEach(pull => {
                    if (pull.user.login === username){
                        console.log(pull)
                        
                    }
                })
            })
    })
}