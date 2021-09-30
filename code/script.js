let username = "A1eksa"

const userPicture = `https://api.github.com/users/${username}`;
const REPOS_URL = `https://api.github.com/users/${username}/repos`;


const getUserPicture = ()=> {
    fetch(userPicture)
    .then((res)=>res.json())
    .then((data)=> {
        //console.log(data);
        const picture = data.avatar_url;
        const location = data.location;
        const userBio = data.bio;
        const url = data.followers_url;
        const button = document.getElementById("Btn")

        button.onclick = ()=>{
            window.location='data.followers_url'
            
        }
    

        userInfo.innerHTML = `
        <img class="user-info_picture" src="${picture}" alt="Picture of gitHub user"/>
        <div class="user-info_username">User name: ${username}</div>
        <div class="user-info_location">Location: ${location}</div>
        <div class="user-info_bio">${userBio} 🐒</div>

    
        `
    })
}
getUserPicture()

const projectsContainer = document.getElementById('projects');

const fetchRepo = ()=> {
    fetch(REPOS_URL)
     .then((res)=> res.json())
     .then((data)=> {
        const technigoRepo = data.filter(repo => 
            repo.name.includes('project-') && repo.fork
        );
        console.log(technigoRepo);
        
        technigoRepo.forEach((repo)=> {
            projectsContainer.innerHTML += `
            <div>PROJECT: ${repo.name}</div>
            <div>default branch:${repo.default_branch}</div>
            <div>url:${repo.html_url}</div>
            <a href="${repo.html_url}" target="_blank">Go to "${repo.name}"</a>
            <div>most recent push:"${repo.pushed_at}"`
        });
        fetchPull(technigoRepo);
        
    });
    
    
};



const fetchPull = (allRepo)=> {
    allRepo.forEach((repo)=> {
        fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls`)
        .then((res)=> res.json())
        .then((data)=>{
            console.log(`mother${repo.name}, data`);

        });
        fetchPull()
    

    });
    

};

fetchRepo()
