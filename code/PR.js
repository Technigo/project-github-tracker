//INFO FOR EACH PROJECT's PULL REQUESTS
const username = 'Dorothea-B'



const API_URL_PR = `https://api.github.com/repos/Technigo/project-news-site/pulls?per_page=200`

fetch(API_URL_PR)
.then(res => res.json())
    
.then(pullreqdata => {

        console.log(pullreqdata)

    // filter pull requests 
    //const filteredPullrequests = pullreqdata.list.filter(item => item.xtextx.includes(${username}))

})   

