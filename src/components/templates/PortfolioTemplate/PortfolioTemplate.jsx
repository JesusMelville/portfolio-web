import { Hero, Projects, Skills, Contact, Footer } from '@components/organisms';
import styles from '@styles/components/templates/PortfolioTemplate.module.css';

export function PortfolioTemplate() {
    return (
        <div className={styles.template}>
            <nav className={styles.nav}>
                <a href="#inicio" className={styles.logo}>JM</a>
                <div className={styles.navLinks}>
                    <a href="#proyectos">Proyectos</a>
                    <a href="#habilidades">Habilidades</a>
                    <a href="#contacto">Contacto</a>
                </div>
            </nav>
            
            <main className={styles.main}>
                <Hero />
                <Projects />
                <Skills />
                <Contact />
            </main>
            
            <Footer />
        </div>
    );
}
