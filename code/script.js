
const username = "PriscilaAlfaro";
const projectsInfo = document.getElementById('projects-info');
const userName = document.getElementById('user-name');
const profileImage = document.getElementById('profile-image');

const reposFetch = async () => {
    const url = `https://api.github.com/users/${username}/repos`
    try {
        const response = await fetch(url)
        if (response.ok) {
            const repositories = await response.json();
            const forkedRepositories = repositories.filter(repo => repo.fork && repo.name.includes("project-"));
            drawChart(forkedRepositories.length);

            forkedRepositories.map(async repo => {
                const allPullRequest = await pullRequestFetch(repo.name);
                repo.allPullRequest = allPullRequest;
                builRepoHtml(repo);

                new Collapsible({
                    node: document.querySelectorAll('.collapsible'),
                    eventNode: '.collapsible_title',
                    isCollapsed: true
                });
            })

        } else {
            throw new Error('Request failed!')
        }
    } catch (error) {
        main - section
        console.log(`Error: ${error}`);
    }
}


const builRepoHtml = (repo) => {
    projectsInfo.innerHTML +=
        `<div class="card">
            <div class="general-info project-title">
                <h2 class="project-name"><a href=${repo.html_url} target="_blank"><i class="fas fa-project-diagram"></i>&nbsp;&nbsp;${repo.name.toUpperCase()}<a></h2>
                <h3 id="default-branch"> Default branch: ${repo.default_branch}</h3>
                <h3>Main language: ${repo.language ? repo.language : "No information"}</h3>
                <h3 id="recent-push"> Most recent push: ${new Date(repo.pushed_at).toDateString()}</h3>
            </div>

            <div class="pr-info">
                        <h3>Pull requests</h3>
                        <h4>Total pullrequest: ${repo.allPullRequest.total_count}</h4>
                        ${repo.allPullRequest.total_count === 0 ?
            `<h4>This repository don't any have Pull Request</h4>` :
            repo.allPullRequest.items.map(pullRequest =>
                `<h4>Pull Request #${pullRequest.number}</h4>
                            ${pullRequest.commits.length === 0 ?
                    `<h4>This repository don't have commits for this PR</h4>` :


                    `<h4>Total commits: ${pullRequest.commits.length}</h4>
                        <div class="collapsible" data-collapsible>
                        <div class="collapsible_title">
                        <h3>Click here for commits details</h3>
                        </div>
                        <div class="collapsible_content">
                        <ol>
                        ${pullRequest.commits.map(individualCommit =>
                        `<li>
                            <div>Commit #: ${individualCommit.sha}</div>
                            <div>Message: ${individualCommit.commit.message}</div>
                            <div> Autor: ${individualCommit.commit.author.name}</div>
                        </li>`).join('')
                    }
                        </ol>
                        </div>
                        </div>`}
                
                        ${pullRequest.comments.length === 0 ?
                    `<h4>This repository don't have comments for this PR</h4>` :
                    `<h4>Total comments: ${pullRequest.comments.length}</h4>
                        <div class="collapsible" data-collapsible>
                        <div class="collapsible_title">
                        <h3>Click here for comments details</h3>
                        </div>
                        <div class="collapsible_content">
                        <ol>
                    ${pullRequest.comments.map(individualComment =>
                        `<li>
                        <div>Created at: ${new Date(individualComment.created_at).toDateString()}</div>
                        <div>Message: ${individualComment.body}</div>
                        <div> Autor: ${individualComment.user.login}</div>
                        </li>`).join('')
                    }
                    </ol>
                    </div>
                    </div>`}
                   `)}
             </div>
        </div>`

}



const userNameFetch = async () => {
    const url = `https://api.github.com/users/${username}`;
    try {
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            userName.innerHTML = `${data.login}`;
            profileImage.src = `${data.avatar_url}`;
        } else {
            throw new Error('Request failed!')
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}


const pullRequestFetch = async (repoName) => {
    //see: https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-issues-and-pull-requests
    const url = `https://api.github.com/search/issues?q=is:pr+repo:technigo/${repoName}+author:${username}`;

    try {
        const response = await fetch(url)
        if (response.ok) {
            const pullRequests = await response.json();
            await Promise.all(pullRequests.items.map(async pullRequest => {
                pullRequest.comments = await fetchCommentsFromPullRequest(repoName, pullRequest.number);
                pullRequest.commits = await fetchCommitsFromPullRequest(repoName, pullRequest.number);
                return pullRequest;
            }));
            return pullRequests;
        } else {
            throw new Error('Request failed!')
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

const fetchCommentsFromPullRequest = async (repoName, pullRequestNumber) => {
    const url = `https://api.github.com/repos/Technigo/${repoName}/pulls/${pullRequestNumber}/comments`
    try {
        if (pullRequestNumber) {
            const response = await fetch(url)
            if (response.ok) {
                const pullRequestComments = await response.json();
                return pullRequestComments;
            } else {
                throw new Error('Request failed!')
            }
        } else {
            return [{ body: 'No comments', user: { login: "No commenter" } }]
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}


const fetchCommitsFromPullRequest = async (repoName, pullRequestNumber) => {
    const url = `https://api.github.com/repos/Technigo/${repoName}/pulls/${pullRequestNumber}/commits`
    try {
        const response = await fetch(url)
        if (response.ok) {
            const commits = await response.json()
            return commits;
        } else {
            throw new Error('Request failed!')
        }

    } catch (error) {
        console.log(`Error: ${error}`);
    }
}



reposFetch();
userNameFetch();
