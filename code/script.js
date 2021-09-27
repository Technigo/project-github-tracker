//Remember to pass along your filtered repos as an argument when
//you are calling this function
const USER = 'MariaThomasson'
const REPOS_API = `https://api.github.com/users/MariaThomasson/repos`
const projectsContainer = document.getElementById('projects')

const getRepos = () => {
	fetch(REPOS_API)
	.then(response => response.json())
	.then(data => {
		const forkedRepos = data.filter(repo => repo.name.startsWith('project-'))
		forkedRepos.forEach(repo => projectsContainer.innerHTML += `<h3>${repo.name}</h3>`)
		
		})
	

	}
	getRepos()