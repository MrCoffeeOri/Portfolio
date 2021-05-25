fetch('https://api.github.com/users/Coffee-Developer').then(res => res.json())
    .then(user_data => fetch(user_data.repos_url).then(res => res.json())
    .then(user_repos => {
        document.getElementById('title-name').innerText = user_data.login
        user_repos.map(repo => document.getElementById('repositories-box').innerHTML += 
            `<div class="repo-box">
                <a href="${repo.html_url}">
                    <h1 class="repo-name">${repo.name}</h1>
                </a>
                <p class="description">${repo.description !== null ? repo.description : ''}</p>
                <span class="repo-fork">${repo.fork ? 'Forked' : 'Not forked'}</span>
                <div class="last-updates">
                    <h4>Last update: ${new Date(repo.updated_at)}</h4>
                </div>
            </div>`)}))
    .catch((error) => document.getElementById('repositories-box').innerHTML += 
        `<div class="error-box">
            <h1>An error occurred while loading data !</h1>
            <p>${error}</p>
        </div>`
    )