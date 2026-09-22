import React, { useState } from 'react';
import { Button, Badge, Icon } from '../../atoms';
import { CertFormModal } from '../CertFormModal/CertFormModal';
import { ProjectFormModal } from '../ProjectFormModal/ProjectFormModal';
import { CertViewerModal } from '../CertViewerModal/CertViewerModal';
import { usePortfolio } from '../../../context';
import styles from './DashboardModal.module.css';

export function DashboardModal() {
    const {
        projects,
        certifications,
        isDashboardOpen,
        closeDashboard,
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
        exportDataAsJS,
        exportDataAsJSON,
        resetToDefaults
    } = usePortfolio();

    const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'certs' | 'export'
    const [editingCert, setEditingCert] = useState(null);
    const [isCertModalOpen, setIsCertModalOpen] = useState(false);
    const [viewingCert, setViewingCert] = useState(null);

    const [editingProject, setEditingProject] = useState(null);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

    React.useEffect(() => {
        if (!isDashboardOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeDashboard();
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isDashboardOpen, closeDashboard]);

    if (!isDashboardOpen) return null;

    const handleOpenAddCert = () => {
        setEditingCert(null);
        setIsCertModalOpen(true);
    };

    const handleOpenEditCert = (cert) => {
        setEditingCert(cert);
        setIsCertModalOpen(true);
    };

    const handleSaveCert = (data) => {
        if (editingCert) {
            updateCertification(editingCert.id, data);
        } else {
            addCertification(data);
        }
    };

    const handleOpenAddProject = () => {
        setEditingProject(null);
        setIsProjectModalOpen(true);
    };

    const handleOpenEditProject = (proj) => {
        setEditingProject(proj);
        setIsProjectModalOpen(true);
    };

    const handleSaveProject = (data) => {
        if (editingProject) {
            updateProject(editingProject.id || editingProject.name, data);
        } else {
            addProject(data);
        }
    };

    const totalVisibleProjects = projects.filter(p => p.visible !== false).length;
    const totalFeaturedProjects = projects.filter(p => p.featured).length;

    return (
        <div className={styles.backdrop} onClick={closeDashboard} role="dialog" aria-modal="true">
            <div className={styles.dashboard} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerTitleWrap}>
                        <div className={styles.dashIcon}>
                            <Icon name="settings" size={24} color="var(--color-primary-light)" />
                        </div>
                        <div>
                            <h2 className={styles.title}>Panel de Gestión & Control</h2>
                            <p className={styles.subtitle}>
                                Administra tus proyectos de GitHub, sube certificaciones y sincroniza tus datos
                            </p>
                        </div>
                    </div>

                    <button type="button" className={styles.closeBtn} onClick={closeDashboard} aria-label="Cerrar Dashboard">
                        <Icon name="close" size={22} />
                    </button>
                </div>

                {/* Tabs Bar */}
                <div className={styles.tabNav}>
                    <button
                        type="button"
                        className={`${styles.tabBtn} ${activeTab === 'projects' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('projects')}
                    >
                        <Icon name="code" size={18} />
                        <span>Proyectos & GitHub ({projects.length})</span>
                    </button>

                    <button
                        type="button"
                        className={`${styles.tabBtn} ${activeTab === 'certs' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('certs')}
                    >
                        <Icon name="award" size={18} />
                        <span>Certificaciones ({certifications.length})</span>
                    </button>

                    <button
                        type="button"
                        className={`${styles.tabBtn} ${activeTab === 'export' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('export')}
                    >
                        <Icon name="database" size={18} />
                        <span>Exportar & Respaldo</span>
                    </button>
                </div>

                {/* Content Area */}
                <div className={styles.content}>
                    {/* TAB 1: PROJECTS & GITHUB */}
                    {activeTab === 'projects' && (
                        <div className={styles.tabSection}>
                            {/* Toolbar */}
                            <div className={styles.toolbar}>
                                <div className={styles.statsPills}>
                                    <Badge variant="primary" size="sm">
                                        Total: {projects.length}
                                    </Badge>
                                    <Badge variant="success" size="sm">
                                        Visibles: {totalVisibleProjects}
                                    </Badge>
                                    <Badge variant="warning" size="sm">
                                        Destacados: {totalFeaturedProjects} ⭐
                                    </Badge>
                                </div>

                                <div className={styles.toolActions}>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => syncWithGitHub()}
                                        disabled={isSyncing}
                                        iconLeft={<Icon name="refresh" size={16} className={isSyncing ? styles.spin : ''} />}
                                    >
                                        {isSyncing ? 'Sincronizando...' : 'Sincronizar con GitHub'}
                                    </Button>

                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={handleOpenAddProject}
                                        iconLeft={<Icon name="plus" size={16} />}
                                    >
                                        Añadir Manual
                                    </Button>
                                </div>
                            </div>

                            {lastSyncDate && (
                                <p className={styles.syncInfo}>
                                    Última sincronización con GitHub: {new Date(lastSyncDate).toLocaleTimeString()} ({new Date(lastSyncDate).toLocaleDateString()})
                                </p>
                            )}

                            {syncError && (
                                <div className={styles.errorAlert}>
                                    <p>Error en sincronización: {syncError}</p>
                                </div>
                            )}

                            {/* Projects List */}
                            <div className={styles.tableWrap}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Visible</th>
                                            <th>Destacado</th>
                                            <th>Proyecto</th>
                                            <th>Categoría</th>
                                            <th>Lenguaje / Tags</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.map((proj) => {
                                            const id = proj.id || proj.name;
                                            return (
                                                <tr key={id} className={proj.visible === false ? styles.rowHidden : ''}>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            checked={proj.visible !== false}
                                                            onChange={() => toggleProjectVisibility(id)}
                                                            title={proj.visible !== false ? 'Ocultar del portafolio' : 'Mostrar en portafolio'}
                                                            className={styles.checkInput}
                                                        />
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className={`${styles.starBtn} ${proj.featured ? styles.starActive : ''}`}
                                                            onClick={() => toggleProjectFeatured(id)}
                                                            title={proj.featured ? 'Quitar destacado' : 'Marcar como destacado'}
                                                        >
                                                            <Icon name="star" size={16} color={proj.featured ? '#fbbf24' : 'currentColor'} />
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <div className={styles.projectCell}>
                                                            <span className={styles.projectName}>{proj.title}</span>
                                                            <span className={styles.projectSub}>{proj.subtitle || proj.name}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Badge variant="default" size="sm">
                                                            {proj.category}
                                                        </Badge>
                                                    </td>
                                                    <td>
                                                        <span className={styles.tagsText}>
                                                            {proj.tags ? proj.tags.slice(0, 3).join(', ') : 'N/A'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className={styles.actionBtns}>
                                                            <button
                                                                type="button"
                                                                className={styles.iconBtn}
                                                                onClick={() => handleOpenEditProject(proj)}
                                                                title="Editar Proyecto"
                                                            >
                                                                <Icon name="edit" size={15} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className={`${styles.iconBtn} ${styles.deleteBtn}`}
                                                                onClick={() => {
                                                                    if (window.confirm(`¿Eliminar ${proj.title}?`)) {
                                                                        deleteProject(id);
                                                                    }
                                                                }}
                                                                title="Eliminar Proyecto"
                                                            >
                                                                <Icon name="trash" size={15} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: CERTIFICATIONS */}
                    {activeTab === 'certs' && (
                        <div className={styles.tabSection}>
                            <div className={styles.toolbar}>
                                <div className={styles.statsPills}>
                                    <Badge variant="primary" size="sm">
                                        Total Certificaciones: {certifications.length}
                                    </Badge>
                                </div>

                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={handleOpenAddCert}
                                    iconLeft={<Icon name="plus" size={16} />}
                                >
                                    + Subir Nueva Certificación
                                </Button>
                            </div>

                            <div className={styles.certsGrid}>
                                {certifications.map((cert) => {
                                    const certFile = cert.certificateFile || cert.certificateImage;
                                    const isPdf = certFile && (certFile.startsWith('data:application/pdf') || cert.fileType === 'pdf');

                                    return (
                                        <div key={cert.id} className={styles.certRowCard}>
                                            <div className={styles.certThumbWrap} onClick={() => certFile && setViewingCert(cert)}>
                                                {certFile ? (
                                                    isPdf ? (
                                                        <div className={styles.certThumbPdf}>
                                                            <Icon name="pdf" size={22} color="#ef4444" />
                                                            <span>PDF</span>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={certFile}
                                                            alt={cert.title}
                                                            className={styles.certThumb}
                                                        />
                                                    )
                                                ) : (
                                                    <div className={styles.certThumbEmpty}>
                                                        <Icon name="award" size={22} color="var(--color-primary-light)" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className={styles.certRowInfo}>
                                                <div className={styles.certRowHeader}>
                                                    <Badge variant="secondary" size="sm">{cert.issuer}</Badge>
                                                    {isPdf && <Badge variant="warning" size="sm">PDF</Badge>}
                                                    <span className={styles.certDate}>{cert.date}</span>
                                                </div>
                                                <h4 className={styles.certRowTitle}>{cert.title}</h4>
                                                <span className={styles.certId}>ID: {cert.credentialId || 'N/A'}</span>
                                            </div>

                                            <div className={styles.certRowActions}>
                                                {certFile && (
                                                    <button
                                                        type="button"
                                                        className={styles.iconBtn}
                                                        onClick={() => setViewingCert(cert)}
                                                        title={isPdf ? 'Abrir PDF' : 'Ver Comprobante'}
                                                    >
                                                        <Icon name="eye" size={16} />
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    className={styles.iconBtn}
                                                    onClick={() => handleOpenEditCert(cert)}
                                                    title="Editar Certificación"
                                                >
                                                    <Icon name="edit" size={16} />
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`${styles.iconBtn} ${styles.deleteBtn}`}
                                                    onClick={() => {
                                                        if (window.confirm(`¿Eliminar certificación ${cert.title}?`)) {
                                                            deleteCertification(cert.id);
                                                        }
                                                    }}
                                                    title="Eliminar Certificación"
                                                >
                                                    <Icon name="trash" size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* TAB 3: EXPORT & BACKUP */}
                    {activeTab === 'export' && (
                        <div className={styles.tabSection}>
                            <div className={styles.exportContainer}>
                                <div className={styles.exportCard}>
                                    <div className={styles.exportCardIcon}>
                                        <Icon name="file-text" size={28} color="var(--color-primary-light)" />
                                    </div>
                                    <div className={styles.exportCardContent}>
                                        <h4>Descargar Código Fuente (`projects.js` y `certifications.js`)</h4>
                                        <p>
                                            Genera y descarga los archivos JavaScript con todos los datos sincronizados y subidos para guardarlos directamente en la carpeta <code>src/data/</code> de tu repositorio.
                                        </p>
                                        <Button
                                            variant="primary"
                                            size="md"
                                            onClick={exportDataAsJS}
                                            iconLeft={<Icon name="download" size={18} />}
                                        >
                                            Descargar Archivos de Datos JS
                                        </Button>
                                    </div>
                                </div>

                                <div className={styles.exportCard}>
                                    <div className={styles.exportCardIcon}>
                                        <Icon name="database" size={28} color="var(--color-secondary-light)" />
                                    </div>
                                    <div className={styles.exportCardContent}>
                                        <h4>Copia de Seguridad Completa (JSON)</h4>
                                        <p>
                                            Exporta toda tu configuración, proyectos y certificaciones en un archivo JSON para respaldo o migración.
                                        </p>
                                        <Button
                                            variant="secondary"
                                            size="md"
                                            onClick={exportDataAsJSON}
                                            iconLeft={<Icon name="download" size={18} />}
                                        >
                                            Exportar Copia de Seguridad JSON
                                        </Button>
                                    </div>
                                </div>

                                <div className={styles.resetSection}>
                                    <h4>Restablecer Datos</h4>
                                    <p>Si deseas borrar las modificaciones locales y volver al estado inicial del repositorio.</p>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={resetToDefaults}
                                        iconLeft={<Icon name="trash" size={16} color="#f43f5e" />}
                                    >
                                        Restablecer a valores de fábrica
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sub-modals */}
            <CertFormModal
                cert={editingCert}
                isOpen={isCertModalOpen}
                onClose={() => {
                    setIsCertModalOpen(false);
                    setEditingCert(null);
                }}
                onSave={handleSaveCert}
            />

            <ProjectFormModal
                project={editingProject}
                isOpen={isProjectModalOpen}
                onClose={() => {
                    setIsProjectModalOpen(false);
                    setEditingProject(null);
                }}
                onSave={handleSaveProject}
            />

            <CertViewerModal
                cert={viewingCert}
                isOpen={Boolean(viewingCert)}
                onClose={() => setViewingCert(null)}
            />
        </div>
    );
}
