export const skillCategories = [
    {
        id: 'frontend',
        title: 'Frontend & UI Engineering',
        icon: 'code',
        description: 'Construcción de interfaces reactivas, modernas, accesibles y de alta fidelidad visual.',
        skills: [
            { name: 'JavaScript (ES6+)', level: 92, badge: 'Avanzado', highlight: true },
            { name: 'React 18+ / SPA', level: 90, badge: 'Avanzado', highlight: true },
            { name: 'Next.js (App Router & SSR)', level: 85, badge: 'Avanzado', highlight: true },
            { name: 'TypeScript', level: 82, badge: 'Intermedio-Alto', highlight: true },
            { name: 'HTML5 & Semántica SEO', level: 95, badge: 'Avanzado', highlight: false },
            { name: 'CSS3 / SASS / Modules', level: 88, badge: 'Avanzado', highlight: false },
            { name: 'Tailwind CSS', level: 85, badge: 'Avanzado', highlight: false },
            { name: 'Responsive & Mobile First', level: 94, badge: 'Avanzado', highlight: true },
            { name: 'WebSockets & Real-Time UI', level: 80, badge: 'Intermedio-Alto', highlight: false },
            { name: 'PWA / Progressive Web Apps', level: 78, badge: 'Intermedio', highlight: false }
        ]
    },
    {
        id: 'backend',
        title: 'Backend, Bases de Datos & Cloud',
        icon: 'terminal',
        description: 'Desarrollo de servicios robustos, lógica de servidor, persistencia y computación en la nube.',
        skills: [
            { name: 'Node.js & Express.js', level: 82, badge: 'Avanzado', highlight: true },
            { name: 'RESTful APIs', level: 88, badge: 'Avanzado', highlight: true },
            { name: 'PostgreSQL & MySQL', level: 82, badge: 'Intermedio-Alto', highlight: true },
            { name: 'Supabase & Firebase', level: 80, badge: 'Intermedio-Alto', highlight: false },
            { name: 'Docker & Contenedores', level: 76, badge: 'Intermedio', highlight: false },
            { name: 'Serverless & Cloud Functions', level: 78, badge: 'Intermedio', highlight: false },
            { name: 'Autenticación & JWT', level: 80, badge: 'Intermedio-Alto', highlight: false },
            { name: 'MongoDB / Bases NoSQL', level: 75, badge: 'Intermedio', highlight: false }
        ]
    },
    {
        id: 'ai',
        title: 'Inteligencia Artificial & Automatización',
        icon: 'brain',
        description: 'Ingeniería de prompts, integración de modelos de lenguaje (LLMs), agentes y visión por computadora.',
        skills: [
            { name: 'Prompt Engineering & LLMs', level: 90, badge: 'Avanzado', highlight: true },
            { name: 'Claude 3.5 & Anthropic API', level: 88, badge: 'Avanzado', highlight: true },
            { name: 'OpenAI API & Integración AI', level: 88, badge: 'Avanzado', highlight: true },
            { name: 'Modelos Locales (Ollama / DeepSeek)', level: 82, badge: 'Intermedio-Alto', highlight: false },
            { name: 'Computer Vision & OCR / Document AI', level: 80, badge: 'Intermedio-Alto', highlight: false },
            { name: 'Automatización & Agentes AI', level: 84, badge: 'Intermedio-Alto', highlight: true },
            { name: 'Python para IA & Scripting', level: 82, badge: 'Intermedio-Alto', highlight: true },
            { name: 'RAG & Embeddings de Contexto', level: 78, badge: 'Intermedio', highlight: false }
        ]
    },
    {
        id: 'tools',
        title: 'Herramientas, DevOps & Especialidades',
        icon: 'sparkles',
        description: 'Flujo de trabajo ágil, control de versiones, scraping, maquetación y estándares de ingeniería.',
        skills: [
            { name: 'Git & GitHub Workflow', level: 88, badge: 'Avanzado', highlight: true },
            { name: 'Web Scraping (Playwright / Puppeteer)', level: 84, badge: 'Intermedio-Alto', highlight: true },
            { name: 'Atomic Design & Modularidad', level: 92, badge: 'Avanzado', highlight: true },
            { name: 'Chrome Extensions (Manifest V3)', level: 84, badge: 'Intermedio-Alto', highlight: true },
            { name: 'Linux & Bash Scripting', level: 78, badge: 'Intermedio', highlight: false },
            { name: 'Postman & Pruebas de APIs', level: 85, badge: 'Avanzado', highlight: false },
            { name: 'Figma to Code', level: 86, badge: 'Avanzado', highlight: false },
            { name: 'Vite & Tooling Moderno', level: 86, badge: 'Avanzado', highlight: false },
            { name: 'Clean Code & SOLID', level: 85, badge: 'Avanzado', highlight: false },
            { name: 'CI/CD & GitHub Actions', level: 76, badge: 'Intermedio', highlight: false }
        ]
    }
];
