/**
 * Utility for intelligent metadata detection from Certificate files (PDF / Images)
 */

const ISSUER_RULES = [
    { regex: /deeplearning\.?ai/i, name: 'DeepLearning.AI', color: '#ec4899', url: 'https://deeplearning.ai' },
    { regex: /platzi/i, name: 'Platzi', color: '#00c853', url: 'https://platzi.com' },
    { regex: /meta|facebook/i, name: 'Meta', color: '#06b6d4', url: 'https://meta.com' },
    { regex: /google(\s*cloud)?/i, name: 'Google Cloud / Google', color: '#4285f4', url: 'https://cloud.google.com' },
    { regex: /microsoft/i, name: 'Microsoft Learn', color: '#00a4ef', url: 'https://learn.microsoft.com' },
    { regex: /aws|amazon/i, name: 'Amazon Web Services (AWS)', color: '#ff9900', url: 'https://aws.amazon.com' },
    { regex: /ibm/i, name: 'IBM Skills Network', color: '#0f62fe', url: 'https://ibm.com' },
    { regex: /coursera/i, name: 'Coursera', color: '#0056d2', url: 'https://coursera.org' },
    { regex: /udemy/i, name: 'Udemy', color: '#a435f0', url: 'https://udemy.com' },
    { regex: /edx|harvard|mit|stanford/i, name: 'edX / Harvard & MIT', color: '#b62645', url: 'https://edx.org' },
    { regex: /coderhouse/i, name: 'Coderhouse', color: '#fbbf24', url: 'https://coderhouse.com' },
    { regex: /freecodecamp/i, name: 'freeCodeCamp', color: '#0a0a23', url: 'https://freecodecamp.org' },
    { regex: /alura|oracle/i, name: 'Oracle ONE / Alura', color: '#f80000', url: 'https://aluracursos.com' },
    { regex: /linkedin/i, name: 'LinkedIn Learning', color: '#0a66c2', url: 'https://linkedin.com' },
    { regex: /openbootcamp/i, name: 'OpenBootcamp', color: '#8b5cf6', url: 'https://open-bootcamp.com' }
];

const TOPIC_RULES = [
    {
        category: 'ai',
        badgeColor: '#ec4899',
        keywords: [
            /inteligencia\s*artificial/i,
            /\bia\b/i,
            /\bai\b/i,
            /machine\s*learning/i,
            /deep\s*learning/i,
            /prompt\s*engineering/i,
            /llm/i,
            /gpt/i,
            /openai/i,
            /anthropic/i,
            /nlp/i,
            /generative\s*ai/i,
            /neural/i,
            /agentes\s*ai/i,
            /langchain/i,
            /computer\s*vision/i,
            /data\s*science/i
        ],
        suggestedSkills: ['Prompt Engineering', 'Generative AI', 'LLMs & GPT', 'OpenAI API', 'Python AI', 'Machine Learning'],
        defaultDescription: 'Certificación en Inteligencia Artificial, técnicas avanzadas de prompt engineering, integración de modelos de lenguaje (LLMs) y desarrollo de agentes autónomos.'
    },
    {
        category: 'frontend',
        badgeColor: '#06b6d4',
        keywords: [
            /react(\.?js)?/i,
            /frontend/i,
            /javascript/i,
            /typescript/i,
            /vue(\.?js)?/i,
            /angular/i,
            /next(\.?js)?/i,
            /css3?/i,
            /tailwind/i,
            /ui(\/ux)?/i,
            /web\s*design/i,
            /html5?/i,
            /atomic\s*design/i
        ],
        suggestedSkills: ['React.js', 'JavaScript ES6+', 'Atomic Design', 'Custom Hooks', 'Vite', 'CSS Modules'],
        defaultDescription: 'Especialización en desarrollo frontend reactivo, construcción de interfaces de usuario modernas, patrones de arquitectura de componentes y optimización de rendimiento web.'
    },
    {
        category: 'backend',
        badgeColor: '#10b981',
        keywords: [
            /node(\.?js)?/i,
            /backend/i,
            /express(\.?js)?/i,
            /nest(\.?js)?/i,
            /api/i,
            /rest(ful)?/i,
            /sql/i,
            /postgres(ql)?/i,
            /mongo(db)?/i,
            /database/i,
            /jwt/i,
            /graphql/i,
            /servidor/i
        ],
        suggestedSkills: ['Node.js', 'Express.js', 'REST APIs', 'Bases de Datos', 'Autenticación JWT', 'Middleware Design'],
        defaultDescription: 'Acreditación en ingeniería de backend, diseño e implementación de APIs RESTful seguras, autenticación basada en tokens y persistencia de datos.'
    },
    {
        category: 'fullstack',
        badgeColor: '#8b5cf6',
        keywords: [
            /full\s*stack/i,
            /fullstack/i,
            /mern/i,
            /mean/i,
            /desarrollo\s*web/i,
            /web\s*developer/i
        ],
        suggestedSkills: ['JavaScript ES6+', 'React.js', 'Node.js', 'Express', 'REST APIs', 'Git Workflow'],
        defaultDescription: 'Certificación integral en desarrollo web full stack moderna, cubriendo desde la arquitectura del cliente hasta los servicios de datos y despliegue.'
    },
    {
        category: 'architecture',
        badgeColor: '#f59e0b',
        keywords: [
            /architecture/i,
            /arquitectura/i,
            /clean\s*code/i,
            /solid/i,
            /patrones/i,
            /design\s*patterns/i,
            /git\b/i,
            /github/i,
            /devops/i,
            /docker/i,
            /ci[\/-]?cd/i,
            /scrum/i,
            /testing/i,
            /unit\s*test/i
        ],
        suggestedSkills: ['Clean Code', 'SOLID Principles', 'Git Flow', 'Patrones de Diseño', 'Testing & CI/CD'],
        defaultDescription: 'Especialización en buenas prácticas de ingeniería de software, arquitectura modular desacoplada, principios SOLID y flujos de trabajo profesionales.'
    }
];

function extractTextFromPdfData(base64Data) {
    if (!base64Data || !base64Data.includes('application/pdf')) return '';
    try {
        const rawBase64 = base64Data.split(',')[1] || base64Data;
        const binaryString = atob(rawBase64.substring(0, 80000)); // Sample first ~80KB

        const extractedTokens = [];

        // 1. PDF /Title (...), /Author (...)
        const titleMatch = binaryString.match(/\/Title\s*\(([^)]+)\)/i);
        if (titleMatch && titleMatch[1]) {
            extractedTokens.push(titleMatch[1]);
        }

        // 2. Simple text streams (Text) Tj
        const tjMatches = binaryString.match(/\(([^()]{3,80})\)\s*Tj/g);
        if (tjMatches) {
            tjMatches.slice(0, 30).forEach(m => {
                const cleaned = m.replace(/[\\()]/g, '').replace(/Tj/g, '').trim();
                if (cleaned.length > 2 && !/^\d+$/.test(cleaned)) {
                    extractedTokens.push(cleaned);
                }
            });
        }

        return extractedTokens.join(' ');
    } catch {
        return '';
    }
}

function cleanTitleString(str) {
    if (!str) return '';

    // Remove file extension
    let clean = str.replace(/\.(pdf|png|jpe?g|webp)$/i, '');

    // Replace separators
    clean = clean.replace(/[-_+%20]+/g, ' ');

    // Remove common prefixes
    clean = clean.replace(/^(certificado|certificate|constancia|diploma|diplome|course|curso|specialization|especializacion)\s*(de|en|of|in|para)?\s*/i, '');

    // Remove known years at the end or start
    clean = clean.replace(/\b20[12]\d\b/g, '').trim();

    // Capitalize words nicely
    const words = clean.split(' ').filter(Boolean).map(word => {
        const lower = word.toLowerCase();
        if (['de', 'en', 'y', 'e', 'a', 'la', 'el', 'los', 'las', 'por', 'for', 'and', 'of', 'in', 'to', 'with'].includes(lower)) {
            return lower;
        }
        if (['ai', 'ia', 'ui', 'ux', 'api', 'apis', 'rest', 'jwt', 'sql', 'css', 'html', 'rag', 'llm', 'llms', 'gpt', 'ibm', 'aws'].includes(lower)) {
            return lower.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    const result = words.join(' ').trim();
    return result.length > 2 ? result : 'Certificación Profesional';
}

/**
 * Main detection function
 */
export function detectCertDetailsFromFile(file, base64Data) {
    const fileName = file ? (file.name || '') : '';
    const isPdf = file ? (file.type === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf')) : false;

    const pdfExtractedText = isPdf && base64Data ? extractTextFromPdfData(base64Data) : '';
    const combinedSearchText = `${fileName} ${pdfExtractedText}`.toLowerCase();

    // 1. Detect Issuer
    let detectedIssuer = '';
    let issuerUrl = '';
    for (const rule of ISSUER_RULES) {
        if (rule.regex.test(combinedSearchText)) {
            detectedIssuer = rule.name;
            issuerUrl = rule.url;
            break;
        }
    }
    if (!detectedIssuer) {
        detectedIssuer = 'Certificación Acreditada';
    }

    // 2. Detect Year / Date
    const yearMatch = combinedSearchText.match(/\b(202[0-9]|201[8-9])\b/);
    const detectedDate = yearMatch ? yearMatch[1] : new Date().getFullYear().toString();

    // 3. Detect Topic & Category
    let matchedTopic = TOPIC_RULES.find(t => t.category === 'ai'); // fallback / check
    let highestScore = -1;
    let bestTopic = TOPIC_RULES[1]; // default frontend

    TOPIC_RULES.forEach(topic => {
        let score = 0;
        topic.keywords.forEach(kw => {
            if (kw.test(combinedSearchText)) {
                score += 2;
            }
        });
        if (score > highestScore) {
            highestScore = score;
            bestTopic = topic;
        }
    });

    matchedTopic = highestScore > 0 ? bestTopic : TOPIC_RULES[0]; // if no match, AI or general

    // 4. Generate Clean Title
    let detectedTitle = cleanTitleString(fileName);
    if (!detectedTitle || detectedTitle === 'Certificación Profesional') {
        if (matchedTopic.category === 'ai') detectedTitle = 'Inteligencia Artificial & Prompt Engineering';
        else if (matchedTopic.category === 'frontend') detectedTitle = 'Frontend & React.js Moderno';
        else if (matchedTopic.category === 'backend') detectedTitle = 'Backend Architecture & Node.js';
        else if (matchedTopic.category === 'fullstack') detectedTitle = 'Full Stack Web Development';
        else detectedTitle = 'Arquitectura de Software & Buenas Prácticas';
    }

    // 5. Credential ID
    const idPrefix = matchedTopic.category.toUpperCase().slice(0, 3);
    const randomHash = Math.floor(10000 + Math.random() * 90000);
    const detectedCredentialId = `CERT-${idPrefix}-${randomHash}`;

    // 6. Skills
    const detectedSkills = matchedTopic.suggestedSkills.join(', ');

    return {
        title: detectedTitle,
        issuer: detectedIssuer,
        date: detectedDate,
        credentialId: detectedCredentialId,
        url: issuerUrl,
        category: matchedTopic.category,
        badgeColor: matchedTopic.badgeColor,
        skills: detectedSkills,
        description: matchedTopic.defaultDescription,
        detected: true,
        detectedCategoryLabel: matchedTopic.category.toUpperCase()
    };
}
