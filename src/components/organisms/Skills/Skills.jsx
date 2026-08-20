import { skills } from '@data/profile';
import { SkillBadge } from '@components/atoms';
import styles from '@styles/components/organisms/Skills.module.css';

export function Skills() {
    return (
        <section className={styles.skills} id="habilidades">
            <h2 className={styles.sectionTitle}>Habilidades</h2>
            <div className={styles.skillsGrid}>
                {skills.map(skill => (
                    <SkillBadge key={skill.name} name={skill.name} level={skill.level} />
                ))}
            </div>
        </section>
    );
}
