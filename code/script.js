const repoURL = 'https://api.github.com/users/KaraHowes/repos'


fetch(repoURL)
.then((response)=>{
return response.json()
})
.then((forked)=>{
    console.log(forked)
    projects.innerHTML = `The name of your first project was ${forked[0].name}`
    const forkedProjects = forked.filter(()=>)

    

   //repo.forEach(reponames => {
    //projects.innerHTML += `<p> Project name: ${reponames.name}</p>`
   //});

})

.catch((error) => console.error(error))
.then(() => console.log('Request finished'));