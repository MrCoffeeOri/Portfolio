const GITHUB_USER = 'MrCoffeeOri';
const catGifs = [
    'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif', // classic cat computer
    'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif', // cat typing
    'https://media.giphy.com/media/v6aOjy0Qo1fIA/giphy.gif', // cat with laptop
    'https://media.giphy.com/media/13borq7Zo2kulO/giphy.gif', // cat at desk
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeW5sZmhzbjhkZXlrN3Q4cWpqOWdzZWlibmtlajZlanVpZHg3eGNidiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VbnUQpnihPSIgIXuZv/giphy.gif' // cat with monitor
];

let allRepos = [];
let profileLocation = null;

/* ------------------------------------------------------------------ */
/* Translations                                                        */
/* ------------------------------------------------------------------ */

const translations = {
    en: {
        'nav.skip': 'Skip to content',
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',
        'nav.terminal': 'Terminal',
        'nav.terminalTitle': 'Open the terminal version',
        'nav.langToggle': 'Mudar para português',
        'nav.themeToggle': 'Toggle light/dark theme',
        'hero.eyebrow': 'echo "Hello, world! I\'m"',
        'hero.subtitle': 'Full-Stack Developer & Open Source Enthusiast',
        'hero.description': 'Passionate about creating innovative solutions and contributing to the developer community. I love building applications that make a difference.',
        'hero.ctaWork': 'View my work',
        'hero.ctaContact': 'Get in touch',
        'hero.flipHint': 'Click the photo for a surprise',
        'about.title': 'About me',
        'about.p1': "I'm a dedicated developer with a passion for creating meaningful applications and contributing to open-source projects. My journey in software development has been driven by curiosity and a desire to solve real-world problems.",
        'about.p2': "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I believe in continuous learning and staying up-to-date with the latest industry trends.",
        'about.statProjects': 'Projects',
        'about.statFollowers': 'Followers',
        'about.statStars': 'Stars',
        'about.education': 'Education',
        'about.educationValue': 'Computer Science & Systems Analysis',
        'about.location': 'Location',
        'about.locationUnknown': 'Location not specified',
        'about.experience': 'Experience',
        'about.experienceValue': '3+ years in software development',
        'skills.title': 'Skills & Technologies',
        'skills.database': 'Database',
        'skills.tools': 'Tools & Others',
        'projects.title': 'My projects',
        'projects.search': 'Search repositories...',
        'projects.allLanguages': 'All languages',
        'projects.allStars': 'All stars',
        'projects.gridView': 'Grid view',
        'projects.listView': 'List view',
        'projects.error': 'Failed to load data from GitHub API. Please try again later.',
        'projects.empty': 'No repositories found matching your criteria.',
        'projects.notSpecified': 'Not specified',
        'projects.noDescription': 'No description available.',
        'projects.details': 'Details',
        'projects.created': 'Created',
        'projects.updated': 'Updated',
        'projects.branch': 'Branch',
        'projects.issues': 'Issues',
        'projects.watchers': 'Watchers',
        'projects.size': 'Size',
        'projects.viewOnGithub': 'View on GitHub',
        'projects.close': 'Close',
        'projects.unknownDate': 'Unknown',
        'contact.title': 'Get in touch',
        'contact.intro': 'Have a project, an opportunity or just want to say hi? My inbox is always open.',
        'contact.nameLabel': 'Name',
        'contact.namePlaceholder': 'Your name',
        'contact.emailLabel': 'Email',
        'contact.emailPlaceholder': 'you@example.com',
        'contact.messageLabel': 'Message',
        'contact.messagePlaceholder': 'Your message',
        'contact.send': 'Send message',
        'contact.sending': 'Sending...',
        'contact.fillAll': 'Please fill in all fields.',
        'contact.wait': 'Please wait a moment before sending another message.',
        'contact.thanks': "Thank you {name} for your message!\nI'll get back to you soon.",
        'contact.error': 'Sorry, there was an error sending your message. Please try again later.',
        'contact.unavailable': 'The contact form is unavailable right now. Please reach me by email instead.',
        'footer.rights': 'All rights reserved.',
        'footer.terminal': 'Try the terminal version',
        'common.loading': 'Loading...'
    },
    pt: {
        'nav.skip': 'Pular para o conteúdo',
        'nav.about': 'Sobre',
        'nav.skills': 'Habilidades',
        'nav.projects': 'Projetos',
        'nav.contact': 'Contato',
        'nav.terminal': 'Terminal',
        'nav.terminalTitle': 'Abrir a versão terminal',
        'nav.langToggle': 'Switch to English',
        'nav.themeToggle': 'Alternar tema claro/escuro',
        'hero.eyebrow': 'echo "Olá, mundo! Eu sou"',
        'hero.subtitle': 'Desenvolvedor Full-Stack & entusiasta de Open Source',
        'hero.description': 'Apaixonado por criar soluções inovadoras e contribuir com a comunidade de desenvolvedores. Adoro construir aplicações que fazem a diferença.',
        'hero.ctaWork': 'Ver meus projetos',
        'hero.ctaContact': 'Fale comigo',
        'hero.flipHint': 'Clique na foto para uma surpresa',
        'about.title': 'Sobre mim',
        'about.p1': 'Sou um desenvolvedor dedicado, apaixonado por criar aplicações significativas e contribuir com projetos open source. Minha jornada no desenvolvimento de software é movida pela curiosidade e pela vontade de resolver problemas reais.',
        'about.p2': 'Quando não estou programando, estou explorando novas tecnologias, contribuindo com projetos open source ou compartilhando conhecimento com a comunidade. Acredito no aprendizado contínuo e em me manter atualizado com as tendências do mercado.',
        'about.statProjects': 'Projetos',
        'about.statFollowers': 'Seguidores',
        'about.statStars': 'Estrelas',
        'about.education': 'Formação',
        'about.educationValue': 'Ciência da Computação & Análise de Sistemas',
        'about.location': 'Localização',
        'about.locationUnknown': 'Localização não informada',
        'about.experience': 'Experiência',
        'about.experienceValue': 'Mais de 3 anos em desenvolvimento de software',
        'skills.title': 'Habilidades & Tecnologias',
        'skills.database': 'Banco de dados',
        'skills.tools': 'Ferramentas & Outros',
        'projects.title': 'Meus projetos',
        'projects.search': 'Buscar repositórios...',
        'projects.allLanguages': 'Todas as linguagens',
        'projects.allStars': 'Qualquer nº de estrelas',
        'projects.gridView': 'Ver em grade',
        'projects.listView': 'Ver em lista',
        'projects.error': 'Não foi possível carregar os dados da API do GitHub. Tente novamente mais tarde.',
        'projects.empty': 'Nenhum repositório encontrado com esses filtros.',
        'projects.notSpecified': 'Não especificada',
        'projects.noDescription': 'Sem descrição.',
        'projects.details': 'Detalhes',
        'projects.created': 'Criado',
        'projects.updated': 'Atualizado',
        'projects.branch': 'Branch',
        'projects.issues': 'Issues',
        'projects.watchers': 'Observadores',
        'projects.size': 'Tamanho',
        'projects.viewOnGithub': 'Ver no GitHub',
        'projects.close': 'Fechar',
        'projects.unknownDate': 'Desconhecido',
        'contact.title': 'Vamos conversar',
        'contact.intro': 'Tem um projeto, uma oportunidade ou só quer dar um oi? Minha caixa de entrada está sempre aberta.',
        'contact.nameLabel': 'Nome',
        'contact.namePlaceholder': 'Seu nome',
        'contact.emailLabel': 'E-mail',
        'contact.emailPlaceholder': 'voce@exemplo.com',
        'contact.messageLabel': 'Mensagem',
        'contact.messagePlaceholder': 'Sua mensagem',
        'contact.send': 'Enviar mensagem',
        'contact.sending': 'Enviando...',
        'contact.fillAll': 'Por favor, preencha todos os campos.',
        'contact.wait': 'Aguarde um momento antes de enviar outra mensagem.',
        'contact.thanks': 'Obrigado pela mensagem, {name}!\nVou responder em breve.',
        'contact.error': 'Desculpe, houve um erro ao enviar sua mensagem. Tente novamente mais tarde.',
        'contact.unavailable': 'O formulário de contato está indisponível no momento. Por favor, me envie um e-mail.',
        'footer.rights': 'Todos os direitos reservados.',
        'footer.terminal': 'Experimente a versão terminal',
        'common.loading': 'Carregando...'
    }
};

const detectLanguage = () => {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'pt') return saved;
    return (navigator.language || 'en').toLowerCase().startsWith('pt') ? 'pt' : 'en';
};
let currentLang = detectLanguage();
const locale = () => (currentLang === 'pt' ? 'pt-BR' : 'en');

function t(key, vars = {}) {
    const text = translations[currentLang][key] ?? translations.en[key] ?? key;
    return text.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');
}

function applyTranslations() {
    document.documentElement.lang = locale();
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    document.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = t(el.dataset.i18nTitle); });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel)));
    const langLabel = document.getElementById('lang-label');
    if (langLabel) langLabel.textContent = currentLang.toUpperCase();
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    applyTranslations();
    renderLocation();
    if (allRepos.length) filterRepos();
}

/* ------------------------------------------------------------------ */
/* Theme                                                               */
/* ------------------------------------------------------------------ */

function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('siteTheme', theme);
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

// Fetches JSON and rejects on HTTP errors (e.g. GitHub's 403 rate limit)
function fetchJSON(url) {
    return fetch(url).then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status} while fetching ${url}`);
        return response.json();
    });
}

function escapeHTML(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);

// Relative dates in the current language ("Yesterday", "há 3 dias", ...)
function formatDate(dateString) {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return t('projects.unknownDate');
    const diffDays = Math.floor(Math.abs(Date.now() - date) / (1000 * 60 * 60 * 24));
    const rtf = new Intl.RelativeTimeFormat(locale(), { numeric: 'auto' });

    if (diffDays < 7) return capitalize(rtf.format(-diffDays, 'day'));
    if (diffDays < 30) return capitalize(rtf.format(-Math.floor(diffDays / 7), 'week'));
    if (diffDays < 365) return capitalize(rtf.format(-Math.floor(diffDays / 30), 'month'));
    return date.toLocaleDateString(locale());
}

function formatSize(sizeInKB) {
    if (sizeInKB < 1024) return `${sizeInKB} KB`;
    return `${(sizeInKB / 1024).toFixed(1)} MB`;
}

// Counts a stat up from 0 for a small "live" feel (skipped when reduced motion is requested)
function animateNumber(el, target) {
    const value = Number(target) || 0;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || value === 0) {
        el.textContent = value;
        return;
    }
    const duration = 900;
    const start = performance.now();
    const step = now => {
        const progress = Math.min(1, (now - start) / duration);
        el.textContent = Math.round(value * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

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
    imgFront.alt = 'Renan Penha';
    front.appendChild(imgFront);
    const imgBack = document.createElement('img');
    imgBack.src = catGifs[Math.floor(Math.random() * catGifs.length)];
    imgBack.alt = 'Cat GIF';
    back.appendChild(imgBack);
    inner.appendChild(front);
    inner.appendChild(back);
    container.appendChild(inner);
    profileInfo.prepend(container);

    let isFlipped = false;
    inner.addEventListener('mousemove', e => {
        if (isFlipped) return;
        const rect = inner.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Gentle 3D tilt that follows the cursor (max 12deg per axis)
        const rotateY = ((x - centerX) / centerX) * 12;
        const rotateX = -((y - centerY) / centerY) * 12;
        inner.classList.add('skewing');
        inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    inner.addEventListener('mouseleave', () => {
        if (isFlipped) return;
        inner.classList.remove('skewing');
        inner.style.transform = '';
    });
    container.addEventListener('click', () => {
        isFlipped = !isFlipped;
        inner.classList.remove('skewing');
        container.classList.toggle('profile-image-flipped', isFlipped);
        inner.style.transform = isFlipped ? 'rotateY(180deg)' : '';
    });
}

function renderLocation() {
    const locationElement = document.getElementById('location');
    if (!locationElement || profileLocation === null) return;
    locationElement.removeAttribute('data-i18n');
    locationElement.textContent = profileLocation || t('about.locationUnknown');
}

/* ------------------------------------------------------------------ */
/* Repositories                                                        */
/* ------------------------------------------------------------------ */

function displayRepos(repos) {
    const reposContainer = document.getElementById('repos');
    reposContainer.innerHTML = '';
    if (repos.length === 0) {
        reposContainer.innerHTML = `<div class="no-repos">${escapeHTML(t('projects.empty'))}</div>`;
        return;
    }
    repos.forEach(repo => {
        const repoDiv = document.createElement('article');
        repoDiv.classList.add('repo');
        repoDiv.innerHTML = `
            <div class="repo-header">
                <i class="far fa-folder repo-icon" aria-hidden="true"></i>
                <h3><a href="${escapeHTML(repo.html_url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(repo.name)}</a></h3>
                ${repo.fork ? '<span class="repo-badge">fork</span>' : ''}
            </div>
            <p>${escapeHTML(repo.description || t('projects.noDescription'))}</p>
            <div class="repo-meta">
                <span class="repo-language"><span class="lang-dot" aria-hidden="true"></span> ${escapeHTML(repo.language || t('projects.notSpecified'))}</span>
                <span><i class="far fa-star" aria-hidden="true"></i> ${escapeHTML(repo.stargazers_count)}</span>
                <span><i class="fas fa-code-branch" aria-hidden="true"></i> ${escapeHTML(repo.forks_count)}</span>
                <span><i class="far fa-clock" aria-hidden="true"></i> ${formatDate(repo.updated_at)}</span>
            </div>
            <button class="repo-toggle" type="button" aria-expanded="false">
                <span>${escapeHTML(t('projects.details'))}</span> <i class="fas fa-chevron-down" aria-hidden="true"></i>
            </button>
            <div class="repo-details hidden"></div>
        `;
        repoDiv.querySelector('.repo-toggle').addEventListener('click', () => toggleRepoDetails(repo, repoDiv));
        repoDiv.addEventListener('click', event => {
            // Links, buttons and the open details panel handle their own clicks
            if (event.target.closest('a, button, .repo-details')) return;
            toggleRepoDetails(repo, repoDiv);
        });
        reposContainer.appendChild(repoDiv);
    });
}

function toggleRepoDetails(repo, repoDiv) {
    const repoDetails = repoDiv.querySelector('.repo-details');
    if (repoDetails.classList.contains('hidden')) showRepoDetails(repo, repoDiv);
    else hideRepoDetails(repoDiv);
}

function showRepoDetails(repo, repoDiv) {
    // The /users/:user/repos response already carries every field shown here,
    // so no extra request (and no extra GitHub rate-limit usage) is needed.
    const repoDetails = repoDiv.querySelector('.repo-details');
    repoDetails.innerHTML = `
        <dl class="repo-details-content">
            <div><dt><i class="far fa-calendar-plus" aria-hidden="true"></i> ${escapeHTML(t('projects.created'))}</dt><dd>${formatDate(repo.created_at)}</dd></div>
            <div><dt><i class="far fa-calendar-check" aria-hidden="true"></i> ${escapeHTML(t('projects.updated'))}</dt><dd>${formatDate(repo.pushed_at)}</dd></div>
            <div><dt><i class="fas fa-code-branch" aria-hidden="true"></i> ${escapeHTML(t('projects.branch'))}</dt><dd>${escapeHTML(repo.default_branch)}</dd></div>
            <div><dt><i class="fas fa-exclamation-circle" aria-hidden="true"></i> ${escapeHTML(t('projects.issues'))}</dt><dd>${escapeHTML(repo.open_issues_count)}</dd></div>
            <div><dt><i class="far fa-eye" aria-hidden="true"></i> ${escapeHTML(t('projects.watchers'))}</dt><dd>${escapeHTML(repo.watchers_count)}</dd></div>
            <div><dt><i class="fas fa-hdd" aria-hidden="true"></i> ${escapeHTML(t('projects.size'))}</dt><dd>${formatSize(repo.size)}</dd></div>
        </dl>
        <div class="repo-actions">
            <a href="${escapeHTML(repo.html_url)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                <i class="fab fa-github" aria-hidden="true"></i> ${escapeHTML(t('projects.viewOnGithub'))}
            </a>
            <button class="btn btn-ghost btn-sm close-btn" type="button">${escapeHTML(t('projects.close'))}</button>
        </div>
    `;
    repoDetails.querySelector('.close-btn').addEventListener('click', () => hideRepoDetails(repoDiv));
    repoDetails.classList.remove('hidden');
    repoDiv.classList.add('open');
    repoDiv.querySelector('.repo-toggle').setAttribute('aria-expanded', 'true');
}

function hideRepoDetails(repoDiv) {
    const repoDetails = repoDiv.querySelector('.repo-details');
    repoDetails.classList.add('hidden');
    repoDetails.innerHTML = '';
    repoDiv.classList.remove('open');
    repoDiv.querySelector('.repo-toggle').setAttribute('aria-expanded', 'false');
}

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

function setReposView(view) {
    const reposContainer = document.getElementById('repos');
    reposContainer.classList.toggle('grid-view', view === 'grid');
    reposContainer.classList.toggle('list-view', view === 'list');
    document.getElementById('grid-view').classList.toggle('selected-btn', view === 'grid');
    document.getElementById('list-view').classList.toggle('selected-btn', view === 'list');
    localStorage.setItem('reposView', view);
}

/* ------------------------------------------------------------------ */
/* Alert                                                               */
/* ------------------------------------------------------------------ */

function showCustomAlert(message, duration = 2500) {
    const alertBox = document.getElementById('custom-alert');
    if (!alertBox) return;
    const alertMsg = alertBox.querySelector('.custom-alert-message');
    const alertBar = alertBox.querySelector('.custom-alert-bar');
    const closeBtn = alertBox.querySelector('.custom-alert-close');
    if (!alertMsg || !alertBar || !closeBtn) return;

    // textContent keeps user input (e.g. the sender's name) from being parsed as HTML;
    // "\n" line breaks are rendered by white-space: pre-line in the CSS.
    alertMsg.textContent = message;
    alertBox.classList.add('show');
    alertBar.style.transition = 'none';
    alertBar.style.width = '100%';
    void alertBar.offsetWidth;
    alertBar.style.transition = `width ${duration}ms linear`;
    alertBar.style.width = '0%';
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

/* ------------------------------------------------------------------ */
/* Startup                                                             */
/* ------------------------------------------------------------------ */

applyTranslations();
setReposView(localStorage.getItem('reposView') === 'list' ? 'list' : 'grid');

document.getElementById('theme-toggle').addEventListener('click', () => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light');
});
document.getElementById('lang-toggle').addEventListener('click', () => {
    setLanguage(currentLang === 'en' ? 'pt' : 'en');
});

// config.js is generated during deploy (and is gitignored), so it may be missing locally.
// Without this guard a missing file throws a ReferenceError and stops the whole script.
const emailConfig = window.EMAILJS_CONFIG;
const emailReady = Boolean(window.emailjs && emailConfig && emailConfig.PUBLIC_KEY);
if (emailReady) emailjs.init(emailConfig.PUBLIC_KEY);
else console.warn('EmailJS is not configured: config.js is missing or incomplete.');

const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = new Date().getFullYear();

fetchJSON(`https://api.github.com/users/${GITHUB_USER}`)
    .then(data => {
        renderProfileImage(data.avatar_url);
        profileLocation = data.location || '';
        renderLocation();
        animateNumber(document.getElementById('public-repos'), data.public_repos);
        animateNumber(document.getElementById('followers'), data.followers);
    })
    .catch(error => {
        console.error('Error fetching GitHub data:', error);
        profileLocation = '';
        renderLocation();
        document.getElementById('error-message').classList.remove('hidden');
    });

// per_page=100: the API returns only 30 repositories by default
fetchJSON(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`)
    .then(repos => {
        allRepos = repos;
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        animateNumber(document.getElementById('total-stars'), totalStars);
        const languageFilter = document.getElementById('language-filter');
        const languages = [...new Set(repos.map(repo => repo.language).filter(Boolean))].sort();
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
        document.getElementById('repos').innerHTML = '';
        document.getElementById('error-message').classList.remove('hidden');
    });

document.getElementById('search-bar').addEventListener('input', filterRepos);
document.getElementById('language-filter').addEventListener('change', filterRepos);
document.getElementById('stars-filter').addEventListener('change', filterRepos);
document.getElementById('grid-view').addEventListener('click', () => setReposView('grid'));
document.getElementById('list-view').addEventListener('click', () => setReposView('list'));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', this.getAttribute('href'));
    });
});

// Highlights the nav link of the section currently on screen
const navLinks = [...document.querySelectorAll('.nav-link')];
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

// Fade sections in as they scroll into view
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
    });
}, { threshold: 0.12 });
document.querySelectorAll('.section .container').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Shadow under the navbar once the page is scrolled
const navbar = document.querySelector('.navbar');
const updateNavbar = () => navbar.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    const submitLabel = submitBtn.querySelector('.submit-label');
    const resetButton = () => {
        submitLabel.textContent = t('contact.send');
        submitBtn.disabled = false;
    };
    submitLabel.textContent = t('contact.sending');
    submitBtn.disabled = true;
    const formData = {
        name: document.getElementById('user_name').value.trim(),
        email: document.getElementById('user_email').value.trim(),
        message: document.getElementById('user_message').value.trim()
    };
    if (!formData.name || !formData.email || !formData.message) {
        showCustomAlert(t('contact.fillAll'));
        resetButton();
        return;
    }

    if (!emailReady) {
        showCustomAlert(t('contact.unavailable'), 5000);
        resetButton();
        return;
    }

    const lastSubmission = localStorage.getItem('lastEmailSubmission');
    const now = Date.now();
    if (lastSubmission && (now - parseInt(lastSubmission)) < 60000) { // 1 minute cooldown
        showCustomAlert(t('contact.wait'));
        resetButton();
        return;
    }

    emailjs.send(emailConfig.SERVICE_ID, emailConfig.TEMPLATE_ID, formData)
        .then(function() {
            localStorage.setItem('lastEmailSubmission', now.toString());
            showCustomAlert(t('contact.thanks', { name: formData.name }), 10000);
            document.getElementById('contact-form').reset();
        }, function(error) {
            console.error('Error sending message:', error);
            showCustomAlert(t('contact.error'));
        })
        .finally(resetButton);
});
