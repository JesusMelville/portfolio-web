export const skillCategories = [
    {
        id: 'frontend',
        title: 'Frontend & UI Engineering',
        icon: 'code',
        description: 'Construcción de interfaces reactivas, modernas y de alta fidelidad visual.',
        skills: [
            { name: 'JavaScript (ES6+)', level: 92, badge: 'Avanzado', highlight: true },
            { name: 'React 18+ / SPA', level: 90, badge: 'Avanzado', highlight: true },
            { name: 'TypeScript', level: 82, badge: 'Intermedio-Alto', highlight: true },
            { name: 'HTML5 & Semántica SEO', level: 95, badge: 'Avanzado', highlight: false },
            { name: 'CSS3 / SASS / Modules', level: 88, badge: 'Avanzado', highlight: false },
            { name: 'Tailwind CSS', level: 85, badge: 'Avanzado', highlight: false },
            { name: 'Responsive & Mobile First', level: 94, badge: 'Avanzado', highlight: true }
        ]
    },
    {
        id: 'backend',
        title: 'Backend & APIs',
        icon: 'terminal',
        description: 'Desarrollo de servicios robustos, lógica de servidor y comunicación de datos.',
        skills: [
            { name: 'Node.js', level: 80, badge: 'Intermedio-Alto', highlight: true },
            { name: 'Express.js', level: 82, badge: 'Intermedio-Alto', highlight: false },
            { name: 'RESTful APIs', level: 88, badge: 'Avanzado', highlight: true },
            { name: 'Autenticación & JWT', level: 78, badge: 'Intermedio', highlight: false },
            { name: 'MongoDB / Bases NoSQL', level: 75, badge: 'Intermedio', highlight: false },
            { name: 'SQL Básico / Relacional', level: 70, badge: 'Intermedio', highlight: false }
        ]
    },
    {
        id: 'tools',
        title: 'Herramientas, DevOps & Arquitectura',
        icon: 'sparkles',
        description: 'Flujo de trabajo ágil, control de versiones y estándares de ingeniería.',
        skills: [
            { name: 'Git & GitHub Workflow', level: 88, badge: 'Avanzado', highlight: true },
            { name: 'Vite & Webpack', level: 86, badge: 'Avanzado', highlight: false },
            { name: 'Atomic Design & Modularidad', level: 92, badge: 'Avanzado', highlight: true },
            { name: 'Chrome Extensions API', level: 84, badge: 'Intermedio-Alto', highlight: true },
            { name: 'Clean Code & SOLID', level: 85, badge: 'Avanzado', highlight: false },
            { name: 'CI/CD & GitHub Actions', level: 75, badge: 'Intermedio', highlight: false }
        ]
    }
];
