# GitHub Tracker

This week we created a GitHub tracker which uses GitHubs APIs to keep track of our finished projects and a chart to display how many are left.

## The problem
We worked with fetching APIs and retrieving specific info from them:
- A list of all repos that are forked from Technigo
- username and profile picture
- Most recent update (push) for each repo
- Name of default branch for each repo
- URL to the actual GitHub repo
- Number of commits for each repo
- It should be responsive (mobile first)
- A chart of how many projects that are done so far, compared to how many you will do using Chart.js

This was accomplished by fetching and filtering the APIs with filter, startsWith, forEach, and find-methods and then using template literals ${} to displaying this on out webpage. 

The issue of 60 fetches/hour being the limit was solved by using a token from GitHub in a secret js-file and gitignore-file.

It was challenging to target the specific info in the APIs and find the right filtering method and parameters to use. 
If I had more time I would like to find a way to put the third API at the top calling it with a const name instead which did not work. 
I would also like to fetch pullrequest and commit stats from the projects that were in teams instead of default messages.
And connect the chart to the pullrequests length instead of the forked projects length. 

## View it live

