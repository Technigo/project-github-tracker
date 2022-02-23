

const options = {
    method: 'GET',
    headers: {
        Authorization: `token ${API_TOKEN} ` // you need to paste your token over here.
    }
}

fetch('https://api.github.com/users/faypi/repos', options) // options object is passed as 2nd argument to fetch() function.
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        const newData = data.filter((forkedRepos) => forkedRepos.fork == true && forkedRepos.name.startsWith("project-"))
        console.log(newData)
        //am I passing along my filter repos?
        getPullRequests(newData)
    });

//Remember to pass along your filtered repos as an argument when
//you are calling this function

const getPullRequests = (repos) => {
    //Get all the PRs for each project.
    // console.log('my repos follow')
    // console.log(repos)
    repos.forEach(repo => {
        fetch('https://api.github.com/repos/technigo/' + repo.name + '/pulls' + '?per_page=100')
            .then(res => res.json())
            .then(data => {
                //TODO
                //1. Find only the PR that you made by comparing pull.user.login
                // with repo.owner.login
                // console.log(data);
                const myPullRequests = data.filter((myPR) => myPR.user.login == repo.owner.login);
                console.log(myPullRequests);
                //2. Now you're able to get the commits for each repo by using
                // the commits_url as an argument to call another function


                //3. You can also get the comments for each PR by calling
                // another function with the review_comments_url as argument
            })
    })
}

// script.js file
console.log(API_TOKEN); // 'HERE_WILL_BE_YOUR_TOKEN'