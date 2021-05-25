const Fetch = async (URL) => (await fetch(URL).catch(OnError)).json();

const OnError = (error) => document.getElementById('repositories-box').innerHTML = `<div class="error-box"><h1>An error occurred while loading data !</h1><p>${error}</p></div>`

const CreateRepoBox = (repo) => document.getElementById('repositories-box').innerHTML +=
    `<div class="repo-box">
        <a href="${repo.html_url}"><h1 class="repo-name">${repo.name}</h1></a>
        <p class="description">${repo.description !== null ? repo.description : ''}</p>
        <span class="repo-fork">${repo.fork ? 'Forked' : 'Not forked'}</span>
        <div class="last-updates"><h4>Last update: ${new Date(repo.updated_at)}</h4></div>
    </div>`

Fetch('https://api.github.com/users/Coffee-Developer').then(user_data => Fetch(user_data.repos_url).then(user_repos => {
    document.getElementById('title-name').innerText = user_data.login
    user_repos.map(CreateRepoBox)}))