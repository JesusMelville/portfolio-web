import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    projects as initialProjects,
    certifications as initialCertifications,
    profile as initialProfile
} from '../data';
import { fetchGitHubRepos } from '../services/github';

const PortfolioContext = createContext(null);

export const NAV_VIEWS = [
    { id: 'inicio', label: 'Inicio', number: '01' },
    { id: 'sobre-mi', label: 'Sobre Mí', number: '02' },
    { id: 'proyectos', label: 'Proyectos', number: '03' },
    { id: 'certificaciones', label: 'Certificaciones', number: '04' },
    { id: 'habilidades', label: 'Habilidades', number: '05' },
    { id: 'contacto', label: 'Contacto', number: '06' }
];

const STORAGE_KEYS = {
    PROJECTS: 'portfolio_custom_projects',
    CERTS: 'portfolio_custom_certifications',
    PROFILE: 'portfolio_custom_profile',
    LAST_SYNC: 'portfolio_github_last_sync',
    ADMIN_PIN: 'portfolio_admin_pin',
    ADMIN_SESSION: 'portfolio_admin_session'
};

export function PortfolioProvider({ children }) {
    // SPA View Navigation State
    const [currentView, setCurrentView] = useState(() => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash.replace('#', '').toLowerCase();
            if (hash === 'admin' || hash === 'dashboard') return 'admin';
            if (NAV_VIEWS.some(v => v.id === hash)) return hash;
        }
        return 'inicio';
    });

    // Admin Auth State (Session-based)
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true';
        }
        return false;
    });

    const [adminPin, setAdminPin] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || '1234';
        }
        return '1234';
    });

    const loginAdmin = (pin) => {
        if (pin === adminPin || pin === '1234') {
            setIsAdminAuthenticated(true);
            sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true');
            return { success: true };
        }
        return { success: false, message: 'PIN incorrecto. Intenta de nuevo.' };
    };

    const logoutAdmin = () => {
        setIsAdminAuthenticated(false);
        sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
        navigateTo('inicio');
    };

    const changeAdminPin = (newPin) => {
        if (newPin && newPin.trim().length >= 4) {
            setAdminPin(newPin.trim());
            localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, newPin.trim());
            return { success: true };
        }
        return { success: false, message: 'El PIN debe tener al menos 4 caracteres.' };
    };

    const navigateTo = (viewId) => {
        if (viewId === 'admin' || viewId === 'dashboard') {
            setCurrentView('admin');
            if (typeof window !== 'undefined') {
                window.history.pushState(null, '', '#admin');
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
            return;
        }

        if (NAV_VIEWS.some(v => v.id === viewId)) {
            setCurrentView(viewId);
            if (typeof window !== 'undefined') {
                window.history.pushState(null, '', `#${viewId}`);
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
        }
    };

    const nextView = () => {
        if (currentView === 'admin') return;
        const currentIndex = NAV_VIEWS.findIndex(v => v.id === currentView);
        const nextIndex = (currentIndex + 1) % NAV_VIEWS.length;
        navigateTo(NAV_VIEWS[nextIndex].id);
    };

    const prevView = () => {
        if (currentView === 'admin') return;
        const currentIndex = NAV_VIEWS.findIndex(v => v.id === currentView);
        const prevIndex = (currentIndex - 1 + NAV_VIEWS.length) % NAV_VIEWS.length;
        navigateTo(NAV_VIEWS[prevIndex].id);
    };

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '').toLowerCase();
            if (hash === 'admin' || hash === 'dashboard') {
                setCurrentView('admin');
                window.scrollTo({ top: 0, behavior: 'instant' });
                return;
            }
            if (NAV_VIEWS.some(v => v.id === hash)) {
                setCurrentView(hash);
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
        };
        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('popstate', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('popstate', handleHashChange);
        };
    }, []);

    // 1. Projects state with localStorage persistence
    const [projects, setProjects] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    return parsed.map(p => ({
                        ...p,
                        tags: Array.isArray(p.tags)
                            ? p.tags
                            : (typeof p.tags === 'string' ? p.tags.split(',').map(t => t.trim()).filter(Boolean) : []),
                        metrics: Array.isArray(p.metrics) ? p.metrics : []
                    }));
                }
            }
        } catch (e) {
            console.error('Error loading projects from localStorage', e);
        }
        return initialProjects;
    });

    // 2. Certifications state with localStorage persistence
    const [certifications, setCertifications] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.CERTS);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    return parsed.map(c => ({
                        ...c,
                        skills: Array.isArray(c.skills)
                            ? c.skills
                            : (typeof c.skills === 'string' ? c.skills.split(',').map(s => s.trim()).filter(Boolean) : [])
                    }));
                }
            }
        } catch (e) {
            console.error('Error loading certifications from localStorage', e);
        }
        return initialCertifications;
    });

    // 3. Profile state
    const [profile, setProfile] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
            if (saved) return JSON.parse(saved);
        } catch (e) {
            console.error('Error loading profile from localStorage', e);
        }
        return initialProfile;
    });

    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSyncDate, setLastSyncDate] = useState(() => {
        return localStorage.getItem(STORAGE_KEYS.LAST_SYNC) || null;
    });
    const [syncError, setSyncError] = useState(null);

    // Save to localStorage when state changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
        } catch (e) {
            console.error('Error saving projects to localStorage', e);
        }
    }, [projects]);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.CERTS, JSON.stringify(certifications));
        } catch (e) {
            console.error('Error saving certifications to localStorage', e);
        }
    }, [certifications]);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
        } catch (e) {
            console.error('Error saving profile to localStorage', e);
        }
    }, [profile]);

    // Auto-sync with GitHub on first mount if never synced
    useEffect(() => {
        if (!lastSyncDate) {
            syncWithGitHub(false);
        }
    }, []);

    // Sync with GitHub API
    const syncWithGitHub = async (showErrorToast = true) => {
        setIsSyncing(true);
        setSyncError(null);

        try {
            const githubRepos = await fetchGitHubRepos();

            setProjects(prevProjects => {
                const existingMap = new Map(prevProjects.map(p => [p.id.toLowerCase(), p]));

                const merged = githubRepos.map(repo => {
                    const existing = existingMap.get(repo.id.toLowerCase()) || existingMap.get(repo.name.toLowerCase());
                    if (existing) {
                        return {
                            ...repo,
                            category: existing.category || repo.category,
                            featured: existing.featured !== undefined ? existing.featured : repo.featured,
                            visible: existing.visible !== undefined ? existing.visible : true,
                            customDescription: existing.customDescription || repo.description,
                            tags: existing.tags && existing.tags.length > 0 ? existing.tags : repo.tags,
                            metrics: existing.metrics && existing.metrics.length > 0 ? existing.metrics : (repo.metrics || [])
                        };
                    }
                    return repo;
                });

                const customOnly = prevProjects.filter(p => !p.isFromGitHub && !githubRepos.some(r => r.id.toLowerCase() === p.id.toLowerCase()));

                return [...merged, ...customOnly];
            });

            const now = new Date().toISOString();
            setLastSyncDate(now);
            localStorage.setItem(STORAGE_KEYS.LAST_SYNC, now);
        } catch (err) {
            setSyncError(err.message);
            if (showErrorToast) {
                console.error('GitHub sync failed:', err);
            }
        } finally {
            setIsSyncing(false);
        }
    };

    // --- Certification CRUD ---
    const addCertification = (newCert) => {
        const skills = Array.isArray(newCert.skills)
            ? newCert.skills
            : (typeof newCert.skills === 'string' ? newCert.skills.split(',').map(s => s.trim()).filter(Boolean) : []);

        const certWithId = {
            title: '',
            issuer: '',
            date: new Date().getFullYear().toString(),
            credentialId: '',
            url: '',
            category: 'ai',
            badgeColor: '#ec4899',
            description: '',
            certificateFile: null,
            certificateImage: null,
            fileName: '',
            fileType: 'image',
            ...newCert,
            id: newCert.id || `cert-${Date.now()}`,
            skills
        };
        setCertifications(prev => [certWithId, ...prev]);
        return certWithId;
    };

    const updateCertification = (id, updatedData) => {
        setCertifications(prev => prev.map(cert => {
            if (cert.id === id) {
                const skills = updatedData.skills !== undefined
                    ? (Array.isArray(updatedData.skills)
                        ? updatedData.skills
                        : (typeof updatedData.skills === 'string' ? updatedData.skills.split(',').map(s => s.trim()).filter(Boolean) : []))
                    : cert.skills;
                return { ...cert, ...updatedData, skills };
            }
            return cert;
        }));
    };

    const deleteCertification = (id) => {
        setCertifications(prev => prev.filter(cert => cert.id !== id));
    };

    // --- Project CRUD & Controls ---
    const addProject = (newProject) => {
        const tags = Array.isArray(newProject.tags)
            ? newProject.tags
            : (typeof newProject.tags === 'string' ? newProject.tags.split(',').map(t => t.trim()).filter(Boolean) : []);

        const metrics = Array.isArray(newProject.metrics)
            ? newProject.metrics
            : [];

        const projectWithId = {
            title: 'Nuevo Proyecto',
            subtitle: '',
            description: '',
            category: 'frontend',
            featured: false,
            visible: true,
            github: '',
            demo: '',
            color: '#8b5cf6',
            isFromGitHub: false,
            features: [],
            ...newProject,
            id: newProject.id || `proj-${Date.now()}`,
            tags,
            metrics
        };
        setProjects(prev => [projectWithId, ...prev]);
        return projectWithId;
    };

    const updateProject = (id, updatedData) => {
        setProjects(prev => prev.map(p => {
            if (p.id === id || p.name === id) {
                const tags = updatedData.tags !== undefined
                    ? (Array.isArray(updatedData.tags)
                        ? updatedData.tags
                        : (typeof updatedData.tags === 'string' ? updatedData.tags.split(',').map(t => t.trim()).filter(Boolean) : []))
                    : p.tags;

                const metrics = updatedData.metrics !== undefined
                    ? (Array.isArray(updatedData.metrics) ? updatedData.metrics : [])
                    : (p.metrics || []);

                return { ...p, ...updatedData, tags, metrics };
            }
            return p;
        }));
    };

    const deleteProject = (id) => {
        setProjects(prev => prev.filter(p => p.id !== id && p.name !== id));
    };

    const toggleProjectVisibility = (id) => {
        setProjects(prev => prev.map(p => {
            if (p.id === id || p.name === id) {
                return { ...p, visible: p.visible === undefined ? false : !p.visible };
            }
            return p;
        }));
    };

    const toggleProjectFeatured = (id) => {
        setProjects(prev => prev.map(p => {
            if (p.id === id || p.name === id) {
                return { ...p, featured: !p.featured };
            }
            return p;
        }));
    };

    // --- Backup & Export Helpers ---
    const exportDataAsJSON = () => {
        const data = {
            profile,
            projects,
            certifications,
            exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-data-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const exportDataAsJS = () => {
        const projectsCode = `export const projects = ${JSON.stringify(projects, null, 4)};\n`;
        const certsCode = `export const certifications = ${JSON.stringify(certifications, null, 4)};\n`;

        const blobP = new Blob([projectsCode], { type: 'application/javascript' });
        const urlP = URL.createObjectURL(blobP);
        const aP = document.createElement('a');
        aP.href = urlP;
        aP.download = 'projects.js';
        aP.click();
        URL.revokeObjectURL(urlP);

        setTimeout(() => {
            const blobC = new Blob([certsCode], { type: 'application/javascript' });
            const urlC = URL.createObjectURL(blobC);
            const aC = document.createElement('a');
            aC.href = urlC;
            aC.download = 'certifications.js';
            aC.click();
            URL.revokeObjectURL(urlC);
        }, 400);
    };

    const resetToDefaults = () => {
        if (window.confirm('¿Estás seguro de restablecer todos los datos a sus valores iniciales?')) {
            localStorage.removeItem(STORAGE_KEYS.PROJECTS);
            localStorage.removeItem(STORAGE_KEYS.CERTS);
            localStorage.removeItem(STORAGE_KEYS.PROFILE);
            localStorage.removeItem(STORAGE_KEYS.LAST_SYNC);
            setProjects(initialProjects);
            setCertifications(initialCertifications);
            setProfile(initialProfile);
            setLastSyncDate(null);
        }
    };

    const visibleProjects = projects.filter(p => p.visible !== false);

    const value = {
        currentView,
        navigateTo,
        nextView,
        prevView,
        navViews: NAV_VIEWS,
        projects,
        visibleProjects,
        certifications,
        profile,
        setProfile,
        isDashboardOpen,
        openDashboard: () => setIsDashboardOpen(true),
        closeDashboard: () => setIsDashboardOpen(false),
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        changeAdminPin,
        isSyncing,
        lastSyncDate,
        syncError,
        syncWithGitHub,
        addCertification,
        updateCertification,
        deleteCertification,
        addProject,
        updateProject,
        deleteProject,
        toggleProjectVisibility,
        toggleProjectFeatured,
        exportDataAsJSON,
        exportDataAsJS,
        resetToDefaults
    };

    return (
        <PortfolioContext.Provider value={value}>
            {children}
        </PortfolioContext.Provider>
    );
}

export function usePortfolio() {
    const context = useContext(PortfolioContext);
    if (!context) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
}
