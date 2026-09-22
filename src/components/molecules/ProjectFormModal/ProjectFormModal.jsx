import React, { useState, useEffect } from 'react';
import { Button, Input, Textarea, Icon } from '../../atoms';
import { projectCategories } from '../../../data';
import styles from './ProjectFormModal.module.css';

export function ProjectFormModal({ project, isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: '',
        longDescription: '',
        tags: '',
        category: 'frontend',
        github: '',
        demo: '',
        featured: false,
        visible: true,
        color: '#8b5cf6'
    });

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title || '',
                subtitle: project.subtitle || '',
                description: project.description || '',
                longDescription: project.longDescription || '',
                tags: Array.isArray(project.tags) ? project.tags.join(', ') : (project.tags || ''),
                category: project.category || 'frontend',
                github: project.github || '',
                demo: project.demo || '',
                featured: Boolean(project.featured),
                visible: project.visible !== false,
                color: project.color || '#8b5cf6'
            });
        } else {
            setFormData({
                title: '',
                subtitle: '',
                description: '',
                longDescription: '',
                tags: '',
                category: 'frontend',
                github: '',
                demo: '',
                featured: false,
                visible: true,
                color: '#8b5cf6'
            });
        }
    }, [project, isOpen]);

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
                            <Icon name="code" size={22} color="var(--color-primary-light)" />
                        </div>
                        <div>
                            <h3 className={styles.modalTitle}>
                                {project ? 'Editar Proyecto' : 'Crear Proyecto Manual'}
                            </h3>
                            <p className={styles.modalSubtitle}>
                                Personaliza los detalles, enlaces y categorías visibles en tu portafolio
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
                                label="Título del Proyecto"
                                id="proj-title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Ej. TaskFlow System"
                                required
                            />
                            <Input
                                label="Subtítulo / Rol"
                                id="proj-sub"
                                value={formData.subtitle}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                placeholder="Ej. Gestor de Tareas con Atomic Design"
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Categoría</label>
                                <select
                                    className={styles.select}
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {projectCategories.filter(c => c.id !== 'all').map(c => (
                                        <option key={c.id} value={c.id}>{c.label}</option>
                                    ))}
                                </select>
                            </div>
                            <Input
                                label="Color de Acento (Hexadecimal)"
                                id="proj-color"
                                value={formData.color}
                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                placeholder="#8b5cf6"
                            />
                        </div>

                        <div className={styles.row}>
                            <Input
                                label="Enlace al Repositorio GitHub"
                                id="proj-github"
                                type="url"
                                value={formData.github}
                                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                placeholder="https://github.com/JesusMelville/..."
                            />
                            <Input
                                label="Enlace a la Demo en Vivo"
                                id="proj-demo"
                                type="url"
                                value={formData.demo}
                                onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>

                        <Input
                            label="Tags y Tecnologías (separadas por coma)"
                            id="proj-tags"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            placeholder="React, TypeScript, CSS Modules, Vite"
                            required
                        />

                        <Textarea
                            label="Descripción Breve (para tarjeta)"
                            id="proj-desc"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={2}
                            placeholder="Resumen conciso de qué hace el proyecto..."
                            required
                        />

                        <Textarea
                            label="Descripción Extendida (para modal)"
                            id="proj-long-desc"
                            value={formData.longDescription}
                            onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                            rows={3}
                            placeholder="Explicación detallada de la arquitectura, retos y soluciones implementadas..."
                        />

                        <div className={styles.checkboxRow}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    className={styles.checkbox}
                                />
                                <span>Marcar como Proyecto Destacado ⭐</span>
                            </label>

                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={formData.visible}
                                    onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                                    className={styles.checkbox}
                                />
                                <span>Visible en el Portafolio Web 👁️</span>
                            </label>
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <Button type="button" variant="ghost" size="md" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="primary" size="md" iconLeft={<Icon name="check" size={18} />}>
                            {project ? 'Guardar Cambios' : 'Crear Proyecto'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
