const userSection = document.getElementById("user");
const projectSection = document.getElementById("projects");

const API_USER_INFO = "https://api.github.com/users/jessand77";
const API_REPOS = "https://api.github.com/users/jessand77/repos";



// Läs lite här: https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data

const fetchUserInfo = () => {
  fetch(API_USER_INFO)
  .then((response) => response.json())
  .then((user) => {
    console.log(user)
    userSection.innerHTML = '<h2>User info</h2'
    userSection.innerHTML += `<p>User name: ${user.login}</p>`
    userSection.innerHTML += `<img src="${user.avatar_url}" alt="profile picture" />` 
  })
  .catch(err => console.error(err));
}

const fetchRepos = () => {
  fetch(API_REPOS)
  // we ask for the response from the API
  .then((response) => response.json())
  // we say what we want to be done with the response
  .then((repos) => {
    console.log(repos);

    /*
    projectSection.innerHTML = '<h2>Projects</h2>'
    let htmlAllRepos = '<h3>All my projects</h3><ul>'
    repos.forEach((repo) => {
      htmlAllRepos += `<li>${repo.name}</li>`
    });
    htmlAllRepos += '</ul>'
    projectSection.innerHTML += htmlAllRepos


    // Returns an array of the forked repos
    const forkedRepos = repos
      .filter((repo) => repo.fork === true)
      .map((repo) => repo.name);

    console.log(forkedRepos);

    let htmlForkedRepos = '<h3>All forked repos</h3><ul>';
    forkedRepos.forEach((repo) => {
      htmlForkedRepos += `<li>${repo}</li>`
    });
    htmlForkedRepos += '</ul>';

    console.log('Forked repos: ' + htmlForkedRepos)

    projectSection.innerHTML += htmlForkedRepos
    */

    
    // Returns an array of the forked repos from Technigo
    // const reposStartingWithFilter = repos
    //   .filter((repo) => repo.name.startsWith("project"))
    //   .map((repo) => repo.name);

    // console.log(reposStartingWithFilter);

    // let htmlTechnigoRepos = '<h3>Repos forked from Technigo</h3>';
    // reposStartingWithFilter.forEach((repo) => {
    //   htmlTechnigoRepos += `
    //   <div>
    //     <h4>${repo}<h4>
    //     <p>${repo}</p>
    //   </div>
    //   `
    // });

    const getCommits = (repoName) => {  
      fetch('https://api.github.com/repos/jessand77/' + repoName + '/commits')
      .then(res => res.json())
      .then((commits) => {
          console.log(commits);
          const numberOfCommits = commits.map(item => item.commit).length;
          console.log(repoName + ' has ' + numberOfCommits + ' commits.');
          let commitSpan = document.createElement('span');
          commitSpan.innerHTML = `${numberOfCommits}`
          document.getElementById(repoName).appendChild(commitSpan);
          
        })
    } 

    let htmlTechnigoRepos = '<h3>Repos forked from Technigo</h3>';
    
    const technigoRepos = repos.filter((repo) => repo.name.startsWith("project"));

    console.log(`Number of repos forked from Technigo: ${technigoRepos.length}`);

    technigoRepos.forEach((repo) => {
      console.log(repo.name)
      const commits = 4;
      htmlTechnigoRepos += `
      <h4>${repo.name}</h4>
      <p>Most recent update: ${repo.pushed_at}</p>
      <p>Default branch: ${repo.default_branch}</p>
      <p>URL: <a href="${repo.html_url}">${repo.html_url}</a></p>
      <p id=${repo.name}>Number of commits: </p>
      `
      getCommits(repo.name);
    })

    projectSection.innerHTML += htmlTechnigoRepos;  

  });
}


fetchUserInfo();
fetchRepos();
  