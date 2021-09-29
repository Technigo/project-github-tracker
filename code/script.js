const USER = 'hejmaria'
const REPOS_URL = `http://api.github.com/users/${USER}/repos`;

const projectContainer = document.getElementById('projects');



const getRepos = () => {
    fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
    console.log('The data', data)

    data.forEach (repo => console.log(repo.name))

        const forkedRepos = data.filter(
            (repo) => repo.name.includes('project-') && repo.fork
            );
        
        forkedRepos.forEach((repo) => {
            projectContainer.innerHTML += `
            <h3>${repo.name}</h3>`;

        });

        forkedRepos.forEach((repo) => {
            projectContainer.innerHTML += `
            <div>
                <a href="${repo.html_url}">${repo.name} with defalut branch ${repo.default_branch}</a>.
                <p> Recent push: ${new Date(repo.pushed_at).toDateString()} </p>

                <p id="commit-${repo.name}>Commits ammount: </p>
            </div> 
            `
        })
        
        //make into a div or something to style them
        drawChart(forkedRepos.length)
    });

};

getRepos()