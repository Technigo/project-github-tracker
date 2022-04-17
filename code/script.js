const avatar = document.getElementById('avatar')
const projects = document.getElementById('projects')
const userInfo = document.getElementById('userinfo')
const username = 'Katarina821'

const API_URL_REPOS = `https://api.github.com/users/${username}/repos`
const API_URL_ID = `https://api.github.com/users/${username}`



const API_TOKEN = TOKEN || process.env.API_KEY;

const options = {
    method: 'GET',
    headers: {
       // Authorization: `token ${API_TOKEN}`
    }
}



//First function, fetches userdata and displays them in userinfo
const getIntro = () => {
	fetch(API_URL_ID, options).then(res => res.json()).then(data => {
		userInfo.innerHTML = `<h2>${data.name}</h2><a href=${data.html_url}> <h2> <img class="logo"src="./GitHubMark.png"> ${data.login} </h2></a>`
		avatar.src = data.avatar_url
    console.log(data.html_url)
		getRepos()
	})
}
//second function, fetches my repos and filters the ones that are forked and stars with project. Displays info.
const getRepos = () => {
	fetch(API_URL_REPOS, options).then(res => res.json()).then(data => {
		console.log(data)
		const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith("project-"))
		console.log(forkedRepos)
		forkedRepos.forEach((repo) => projects.innerHTML += `
      <div class="repo"> 
      <img class="logo"src="./GitHubMark.png">
       <a href="${repo.html_url}"><h3>${repo.name }</h3></a>
        <h4>Defaultbranch  ${repo.default_branch}</h4> 
        <p> Most resent update: ${new Date(repo.updated_at).toLocaleDateString("en-UK")}</p>
        <p id="${repo.name}">Commits amount: </p>
      </div>
      `)
		getPullRequests(forkedRepos)
		drawChart(forkedRepos.length)//Evokes chartfunction with total amount of forked repos as argument
	})
}
//third function Fetches all techningos pullrequests and filters the one done by me
const getPullRequests = (forkedRepos) => {
	forkedRepos.forEach(repo => {
		fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`, options).then(res => res.json()).then(data => {
			const myPullRequests = data.filter(item => item.user.login === repo.owner.login)
			console.log(myPullRequests)
      //conditional statement to sort out the repos that have a pullrequest done 
     // if pullrequest is done, evoke fetch commit function
			if (myPullRequests.length > 0) {
				fetchCommits(myPullRequests[0].commits_url, repo.name)
      //if not dipslay message with info
			} else {
				document.getElementById(`${repo.name}`).innerHTML = `No pull request done, commits not avalible`
			}
		})
	})
}
// 4th function, fetches the ammount of commits
const fetchCommits = (myCommitsUrl, myRepoName) => {
	fetch(myCommitsUrl).then((res) => res.json()).then((data) => {
		document.getElementById(`${myRepoName}`).innerHTML += data.length
	})
}

getIntro()





 