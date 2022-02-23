


//global variables
const username = 'kolkri'
//Endpoint to get all your repos:
const API_URL = `https://api.github.com/users/${username}/repos`

//defining token
console.log(API_TOKEN)

//defining options
const options = {
    method: 'GET',
    headers: {
        Authorization: `token ${API_TOKEN}`
    }
}

//fetch all of your repos and log them to the console
fetch(API_URL, options)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        //filter out and only show the forked ones
        let forkedOnes = data.filter(element => element.fork === true)
        console.log('Forked ones:', forkedOnes)
        //filter out only the forks from Technigo.
        let technigoForks = forkedOnes.filter(element => element.name.startsWith('project'))
        console.log('Technigo projects:', technigoForks)
    })