import React, { useState, useEffect } from 'react';
import { Button, Input, Textarea, Icon, Badge } from '../../atoms';
import { certCategories } from '../../../data';
import styles from './CertFormModal.module.css';

export function CertFormModal({ cert, isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        title: '',
        issuer: '',
        date: new Date().getFullYear().toString(),
        credentialId: '',
        url: '',
        category: 'frontend',
        skills: '',
        badgeColor: '#8b5cf6',
        description: '',
        certificateFile: null,
        fileName: '',
        fileType: 'image' // 'image' | 'pdf'
    });

    const [filePreview, setFilePreview] = useState(null);

    useEffect(() => {
        if (cert) {
            const certFile = cert.certificateFile || cert.certificateImage || null;
            const isPdf = certFile && (certFile.startsWith('data:application/pdf') || cert.fileType === 'pdf');

            setFormData({
                title: cert.title || '',
                issuer: cert.issuer || '',
                date: cert.date || new Date().getFullYear().toString(),
                credentialId: cert.credentialId || '',
                url: cert.url || '',
                category: cert.category || 'frontend',
                skills: Array.isArray(cert.skills) ? cert.skills.join(', ') : (cert.skills || ''),
                badgeColor: cert.badgeColor || '#8b5cf6',
                description: cert.description || '',
                certificateFile: certFile,
                fileName: cert.fileName || (isPdf ? 'documento-certificado.pdf' : 'comprobante-imagen'),
                fileType: isPdf ? 'pdf' : 'image'
            });
            setFilePreview(certFile);
        } else {
            setFormData({
                title: '',
                issuer: '',
                date: new Date().getFullYear().toString(),
                credentialId: '',
                url: '',
                category: 'frontend',
                skills: '',
                badgeColor: '#8b5cf6',
                description: '',
                certificateFile: null,
                fileName: '',
                fileType: 'image'
            });
            setFilePreview(null);
        }
    }, [cert, isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 3 * 1024 * 1024) {
                alert('El archivo es demasiado grande (máximo 3MB para almacenamiento local).');
                return;
            }

            const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
            const detectedType = isPdf ? 'pdf' : 'image';

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result;
                setFilePreview(base64Data);
                setFormData(prev => ({
                    ...prev,
                    certificateFile: base64Data,
                    certificateImage: base64Data, // backward compatibility
                    fileName: file.name,
                    fileType: detectedType
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveFile = () => {
        setFilePreview(null);
        setFormData(prev => ({
            ...prev,
            certificateFile: null,
            certificateImage: null,
            fileName: '',
            fileType: 'image'
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    const isPdf = formData.fileType === 'pdf' || (filePreview && filePreview.startsWith('data:application/pdf'));

    return (
        <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.titleWrap}>
                        <div className={styles.iconCircle}>
                            <Icon name="award" size={22} color="var(--color-primary-light)" />
                        </div>
                        <div>
                            <h3 className={styles.modalTitle}>
                                {cert ? 'Editar Certificación' : 'Subir Nueva Certificación'}
                            </h3>
                            <p className={styles.modalSubtitle}>
                                Añade los datos y comprobante oficial (PDF, PNG, JPG) de tu certificado
                            </p>
                        </div>
                    </div>
                    <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
                        <Icon name="close" size={20} />
                    </button>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formBody}>
                        <div className={styles.row}>
                            <Input
                                label="Nombre de la Certificación"
                                id="cert-title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Ej. React.js Avanzado & Atomic Design"
                                required
                            />
                            <Input
                                label="Entidad Emisora / Institución"
                                id="cert-issuer"
                                value={formData.issuer}
                                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                                placeholder="Ej. Meta, Platzi, Coursera, freeCodeCamp"
                                required
                            />
                        </div>

                        <div className={styles.rowThree}>
                            <Input
                                label="Año / Fecha"
                                id="cert-date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                placeholder="Ej. 2024"
                                required
                            />
                            <Input
                                label="ID de Credencial"
                                id="cert-id"
                                value={formData.credentialId}
                                onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                                placeholder="Ej. CERT-98421"
                            />
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Categoría</label>
                                <select
                                    className={styles.select}
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {certCategories.filter(c => c.id !== 'all').map(c => (
                                        <option key={c.id} value={c.id}>{c.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <Input
                            label="Enlace Oficial de Verificación (URL)"
                            id="cert-url"
                            type="url"
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                            placeholder="https://..."
                        />

                        <Input
                            label="Competencias Avaladas (separadas por coma)"
                            id="cert-skills"
                            value={formData.skills}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                            placeholder="React, TypeScript, Hooks, Architecture"
                        />

                        <Textarea
                            label="Descripción / Resumen de lo aprendido"
                            id="cert-desc"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            placeholder="Detalla las competencias clave adquiridas en este curso o certificación..."
                        />

                        {/* Upload Certificate Image / PDF Proof */}
                        <div className={styles.uploadSection}>
                            <label className={styles.label}>
                                Comprobante del Certificado (Permite PDF o Imágenes)
                            </label>
                            {filePreview ? (
                                <div className={styles.previewContainer}>
                                    {isPdf ? (
                                        <div className={styles.pdfPreviewBox}>
                                            <div className={styles.pdfIconCircle}>
                                                <Icon name="pdf" size={36} color="#ef4444" />
                                            </div>
                                            <div className={styles.pdfInfo}>
                                                <span className={styles.pdfBadge}>Documento PDF</span>
                                                <span className={styles.pdfFileName}>{formData.fileName || 'certificado.pdf'}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <img src={filePreview} alt="Comprobante" className={styles.previewImg} />
                                    )}

                                    <div className={styles.previewOverlay}>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="sm"
                                            onClick={handleRemoveFile}
                                            iconLeft={<Icon name="trash" size={14} color="#f43f5e" />}
                                        >
                                            Eliminar Archivo
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <label className={styles.dropzone}>
                                    <div className={styles.dropIcons}>
                                        <Icon name="pdf" size={28} color="#ef4444" />
                                        <Icon name="image" size={28} color="var(--color-primary-light)" />
                                    </div>
                                    <span className={styles.dropText}>
                                        Haz clic para subir o arrastra tu certificado en formato <strong>PDF</strong> o <strong>Imagen (PNG, JPG, WebP)</strong> (máx 3MB)
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*,application/pdf,.pdf"
                                        className={styles.fileInput}
                                        onChange={handleFileChange}
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <Button type="button" variant="ghost" size="md" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="primary" size="md" iconLeft={<Icon name="check" size={18} />}>
                            {cert ? 'Guardar Cambios' : 'Subir Certificación'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
