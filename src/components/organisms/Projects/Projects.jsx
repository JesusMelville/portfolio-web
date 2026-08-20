import { projects } from '@data/profile';
import { ProjectCard } from '@components/molecules';
import styles from '@styles/components/organisms/Projects.module.css';

export function Projects() {
    return (
        <section className={styles.projects} id="proyectos">
            <h2 className={styles.sectionTitle}>Proyectos</h2>
            <div className={styles.projectsGrid}>
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
}
