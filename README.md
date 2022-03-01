# GitHub Tracker

The assignment was to build a website that holds all Technigo-projects on Github. We should fetch these by API, and using filter to display the correct ones. 

Furthermore the website should include some information from each repository, such as default branch and number of commit messages. 

The website should also include a chart that showed how many projects was done in the Bootcamp.

## The problem

I started with fetching the Github API for my user and my repositories. Then I could display my username and profile pic as well as filter out the repositories so only the forked ones marked as "project-" was displayed.

I continued with building up info about default branch etc in innerHTML. Then I fetched all pullrequests and filtered out so only my own was left by comparing "pull.user.login" with "repo.owner.login". Then I tried to display number of commits by using the commit_url, but for some reason it won't show. I will take a closer look at this and ask for help in StackOverflow.

Then I created a chart using chart.js. It went well with styling etc but when I tried to wrap it up in a function that I then called in the js-file the chart wouldn't show at all on the website. I tried different things but as for the commit-issue I will have to dig deeper on this one. Hopefully some of my classmates can help me.

For this project I used a personal API token from Github, and making it secret by using secret.js and gitignore.

Lastly I styled the webpage and made it responsive. I'm happy with the accordion and the way the flex/grid is responsive, but there's some things in the user-section that doesn't look quite right in desktop-size. I think it is because of the position: absolute and how the headers are positioned in relation to the profile pic and the chart.

## View it live

https://serene-mayer-c47183.netlify.app/
