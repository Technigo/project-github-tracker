const projects = document.getElementById('projects')

const username = 'SteppbySteph'
const USER_PROFILE = `https://api.github.com/users/${username}`
const USER_REPO = `https://api.github.com/users/${username}/repos`

//const USER_URL =('https://api.github.com/users/SteppbySteph/repos')
// const REPOS_URL = 


//----USER NAME & PROFILE----//

const getProfile = () =>{
    fetch(USER_PROFILE)
        .then(res => res.json())
        .then(data => {
            console.log('user', data)

            const user = data.login
            const avatar = data.avatar_url
            projects.innerHTML += `
            <h1>Username: ${user}</h1>
            <img class="avatar" src="${avatar}">
            `

            
        }) 
}

getProfile()




//----FETCHING ALL REPOS----//
const fetchUserRepos = () => {
    fetch(USER_REPO)
        .then(res => res.json())
        .then(data => {
            console.log('repos', data)

            const allRepos = data.length
            projects.innerHTML += `${allRepos}`  
        })

    
}

fetchUserRepos()