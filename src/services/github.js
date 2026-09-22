/**
 * Service to fetch and transform GitHub repositories for JesusMelville
 */

export const GITHUB_USERNAME = 'JesusMelville';

// Pre-defined category heuristics and curated metadata
const KNOWN_PROJECT_META = {
    'buccle': {
        title: 'Buccle Platform',
        subtitle: 'Plataforma Web Interactiva y Social',
        category: 'fullstack',
        featured: true,
        color: '#8b5cf6',
        tags: ['React', 'Full Stack', 'Tailwind/CSS', 'REST API']
    },
    'market': {
        title: 'Market Analytics & Extension',
        subtitle: 'Dashboard de Trading & Extensión de Navegador',
        category: 'tools',
        featured: true,
        color: '#06b6d4',
        tags: ['React', 'TypeScript', 'Chrome Extension', 'Analytics']
    },
    'odds-checker': {
        title: 'Odds Checker Pro',
        subtitle: 'Analizador Probabilístico y Comparador de Cuotas',
        category: 'tools',
        featured: true,
        color: '#10b981',
        tags: ['React', 'TypeScript', 'Data Analysis', 'REST API']
    },
    'taskflow': {
        title: 'TaskFlow System',
        subtitle: 'Gestor de Tareas con Atomic Design',
        category: 'productivity',
        featured: true,
        color: '#6366f1',
        tags: ['React', 'Atomic Design', 'Context API', 'CSS Modules']
    },
    'weather-app': {
        title: 'WeatherSphere Pro',
        subtitle: 'Pronóstico Meteorológico con Geolocalización',
        category: 'frontend',
        featured: false,
        color: '#0ea5e9',
        tags: ['React', 'REST API', 'Geolocation', 'CSS Grid']
    },
    'password-generator': {
        title: 'CryptoPass Generator',
        subtitle: 'Generador Criptográfico de Contraseñas',
        category: 'tools',
        featured: false,
        color: '#10b981',
        tags: ['React', 'Web Crypto API', 'Security', 'Vanilla CSS']
    },
    'expense-tracker': {
        title: 'FinTrack Expense Manager',
        subtitle: 'Control Financiero y Balance de Gastos',
        category: 'productivity',
        featured: false,
        color: '#f59e0b',
        tags: ['React', 'Context API', 'Data Visualization', 'LocalStorage']
    },
    'pomodoro-timer': {
        title: 'FocusFlow Pomodoro',
        subtitle: 'Temporizador de Productividad y Enfoque',
        category: 'productivity',
        featured: false,
        color: '#ef4444',
        tags: ['React', 'SVG Animation', 'Audio API', 'Web Workers']
    },
    'quiz-app': {
        title: 'QuizSphere Interactive',
        subtitle: 'App de Quizzes y Preguntas Dinámicas',
        category: 'frontend',
        featured: false,
        color: '#ec4899',
        tags: ['React', 'State Management', 'Animations']
    },
    'blog-personal': {
        title: 'Blog Minimalista SPA',
        subtitle: 'Plataforma de Artículos y Lectura',
        category: 'frontend',
        featured: false,
        color: '#8b5cf6',
        tags: ['React', 'React Router', 'CSS Modules']
    },
    'build-the-sentence': {
        title: 'Build The Sentence',
        subtitle: 'Juego Educativo de Construcción de Oraciones',
        category: 'tools',
        featured: false,
        color: '#f97316',
        tags: ['Java', 'JavaFX 17', 'MVC Architecture', 'Education']
    }
};

/**
 * Format repository name to Title Case
 */
function formatRepoTitle(name) {
    if (KNOWN_PROJECT_META[name.toLowerCase()]?.title) {
        return KNOWN_PROJECT_META[name.toLowerCase()].title;
    }
    return name
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Deduce default category based on repo info
 */
function deduceCategory(repo) {
    const name = repo.name.toLowerCase();
    if (KNOWN_PROJECT_META[name]?.category) {
        return KNOWN_PROJECT_META[name].category;
    }
    const desc = (repo.description || '').toLowerCase();
    const lang = (repo.language || '').toLowerCase();

    if (desc.includes('full stack') || desc.includes('fullstack') || desc.includes('backend')) {
        return 'fullstack';
    }
    if (desc.includes('productividad') || desc.includes('task') || desc.includes('timer') || desc.includes('tracker')) {
        return 'productivity';
    }
    if (desc.includes('extension') || desc.includes('generator') || desc.includes('herramienta') || desc.includes('checker') || lang === 'java') {
        return 'tools';
    }
    return 'frontend';
}

/**
 * Fetch all public GitHub repositories for the user
 */
export async function fetchGitHubRepos(username = GITHUB_USERNAME) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }
        const repos = await response.json();

        // Filter out profile README repository if name matches username
        const filteredRepos = repos.filter(repo => repo.name.toLowerCase() !== username.toLowerCase());

        return filteredRepos.map(repo => {
            const nameLower = repo.name.toLowerCase();
            const curated = KNOWN_PROJECT_META[nameLower] || {};

            const tags = curated.tags || [
                repo.language,
                ...(repo.topics || [])
            ].filter(Boolean);

            if (tags.length === 0) {
                tags.push('JavaScript', 'Web');
            }

            return {
                id: repo.name,
                name: repo.name,
                title: curated.title || formatRepoTitle(repo.name),
                subtitle: curated.subtitle || (repo.language ? `Desarrollado con ${repo.language}` : 'Proyecto de Código Abierto'),
                description: repo.description || curated.description || 'Proyecto desarrollado con buenas prácticas de software y código modular.',
                longDescription: curated.longDescription || repo.description || 'Proyecto disponible en GitHub con código fuente abierto.',
                features: curated.features || [
                    'Control de versiones en GitHub',
                    'Estructura de código modular',
                    `Tecnología principal: ${repo.language || 'JavaScript'}`
                ],
                tags: tags,
                github: repo.html_url,
                demo: repo.homepage || curated.demo || repo.html_url,
                category: curated.category || deduceCategory(repo),
                featured: curated.featured !== undefined ? curated.featured : repo.stargazers_count > 0,
                color: curated.color || '#8b5cf6',
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                language: repo.language,
                updatedAt: repo.updated_at,
                visible: true,
                isFromGitHub: true
            };
        });
    } catch (error) {
        console.warn('Error fetching GitHub repos:', error);
        throw error;
    }
}
