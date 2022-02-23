const username = "lisabergstrom";
const API_REPOS = `https://api.github.com/users/${username}/repos`;
const API_PROFILE = `https://api.github.com/users/${username}`;
const userProfile = document.getElementById("userProfile");
const projects = document.getElementById("projects");

//  T O K E N
const options = {
  method: "GET",
  headers: {
    Authorization: "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",
  },
};

// P R O F I L E
fetch(API_PROFILE, options)
  .then((res) => res.json())
  .then((data) => {
    userProfile.innerHTML += `
                <img src="${data.avatar_url}" class ="pic"></img>
                    <h2>${data.login} </h2>
                    <h2>${data.name} </>
`;
  });

// R E P O S
fetch(API_REPOS, options)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const forkedRepos = data.filter(
      (repo) => repo.fork && repo.name.startsWith("project-")
    );
    console.log(forkedRepos);

    //Gets the PR from the forked repos.
    forkedRepos.forEach((repo) => {
      projects.innerHTML += `
  <div class="repos">
  ${repo.name}
  ${new Date(repo.pushed_at).toLocaleString("sv-SE", { dateStyle: "short" })}
  ${repo.default_branch}
  <p id="commit-${repo.name}">Commits:</p>
  </div>
  `;

      const API_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls`;
      fetch(API_URL, options)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    });
  });
