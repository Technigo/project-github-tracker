const repoURL = 'https://api.github.com/users/KaraHowes/repos'


fetch(repoURL)
.then((response)=>{
return response.json()
})
.then((repo)=>{
    console.log(repo)
    projects.innerHTML = `The name of your first project was ${repo[0].name}`

   repo.forEach(reponames => {
    projects.innerHTML += `<p> Project name ${reponames.name}</p>`
   });

})