export const projectCategories = [
    { id: 'all', label: 'Todos los Proyectos' },
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
            'Arquitectura desacoplada y escalable',
            'Interfaz interactiva con micro-animaciones',
            'Gestión de estado global y optimización de renderizado',
            'Diseño responsivo optimizado para móviles y escritorio'
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
            'Simulaciones estadísticas Monte Carlo avanzadas',
            'Gráficos interactivos de Equity y Trade Log en tiempo real',
            'Extensión de Chrome con manifest v3 e interceptor de endpoints',
            'Cálculo de drawdowns, win rates y métricas de riesgo'
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
            'Algoritmo de detección de oportunidades de valor',
            'Filtros avanzados por mercados, ligas y rangos de beneficio',
            'Diseño enfocado en alta densidad de información sin saturación'
        ],
        tags: ['React', 'TypeScript', 'Data Analysis', 'WebSockets', 'REST API'],
        github: 'https://github.com/JesusMelville/odds-checker',
        demo: 'https://github.com/JesusMelville/odds-checker',
        category: 'tools',
        featured: true,
        color: '#10b981'
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
        tags: ['React', 'SVG Animation', 'Audio API', 'Web Workers'],
        github: 'https://github.com/JesusMelville/pomodoro-timer',
        demo: 'https://github.com/JesusMelville/pomodoro-timer',
        category: 'productivity',
        featured: false,
        color: '#ef4444'
    }
];
