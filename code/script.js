const USER = 'JessicaNordahl';
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const projectsContainer = document.getElementById('projects');

/* const getRepos = () => {
    fetch(REPOS_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        //data.forEach(repo => console.log(repo.name))
    const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-')=== true)
    forkedRepos.forEach(repo => console.log(repo.name))
    });

};

getRepos(); */ //From the video with Jennie

const fetchRepositories = () => {
    fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
        const myTechnigo = data.filter((repo => 
            repo.name.includes("project-") && 
            repo.fork)
            );

            myTechnigo.forEach((repo => {
                projectsContainer.innerHTML += /*html*/`
                 <div>  
                    <a href="${repo.html_url}">${repo.name} with default branch ${repo.default_branch}</a>
                        <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
                        <p id="commit-${repo.name}">Commits amount: </p>
                 </div>
                `;
            
            }));
        fetchPullRequests(myTechnigo);    

    });
};

const fetchPullRequests = (allRepositories) => /*html*/{
  console.log('allRepositories', allRepositories);
     allRepositories.forEach(repo => {
        fetch(repo)
    });
}

fetchRepositories(); 

//Above is according to M video


