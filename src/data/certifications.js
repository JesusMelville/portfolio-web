export const certCategories = [
    { id: 'all', label: 'Todas las Certificaciones' },
    { id: 'ai', label: 'Inteligencia Artificial & ML' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'fullstack', label: 'Full Stack & Web' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'architecture', label: 'Arquitectura & Buenas Prácticas' }
];

export const certifications = [
    {
        id: 'cert-ai-prompt',
        title: 'Generative AI & Prompt Engineering for Developers',
        issuer: 'DeepLearning.AI / OpenAI',
        date: '2024',
        credentialId: 'CERT-AI-99412',
        url: 'https://github.com/JesusMelville',
        category: 'ai',
        badgeColor: '#ec4899',
        skills: ['Prompt Engineering', 'LLMs & GPT-4', 'OpenAI API', 'Chain of Thought', 'Python AI'],
        description: 'Construcción y orquestación de aplicaciones potenciadas por Inteligencia Artificial generativa, técnicas avanzadas de prompting, integración de APIs de modelos de lenguaje e interfaces conversacionales.'
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
    },
    {
        id: 'cert-react-adv',
        title: 'React.js Avanzado & Atomic Design Patterns',
        issuer: 'Meta / Professional Specialization',
        date: '2024',
        credentialId: 'CERT-REACT-77412',
        url: 'https://github.com/JesusMelville',
        category: 'frontend',
        badgeColor: '#06b6d4',
        skills: ['Custom Hooks', 'Atomic Design', 'Context API', 'Performance Optimization', 'Vite'],
        description: 'Dominio de patrones avanzados de renderizado en React, construcción de design systems modulares basados en Atomic Design, gestión de estado y optimización de rendimiento.'
    },
    {
        id: 'cert-typescript',
        title: 'TypeScript for Enterprise Web Apps',
        issuer: 'TypeScript Mastery Academy',
        date: '2024',
        credentialId: 'CERT-TS-55319',
        url: 'https://github.com/JesusMelville',
        category: 'frontend',
        badgeColor: '#3b82f6',
        skills: ['Generics', 'Type Safety', 'Interfaces & Types', 'Strict Typing', 'Decorators'],
        description: 'Tipado estricto, abstracciones complejas, genéricos y buenas prácticas para escribir código escalable, libre de errores y mantenible en proyectos React y Node.js.'
    },
    {
        id: 'cert-backend-apis',
        title: 'Node.js, Express & Microservices Architecture',
        issuer: 'freeCodeCamp / Certified Developer',
        date: '2023',
        credentialId: 'FCC-NODE-91044',
        url: 'https://github.com/JesusMelville',
        category: 'backend',
        badgeColor: '#10b981',
        skills: ['Node.js', 'Express', 'JWT Authentication', 'MongoDB / SQL', 'Middleware Design'],
        description: 'Creación de servicios backend robustos, diseño de APIs RESTful, autenticación basada en tokens JWT, validación de esquemas y arquitectura de middlewares.'
    },
    {
        id: 'cert-clean-code',
        title: 'Clean Code, SOLID & Modern Software Architecture',
        issuer: 'Software Craftsmanship Guild',
        date: '2023',
        credentialId: 'CERT-ARCH-33102',
        url: 'https://github.com/JesusMelville',
        category: 'architecture',
        badgeColor: '#f59e0b',
        skills: ['SOLID Principles', 'DRY & KISS', 'Refactoring', 'Unit Testing Patterns', 'Design Patterns'],
        description: 'Fundamentos esenciales de arquitectura limpia, refactorización de código, patrones de diseño modulares y principios SOLID aplicados al desarrollo web frontend y backend.'
    },
    {
        id: 'cert-git-devops',
        title: 'Git, GitHub Actions & Modern CI/CD Workflows',
        issuer: 'GitLab / GitHub Professional Series',
        date: '2023',
        credentialId: 'CERT-GIT-10982',
        url: 'https://github.com/JesusMelville',
        category: 'architecture',
        badgeColor: '#ec4899',
        skills: ['Git Flow', 'GitHub Actions', 'CI/CD Pipelines', 'Branch Protection', 'Automated Testing'],
        description: 'Control de versiones profesional con Git, gestión de ramas, resolución de conflictos complejos y automatización de despliegues continuos mediante GitHub Actions.'
    }
];
