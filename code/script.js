const projects = document.getElementById('projects')
const API_REPOS = 'https://api.github.com/users/nadialefebvre/repos'

const options = {
    method: 'GET',
    headers: {
        Authorization: 'token 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'
    }
}

fetch(API_REPOS, options) // options object is passed as 2nd argument to fetch() function.
    .then(res => res.json())
    .then(data => {
        console.log(data)
        projects.innerHTML = `
            <img src="${data[0].owner.avatar_url}">
            <p>Username: ${data[0].owner.login}</p>
        `
        const filteredRepos = data.filter(repo => repo.fork === true && repo.name.startsWith('project'))
        console.log(filteredRepos)
        filteredRepos.forEach((repo) => {
            fetch(`https://api.github.com/repos/nadialefebvre/${repo.name}`, options)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    console.log(repo.pushed_at)
                    const options = { day: 'numeric', month: 'long', year: 'numeric' }
                    projects.innerHTML += `
                    <div class="repo" id=${repo.name}>
                        <p>Repo name: ${repo.name}</p>
                        <p>Repo URL: ${repo.html_url}</p>
                        <p>Default branch: ${repo.default_branch}</p>
                        <p>Repo last push: ${new Date(repo.pushed_at).toLocaleDateString('en-GB', options)}</p>
                    </div>
                `
                })
            fetch(`https://api.github.com/repos/nadialefebvre/${repo.name}/commits`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    console.log(data.length)
                    document.getElementById(`${repo.name}`).innerHTML += `
                        <p>Number of commits: ${data.length}</p>
                    `
                })
        })
    })
