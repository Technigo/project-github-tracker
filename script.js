const USER = "jsfrulle";
const API_Projects = `https://api.github.com/users/${USER}/repos`;
const API_USER = `https://api.github.com/users/${USER}`;

/* Get all repos */

const getResponse = () => {
  fetch(API_Projects)
    .then((response) => response.json())
    .then((data) => {
      const repos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );

      getPull(repos);
      drawChart(repos.length);
    });
};

getResponse();

/* Get all the pull requests and info like default branch, push, url */

const getPull = (repos) => {
  repos.forEach((repo) => {
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls`)
      .then((res) => res.json())
      .then((data) => {
        const pulls = data.find((pull) => pull.user.login === repo.owner.login);

        document.getElementById("projects").innerHTML += `
							
							<div class="repon">
							<div id=repoiconname> 
							<i class="far fa-bookmark"></i>
							<a id="textrepo" href=${repo.html_url} target="_blank"> ${repo.name}</a>
              </div>
							<div id="push">
							<i class="far fa-clock"></i> 
              <p>
              pushed:${new Date(repo.pushed_at).toDateString()}
              </p>
							</div>
							<div class="content" id=${repo.name}>

							<div id="repobranch"> <i class="fas fa-code-branch"></i><p> ${
                repo.default_branch
              } </p></div>
							
							</div>
							`;

        getComment(repo.name, pulls.review_comments_url);
        getCommit(repo.name, pulls.commits_url);
      });
  });
};

/* get all the comments, problem to get teh information to every project
(forEach dint work for me so need help here), this featur is not mandatory("blue level") */

const getComment = (name, url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById(name).innerHTML += `
			
			<div id="commentss">
			<i class="far fa-comment-alt"></i>
			<p>comments:${data.length}</p>
			</div>
			
	`;
    });
};

/* Get commits here  */

const getCommit = (name, url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.length >= 30) {
        document.getElementById(name).innerHTML += `
			
			
	<div id="commitss">
	<i class="fas fa-file-upload"></i>
	<p>commits: 30+</p>
	</div>
	
	
`;
      } else {
        document.getElementById(name).innerHTML += `
			
			
			<div id="commitss">
			<i class="fas fa-file-upload"></i>
			<p>commits: ${data.length}</p>
			</div>
			
			
	`;
      }
    });
};

/* USER - info & img */

const getUser = () => {
  fetch(API_USER)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("userimg").innerHTML = `

       <img src='${data.avatar_url}' alt='userimg'>
       <h3>${data.login}</h3>
            `;
    });
};

getUser();
