const options = {
    method: 'GET', 
    headers: {
       Authorization: `token ${token}`
    }
}


const USER = 'hejmaria'
const REPOS_URL = `http://api.github.com/users/${USER}/repos`

const projectContainer = document.getElementById('projects');


const fetchRepositories = () => {
    fetch (REPOS_URL, options) //only for the lecture OPTIONS
    .then (res => res.json())
    .then(data => {
    console.log(data)
        const technigoRepo = data.filter(
            (repo) => repo.name.includes('project-') && repo.fork
            );

            technigoRepo.forEach(repo => {(repo) => {
                projectContainer.innerHTML += `
                <div>
                    <a href="${repo.html.url}">${repo.name} with defalut branch ${repo.default_branch}</a>
                    <p> Recent push: ${new Date()} </p>

                    <p id="${repo.name}>Commits ammount:</p>
                </div> 
                `
            }
            })
        };


const fetchPullrequest = (singleRepo) => {
KOLLA MAKS KOD

}

const fetchPullrequestArray = (allRepositories) => {
    allRepositories.forEach((repo) => {
        fetch(``)
        .then((res) => res.json ())
        .then((data) => {
            console.log (`mother repo ${repo.name}`, data);
        const myPullrequest = data.find( //instead of filter, finding you the sandwich without the bag
            (pull) => pull.user.login === pull.owner.login
            ;)

        })
    })


    const fetchCommits = (myCommitsUrl) => {
            fetch(myCommitsUrl)
            .then((res) => res.json ())
            .then((data) => {
        //we have data but need to inject it
                document.getElementById(`commit- ${repo.name}`)


    }
}    

fetchRepositories();




/////////////////////////////////////////////////

const USER = 'hejmaria'
const REPOS_URL = `http://api.github.com/users/${USER}/repos`

const getRepos = () => {
    fetch (REPOS_URL)
    .then (res => res.json())
    .then(data => {
    console.log(data)
    //data.forEach (repo => console.log(repo.name))
        const forkedRepos = data.fillter(repo => repo.fork && repo.name.startsWith('procet-'))
        forkedRepos.forEach(repo => console.log(repo.name))
        forkedRepos.forEach(repo => projectsContainer.inneHTML += `<h3>${repo.name}</h3>`)
        //make into a div or something to style them
        drawChart(forkedRepos.length)
    });

}

const drawChart = (amount) =>

