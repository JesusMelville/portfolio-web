export const profile = {
    name: 'Jesus Melville',
    title: 'Desarrollador Web Full Stack',
    bio: 'Creo aplicaciones web modernas y escalables. Apasionado por el codigo limpio, las buenas practicas y la experiencia de usuario.',
    location: 'Rep Dominicana',
    email: 'jesusmelvillemm@gmail.com',
    github: 'https://github.com/JesusMelville',
    avatar: 'https://avatars.githubusercontent.com/u/222508878'
};

export const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'utilities', label: 'Utilidades' },
    { id: 'productivity', label: 'Productividad' }
];

export const projects = [
    {
        id: 1,
        title: 'TaskFlow',
        description: 'Gestor de tareas moderno con CRUD completo, filtros, prioridades y modo oscuro.',
        tags: ['React', 'Atomic Design', 'Context API'],
        github: 'https://github.com/JesusMelville/taskflow',
        color: '#6c5ce7',
        category: 'frontend'
    },
    {
        id: 2,
        title: 'WeatherApp',
        description: 'Aplicacion del clima con geolocalizacion, pronostico a 5 dias y toggle metricas/imperial.',
        tags: ['React', 'API REST', 'Geolocation'],
        github: 'https://github.com/JesusMelville/weather-app',
        color: '#0ea5e9',
        category: 'utilities'
    },
    {
        id: 3,
        title: 'Blog Personal',
        description: 'Blog minimalista con routing SPA, busqueda y dark/light mode.',
        tags: ['React', 'React Router', 'CSS Modules'],
        github: 'https://github.com/JesusMelville/blog-personal',
        color: '#8b5cf6',
        category: 'frontend'
    },
    {
        id: 4,
        title: 'Pomodoro Timer',
        description: 'Temporizador de productividad con estadisticas, configuracion y notificaciones.',
        tags: ['React', 'Context API', 'SVG'],
        github: 'https://github.com/JesusMelville/pomodoro-timer',
        color: '#ef4444',
        category: 'productivity'
    },
    {
        id: 5,
        title: 'Password Generator',
        description: 'Generador de contrasenas seguras con Web Crypto API y indicador de fortaleza.',
        tags: ['React', 'Crypto API', 'Tailwind'],
        github: 'https://github.com/JesusMelville/password-generator',
        color: '#10b981',
        category: 'utilities'
    },
    {
        id: 6,
        title: 'Quiz App',
        description: 'App de quizzes interactivos con multiples categorias y explicaciones.',
        tags: ['React', 'State Management', 'Animations'],
        github: 'https://github.com/JesusMelville/quiz-app',
        color: '#ec4899',
        category: 'utilities'
    },
    {
        id: 7,
        title: 'Expense Tracker',
        description: 'Control de gastos personales con balance, historial y persistencia.',
        tags: ['React', 'Context API', 'localStorage'],
        github: 'https://github.com/JesusMelville/expense-tracker',
        color: '#f59e0b',
        category: 'productivity'
    }
];

export const skills = [
    { name: 'JavaScript', level: 90, icon: '🟨' },
    { name: 'React', level: 85, icon: '⚛️' },
    { name: 'Node.js', level: 75, icon: '🟢' },
    { name: 'CSS/SASS', level: 85, icon: '🎨' },
    { name: 'TypeScript', level: 70, icon: '🔷' },
    { name: 'Git', level: 80, icon: '📦' },
    { name: 'Vite', level: 80, icon: '⚡' },
    { name: 'Python', level: 60, icon: '🐍' }
];

export const stats = [
    { label: 'Proyectos', value: 7 },
    { label: 'Commits', value: '100+' },
    { label: 'Tecnologias', value: 8 }
];
