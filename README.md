# GitHub Tracker

A GitHub clone website to practice REST API with vanilla Javascript.

## The problem

The biggest challenge was rate limit boundary even though the request header contains authentication token. In case of exceeding rate limit boundary, the website will display an error message and ask users to visit after an hour. The issue is caused by sending too many requests when page is loading and this was not avoidable because the website requires data from different paths. So for the display purpose, the deployed website is based on a dummy data.

## View it live

https://github-clone-2022.netlify.app
