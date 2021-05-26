const Fetch = async (URL) => (await fetch(URL).catch(OnError)).json();

const OnError = (error) => document.getElementById('repositories-box').innerHTML = `<div class="error-box"><h1>An error occurred while loading data !</h1><p>${error}</p></div>`

const CreateRepoBox = ({name, html_url, description, fork, updated_at, default_branch, watchers, open_issues, license}) => document.getElementById('repositories-box').innerHTML +=
    `<div class="repo-box">
        <a href="${html_url}"><h1 class="repo-name">${name}</h1></a>
        <p class="description">${description != null ? description : ''}</p>
        <p class="repo-tag">${license != null ? license.name : 'No license'}</p>
        <p class="repo-tag">${fork ? 'Forked' : 'Not forked'}</p>
        ${open_issues > 0 ? `<span style="background-color: rgb(243, 71, 71); color: white">Open issues: ${open_issues}</span>` : `<span>Open issues: ${open_issues}</span>`}
        <span >Watchers: ${watchers}</span>
        <span>Default branch: ${default_branch}</span>
        <div class="last-updates"><h4>Last update: ${new Date(updated_at)}</h4></div>
    </div>`

Fetch('https://api.github.com/users/Coffee-Developer').then(user_data => Fetch(user_data.repos_url).then(user_repos => {
    document.getElementById('title-name').innerText = user_data.login
    user_repos.map(CreateRepoBox)
}))