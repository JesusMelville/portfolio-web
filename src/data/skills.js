export const skillCategories = [
    {
        id: 'frontend',
        title: 'Frontend & UI',
        icon: 'code',
        description: 'Construcción de interfaces modernas, reactivas, accesibles y aplicaciones web escalables.',
        skills: [
            { name: 'JavaScript (ES6+)', level: 78, badge: 'Intermedio', highlight: true },
            { name: 'React 18+ / SPA', level: 76, badge: 'Intermedio', highlight: true },
            { name: 'HTML5 & CSS3 Semántico', level: 82, badge: 'Intermedio-Alto', highlight: true },
            { name: 'TypeScript', level: 70, badge: 'Intermedio', highlight: true },
            { name: 'Next.js (App Router & SSR)', level: 68, badge: 'Intermedio', highlight: false },
            { name: 'Tailwind CSS & Modules', level: 74, badge: 'Intermedio', highlight: false },
            { name: 'Angular', level: 65, badge: 'Básico-Intermedio', highlight: false },
            { name: 'Astro', level: 66, badge: 'Básico-Intermedio', highlight: false },
            { name: 'Responsive & Mobile First', level: 80, badge: 'Intermedio-Alto', highlight: true },
            { name: 'WebSockets & Real-Time UI', level: 64, badge: 'En Práctica', highlight: false }
        ]
    },
    {
        id: 'backend',
        title: 'Conocimiento Backend & Integración',
        icon: 'terminal',
        description: 'Lógica de servidor, arquitectura de APIs, servicios cloud y persistencia relacional/NoSQL.',
        skills: [
            { name: 'APIs REST & Arquitectura', level: 76, badge: 'Intermedio', highlight: true },
            { name: 'PostgreSQL & MySQL', level: 74, badge: 'Intermedio', highlight: true },
            { name: 'Node.js & Express.js', level: 72, badge: 'Intermedio', highlight: true },
            { name: 'Java (Spring / POO / Backend)', level: 70, badge: 'Intermedio', highlight: true },
            { name: 'Python (Backend & Scripting)', level: 72, badge: 'Intermedio', highlight: false },
            { name: 'NestJS', level: 65, badge: 'Básico-Intermedio', highlight: false },
            { name: 'Supabase & Firebase', level: 68, badge: 'Intermedio', highlight: false },
            { name: 'Autenticación & JWT', level: 70, badge: 'Intermedio', highlight: false },
            { name: 'MongoDB / Bases NoSQL', level: 65, badge: 'Básico-Intermedio', highlight: false }
        ]
    },
    {
        id: 'desktop',
        title: 'Desktop & Extensiones',
        icon: 'layers',
        description: 'Desarrollo de aplicaciones de escritorio y extensiones de navegador.',
        skills: [
            { name: 'Chrome Extensions (Manifest V3)', level: 74, badge: 'Intermedio', highlight: true },
            { name: 'Electron.js', level: 68, badge: 'Intermedio', highlight: true },
            { name: 'JavaFX', level: 66, badge: 'Básico-Intermedio', highlight: false },
            { name: 'PWA / Progressive Web Apps', level: 68, badge: 'Intermedio', highlight: false }
        ]
    },
    {
        id: 'ai',
        title: 'Inteligencia Artificial & Automatización',
        icon: 'brain',
        description: 'Ingeniería de prompts, integración de modelos de lenguaje (LLMs) y automatización.',
        skills: [
            { name: 'Prompt Engineering & LLMs', level: 78, badge: 'Intermedio-Alto', highlight: true },
            { name: 'Claude 3.5 & Anthropic API', level: 74, badge: 'Intermedio', highlight: true },
            { name: 'OpenAI API & Integración AI', level: 74, badge: 'Intermedio', highlight: true },
            { name: 'Modelos Locales (Ollama / DeepSeek)', level: 68, badge: 'Intermedio', highlight: false },
            { name: 'Computer Vision & OCR / Document AI', level: 65, badge: 'En Práctica', highlight: false },
            { name: 'Automatización & Agentes AI', level: 70, badge: 'Intermedio', highlight: false },
            { name: 'RAG & Embeddings de Contexto', level: 65, badge: 'En Práctica', highlight: false }
        ]
    },
    {
        id: 'tools',
        title: 'Herramientas & DevOps',
        icon: 'sparkles',
        description: 'Control de versiones, contenedores, pruebas de software y flujo de trabajo profesional.',
        skills: [
            { name: 'Git, GitHub & GitLab', level: 78, badge: 'Intermedio-Alto', highlight: true },
            { name: 'Postman & Pruebas de APIs', level: 75, badge: 'Intermedio', highlight: true },
            { name: 'Web Scraping (Playwright / Puppeteer)', level: 70, badge: 'Intermedio', highlight: true },
            { name: 'Atomic Design & Modularidad', level: 76, badge: 'Intermedio', highlight: false },
            { name: 'Docker & Docker Compose', level: 64, badge: 'Básico-Intermedio', highlight: false },
            { name: 'Linux & Bash Scripting', level: 65, badge: 'Básico-Intermedio', highlight: false },
            { name: 'Figma to Code', level: 74, badge: 'Intermedio', highlight: false },
            { name: 'Vite & Tooling Moderno', level: 75, badge: 'Intermedio', highlight: false },
            { name: 'CI/CD & GitHub Actions', level: 62, badge: 'Básico', highlight: false }
        ]
    }
];
