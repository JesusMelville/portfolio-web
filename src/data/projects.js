export const projectCategories = [
    { id: 'all', label: 'Todos los Proyectos' },
    { id: 'ai', label: 'Inteligencia Artificial & ML' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'tools', label: 'Extensiones & Herramientas' },
    { id: 'productivity', label: 'Productividad' }
];

export const projects = [
    {
        id: 'buccle',
        title: 'Buccle Platform',
        subtitle: 'Plataforma Web Interactiva y Social',
        description: 'Aplicación web completa con arquitectura modular, diseño dinámico, gestión de usuarios en tiempo real y componentes interactivos de alta fidelidad.',
        longDescription: 'Buccle es un proyecto integral desarrollado para ofrecer una experiencia social interactiva. Implementa arquitectura basada en componentes reutilizables, gestión de estado eficiente, navegación reactiva y una interfaz optimizada con estética oscura moderna.',
        features: [
            'Arquitectura desacoplada y escalable basada en Atomic Design',
            'Interfaz interactiva con micro-animaciones a 120 FPS',
            'Gestión de estado global y optimización de renderizado',
            'Diseño responsivo optimizado para móviles y escritorio'
        ],
        metrics: [
            { label: 'Rendimiento Lighthouse', value: '98/100' },
            { label: 'Arquitectura Modular', value: 'Atomic Design' },
            { label: 'Fluidez de Renderizado', value: '120 FPS' },
            { label: 'Tiempo de Carga', value: '<0.8s' }
        ],
        tags: ['React', 'JavaScript', 'Tailwind/CSS', 'Full Stack', 'REST API'],
        github: 'https://github.com/JesusMelville/Buccle',
        demo: 'https://github.com/JesusMelville/Buccle',
        category: 'fullstack',
        featured: true,
        color: '#8b5cf6'
    },
    {
        id: 'market-analytics',
        title: 'Market Analytics & Extension',
        subtitle: 'Dashboard de Trading & Extensión de Navegador',
        description: 'Suite analítica para traders con simulación Monte Carlo, cálculo de streaks, gráficos de equity en vivo e interceptor de red mediante extensión de Chrome.',
        longDescription: 'Sistema avanzado que combina una extensión de Chrome (con interceptor de tráfico y scripts de contenido) junto con un dashboard en React y TypeScript que procesa datos de mercado, ejecuta simulaciones estadísticas Monte Carlo y visualiza curvas de rendimiento financiero.',
        features: [
            'Simulaciones estadísticas Monte Carlo avanzadas con 10,000 iteraciones',
            'Gráficos interactivos de Equity y Trade Log en tiempo real',
            'Extensión de Chrome con manifest v3 e interceptor de endpoints',
            'Cálculo de drawdowns, win rates y métricas de riesgo estocástico'
        ],
        metrics: [
            { label: 'Simulaciones Monte Carlo', value: '10K Iteraciones' },
            { label: 'Latencia Interceptor', value: '<5ms' },
            { label: 'Precisión Estadística', value: '99.9%' },
            { label: 'Arquitectura Extensión', value: 'Manifest v3' }
        ],
        tags: ['React', 'TypeScript', 'Chrome Extension', 'Analytics', 'Charts'],
        github: 'https://github.com/JesusMelville',
        demo: 'https://github.com/JesusMelville',
        category: 'tools',
        featured: true,
        color: '#06b6d4'
    },
    {
        id: 'odds-checker',
        title: 'Odds Checker Pro',
        subtitle: 'Analizador Probabilístico y Comparador de Cuotas',
        description: 'Plataforma para monitorizar, comparar y analizar cuotas probabilísticas en tiempo real con algoritmos de detección de valor y arbitraje.',
        longDescription: 'Herramienta especializada construida para comparar cuotas entre múltiples plataformas en tiempo real, detectando discrepancias estadísticas y ofreciendo cálculos de expectativa matemática positiva de forma automática.',
        features: [
            'Comparador de cuotas multicanal en tiempo real',
            'Algoritmo de detección de oportunidades de valor probabilístico',
            'Filtros avanzados por mercados, ligas y rangos de beneficio',
            'Diseño enfocado en alta densidad de información sin saturación'
        ],
        metrics: [
            { label: 'Fuentes de Datos', value: 'Multi-Plataforma' },
            { label: 'Cálculo de Expectativa', value: 'Tiempo Real' },
            { label: 'Latencia de Actualización', value: '<50ms' },
            { label: 'Detección de Arbitraje', value: 'Automática' }
        ],
        tags: ['React', 'TypeScript', 'Data Analysis', 'WebSockets', 'REST API'],
        github: 'https://github.com/JesusMelville/odds-checker',
        demo: 'https://github.com/JesusMelville/odds-checker',
        category: 'tools',
        featured: true,
        color: '#10b981'
    },
    {
        id: 'ai-prompt-agent',
        title: 'Nexus AI Prompt & Agent Studio',
        subtitle: 'Plataforma de Ingeniería de Prompts y Agentes LLM',
        description: 'Estudio interactivo para diseñar, evaluar y orquestar prompts avanzados y agentes autónomos con integración directa a modelos de OpenAI y Claude.',
        longDescription: 'Entorno de desarrollo para inteligencia artificial generativa con soporte para cadenas de razonamiento (Chain of Thought), evaluación automática de respuestas, almacenamiento de contexto y herramientas para conectar APIs externas mediante function calling.',
        features: [
            'Orquestación de agentes autónomos con llamada a funciones (Function Calling)',
            'Editor y optimizador de prompts con métricas de costo y tokens',
            'Transmisión de respuestas en tiempo real mediante Server-Sent Events (SSE)',
            'Memoria conversacional y gestión de contexto dinámico'
        ],
        metrics: [
            { label: 'Modelos Soportados', value: 'GPT-4o & Claude 3.5' },
            { label: 'Latencia Stream', value: '<120ms' },
            { label: 'Ahorro de Tokens', value: '+35%' },
            { label: 'Soporte Function Calling', value: '100% Nativo' }
        ],
        tags: ['React', 'TypeScript', 'OpenAI API', 'LLMs', 'Prompt Engineering'],
        github: 'https://github.com/JesusMelville',
        demo: 'https://github.com/JesusMelville',
        category: 'ai',
        featured: true,
        color: '#ec4899'
    },
    {
        id: 'taskflow',
        title: 'TaskFlow System',
        subtitle: 'Gestor de Tareas con Atomic Design',
        description: 'Gestor de tareas y flujos de trabajo con CRUD completo, prioridades visuales, filtros por estado, modo oscuro y persistencia local.',
        longDescription: 'Aplicación construida siguiendo rigurosamente los principios de Atomic Design para garantizar la máxima reutilización de componentes atómicos, moleculares y organismos. Cuenta con arrastre visual, filtros instantáneos y feedback háptico/visual.',
        features: [
            'Implementación estricta de Atomic Design',
            'Filtrado y ordenamiento dinámico por prioridad y fecha',
            'Gestión de estado global con Context API',
            'Persistencia automática en LocalStorage'
        ],
        metrics: [
            { label: 'Reutilización Componentes', value: '95%' },
            { label: 'Persistencia Local', value: 'Instantánea' },
            { label: 'Modos de Visualización', value: 'Lista & Tablero' }
        ],
        tags: ['React', 'Atomic Design', 'Context API', 'CSS Modules'],
        github: 'https://github.com/JesusMelville/taskflow',
        demo: 'https://github.com/JesusMelville/taskflow',
        category: 'productivity',
        featured: false,
        color: '#6366f1'
    },
    {
        id: 'weather-app',
        title: 'WeatherSphere Pro',
        subtitle: 'Pronóstico Meteorológico con Geolocalización',
        description: 'Aplicación meteorológica en tiempo real con geolocalización automática, pronóstico de 5 días, métricas climáticas detalladas y búsqueda por ciudades.',
        longDescription: 'Aplicación que consume servicios meteorológicos internacionales para presentar información del tiempo precisa con animaciones temáticas según las condiciones actuales (lluvia, sol, tormenta) y conversión inmediata de unidades Celsius/Fahrenheit.',
        features: [
            'Detección automática de ubicación con Geolocation API',
            'Pronósticos extendidos por horas y días',
            'Indicadores UV, humedad, presión y velocidad del viento',
            'Tematización dinámica basada en el clima actual'
        ],
        metrics: [
            { label: 'Precisión Climática', value: 'API en Vivo' },
            { label: 'Pronóstico Extendido', value: '5 Días' },
            { label: 'Geolocalización', value: 'Automática' }
        ],
        tags: ['React', 'REST API', 'Geolocation', 'CSS Grid'],
        github: 'https://github.com/JesusMelville/weather-app',
        demo: 'https://github.com/JesusMelville/weather-app',
        category: 'frontend',
        featured: false,
        color: '#0ea5e9'
    },
    {
        id: 'password-generator',
        title: 'CryptoPass Generator',
        subtitle: 'Generador Criptográfico de Contraseñas',
        description: 'Generador de contraseñas de alta seguridad impulsado por Web Crypto API con medidor de entropía, opciones personalizables y copiado al portapapeles.',
        longDescription: 'Herramienta de seguridad para usuarios y desarrolladores que genera claves criptográficamente seguras con análisis de entropía en tiempo real, opciones de caracteres especiales, exclusión de caracteres ambiguos y copiado con un clic.',
        features: [
            'Generación mediante Web Crypto API del navegador',
            'Algoritmo de cálculo de entropía y fortaleza en tiempo real',
            'Configuración granular de longitud y tipos de caracteres',
            'Historial temporal seguro en sesión'
        ],
        metrics: [
            { label: 'Seguridad Criptográfica', value: 'Web Crypto API' },
            { label: 'Entropía Máxima', value: '128+ Bits' },
            { label: 'Generación', value: '<1ms' }
        ],
        tags: ['React', 'Web Crypto API', 'Security', 'Vanilla CSS'],
        github: 'https://github.com/JesusMelville/password-generator',
        demo: 'https://github.com/JesusMelville/password-generator',
        category: 'tools',
        featured: false,
        color: '#10b981'
    },
    {
        id: 'expense-tracker',
        title: 'FinTrack Expense Manager',
        subtitle: 'Control Financiero y Balance de Gastos',
        description: 'Dashboard personal para registro y categorización de ingresos/gastos, balance en tiempo real, desglose porcentual y estadísticas visuales.',
        longDescription: 'Solución intuitiva de finanzas personales diseñada para monitorear presupuestos mensuales, clasificar gastos en categorías y visualizar desgloses porcentuales para optimizar el ahorro.',
        features: [
            'Cálculo dinámico de balance total, ingresos y egresos',
            'Categorización visual de transacciones con badges',
            'Filtrado por rangos de fecha y conceptos',
            'Persistencia segura de registros'
        ],
        metrics: [
            { label: 'Balance en Vivo', value: 'Tiempo Real' },
            { label: 'Desglose Visual', value: 'Por Categorías' }
        ],
        tags: ['React', 'Context API', 'Data Visualization', 'LocalStorage'],
        github: 'https://github.com/JesusMelville/expense-tracker',
        demo: 'https://github.com/JesusMelville/expense-tracker',
        category: 'productivity',
        featured: false,
        color: '#f59e0b'
    },
    {
        id: 'pomodoro-timer',
        title: 'FocusFlow Pomodoro',
        subtitle: 'Temporizador de Productividad y Enfoque',
        description: 'Temporizador Pomodoro con ciclos configurables de trabajo/descanso, gráficos de progreso circular SVG y alertas auditivas.',
        longDescription: 'Aplicación diseñada para elevar el foco y la productividad aplicando la técnica Pomodoro, con selector de tiempos personalizados, modos de descanso corto/largo y contador de sesiones completadas.',
        features: [
            'Progreso circular reactivo renderizado con SVG dinámico',
            'Configuración personalizada de intervalos y descansos',
            'Notificaciones del navegador y avisos auditivos suaves',
            'Historial de rachas de concentración'
        ],
        metrics: [
            { label: 'Precisión Temporal', value: 'Web Workers' },
            { label: 'Renderizado Gráfico', value: 'SVG Reactivo' }
        ],
        tags: ['React', 'SVG Animation', 'Audio API', 'Web Workers'],
        github: 'https://github.com/JesusMelville/pomodoro-timer',
        demo: 'https://github.com/JesusMelville/pomodoro-timer',
        category: 'productivity',
        featured: false,
        color: '#ef4444'
    }
];
