const commits_url = data(repo.commits_url)
getCommits(commits_url)  


const getCommits = (commits_url) =>{

    commits_url.forEach((repo)=> {

        fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls/${pull.number}/commits`)
        .then((response)=> response.json())
        .then((data)=>{
            console.log(data)
        })

    })

}