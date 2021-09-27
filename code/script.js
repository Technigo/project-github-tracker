const REPO_API = "https://api.github.com/users/nehrwein/repos";


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


			getPushBranchURL(forkedRepos);
			getCommits(forkedRepos);
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
	//Number of commit messages for each repo
	//First make a new array with all the needed APIs of the commit_urls
	const allCommitUrls = filteredArray.map(repo => repo.commits_url)
	console.log('Here is the array with all the commits: ', allCommitUrls)
}

getRepos();

