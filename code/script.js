const repoURL = 'https://api.github.com/users/KaraHowes/repos'

fetch(repoURL)
.then((response)=>{
return response.json()
})
.then((data)=>{
    console.log('DATA', data)

})