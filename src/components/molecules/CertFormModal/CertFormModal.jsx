import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button, Input, Textarea, Icon, Badge } from '../../atoms';
import { certCategories } from '../../../data';
import { detectCertDetailsFromFile } from '../../../utils/certDetector';
import { compressImageFile } from '../../../utils/fileCompressor';
import styles from './CertFormModal.module.css';

export function CertFormModal({ cert, isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        title: '',
        issuer: '',
        date: new Date().getFullYear().toString(),
        credentialId: '',
        url: '',
        category: 'ai',
        skills: '',
        badgeColor: '#ec4899',
        description: '',
        certificateFile: null,
        fileName: '',
        fileType: 'image' // 'image' | 'pdf'
    });

    const [filePreview, setFilePreview] = useState(null);
    const [autoFillNotice, setAutoFillNotice] = useState(null);
    const [isProcessingFile, setIsProcessingFile] = useState(false);

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
                category: cert.category || 'ai',
                skills: Array.isArray(cert.skills) ? cert.skills.join(', ') : (cert.skills || ''),
                badgeColor: cert.badgeColor || '#ec4899',
                description: cert.description || '',
                certificateFile: certFile,
                fileName: cert.fileName || (isPdf ? 'documento-certificado.pdf' : 'comprobante-imagen'),
                fileType: isPdf ? 'pdf' : 'image'
            });
            setFilePreview(certFile);
            setAutoFillNotice(null);
        } else {
            setFormData({
                title: '',
                issuer: '',
                date: new Date().getFullYear().toString(),
                credentialId: '',
                url: '',
                category: 'ai',
                skills: '',
                badgeColor: '#ec4899',
                description: '',
                certificateFile: null,
                fileName: '',
                fileType: 'image'
            });
            setFilePreview(null);
            setAutoFillNotice(null);
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

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
            const detectedType = isPdf ? 'pdf' : 'image';

            setIsProcessingFile(true);
            try {
                // Compress image automatically to ~80-150KB for instant cloud upload
                const base64Data = await compressImageFile(file, 1280, 0.75);

                if (!base64Data) {
                    alert('No se pudo procesar el archivo seleccionado.');
                    setIsProcessingFile(false);
                    return;
                }

                setFilePreview(base64Data);

                // Run intelligent auto-detection
                const detected = detectCertDetailsFromFile(file, base64Data);

                setFormData(prev => ({
                    ...prev,
                    title: detected.title || prev.title,
                    issuer: detected.issuer || prev.issuer,
                    date: detected.date || prev.date,
                    credentialId: detected.credentialId || prev.credentialId,
                    url: detected.url || prev.url,
                    category: detected.category || prev.category,
                    badgeColor: detected.badgeColor || prev.badgeColor,
                    skills: detected.skills || prev.skills,
                    description: detected.description || prev.description,
                    certificateFile: base64Data,
                    certificateImage: base64Data,
                    fileName: file.name,
                    fileType: detectedType
                }));

                setAutoFillNotice({
                    title: detected.title,
                    issuer: detected.issuer,
                    category: detected.category
                });
            } catch (err) {
                console.error('Error processing certificate file:', err);
            } finally {
                setIsProcessingFile(false);
            }
        }
    };

    const handleRemoveFile = () => {
        setFilePreview(null);
        setAutoFillNotice(null);
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

    if (!isOpen || typeof document === 'undefined') return null;

    const isPdf = formData.fileType === 'pdf' || (filePreview && filePreview.startsWith('data:application/pdf'));

    return createPortal(
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
                                Sube tu PDF/Imagen y el sistema autocompletará los datos automáticamente
                            </p>
                        </div>
                    </div>
                    <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
                        <Icon name="close" size={20} />
                    </button>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formBody}>
                        
                        {/* UPLOAD SECTION FIRST (WITH AUTO-FILL MAGIC) */}
                        <div className={styles.uploadSection}>
                            <div className={styles.uploadHeader}>
                                <label className={styles.label}>
                                    <Icon name="wand" size={16} color="var(--color-accent-pink)" />
                                    <span>Comprobante Oficial (PDF o Imagen) — <em>Autocompletado Inteligente</em></span>
                                </label>
                            </div>

                            {filePreview ? (
                                <div className={styles.previewContainer}>
                                    {isPdf ? (
                                        <div className={styles.pdfPreviewBox}>
                                            <div className={styles.pdfIconCircle}>
                                                <Icon name="pdf" size={36} color="#ef4444" />
                                            </div>
                                            <div className={styles.pdfInfo}>
                                                <span className={styles.pdfBadge}>Documento PDF Adjunto</span>
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
                                            Cambiar Archivo
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <label className={styles.dropzone}>
                                    <div className={styles.dropIcons}>
                                        <div className={styles.magicBadge}>
                                            <Icon name="wand" size={16} color="#ec4899" />
                                            <span>Auto-Relleno Inteligente</span>
                                        </div>
                                        <div className={styles.iconsRow}>
                                            <Icon name="pdf" size={26} color="#ef4444" />
                                            <Icon name="image" size={26} color="var(--color-primary-light)" />
                                        </div>
                                    </div>
                                    <span className={styles.dropText}>
                                        <strong>Haz clic o arrastra tu Certificado (PDF, PNG, JPG)</strong>
                                    </span>
                                    <span className={styles.dropSubtext}>
                                        Al subirlo, detectaremos el título, emisor, fecha, categoría y competencias para rellenar los espacios.
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*,application/pdf,.pdf"
                                        className={styles.fileInput}
                                        onChange={handleFileChange}
                                    />
                                </label>
                            )}

                            {autoFillNotice && (
                                <div className={styles.autoFillAlert}>
                                    <div className={styles.alertIcon}>
                                        <Icon name="sparkles" size={18} color="#ec4899" />
                                    </div>
                                    <div className={styles.alertText}>
                                        <strong>¡Datos autocompletados desde el archivo!</strong>
                                        <p>Detectamos <span>{autoFillNotice.issuer}</span> y asignamos la categoría correspondiente. Puedes ajustar cualquier campo a continuación.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* FORM FIELDS */}
                        <div className={styles.row}>
                            <Input
                                label="Nombre de la Certificación"
                                id="cert-title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Ej. Inteligencia Artificial & Prompt Engineering"
                                required
                            />
                            <Input
                                label="Entidad Emisora / Institución"
                                id="cert-issuer"
                                value={formData.issuer}
                                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                                placeholder="Ej. DeepLearning.AI, OpenAI, Platzi, Meta"
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
                                placeholder="Ej. CERT-AI-89421"
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
                            label="Enlace Oficial de Verificación (URL Opcional)"
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
                            placeholder="Prompt Engineering, LLMs, OpenAI API, Python"
                        />

                        <Textarea
                            label="Descripción / Resumen de lo aprendido"
                            id="cert-desc"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            placeholder="Detalla las competencias clave adquiridas en este curso o certificación..."
                        />
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
        </div>,
        document.body
    );
}
