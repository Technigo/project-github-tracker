# GitHub Tracker

A site made to practice fetching from the GitHub API. 

## Features

- Dynamic styling through DOM manipulation in JavaScript. 
- Mobile-first styling. 
- Data retrieved from GitHub's API: Basic user info, projects forked from Technigo (filtered by date of creation), number of commits,  and whether there has been a pull request yet. 
- Use of methods like filter, find, and sort to organize the data. 
- A chart visualization of completed projects vs. projects left to do, using chart.js. 

## Challenges and Lessons learned

- The biggest challenge in terms of fetching was the getCommits function, since the API didn't have a direct path to fetch each commit. The solution was to first fetch all repos, then filter the forked ones. Then get their pull requests, and finally invoke the getCommits function within a conditional (if the project had any pull requests). 
- Dynamic CSS with JavaScript was also a challenge, since the styling mindset was purely based on the HTML document up to this point. I learned to check the dev tools more often, to make sure the dynamic structure of the document was still coherent.
- The responsiveness of the chart was tricky because of the quirky nature of chart.js. I used a combination of the library's documentation and Stack Overflow answers to get ahead. In the end, I decided to go for a bar graphic instead of a donut. Its rectangular forms matched my layout better. 

## Deployed version

github-tracker-gonzalez.netlify.app
