
//see: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
const PAT = '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'
const username = "PriscilaAlfaro";

const projectsInfo = document.getElementById('projects-info');
const userName = document.getElementById('user-name');
const profileImage = document.getElementById('profile-image');
// const pullRequest = document.getElementById('pull-request');

// const defaultBranch = document.getElementById('default-branch');


const reposFetch = async () => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Authorization': `token ${PAT}`
            },
        });
        if (response.ok) {
            const repositories = await response.json();
            const forkedRepositories = repositories.filter(repo => repo.fork === true);
            forkedRepositories.map(async repo => {
                const allPullRequest = await pullRequestFetch(repo.name);
                repo.allPullRequest = allPullRequest;
                builRepoHtml(repo);
            })

        } else {
            throw new Error('Request failed!')
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}


const builRepoHtml = (repo) => {

    console.log("repo", repo)
    projectsInfo.innerHTML +=
        `<div class="card">
            <div>
                <h2>Project: </h2>
                <h3 class="project-name">${repo.name}</h3>
                <h2>Default branch:</h2>
                <h3 id="default-branch">${repo.default_branch}</h3>
                <h2>Url:</h2>
                <h3 id="url-repo">${repo.url}</h3>
            </div>

            <div>
                <h3>Pull requests</h3>
                    <div id="pull-request">
                        <h4>Total pullrequest ${repo.allPullRequest.total_count}</h4>
                        ${repo.allPullRequest.total_count === 0 ?
            `<h3>This repository don't have PR</h3>` : repo.allPullRequest.items.map(pullRequest =>
                `<h4>PullRequest #${pullRequest.number}</h4>
                    
                        <div id = "commit-messages">
                            <h5>Commits</h5>
                            ${pullRequest.commits.length === 0 ?
                    `<h3>This repository don't have commits for this PR</h3>` :
                    pullRequest.commits.map(individualCommit =>
                        ` <ol>
                                <li>Commit #${individualCommit.sha}</li>
                                <li>Message${individualCommit.commit.message}</li>
                                <li>Autor${individualCommit.commit.author.name}</li>
                              </ol>`).join('')}
                        </div>

                        <div id="comments-commenter">
                            <h5>Comments</h5>
                            ${pullRequest.comments.length === 0 ?
                    `<h3>This repository don't have comments for this PR</h3>` :
                    pullRequest.comments.map(individualComment =>
                        `<ol>
                                <li>Created at ${individualComment.created_at}</li>
                                <li>Message${individualComment.body}</li>
                                <li>Autor${individualComment.user.login}</li>
                             </ol>`).join('')}
                             </div>`
            )}
                        </div>
                    </div>
            </div>`

}



const userNameFetch = async () => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                'Authorization': `token ${PAT}`
            },
        });
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


//ultimo comit https://api.github.com/repos/PriscilaAlfaro/project-business-site/commits [0] primero es el ultimo commit /limit:30 default 
//numero de commit messages contar el length 



const pullRequestFetch = async (repoName) => {
    //see: https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-issues-and-pull-requests
    const url = `https://api.github.com/search/issues?q=is:pr+repo:technigo/${repoName}+author:${username}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${PAT}`
            },
        });
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

    try {
        if (pullRequestNumber) {
            const response = await fetch(`https://api.github.com/repos/Technigo/${repoName}/pulls/${pullRequestNumber}/comments`, {
                headers: {
                    'Authorization': `token ${PAT}`
                },
            });
            if (response.ok) {
                const pullRequestComments = await response.json();
                // console.log("pullRequestComments from origin", pullRequestComments)

                // gitHubInformation.pullRequestComments += pullRequestComments;
                // if (pullRequestComments.items.length > 0 && pullRequestComments.items[0].comments === 0) {
                //     return [{ body: 'No comments', user: { login: "No commenter" } }]
                // }
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

    try {
        const response = await fetch(`https://api.github.com/repos/Technigo/${repoName}/pulls/${pullRequestNumber}/commits`, {
            headers: {
                'Authorization': `token ${PAT}`
            },
        });
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
