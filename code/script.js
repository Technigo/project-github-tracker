const USER = 'KaraHowes'
const repoURL = `https://api.github.com/users/${USER}/repos`
const projectsContainer = document.getElementById('projects')



fetch(repoURL)
.then((response)=>{
return response.json()
})
.then((data)=>{
    console.log(data)
    projectsContainer.innerHTML = `The name of your first project was ${data[0].name}`
    
    const forkedProjects = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
    
    forkedProjects.forEach((forkName)=> {
    projectsContainer.innerHTML += `<h3>${forkName.name}</h3>`
    
})
}

   //repo.forEach((reponames) => {
    //projects.innerHTML += `<p> Project name: ${reponames.name}</p>`
   //});



).catch((error) => console.error(error))
.then(() => console.log('Request finished'));