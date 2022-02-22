const username = 'EmmaSprings'
const projects = document.getElementById('projects')

const fetchUser = () => {

    const options = {
        method: 'GET',
        headers: {
              Authorization: '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' 
          }
      }
    const API_URL_USER = `https://api.github.com/users/${username}`
    fetch(API_URL_USER, options)
     .then((res) => res.json())
     .then((data) => {
         projects.innerHTML += `
         <p>GitHub username = ${data.login}</p>
         <h2>Projects = [</h2>
         
         `
        //  header.innerHTML += `
        //  <img width="100" src="https://avatars.githubusercontent.com/u/94292545?v=4"/>
        //  `
        fetchRepos();
    })

    

const fetchRepos = () => {
    const API_URL_REPO = `https://api.github.com/users/${username}/repos`
    fetch(API_URL_REPO, options)
      .then((res) => res.json())
      .then((data) => {

        const myProjects = data.filter((repo) => repo.name.includes("project-") && repo.fork);
           
            myProjects.forEach((repo => {
                projects.innerHTML += `
               <li> 
                   <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                 <p>
                    This is ${repo.name}
                 </p>
              <li>
           `
        }))

        projects.innerHTML += `<h2 class="sign">]</h2>`
        
        })
        
    };  
    myChart(); 
};


fetchUser();    




// const myProjects = data.filter((data) => data.name.includes("project-") && data.fork));
//   const userRepos = data[0].name;
//   for (i = 0; i < data.length; i++){
//       projects.innerHTML += `
//       <li> 
//       <a href="${data[i].html_url}" target="_blank">${data[i].name}</a>
//       <p>
//       This is ${data[i].name}
//       </p>
//       <li>
//       `
      
//     };