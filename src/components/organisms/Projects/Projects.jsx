import { useState } from 'react';
import { projects, categories } from '@data/profile';
import { ProjectCard } from '@components/molecules';
import styles from '@styles/components/organisms/Projects.module.css';

export function Projects() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredProjects = activeCategory === 'all' 
        ? projects 
        : projects.filter(p => p.category === activeCategory);

    return (
        <section className={styles.projects} id="proyectos">
            <h2 className={styles.sectionTitle}>Proyectos</h2>
            <p className={styles.sectionSubtitle}>
                {projects.length} proyectos construidos con React
            </p>

            <div className={styles.filters}>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`${styles.filterButton} ${activeCategory === cat.id ? styles.filterActive : ''}`}
                        onClick={() => setActiveCategory(cat.id)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className={styles.projectsGrid}>
                {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
}
