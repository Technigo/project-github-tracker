# GitHub Tracker

This project makes use of Github API. The user can fetch data to view their own or other Technigo students' profile. The project show the user profile information like name, username and location. It can also show the repositories forked from Technigo's Github account.

Start by briefly describing the assignment in a sentence or two. Keep it short and to the point.

## The problem

Data is fetched from [Github's API](https://docs.github.com/en/rest) by fetching through different URLs with different queries necessary to locate the data needed. Data is also filtered by `.filter()` method or `.find()` in order to get only the repositories forked from Technigo and with pull requests done by the user.

The website has my profile as default but users can search for their own profile. Their repositories from Technigo are the ones that are going to be shown.

A chart showing the number of Technigo projects and some other information are shown. The chart will be re-rendered every time a new profile is searched.

I also added a light mode that will turn the background white and the font color dark and readable. Click on the lightbulb to see this.

## View it live

[Lousanne's Github Tracker](https://happy-noether-88c607.netlify.app/)
