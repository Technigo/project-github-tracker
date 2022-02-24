// DOM SELECTORS


// GLOBAL VARIABLES
const username = 'joannalodell19'
const testUser = 'molbimien'
let filteredRepo = [] // Probably not needed

// let reponame = ''
const API_URL = `https://api.github.com/users/${username}/repos`
const API_PROFILE = `https://api.github.com/users/${username}`

const API_TOKEN = TOKEN || process.env.API_KEY;

const options = {
    method: 'GET',
    headers: {
        Authorization: `token ${API_TOKEN}`
    }
}

const profilePic = () => {
    fetch(API_PROFILE)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            picture = data.avatar_url
    let profilePicture =    `<div class = "photobox">
                            <p>${username}</p>
                                <img class = "photo" src="${picture}" />
                            </div>`;
    return (projects.innerHTML = profilePicture)
})
}

profilePic() 

const getRepos = () => {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        console.log('unfiltered data', data)

        const forkedRepos = data.filter(repo => repo.fork = true)
        console.log('data filtered by forks', forkedRepos)

        console.log(data[1].name)

        filteredRepo = forkedRepos.filter(repo => repo.name.startsWith('project-') === true)
        console.log('data filtered on projects', filteredRepo)

        filteredRepo.forEach(repo => {
            console.log(repo.commits_url)
            document.getElementById('projects').innerHTML += `
            <div class="repo" id=${repo.name}>
                <h2>${repo.name}</h2>
                <h2><a href="${repo.html_url}">GitHub link</a></h2>
                <h2>Default branch: ${repo.default_branch}</h2>
                <h2>Latest push: ${repo.pushed_at}</h2>
            </div>
            `
            
            // fetch(repo.commits_url, options)
            // .then(res => res.json())
            // .then(data => {
            //     console.log('Hello')
            //     then.request(`/repos/${username}/${repo}/commits`, {})
            // })
        })
        

        


        // const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`

        // fetch(API_URL_PR, options)
        // .then(res => res.json())
        // .then(data2 => {
        //     console.log(data2)


        //     const allPRs = data2.filter(item => item.head.user.login === testUser)
        //     console.log()

        //     const COMMENTS_URL = allPRs[0].commits_url
        //     fetch(COMMENTS_URL)
        //     .then(res => res.json())
        //     .then(data3 => console.log(data3))
        // })

    })
}



getRepos()
