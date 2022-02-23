const username = 'joannalodell19'
const testUser = 'molbimien'
// let reponame = ''
const API_URL = `https://api.github.com/users/${username}/repos`

const API_TOKEN = TOKEN || process.env.API_KEY;

const options = {
    method: 'GET',
    headers: {
        Authorization: `token ${API_TOKEN}`
    }
}

fetch(API_URL)
.then(res => res.json())
.then(data => {
    console.log('unfiltered data', data)
    // reponame = data[1].name

    const forkedRepos = data.filter(repo => repo.fork = true)
    console.log('data filtered by forks', forkedRepos)

    console.log(data[1].name)

    const onlyProjectRepos = forkedRepos.filter(repo => repo.name.startsWith('project-') === true)
    console.log('data filtered on projects', onlyProjectRepos)

    const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`

    fetch(API_URL_PR, options)
    .then(res => res.json())
    .then(data2 => {
        console.log(data2)


        // const allPRs = data2.filter(item => item.head.user.login === testUser)
        // console.log()

        // const COMMENTS_URL = allPRs[0].commits_url
        // fetch(COMMENTS_URL)
        // .then(res => res.json())
        // .then(data3 => console.log(data3))
    })
})