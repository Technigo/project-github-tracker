const username = 'TereseClaesson'

const API_URL = `https://api.github.com/users/${username}/repos`
//const API_URL_PR = 'https://api.github.com/repos/Technigo/${reponame}/pulls'

fetch(API_URL)
.then(Response => Response.json())
.then(repos => {
console.log(repos)

//Use the array method Filter() to filter the array and create a new array,
//with the object properties that has been forked 
//repos is the name of the array, repoFork is the name of every object in the array
//fork is the keyname of the property, true is the keyvalue that the new arrays properties has
const repoForked = repos.filter(repoFork => repoFork.fork === true)
console.log(repoForked)
})

