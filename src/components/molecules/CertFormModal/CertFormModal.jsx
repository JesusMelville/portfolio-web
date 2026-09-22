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
        certificateImage: null
    });

    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (cert) {
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
                certificateImage: cert.certificateImage || null
            });
            setImagePreview(cert.certificateImage || null);
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
                certificateImage: null
            });
            setImagePreview(null);
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
            if (file.size > 2 * 1024 * 1024) {
                alert('El archivo es demasiado grande (máximo 2MB para almacenamiento local).');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result;
                setImagePreview(base64Data);
                setFormData(prev => ({ ...prev, certificateImage: base64Data }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setFormData(prev => ({ ...prev, certificateImage: null }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

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
                                Añade los datos y comprobante oficial de tu certificado
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

                        {/* Upload Certificate Image / Proof */}
                        <div className={styles.uploadSection}>
                            <label className={styles.label}>Comprobante / Imagen del Certificado (Opcional)</label>
                            {imagePreview ? (
                                <div className={styles.previewContainer}>
                                    <img src={imagePreview} alt="Comprobante" className={styles.previewImg} />
                                    <div className={styles.previewOverlay}>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="sm"
                                            onClick={handleRemoveImage}
                                            iconLeft={<Icon name="trash" size={14} color="#f43f5e" />}
                                        >
                                            Eliminar Imagen
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <label className={styles.dropzone}>
                                    <Icon name="upload" size={28} color="var(--color-primary-light)" />
                                    <span className={styles.dropText}>
                                        Haz clic para subir o arrastra la imagen del certificado (PNG, JPG, WebP - máx 2MB)
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
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
