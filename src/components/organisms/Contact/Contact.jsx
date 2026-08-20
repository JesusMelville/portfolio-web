import { ContactForm } from '@components/molecules';
import { profile } from '@data/profile';
import styles from '@styles/components/organisms/Contact.module.css';

export function Contact() {
    return (
        <section className={styles.contact} id="contacto">
            <div className={styles.contactContent}>
                <h2 className={styles.sectionTitle}>Contacto</h2>
                <p className={styles.contactText}>
                    Tienes un proyecto en mente? Me encantaria escucharlo.
                </p>
                <div className={styles.contactInfo}>
                    <a href={`mailto:${profile.email}`} className={styles.contactLink}>
                        {profile.email}
                    </a>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                        GitHub
                    </a>
                </div>
                <ContactForm />
            </div>
        </section>
    );
}
