//Username
const username = 'rijad90'

//API URL
const GITHUB_USER_API = `https://api.github.com/users/${username}`
const GITHUB_REPOS_API = `https://api.github.com/users/${username}/repos`

//DOM selectors
const userProfile = document.getElementById('userProfile')
const userContaier = document.getElementById('container')


fetch(GITHUB_USER_API)
    .then(res => res.json())
    .then(data =>{
        console.log(data)
            userProfile.innerHTML += `
                <img src="${data.avatar_url}" class ="pic"></img>
                    <p>${data.login} </p>
`
})

fetch(GITHUB_REPOS_API)
    .then(res => res.json())
    .then(data =>{
        console.log(data)
            userContaier.innerHTML += `
                <p>${data[0].html_url}</p1>        
                        
`
})