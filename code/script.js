const username = 'mathildakarlsson'
let reponame = ''


//Fetch 1
const API_URL = `https://api.github.com/users/${username}/repos`

fetch(API_URL)
.then(res => res.json())
.then(data => {
    console.log(data)
    reponame = data[3].name

    data.forEach(repo => {
        document.getElementById('container').innerHTML += `
          <div class="repo">
            <h4>${repo.name}</h4>
          </div>
      `
    })
    



//Fetch 2
    const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`
        
    fetch(API_URL_PR)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    })