const Fetch = async (URL) => await fetch(URL).then(res => res.json())
.catch(error => document.getElementById('repositories-box').innerHTML = `<div class="error-box"><h1>An error occurred while loading data !</h1><p>${error}</p></div>`);

const CreateRepoBox = ({name, html_url, description, fork, updated_at, default_branch, watchers, open_issues, license}) => {
    const updatedDate = new Date(updated_at);
    document.getElementById('repositories-box').innerHTML +=
    `<div class="repo-box">
        <a href="${html_url}"><h1 class="repo-name">${name}</h1></a>
        <p class="repo-info">${description && description}</p>
        <div class="tags-box">
            ${license ? `<p style="background-color: #003451;">${license.name}</p>` : '<p style="background-color: #400629;">No license</p>'}
            ${fork ? '<p style="background-color: #1C6B45;">Forked</p>' : '<p style="background-color: #16553A;">Not forked</p>'}
            ${open_issues > 0 ? `<p style="background-color: #721C1C;">Open issues: ${open_issues}</p>` : `<p>Open issues: 0</p>`}
            ${watchers > 0 ? `<p style="background-color: #1D1D51;">Watchers: ${watchers}</p>` : `<p>Watchers: 0</p>`}
            ${default_branch == "master" ? `<p style="background-color: #9B6B22;">Default branch: ${default_branch}</p>` : `<p style="background-color: #225864;">Default branch: ${default_branch}</p>`}
        </div>
        <p class="repo-info">Last update: ${updatedDate.getMonth()} / ${updatedDate.getDate()} / ${updatedDate.getFullYear()} (month-day-year)</p>
    </div>`
}

Fetch('https://api.github.com/users/Coffee-Developer').then(user_data => Fetch(user_data.repos_url).then(user_repos => {
    document.getElementById('title-name').innerText = user_data.login
    user_repos.map(CreateRepoBox)
}))
