# GitHub Tracker

A site that keeps track of my Github repositories. The project name (with url), latest push, number of commits and pull request is fetched from the Github API. My profile is also fetched from the Github API.

## The problem

I fetched all my repos and used the filter method to only keep the ones forked from technigo that start with "project". I fetched the other data using a similar method, either directly from the API if possible, and filtered it when necessary. For sorting the repos in order by date, I used a function that I found on stack overflow to avoid a lot of issues with dates in js. 

If I'd had more time I would have fetched more data from the API and featured it on my page.

## View it live

https://annathunberg-githubtracker.netlify.app/
