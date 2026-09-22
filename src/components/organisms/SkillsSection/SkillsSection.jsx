import React from 'react';
import { Badge, Icon } from '../../atoms';
import { SkillCard } from '../../molecules';
import { skillCategories } from '../../../data';
import styles from './SkillsSection.module.css';

export function SkillsSection() {
    return (
        <section className={styles.skillsSection} id="habilidades">
            <div className={`container ${styles.sectionContainer}`}>
                <div className={styles.sectionHeader}>
                    <Badge variant="primary" size="md">
                        Stack & Especialidades
                    </Badge>
                    <h2 className={styles.sectionTitle}>Habilidades Técnicas</h2>
                    <p className={styles.sectionSubtitle}>
                        Herramientas, frameworks y metodologías que empleo a diario para crear software robusto y escalable.
                    </p>
                </div>

                <div className={styles.categoriesStack}>
                    {skillCategories.map((category) => (
                        <div key={category.id} className={styles.categoryBlock}>
                            <div className={styles.categoryInfo}>
                                <div className={styles.iconCircle}>
                                    <Icon name={category.icon} size={22} color="var(--color-primary-light)" />
                                </div>
                                <div>
                                    <h3 className={styles.categoryTitle}>{category.title}</h3>
                                    <p className={styles.categoryDesc}>{category.description}</p>
                                </div>
                            </div>

                            <div className={styles.skillsGrid}>
                                {category.skills.map((skill) => (
                                    <SkillCard key={skill.name} skill={skill} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
