import React from 'react';
import { Badge } from '../../atoms';
import styles from './SkillCard.module.css';

export function SkillCard({ skill }) {
    return (
        <div className={`${styles.skillCard} ${skill.highlight ? styles.highlighted : ''}`}>
            <div className={styles.topRow}>
                <span className={styles.skillName}>{skill.name}</span>
                {skill.badge && (
                    <Badge variant={skill.highlight ? 'primary' : 'default'} size="sm">
                        {skill.badge}
                    </Badge>
                )}
            </div>

            <div className={styles.progressTrack}>
                <div
                    className={styles.progressBar}
                    style={{ width: `${skill.level}%` }}
                />
            </div>

            <div className={styles.bottomRow}>
                <span className={styles.levelLabel}>Dominio</span>
                <span className={styles.percentage}>{skill.level}%</span>
            </div>
        </div>
    );
}
