const repoURL = 'https://api.github.com/users/KaraHowes/repos'




fetch(repoURL)
.then((response)=>{
return response.json()
})
.then((data)=>{
    console.log(data)
    projects.innerHTML = `The name of your first project was ${data[0].name}`
    
    const forkedProjects = data.filter(repo => repo.fork)
    
    forkedProjects.forEach((forkName)=> {
    projects.innerHTML += `<p> forked projects: ${forkName.name}</p>`
    
})
}

   //repo.forEach((reponames) => {
    //projects.innerHTML += `<p> Project name: ${reponames.name}</p>`
   //});



).catch((error) => console.error(error))
.then(() => console.log('Request finished'));