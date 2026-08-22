import { skills } from '@data/profile';
import styles from '@styles/components/organisms/Skills.module.css';

export function Skills() {
    return (
        <section className={styles.skills} id="habilidades">
            <h2 className={styles.sectionTitle}>Habilidades</h2>
            <p className={styles.sectionSubtitle}>Tecnologias que domino</p>
            <div className={styles.skillsGrid}>
                {skills.map(skill => (
                    <div key={skill.name} className={styles.skillCard}>
                        <span className={styles.skillIcon}>{skill.icon}</span>
                        <span className={styles.skillName}>{skill.name}</span>
                        <div className={styles.skillBar}>
                            <div 
                                className={styles.skillFill}
                                style={{ width: `${skill.level}%` }}
                            ></div>
                        </div>
                        <span className={styles.skillLevel}>{skill.level}%</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
