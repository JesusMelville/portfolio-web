import React, { useState, useMemo } from 'react';
import { Badge, Button, Icon } from '../../atoms';
import { FilterTabs, SearchInput, ProjectCard, ProjectModal } from '../../molecules';
import { projectCategories } from '../../../data';
import { usePortfolio } from '../../../context';
import styles from './ProjectsSection.module.css';

export function ProjectsSection() {
    const { visibleProjects, syncWithGitHub, isSyncing, openDashboard } = usePortfolio();

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeModalProject, setActiveModalProject] = useState(null);

    // Calculate category counts based on dynamic visible projects
    const categoryCounts = useMemo(() => {
        const counts = { all: visibleProjects.length };
        projectCategories.forEach(cat => {
            if (cat.id !== 'all') {
                counts[cat.id] = visibleProjects.filter(p => p.category === cat.id).length;
            }
        });
        return counts;
    }, [visibleProjects]);

    // Filter projects
    const filteredProjects = useMemo(() => {
        return visibleProjects.filter((project) => {
            const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;

            const query = searchQuery.toLowerCase().trim();
            if (!query) return matchesCategory;

            const matchesSearch =
                project.title.toLowerCase().includes(query) ||
                (project.subtitle && project.subtitle.toLowerCase().includes(query)) ||
                project.description.toLowerCase().includes(query) ||
                (project.tags && project.tags.some(tag => tag.toLowerCase().includes(query)));

            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery, visibleProjects]);

    const handleClearFilters = () => {
        setSelectedCategory('all');
        setSearchQuery('');
    };

    return (
        <section className={styles.projectsSection} id="proyectos">
            <div className={`container ${styles.sectionContainer}`}>
                <div className={styles.sectionHeader}>
                    <div className={styles.badgeRow}>
                        <Badge variant="primary" size="md">
                            Portafolio de Trabajos
                        </Badge>
                        <Badge variant="success" size="sm" dot>
                            Sincronizado con GitHub
                        </Badge>
                    </div>

                    <h2 className={styles.sectionTitle}>Todos Mis Proyectos</h2>
                    <p className={styles.sectionSubtitle}>
                        Explora mis repositorios en GitHub, aplicaciones full stack, dashboards interactivos y herramientas de código abierto.
                    </p>
                </div>

                {/* Filters and Search Bar */}
                <div className={styles.controlBar}>
                    <FilterTabs
                        categories={projectCategories}
                        activeCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                        counts={categoryCounts}
                    />

                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        onClear={() => setSearchQuery('')}
                        placeholder="Buscar por React, TypeScript, APIs..."
                    />
                </div>

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <div className={styles.projectsGrid}>
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id || project.name}
                                project={project}
                                onOpenDetails={(proj) => setActiveModalProject(proj)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            <Icon name="search" size={32} />
                        </div>
                        <h3 className={styles.emptyTitle}>No se encontraron proyectos</h3>
                        <p className={styles.emptyText}>
                            No hay proyectos que coincidan con los filtros o el término de búsqueda <strong>"{searchQuery}"</strong>.
                        </p>
                        <Button
                            variant="secondary"
                            size="md"
                            onClick={handleClearFilters}
                        >
                            Limpiar Filtros de Búsqueda
                        </Button>
                    </div>
                )}
            </div>

            {/* Detailed Project Modal */}
            <ProjectModal
                project={activeModalProject}
                onClose={() => setActiveModalProject(null)}
            />
        </section>
    );
}
