# GitHub Tracker

The assignment this week was to create a place to keep track of the GitHub repositories that we are using during the Technigo Boot Camp. For this we were instructed to fetch data using the GitHub API:s and then style the page to be responsive.  

## The problem

The challenge this week was to adapt to the fact that the GitHub API has a rate limit of 60 requests per hour. This means that when you are fetching all the requested data in the minimum requirements, you can only reload the page a few times before you reach the API limits...

When I had added the minimum requirements, I therefore inserted dummmy code to the html to be able to style the page according to my likings without running into the 403 issues and the content not being displayed. I also noticed that the API request limit is applied at the network level and that I was able to work around the limitations by connecting to the mobile network on the different cell phones available in my household. 

This week I only had time to work on the blue levels requirements. If I had more time, I would like to also add some of the red level requirements, for example make it possible to sort my list of repos in different ways and to disply the comments I got from each pull request. 

## View it live

https://molbimien-week-7-project-github-tracker.netlify.app
