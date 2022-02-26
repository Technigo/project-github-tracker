# GitHub Tracker

Assignment is to build a site that shows info about our github account and the projects we've created to far.
The following points is what is required to be shown.

- A list of all repos that are forked ones from Technigo
- Your username and profile picture
- Most recent update (push) for each repo
- Name of your default branch for each repo
- URL to the actual GitHub repo
- Number of commit messages for each repo
- All pull requests
- A chart of how many projects you've done so far, compared to how many you will have done.

## The problem

I used fetch to get the user data, which required 3 fetches - user data, pull requests, and commits. The styling was kept simple since the focus was to be able to display all the different data that was required. The biggest problem was data retrieval and getting it to actually show up on the site. The second biggest problem I had was that I had set up the fetches to all finish before moving on to displaying the data so the site took a very long time to load. That has been slightly remedied by splitting up the code into separate fetches but it still takes a fairly long time for the site to load.   

## View it live

https://github-tracker-at.netlify.app/
