//DOM SELECTORS
const userSection = document.getElementById("user-section")

//GLOBAL VARIABLES
const options = {
	method: 'GET',
	headers: {
		Authorization: `token xxx`
	},
};
const REPO_API = "https://api.github.com/users/nehrwein/repos";
const totalProjects = 19;

//FUNCTIONS


const getRepos = () => {
	fetch(REPO_API, options)
		.then((res) => res.json())
		.then((data) => {

			//forkedRepos shows a list of all repos that are forked ones from Technigo
			const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
			
			//My name, username and profile picture
			const userName = data[0].owner.login
			const profilePic = data[0].owner.avatar_url

			userSection.innerHTML += /* html */`
				<div class="userImageDiv">
					<img class="userImage" id="userImage" src="${profilePic}" alt="Github Avatar">
				</div>
				<div class="userTextDiv">
					<p class="myName">Birgit</p>
					<p class="userName">${userName}</p>
				</div>	
			`
			drawProjects(forkedRepos);	
			drawChart(forkedRepos.length)
		})
}

const drawProjects = (forkedRepositories) => {
	forkedRepositories.forEach((repo) => {
		document.getElementById('projects-section').innerHTML += `
			<div class="projects-div" id="projects">
				<a href="${repo.html_url}">${repo.name}</a>
				<p>default branch: ${repo.default_branch}</p>
				<p>Last push: ${new Date(repo.pushed_at).toDateString([], { Style: "short" })}</p>
				<p class="noOfCommits" id="commit-${repo.name}">Commits: 0</p>
        <ul id="commitMessages-${repo.name}"></ul>
			</div>	
		`;

		getCommits(forkedRepositories, repo.name);
	});

	forkedRepositories.forEach((repo) => {
		document
			.getElementById(`commit-${repo.name}`)
			.addEventListener('click', () => {
				document
					.getElementById(`commitMessages-${repo.name}`)
					.classList.toggle('active');
			});
	});
};

const getCommits = (filteredArray, myRepoName) => {
	console.log('Reponame: ', myRepoName)
	//First make a new array with all the needed APIs (found under commit_urls in forkedRepos)
	const allCommitUrls = filteredArray.map(repo => repo.commits_url)
	
	allCommitUrls.forEach(commitAPI => {
		//the URLs end with {/sha}, therefore the last 6 chars need to be sliced
		commitAPI = commitAPI.slice(0, -6)

		//now the URLs can be passed on to get data about number and content of commits 
		fetch(commitAPI, options)
			.then((res) => res.json())
			.then((data) => {
				const authorCommits = data.filter(commits => commits.author.login === 'nehrwein' && commits.url.includes(myRepoName))
				
        if (authorCommits.length > 0) {
          document.getElementById(`commit-${myRepoName}`).innerHTML = `
					Commits: ${authorCommits.length}
          <i class="fas fa-bars"></i>
          `
          authorCommits.forEach(element => {
            document.getElementById(`commitMessages-${myRepoName}`).innerHTML += `
              <li>${element.commit.message}</li>
            `
          })
				} 
			})		
	});
}



getRepos();

