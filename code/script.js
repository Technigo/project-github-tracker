// DOM-selectors
const chart = document.getElementById('chart')
const projects = document.getElementById('projects')
const avatar = document.getElementById('avatar')
const API_REPOS = 'https://api.github.com/users/sieurin/repos'
const API_USER = 'https://api.github.com/users/sieurin'
const API_TOKEN = TOKEN || process.env.API_KEY;

// my token
const options = {
	method: 'GET',
  headers: {
		Authorization: `token ${API_TOKEN}`  
  }
}

fetch(API_USER, options) 
	.then(res => res.json())
	
	.then((json) => {
		avatar.innerHTML += `
		<div class="header">
			<img src="${json.avatar_url}" alt= "avatar">
			<p class="user-name">${json.login}</p>
		</div>
		<p class="bio"><span>HI!</span> ${json.bio}</p>
		`
		})

// fetch all information for each project

fetch(API_REPOS, options) 
	.then(res => res.json())
	
	.then((json) => {
		const filterProjects = json.filter((project) => {
		return project.fork === true && project.name.startsWith('project'); 
		})

		myChart(filterProjects.length);

		filterProjects.forEach((project) => {
		
		//toggle function that add the class active and 
		function toggle() {
			this.classList.toggle("active")
		}

			// print out the project name, branch, latest push, url
			projects.innerHTML += `
			<div class="projects" id=${project.name}>
				<div class="project-info">
					<div class="projects-left">
						<p class="pushed-at">last push <br>${new Date(project.pushed_at).toLocaleDateString('en-GB', options)}</p>
					</div>
					<p class="project-name">${project.name}</p>
					<div class="projects-right">
						<p class="branch-name">${project.default_branch} branch</p>
						<a class="project-url" href="${project.html_url}" alt="link to git" target="_blank">link to project</a>
					</div>
					<div class="test"> <h1>TESTAR LITE</h1> </div>
				</div>
			<div>
			`

		// Calls a function which will be executed when the element, project section, is clicked.
		document.getElementById(`${project.name}`).onclick = toggle

			// fetch all the pull requests and print them out
			const reponame = project.name
			const API_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls?per_page=100`
			fetch(API_PR, options) 
			.then(res => res.json())
			
			.then((json) => {	
				const filteredPR = json.filter((PR) => {
				return PR.user.login === 'sieurin'
				})
			
			console.log(filteredPR)
			
			const singleProject = document.getElementById(project.name)
			singleProject.innerHTML += `<p class="pull-requests">Pull requests: ${filteredPR.length}</p>`

			// fetch all the commits and print them out
			const API_COMMITS = `https://api.github.com/repos/sieurin/${reponame}/commits`
			fetch(API_COMMITS, options)
			.then(res => res.json())
			
			.then((json) => {	
				//const singleProject = document.getElementById(project.name)
				singleProject.innerHTML += `<p class="commits">Commits: ${json.length}</p>`
				})
			})
		})		
		console.log(filterProjects)

	}) 




