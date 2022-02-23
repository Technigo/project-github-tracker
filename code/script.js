const chart = document.getElementById('chart')
const projects = document.getElementById('projects')
const avatar = document.getElementById('avatar')
const API_REPOS = 'https://api.github.com/users/sieurin/repos'
const API_USER = 'https://api.github.com/users/sieurin'

const API_TOKEN = TOKEN || process.env.API_KEY;

console.log(TOKEN)

const options = {
	method: 'GET',
  headers: {
		Authorization: `token ${API_TOKEN}`  // my token
  }
}

fetch(API_USER, options) // options object is passed as 2nd argument to fetch() function.
	.then(res => res.json())
	
	.then((json) => {
		console.log(json)
		avatar.innerHTML += `
		<img scr="${json.avatar_url}" alt="avatar">
		<h2>${json.login}</h2>
		`
		})
	
fetch(API_REPOS, options) // options object is passed as 2nd argument to fetch() function.
	.then(res => res.json())
	
	.then((json) => {
		const filterProjects = json.filter((project) => {
		return project.fork === true && project.name.startsWith('project'); 
		})

		// fetch all information for each project
		filterProjects.forEach((project) => {

			// print out the project name, branch, latest push, url
			projects.innerHTML += `
			<div class ="projects" id=${project.name}>
				<h1>${project.name}</h1>
				<h2>${project.default_branch}</h2>
				<h3>${project.pushed_at}</h3>
				<h4>${project.git_url}</h4>
			<div>
			`

			// fetch all the pull requests and print it out
			const reponame = project.name
			const API_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls?per_page=100`
			fetch(API_PR, options) // options object is passed as 2nd argument to fetch() function.
			.then(res => res.json())
			
			.then((json) => {	
				const filteredPR = json.filter((PR) => {
				return PR.user.login === 'sieurin'
				// print out pull requests
				})

			// fetch all the commits and print it out
			const API_COMMITS = `https://api.github.com/repos/sieurin/${reponame}/commits`
			fetch(API_COMMITS, options)
			.then(res => res.json())
			
			.then((json) => {	
				const singleProject = document.getElementById(project.name)
				singleProject.innerHTML += `<h4>Commits made for this project: ${json.length}</h4>`
				})
				console.log(json)
			})
		})		
			console.log(filterProjects)

	}) 




