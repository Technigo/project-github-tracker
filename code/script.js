//DOM SELECTORS
const userSection = document.getElementById("user-section")

//GLOBAL VARIABLES
const REPO_API = "https://api.github.com/users/nehrwein/repos";
const totalProjects = 19;

//FUNCTIONS
const getRepos = () => {
	fetch(REPO_API)
		.then((res) => res.json())
		.then((data) => {

			//forkedRepos shows a list of all repos that are forked ones from Technigo
			const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
			console.log('List of forked Repos: ', forkedRepos)
			
			//My username and profile picture
			const userName = data[0].owner.login
			const profilePic = data[0].owner.avatar_url
			console.log('Username & Pic: ', userName, profilePic)
			userSection.innerHTML = `
				<img id="userImage" src="${profilePic}" alt="Github Avatar">
			`


			getPushBranchURL(forkedRepos);
			getCommits(forkedRepos);
			drawChart(forkedRepos.length)
		})
}

const getPushBranchURL = (filteredArray) => {
	//Most recent update (push) for each repo
	console.log('Most recent update (push) for each repo:')
	filteredArray.forEach(repo => {
		console.log(repo.pushed_at)
	});

	//Name of my default branch for each repo
	console.log('Name of my default branch for each repo:')
	filteredArray.forEach(repo => {
		console.log(repo.default_branch)
	});	

	//URL to the actual GitHub repo
	console.log('URL to the actual GitHub repo:')
	filteredArray.forEach(repo => {
		console.log(repo.html_url)
	});		
}

const getCommits = (filteredArray) => {
	
	//First make a new array with all the needed APIs (found under commit_urls in forkedRepos)
	const allCommitUrls = filteredArray.map(repo => repo.commits_url)
	console.log('Here is the array with all the commits: ', allCommitUrls)

	//the URLs end with {/sha}, therefore the last 6 chars need to be sliced
	allCommitUrls.forEach(commitAPI => {
		commitAPI = commitAPI.slice(0, -6)
		console.log(commitAPI)

		//now the URLs can be passed on to get data about number and content of commits 
		fetch(commitAPI)
			.then((res) => res.json())
			.then((data) => {
				const authorCommits = data.filter(commits => commits.author.login === 'nehrwein')
				//Number of commit messages for each repo
				const noOfCommits = authorCommits.length
				console.log('These are my commits: ',authorCommits)
				console.log('Number of commits: ', noOfCommits)
				authorCommits.forEach(entry => {
					const textOfCommit = entry.commit.message
					console.log('This is the commit-text: ', textOfCommit)
				})   
			})
	});
}


getRepos();

