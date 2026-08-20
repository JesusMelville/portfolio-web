import styles from '@styles/components/atoms/SkillBadge.module.css';

export function SkillBadge({ name, level }) {
    return (
        <div className={styles.skillBadge}>
            <div className={styles.skillHeader}>
                <span className={styles.skillName}>{name}</span>
                <span className={styles.skillLevel}>{level}%</span>
            </div>
            <div className={styles.skillBar}>
                <div 
                    className={styles.skillFill}
                    style={{ width: `${level}%` }}
                ></div>
            </div>
        </div>
    );
}
