const API_URL = 
let reponame


fetch(API_URL)
.then((response) => {
    return response.json()
})
.then((data) => {
    console.log(data)
    const technigoRepos = data.filter((repo) => repo.name.includes('project-'))

    console.log(technigoRepos)


    reponame = data[3].name
    console.log(reponame)

   
 const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`  
   
    fetch(API_URL_PR)
.then((response) => {
    return response.json()
})
.then((data) => {
    console.log(data)
})








})


