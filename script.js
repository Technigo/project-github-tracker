const USER = "jsfrulle";
const API_Projects = `https://api.github.com/users/${USER}/repos`;
const API_USER = `https://api.github.com/users/${USER}`;

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

const getPull = (repos) => {
	repos.forEach((repo) => {
		fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls`)
			.then((res) => res.json())
			.then((data) => {
				const pull = data.find((pull) => pull.user.login === repo.owner.login);

				document.getElementById("projects").innerHTML += `
							
							<div class="repon">
							<div id=repoiconname> 
							<i class="far fa-bookmark"></i>
							<a id="textrepo" href=${repo.html_url} target="_blank"> ${repo.name}</a></div>
							

							<div id="push">
							<i class="far fa-clock"></i> <p>pushed:${new Date(
								repo.pushed_at
							).toDateString()}</p>
							</div>
							<div class="content" id=${repo.name}>

							<div id="repobranch"> <i class="fas fa-code-branch"></i><p> ${
								repo.default_branch
							} </p></div>
							
							</div>
							`;

				getComment(repo.name, pull.review_comments_url);
				getCommit(repo.name, pull.commits_url);
				console.log(pull);
			});
	});
};

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

const getCommit = (name, url) => {
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			document.getElementById(name).innerHTML += `
			
			
			<div id="commitss">
			<i class="fas fa-file-upload"></i>
			<p>commits:${data.length}</p>
			</div>
			
			
	`;
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
