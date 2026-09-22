import React, { useState, useMemo } from 'react';
import { Badge, Button, Icon } from '../../atoms';
import { FilterTabs, SearchInput, ProjectCard, ProjectModal } from '../../molecules';
import { projects, projectCategories } from '../../../data';
import styles from './ProjectsSection.module.css';

export function ProjectsSection() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeModalProject, setActiveModalProject] = useState(null);

    // Calculate category counts
    const categoryCounts = useMemo(() => {
        const counts = { all: projects.length };
        projectCategories.forEach(cat => {
            if (cat.id !== 'all') {
                counts[cat.id] = projects.filter(p => p.category === cat.id).length;
            }
        });
        return counts;
    }, []);

    // Filter projects
    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
            
            const query = searchQuery.toLowerCase().trim();
            if (!query) return matchesCategory;

            const matchesSearch =
                project.title.toLowerCase().includes(query) ||
                (project.subtitle && project.subtitle.toLowerCase().includes(query)) ||
                project.description.toLowerCase().includes(query) ||
                project.tags.some(tag => tag.toLowerCase().includes(query));

            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    const handleClearFilters = () => {
        setSelectedCategory('all');
        setSearchQuery('');
    };

    return (
        <section className={styles.projectsSection} id="proyectos">
            <div className={`container ${styles.sectionContainer}`}>
                <div className={styles.sectionHeader}>
                    <Badge variant="primary" size="md">
                        Portafolio de Trabajos
                    </Badge>
                    <h2 className={styles.sectionTitle}>Proyectos Seleccionados</h2>
                    <p className={styles.sectionSubtitle}>
                        Explora mis proyectos reales, dashboards analíticos, aplicaciones full stack y herramientas de código abierto.
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
                                key={project.id}
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
