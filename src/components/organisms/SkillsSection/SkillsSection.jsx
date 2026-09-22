import React, { useState, useMemo } from 'react';
import { Badge, Icon } from '../../atoms';
import { SkillCard, FilterTabs } from '../../molecules';
import { skillCategories } from '../../../data';
import styles from './SkillsSection.module.css';

const skillFilterTabs = [
    { id: 'all', label: 'Todas las Habilidades' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'desktop', label: 'Desktop & Extensiones' },
    { id: 'ai', label: 'IA & Automatización' },
    { id: 'tools', label: 'Herramientas & DevOps' }
];

export function SkillsSection() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredCategories = useMemo(() => {
        if (selectedCategory === 'all') return skillCategories;
        return skillCategories.filter(c => c.id === selectedCategory);
    }, [selectedCategory]);

    const categoryCounts = useMemo(() => {
        const counts = { all: skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0) };
        skillCategories.forEach(cat => {
            counts[cat.id] = cat.skills.length;
        });
        return counts;
    }, []);

    return (
        <section className={styles.skillsSection} id="habilidades">
            <div className={`container ${styles.sectionContainer}`}>
                <div className={styles.sectionHeader}>
                    <Badge variant="primary" size="md">
                        Stack & Especialidades
                    </Badge>
                    <h2 className={styles.sectionTitle}>Habilidades Técnicas</h2>
                    <p className={styles.sectionSubtitle}>
                        Herramientas, frameworks, lenguajes y metodologías que empleo a diario para crear software robusto, moderno y escalable.
                    </p>
                </div>

                <div className={styles.controlBar}>
                    <FilterTabs
                        categories={skillFilterTabs}
                        activeCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                        counts={categoryCounts}
                    />
                </div>

                <div className={styles.categoriesStack}>
                    {filteredCategories.map((category) => (
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
