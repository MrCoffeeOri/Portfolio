let allRepos = [];

fetch('https://api.github.com/users/MrCoffeeOri')
    .then(response => response.json())
    .then(data => {
        renderProfileImage(data.avatar_url);
        
        // Update location in about section
        const locationElement = document.getElementById('location');
        if (locationElement) {
            locationElement.textContent = data.location || 'Location not specified';
        }
        
        // Update stats in about section
        document.getElementById('public-repos').textContent = data.public_repos || 0;
        document.getElementById('followers').textContent = data.followers || 0;
    })
    .catch(error => {
        console.error('Error fetching GitHub data:', error);
        document.getElementById('error-message').classList.remove('hidden');
    });

fetch('https://api.github.com/users/MrCoffeeOri/repos')
    .then(response => response.json())
    .then(repos => {
        allRepos = repos;
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        document.getElementById('total-stars').textContent = totalStars;
        const languageFilter = document.getElementById('language-filter');
        const languages = [...new Set(repos.map(repo => repo.language).filter(Boolean))];
        languages.forEach(language => {
            const option = document.createElement('option');
            option.value = language;
            option.textContent = language;
            languageFilter.appendChild(option);
        });
        displayRepos(repos);
    })
    .catch(error => {
        console.error('Error fetching repositories:', error);
        document.getElementById('error-message').classList.remove('hidden');
    });

function displayRepos(repos) {
    const reposContainer = document.getElementById('repos');
    reposContainer.innerHTML = '';
    if (repos.length === 0) {
        reposContainer.innerHTML = '<div class="no-repos">No repositories found matching your criteria.</div>';
        return;
    }
    repos.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.classList.add('repo');
        repoDiv.innerHTML = `
            <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
            <p>${repo.description || 'No description available.'}</p>
            <div class="repo-meta">
                <span><i class="fas fa-code"></i> ${repo.language || 'Not specified'}</span>
                <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                <span><i class="fas fa-clock"></i> ${formatDate(repo.updated_at)}</span>
            </div>
            <div class="repo-details hidden"></div>
        `;
        repoDiv.addEventListener('click', () => showRepoDetails(repo.full_name, repoDiv));
        reposContainer.appendChild(repoDiv);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays <= 365) return `${Math.ceil(diffDays / 30)} months ago`;
    return date.toLocaleDateString();
}

function showRepoDetails(repoFullName, repoDiv) {
    const repoDetails = repoDiv.querySelector('.repo-details');
    repoDetails.innerHTML = '<div class="loading">Loading...</div>';
    repoDetails.classList.remove('hidden');

    fetch(`https://api.github.com/repos/${repoFullName}`)
        .then(response => response.json())
        .then(repo => {
            repoDetails.innerHTML = `
                <div class="repo-details-content">
                    <div class="detail-row">
                        <span><i class="fas fa-calendar-alt"></i> Created: ${formatDate(repo.created_at)}</span>
                        <span><i class="fas fa-calendar-alt"></i> Updated: ${formatDate(repo.pushed_at)}</span>
                    </div>
                    <div class="detail-row">
                        <span><i class="fas fa-code-branch"></i> Branch: ${repo.default_branch}</span>
                        <span><i class="fas fa-exclamation-circle"></i> Issues: ${repo.open_issues_count}</span>
                    </div>
                    <div class="detail-row">
                        <span><i class="fas fa-eye"></i> Watchers: ${repo.watchers_count}</span>
                        <span><i class="fas fa-download"></i> Size: ${formatSize(repo.size)}</span>
                    </div>
                    <div class="repo-actions">
                        <a href="${repo.html_url}" target="_blank" class="btn btn-primary">
                            <i class="fas fa-external-link-alt"></i> View on GitHub
                        </a>
                        <button class="close-btn" onclick="hideRepoDetails(event)">
                            Close
                        </button>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching repository details:', error);
            repoDetails.innerHTML = '<div class="error">Failed to load repository details.</div>';
        });
}

function formatSize(sizeInKB) {
    if (sizeInKB < 1024) return `${sizeInKB} KB`;
    return `${(sizeInKB / 1024).toFixed(1)} MB`;
}

function hideRepoDetails(event) {
    event.stopPropagation();
    const repoDetails = event.target.closest('.repo-details');
    repoDetails.classList.add('hidden');
    repoDetails.innerHTML = '';
}

document.getElementById('search-bar').addEventListener('input', filterRepos);
document.getElementById('language-filter').addEventListener('change', filterRepos);
document.getElementById('stars-filter').addEventListener('change', filterRepos);

function filterRepos() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const selectedLanguage = document.getElementById('language-filter').value;
    const selectedStars = document.getElementById('stars-filter').value;

    const filteredRepos = allRepos.filter(repo => {
        const matchesSearch = repo.name.toLowerCase().includes(searchQuery) || 
                            (repo.description && repo.description.toLowerCase().includes(searchQuery));
        const matchesLanguage = selectedLanguage ? repo.language === selectedLanguage : true;
        const matchesStars = selectedStars ? repo.stargazers_count >= parseInt(selectedStars) : true;
        return matchesSearch && matchesLanguage && matchesStars;
    });

    displayRepos(filteredRepos);
}

document.getElementById('grid-view').addEventListener('click', () => {
    const reposContainer = document.getElementById('repos');
    reposContainer.classList.remove('list-view');
    reposContainer.classList.add('grid-view');
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('selected-btn'));
    document.getElementById('grid-view').classList.add('selected-btn');
});

document.getElementById('list-view').addEventListener('click', () => {
    const reposContainer = document.getElementById('repos');
    reposContainer.classList.remove('grid-view');
    reposContainer.classList.add('list-view');
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('selected-btn'));
    document.getElementById('list-view').classList.add('selected-btn');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function showCustomAlert(message, duration = 2500) {
    const alertBox = document.getElementById('custom-alert');
    const alertMsg = alertBox.querySelector('.custom-alert-message');
    const alertBar = alertBox.querySelector('.custom-alert-bar');
    const closeBtn = alertBox.querySelector('.custom-alert-close');
    if (!alertBox || !alertMsg || !alertBar || !closeBtn) return;

    alertMsg.innerHTML = message;
    alertBox.classList.add('show');
    alertBar.style.transition = 'none';
    alertBar.style.width = '100%';
    void alertBar.offsetWidth;
    alertBar.style.transition = `width ${duration}ms linear`;
    alertBar.style.width = '0%';
    closeBtn.onclick = null;
    clearTimeout(alertBox._timeout);
    alertBox._timeout = setTimeout(() => {
        alertBox.classList.remove('show');
    }, duration);
    closeBtn.onclick = () => {
        clearTimeout(alertBox._timeout);
        alertBox.classList.remove('show');
        alertBar.style.transition = 'none';
        alertBar.style.width = '0%';
    };
}

(function() {
    emailjs.init("lQ3D5dbfVfYXm0J0d"); //lQ3D5dbfVfYXm0J0d
})();

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    const formData = {
        name: document.getElementById('user_name').value,
        email: document.getElementById('user_email').value,
        message: document.getElementById('user_message').value
    };
    if (!formData.name || !formData.email || !formData.message) {
        showCustomAlert('Please fill in all fields.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
    }

    const lastSubmission = localStorage.getItem('lastEmailSubmission');
    const now = Date.now();
    if (lastSubmission && (now - parseInt(lastSubmission)) < 60000) { // 1 minute cooldown
        showCustomAlert('Please wait a moment before sending another message.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    emailjs.send('service_a1hr2m8', 'template_fxsc5ln', formData)
        .then(function(response) {
            localStorage.setItem('lastEmailSubmission', now.toString());
            showCustomAlert(`Thank you ${formData.name} for your message!<br/> I'll get back to you soon.`, 10000);
            document.getElementById('contact-form').reset();
        }, function(error) {
            showCustomAlert('Sorry, there was an error sending your message. Please try again later.');
        })
        .finally(function() {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});

const additionalStyles = `
    .repo-meta {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-top: 1rem;
        font-size: 0.9rem;
        color: #666;
    }
    
    .repo-meta span {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    
    .repo-details-content {
        display: grid;
        gap: 1rem;
    }
    
    .detail-row {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
    }
    
    .repo-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .no-repos {
        text-align: center;
        padding: 3rem;
        color: #666;
        font-size: 1.1rem;
    }
    
    .error {
        color: #dc3545;
        text-align: center;
        padding: 1rem;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

const catGifs = [
    'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif', // classic cat computer
    'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif', // cat typing
    'https://media.giphy.com/media/v6aOjy0Qo1fIA/giphy.gif', // cat with laptop
    'https://media.giphy.com/media/13borq7Zo2kulO/giphy.gif', // cat at desk
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeW5sZmhzbjhkZXlrN3Q4cWpqOWdzZWlibmtlajZlanVpZHg3eGNidiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VbnUQpnihPSIgIXuZv/giphy.gif' // cat with monitor
];

function renderProfileImage(url) {
    const profileInfo = document.getElementById('profile-info');
    if (!profileInfo) return;
    const old = profileInfo.querySelector('.profile-image-container');
    if (old) old.remove();
    const container = document.createElement('div');
    container.className = 'profile-image-container';
    const inner = document.createElement('div');
    inner.className = 'profile-image-inner';
    const front = document.createElement('div');
    front.className = 'profile-image-front';
    const back = document.createElement('div');
    back.className = 'profile-image-back';
    const imgFront = document.createElement('img');
    imgFront.src = url;
    imgFront.alt = 'Profile Image';
    front.appendChild(imgFront);
    const imgBack = document.createElement('img');
    imgBack.src = catGifs[Math.floor(Math.random() * catGifs.length)];
    imgBack.alt = 'Cat Gif';
    back.appendChild(imgBack);
    inner.appendChild(front);
    inner.appendChild(back);
    container.appendChild(inner);
    profileInfo.prepend(container);

    let isFlipped = false;
    let resetTimeout;
    inner.addEventListener('mousemove', e => {
        if (isFlipped) return;
        const rect = inner.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const skewX = -((x - centerX) / centerX) * 20; // max 10deg
        const skewY = ((y - centerY) / centerY) * -20;
        inner.classList.add('skewing');
        inner.style.transform = `skewY(${skewX}deg) skewX(${skewY}deg)`;
        clearTimeout(resetTimeout);
    });
    inner.addEventListener('mouseleave', () => {
        if (isFlipped) return;
        inner.classList.remove('skewing');
        inner.style.transform = '';
    });
    container.addEventListener('click', () => {
        isFlipped = !isFlipped;
        if (isFlipped) {
            container.classList.add('profile-image-flipped');
            inner.style.transform = 'rotateY(180deg)';
        } else {
            container.classList.remove('profile-image-flipped');
            inner.style.transform = '';
        }
    });
}