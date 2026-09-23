import React, { useState } from 'react';
import { Button, Input, Icon, Badge } from '../../atoms';
import { ProjectFormModal, CertFormModal, CertViewerModal } from '../../molecules';
import { usePortfolio } from '../../../context';
import styles from './AdminView.module.css';

export function AdminView() {
    const {
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        changeAdminPin,
        navigateTo,
        projects,
        toggleProjectVisibility,
        toggleProjectFeatured,
        deleteProject,
        addProject,
        updateProject,
        certifications,
        deleteCertification,
        addCertification,
        updateCertification,
        syncAllCertificationsToCloud,
        isSyncing,
        lastSyncDate,
        syncError,
        syncWithGitHub,
        exportDataAsJSON,
        exportDataAsJS,
        resetToDefaults,
        isCloudConnected
    } = usePortfolio();

    // Login Form State
    const [pinInput, setPinInput] = useState('');
    const [loginError, setLoginError] = useState('');

    // Admin Dashboard State
    const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'certs' | 'sync' | 'export'
    const [editingProject, setEditingProject] = useState(null);
    const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
    const [editingCert, setEditingCert] = useState(null);
    const [isNewCertModalOpen, setIsNewCertModalOpen] = useState(false);
    const [viewingCert, setViewingCert] = useState(null);

    // Change PIN state
    const [isChangePinOpen, setIsChangePinOpen] = useState(false);
    const [newPinValue, setNewPinValue] = useState('');
    const [pinMessage, setPinMessage] = useState('');

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setLoginError('');
        const res = loginAdmin(pinInput);
        if (!res.success) {
            setLoginError(res.message);
        } else {
            setPinInput('');
        }
    };

    const handleChangePinSubmit = (e) => {
        e.preventDefault();
        const res = changeAdminPin(newPinValue);
        if (res.success) {
            setPinMessage('¡PIN actualizado correctamente!');
            setTimeout(() => {
                setIsChangePinOpen(false);
                setNewPinValue('');
                setPinMessage('');
            }, 1500);
        } else {
            setPinMessage(res.message);
        }
    };

    // 1. PIN GATE VIEW (If unauthenticated)
    if (!isAdminAuthenticated) {
        return (
            <section className={styles.authSection}>
                <div className={styles.authCard}>
                    <div className={styles.lockIconWrap}>
                        <Icon name="lock" size={36} color="var(--color-primary-light)" />
                    </div>

                    <h2 className={styles.authTitle}>Panel de Administración Privado</h2>
                    <p className={styles.authSubtitle}>
                        Ingresa tu PIN de seguridad para gestionar proyectos, subir certificaciones y sincronizar datos.
                    </p>

                    <form onSubmit={handleLoginSubmit} className={styles.authForm}>
                        <div className={styles.inputWrap}>
                            <input
                                type="password"
                                placeholder="PIN de seguridad (Defecto: 1234)"
                                value={pinInput}
                                onChange={(e) => setPinInput(e.target.value)}
                                className={styles.pinInputField}
                                autoFocus
                                required
                            />
                        </div>

                        {loginError && (
                            <div className={styles.errorAlert}>
                                <Icon name="alert-triangle" size={16} color="#fb7185" />
                                <span>{loginError}</span>
                            </div>
                        )}

                        <div className={styles.authActions}>
                            <Button type="submit" variant="primary" size="lg" iconLeft={<Icon name="check" size={18} />}>
                                Acceder al Panel
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                size="md"
                                onClick={() => navigateTo('inicio')}
                                iconLeft={<Icon name="arrow-left" size={16} />}
                            >
                                Volver al Portafolio
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }

    // 2. AUTHENTICATED ADMIN DASHBOARD VIEW
    return (
        <section className={styles.adminSection}>
            <div className={`container ${styles.adminContainer}`}>
                {/* Header Bar */}
                <div className={styles.topBar}>
                    <div className={styles.titleInfo}>
                        <div className={styles.adminBadge}>
                            <Icon name="settings" size={16} />
                            <span>Modo Administrador Activo</span>
                        </div>
                        <h1 className={styles.mainHeading}>Gestión y Control del Portafolio</h1>
                        <p className={styles.headingDesc}>
                            Edita proyectos, sube certificados en PDF o imagen, sincroniza repositorios y exporta cambios.
                        </p>
                    </div>

                    <div className={styles.topActions}>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setIsChangePinOpen(!isChangePinOpen)}
                            iconLeft={<Icon name="lock" size={14} />}
                        >
                            Cambiar PIN
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={logoutAdmin}
                            iconLeft={<Icon name="arrow-left" size={14} />}
                        >
                            Salir & Ver Portafolio
                        </Button>
                    </div>
                </div>

                {/* Change PIN Box (Expandable) */}
                {isChangePinOpen && (
                    <div className={styles.changePinBox}>
                        <h4>Actualizar PIN de Seguridad</h4>
                        <form onSubmit={handleChangePinSubmit} className={styles.changePinForm}>
                            <input
                                type="password"
                                placeholder="Nuevo PIN (mínimo 4 caracteres)"
                                value={newPinValue}
                                onChange={(e) => setNewPinValue(e.target.value)}
                                className={styles.changePinInput}
                                required
                            />
                            <Button type="submit" variant="primary" size="sm">
                                Guardar Nuevo PIN
                            </Button>
                            <Button type="button" variant="ghost" size="sm" onClick={() => setIsChangePinOpen(false)}>
                                Cancelar
                            </Button>
                        </form>
                        {pinMessage && <span className={styles.pinMessage}>{pinMessage}</span>}
                    </div>
                )}

                {/* Navigation Tabs */}
                <div className={styles.tabsNav}>
                    <button
                        type="button"
                        className={`${styles.tabBtn} ${activeTab === 'projects' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('projects')}
                    >
                        <Icon name="code" size={18} />
                        <span>Proyectos ({projects.length})</span>
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
                        className={`${styles.tabBtn} ${activeTab === 'sync' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('sync')}
                    >
                        <Icon name="github" size={18} />
                        <span>Sincronización GitHub</span>
                    </button>
                    <button
                        type="button"
                        className={`${styles.tabBtn} ${activeTab === 'export' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('export')}
                    >
                        <Icon name="download" size={18} />
                        <span>Exportar & Backup</span>
                    </button>
                </div>

                {/* TAB 1: PROJECTS */}
                {activeTab === 'projects' && (
                    <div className={styles.tabContent}>
                        <div className={styles.contentToolbar}>
                            <div>
                                <h3 className={styles.contentTitle}>Listado de Proyectos</h3>
                                <p className={styles.contentSubtitle}>Controla qué proyectos aparecen en tu portafolio, edita métricas y descripciones.</p>
                            </div>
                            <div className={styles.toolbarBtns}>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => syncWithGitHub()}
                                    disabled={isSyncing}
                                    iconLeft={<Icon name="refresh" size={14} className={isSyncing ? styles.spin : ''} />}
                                >
                                    {isSyncing ? 'Sincronizando...' : 'Sincronizar GitHub'}
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => setIsNewProjectModalOpen(true)}
                                    iconLeft={<Icon name="check" size={14} />}
                                >
                                    + Crear Proyecto
                                </Button>
                            </div>
                        </div>

                        <div className={styles.tableWrap}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Visible</th>
                                        <th>Destacado</th>
                                        <th>Proyecto</th>
                                        <th>Categoría</th>
                                        <th>Métricas</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((p) => {
                                        const isHidden = p.visible === false;
                                        return (
                                            <tr key={p.id || p.name} className={isHidden ? styles.rowHidden : ''}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={!isHidden}
                                                        onChange={() => toggleProjectVisibility(p.id || p.name)}
                                                        className={styles.checkInput}
                                                        title="Mostrar u ocultar del portafolio público"
                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className={`${styles.starBtn} ${p.featured ? styles.starActive : ''}`}
                                                        onClick={() => toggleProjectFeatured(p.id || p.name)}
                                                        title="Marcar como destacado"
                                                    >
                                                        <Icon name="star" size={18} />
                                                    </button>
                                                </td>
                                                <td>
                                                    <div className={styles.projectCell}>
                                                        <span className={styles.projectName}>{p.title || p.name}</span>
                                                        <span className={styles.projectSub}>{p.isFromGitHub ? 'GitHub Repo' : 'Proyecto Manual'}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Badge variant="secondary" size="sm">{p.category || 'General'}</Badge>
                                                </td>
                                                <td>
                                                    <span className={styles.metricCount}>
                                                        {Array.isArray(p.metrics) && p.metrics.length > 0 ? `${p.metrics.length} métricas` : 'Sin métricas'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className={styles.actionBtns}>
                                                        <button
                                                            type="button"
                                                            className={styles.iconBtn}
                                                            onClick={() => setEditingProject(p)}
                                                            title="Editar Proyecto y Métricas"
                                                        >
                                                            <Icon name="settings" size={15} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`${styles.iconBtn} ${styles.deleteBtn}`}
                                                            onClick={() => {
                                                                if (window.confirm(`¿Eliminar proyecto "${p.title || p.name}"?`)) {
                                                                    deleteProject(p.id || p.name);
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

                {/* TAB 2: CERTIFICACIONES */}
                {activeTab === 'certs' && (
                    <div className={styles.tabContent}>
                        <div className={styles.contentToolbar}>
                            <div>
                                <h3 className={styles.contentTitle}>Gestión de Certificaciones Oficiales</h3>
                                <p className={styles.contentSubtitle}>
                                    Sube certificados en PDF o imagen optimizados. Todos los cambios se guardan directamente en Firebase Firestore.
                                </p>
                            </div>
                            <div className={styles.toolbarBtns}>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={async () => {
                                        const res = await syncAllCertificationsToCloud();
                                        if (res.success) {
                                            alert(`¡Listo! Se guardaron ${res.count} certificaciones en Firebase Firestore.`);
                                        } else {
                                            alert(`Error al guardar en Firebase: ${res.error}`);
                                        }
                                    }}
                                    disabled={isSyncing}
                                    iconLeft={<Icon name="database" size={14} />}
                                >
                                    {isSyncing ? 'Guardando...' : 'Sincronizar a Firebase'}
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => setIsNewCertModalOpen(true)}
                                    iconLeft={<Icon name="upload" size={14} />}
                                >
                                    + Subir Nueva Certificación (PDF / Imagen)
                                </Button>
                            </div>
                        </div>

                        {certifications.length === 0 && (
                            <div className={styles.emptyState}>
                                <div className={styles.emptyIconCircle}>
                                    <Icon name="award" size={32} color="var(--color-primary-light)" />
                                </div>
                                <h4>No hay certificaciones agregadas aún</h4>
                                <p>Sube tu primer comprobante o restaura los certificados oficiales predeterminados.</p>
                                <div className={styles.emptyActions}>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => setIsNewCertModalOpen(true)}
                                        iconLeft={<Icon name="upload" size={14} />}
                                    >
                                        Subir Certificado
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={async () => {
                                            await syncAllCertificationsToCloud();
                                        }}
                                        iconLeft={<Icon name="refresh" size={14} />}
                                    >
                                        Cargar Certificados Iniciales
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div className={styles.certsList}>
                            {certifications.map((cert) => {
                                const certFile = cert.certificateFile || cert.certificateImage;
                                const isPdf = certFile && (certFile.startsWith('data:application/pdf') || cert.fileType === 'pdf');
                                return (
                                    <div key={cert.id} className={styles.certRowCard}>
                                        <div className={styles.certThumbWrap} onClick={() => certFile && setViewingCert(cert)}>
                                            {certFile ? (
                                                isPdf ? (
                                                    <div className={styles.certThumbPdf}>
                                                        <Icon name="pdf" size={20} color="#ef4444" />
                                                        <span>PDF</span>
                                                    </div>
                                                ) : (
                                                    <img src={certFile} alt={cert.title} className={styles.certThumb} />
                                                )
                                            ) : (
                                                <div className={styles.certThumbEmpty}>
                                                    <Icon name="award" size={20} color="var(--color-primary-light)" />
                                                </div>
                                            )}
                                        </div>

                                        <div className={styles.certRowInfo}>
                                            <div className={styles.certRowHeader}>
                                                <Badge variant="primary" size="sm">{cert.category || 'ai'}</Badge>
                                                <span className={styles.certDate}>{cert.date}</span>
                                            </div>
                                            <h4 className={styles.certRowTitle}>{cert.title}</h4>
                                            <span className={styles.certIssuer}>{cert.issuer} • {cert.credentialId || 'ID: Verificado'}</span>
                                        </div>

                                        <div className={styles.certRowActions}>
                                            {certFile && (
                                                <button
                                                    type="button"
                                                    className={styles.iconBtn}
                                                    onClick={() => setViewingCert(cert)}
                                                    title="Ver documento adjunto"
                                                >
                                                    <Icon name="eye" size={16} />
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                className={styles.iconBtn}
                                                onClick={() => setEditingCert(cert)}
                                                title="Editar Certificación"
                                            >
                                                <Icon name="settings" size={16} />
                                            </button>
                                            <button
                                                type="button"
                                                className={`${styles.iconBtn} ${styles.deleteBtn}`}
                                                onClick={() => {
                                                    if (window.confirm(`¿Eliminar certificación "${cert.title}"?`)) {
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

                {/* TAB 3: GITHUB SYNC */}
                {activeTab === 'sync' && (
                    <div className={styles.tabContent}>
                        <div className={styles.syncCard}>
                            <div className={styles.syncIconWrap}>
                                <Icon name="github" size={40} />
                            </div>
                            <div className={styles.syncInfo}>
                                <h3>Sincronización Automática con GitHub</h3>
                                <p>Descarga tus repositorios públicos más recientes directamente desde tu cuenta <code>JesusMelville</code>.</p>
                                <span className={styles.lastSyncText}>
                                    Última sincronización: {lastSyncDate ? new Date(lastSyncDate).toLocaleString('es-ES') : 'Nunca realizada'}
                                </span>
                            </div>
                            <Button
                                variant="primary"
                                size="md"
                                onClick={() => syncWithGitHub()}
                                disabled={isSyncing}
                                iconLeft={<Icon name="refresh" size={18} className={isSyncing ? styles.spin : ''} />}
                            >
                                {isSyncing ? 'Sincronizando...' : 'Sincronizar Repositorios Ahora'}
                            </Button>
                        </div>
                        {syncError && (
                            <div className={styles.errorAlert}>
                                <Icon name="alert-triangle" size={16} color="#fb7185" />
                                <span>{syncError}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 4: EXPORT / BACKUP */}
                {activeTab === 'export' && (
                    <div className={styles.tabContent}>
                        <div className={styles.exportGrid}>
                            <div className={styles.exportCard}>
                                <div className={styles.cardIcon}>
                                    <Icon name="download" size={28} color="var(--color-primary-light)" />
                                </div>
                                <div className={styles.cardContent}>
                                    <h4>Descargar Archivos de Código (.js)</h4>
                                    <p>Genera y descarga <code>projects.js</code> y <code>certifications.js</code> listos para guardar en tu carpeta <code>src/data/</code> y hacer commit en git.</p>
                                    <Button variant="primary" size="sm" onClick={exportDataAsJS} iconLeft={<Icon name="download" size={16} />}>
                                        Descargar projects.js y certs.js
                                    </Button>
                                </div>
                            </div>

                            <div className={styles.exportCard}>
                                <div className={styles.cardIcon}>
                                    <Icon name="layers" size={28} color="#06b6d4" />
                                </div>
                                <div className={styles.cardContent}>
                                    <h4>Copia de Seguridad JSON</h4>
                                    <p>Descarga un archivo JSON con todos tus proyectos, certificaciones y configuraciones para restauración rápida.</p>
                                    <Button variant="secondary" size="sm" onClick={exportDataAsJSON} iconLeft={<Icon name="download" size={16} />}>
                                        Exportar Backup JSON
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.dangerZone}>
                            <div>
                                <h4>Restablecer Valores Iniciales</h4>
                                <p>Restaura proyectos y certificaciones a sus estados por defecto y limpia el almacenamiento del navegador.</p>
                            </div>
                            <Button variant="outline" size="sm" onClick={resetToDefaults} iconLeft={<Icon name="trash" size={16} color="#f43f5e" />}>
                                Restablecer Todo
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Project Edit / Create Modal */}
            {(isNewProjectModalOpen || editingProject) && (
                <ProjectFormModal
                    isOpen={Boolean(isNewProjectModalOpen || editingProject)}
                    project={editingProject}
                    onClose={() => {
                        setIsNewProjectModalOpen(false);
                        setEditingProject(null);
                    }}
                    onSave={(data) => {
                        if (editingProject) {
                            updateProject(editingProject.id || editingProject.name, data);
                        } else {
                            addProject(data);
                        }
                        setIsNewProjectModalOpen(false);
                        setEditingProject(null);
                    }}
                />
            )}

            {/* Cert Edit / Create Modal */}
            {(isNewCertModalOpen || editingCert) && (
                <CertFormModal
                    isOpen={Boolean(isNewCertModalOpen || editingCert)}
                    cert={editingCert}
                    onClose={() => {
                        setIsNewCertModalOpen(false);
                        setEditingCert(null);
                    }}
                    onSave={(data) => {
                        if (editingCert) {
                            updateCertification(editingCert.id, data);
                        } else {
                            addCertification(data);
                        }
                        setIsNewCertModalOpen(false);
                        setEditingCert(null);
                    }}
                />
            )}

            {/* Cert Viewer Modal */}
            {viewingCert && (
                <CertViewerModal
                    isOpen={Boolean(viewingCert)}
                    cert={viewingCert}
                    onClose={() => setViewingCert(null)}
                />
            )}
        </section>
    );
}
