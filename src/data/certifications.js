export const certCategories = [
    { id: 'all', label: 'Todas las Certificaciones' },
    { id: 'ai', label: 'Inteligencia Artificial & ML' },
    { id: 'technologies', label: 'Tecnologías' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'fullstack', label: 'Full Stack & Web' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'architecture', label: 'Arquitectura & Buenas Prácticas' }
];

export const certifications = [
    {
        id: 'cert-fundacion-calma',
        title: 'Constancia de Prácticas Pre-Profesionales – Desarrollador Front-End',
        issuer: 'Fundación Calma',
        date: '2025',
        credentialId: 'FC-FRONT-2025',
        url: 'https://github.com/JesusMelville',
        category: 'frontend',
        badgeColor: '#06b6d4',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX', 'Automatización', 'Frontend'],
        description: 'Desempeño como Desarrollador Front-End para el área de Automatización en la Fundación Calma. Responsable del desarrollo, diseño e implementación de interfaces de usuario atractivas y funcionales utilizando HTML, CSS y JavaScript. Experiencia en la integración de la UI con la lógica del servidor, así como en la prueba, depuración, documentación y soporte técnico del código.'
    },
    {
        id: 'cert-telefonica-js',
        title: 'Programación con JavaScript',
        issuer: 'Fundación Telefónica Movistar',
        date: '2023',
        credentialId: 'FT-JS-40H',
        url: 'https://github.com/JesusMelville',
        category: 'technologies',
        badgeColor: '#6366f1',
        skills: ['JavaScript ES6+', 'Lógica de Programación', 'Algoritmos', 'Estructuras de Control'],
        description: 'Completé con éxito el curso de 40 horas de Programación con JavaScript perteneciente al Programa de Formación Digital Conecta Empleo. Adquisición de conocimientos fundamentales en este lenguaje de programación, abarcando sintaxis, estructuras de control y lógica computacional para el desarrollo de aplicaciones.'
    },
    {
        id: 'cert-powerbi',
        title: 'Power Bi Básico',
        issuer: 'Netzun y San Ignacio University (SIU)',
        date: '2025',
        credentialId: 'SIU-PBI-2025',
        url: 'https://github.com/JesusMelville',
        category: 'technologies',
        badgeColor: '#f59e0b',
        skills: ['Power BI', 'Modelado de Datos', 'Dashboards', 'Business Intelligence', 'Análisis de Datos'],
        description: 'Completé el curso de Power BI Básico. Adquisición de conocimientos fundamentales para la importación, transformación y modelado de datos, así como la creación de reportes y dashboards básicos para la visualización de información e inteligencia de negocios.'
    },
    {
        id: 'cert-claude-ai',
        title: 'Aprende Claude desde Cero',
        issuer: 'Netzun',
        date: '2026',
        credentialId: 'CERT-AI-44577',
        url: 'https://github.com/JesusMelville',
        category: 'ai',
        badgeColor: '#ec4899',
        skills: ['Claude 3.5 Sonnet', 'Prompt Engineering', 'Anthropic API', 'LLMs & AI', 'Python AI'],
        description: 'Certificación en Inteligencia Artificial, técnicas avanzadas de prompt engineering, integración de modelos de lenguaje (LLMs) y desarrollo de flujos y agentes inteligentes.'
    },
    {
        id: 'cert-fullstack',
        title: 'Full Stack Web Development Professional',
        issuer: 'Platzi / Open Source Education',
        date: '2024',
        credentialId: 'CERT-FS-892401',
        url: 'https://github.com/JesusMelville',
        category: 'fullstack',
        badgeColor: '#8b5cf6',
        skills: ['JavaScript ES6+', 'React.js', 'Node.js', 'Express', 'REST APIs', 'Git Workflow'],
        description: 'Especialización en desarrollo web full stack moderno: desde la arquitectura de bases de datos y desarrollo de APIs RESTful hasta interfaces de usuario dinámicas y seguras con React.'
    }
];
