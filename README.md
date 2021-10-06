# GitHub Tracker

A site that keeps track of my Github repositories. 
The project name (with url), latest push, number of commits and pull request is fetched from the Github API, along with my profile info.

## The problem

I fetched all my repos and used the filter method to only keep the ones forked from Technigo that start with "project". 
I fetched the other data using a similar method, either directly from the API if possible, and filtered it when necessary. 
For sorting the repos in order by date, I used a function that I found on stack overflow to avoid a lot of issues with dates in js. 

My plan was to use grid for my layout, however, that part is NOT complete yet (as of deadline) and I will keep working on it. 
The page works on different devices, but I plan to make the project-divs look more unified in height.


## View it live

https://annathunberg-githubtracker.netlify.app/
