# GitHub Tracker

The assignment was to build a website that holds all Technigo-projects on Github. We should fetch these by API, and using filter to display the correct ones. 

Furthermore the website should include some information from each repository, such as default branch and number of commit messages. 

The website should also include a chart that showed how many projects was done in the Bootcamp.

## The problem

I started with fetching the Github API for my user and my repositories. Then I could display my username and profile pic as well as filter out the repositories so only the forked ones marked as "project-" was displayed.

I continued with building up info about push date, default branch etc in innerHTML. Then I fetched all pullrequests and filtered out so only my own was left by comparing "pull.user.login" with "repo.owner.login". I used a dynamic ID for the innerHTML-element to display the number of commits in the panel.

Then I created a chart using chart.js and called the function for it in script-file. To be able to style the chart I put it in a div-element in the HTML-file.

For this project I used a personal API token from Github, and making it secret by using secret.js and gitignore.

Lastly I styled the webpage and made it responsive. I'm happy with the accordion and the way the flex/grid is responsive, but the headers in the user-section doesn't look quite right in desktop-size. I think it is because of the position: absolute and how the headers are positioned in relation to the profile pic and the chart.

If I had more time I would give the styling of the website a little more love. I would also make another chart.



## View it live

https://confident-brattain-b7ba85.netlify.app/
