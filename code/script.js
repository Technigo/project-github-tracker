const API_all_repos = "https://api.github.com/users/jessand77/repos";

fetch(API_all_repos)
  // we ask for the response from the API
  .then((response) => response.json())
  // we say what we want to be done with the response
  .then((repos) => {
    console.log(repos);

    const forkedRepos = repos
      .filter((repo) => repo.fork === true)
      .map((repo) => repo.name);

    console.log(forkedRepos);

    const reposStartingWithFilter = repos
      .filter((repo) => repo.name.startsWith("project"))
      .map((repo) => repo.name);

    console.log(reposStartingWithFilter);
  });
