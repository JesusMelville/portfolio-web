import { profile, stats } from '@data/profile';
import styles from '@styles/components/organisms/Hero.module.css';

export function Hero() {
    return (
        <section className={styles.hero} id="inicio">
            <div className={styles.heroContent}>
                <div className={styles.heroText}>
                    <span className={styles.greeting}>Hola, soy</span>
                    <h1 className={styles.name}>{profile.name}</h1>
                    <h2 className={styles.title}>{profile.title}</h2>
                    <p className={styles.bio}>{profile.bio}</p>
                    
                    <div className={styles.stats}>
                        {stats.map((stat, index) => (
                            <div key={index} className={styles.statItem}>
                                <span className={styles.statValue}>{stat.value}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.actions}>
                        <a href="#proyectos" className={styles.primaryButton}>
                            Ver proyectos
                        </a>
                        <a href="#contacto" className={styles.secondaryButton}>
                            Contactarme
                        </a>
                    </div>
                </div>

                <div className={styles.heroImage}>
                    <img src={profile.avatar} alt={profile.name} className={styles.avatar} />
                    <div className={styles.avatarGlow}></div>
                </div>
            </div>
        </section>
    );
}
