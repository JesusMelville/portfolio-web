import React from 'react';
import { Badge } from '../../atoms';
import { ContactCard, ContactForm } from '../../molecules';
import { profile } from '../../../data';
import styles from './ContactSection.module.css';

export function ContactSection() {
    return (
        <section className={styles.contactSection} id="contacto">
            <div className={`container ${styles.sectionContainer}`}>
                <div className={styles.sectionHeader}>
                    <Badge variant="success" size="md" dot>
                        Canales de Contacto
                    </Badge>
                    <h2 className={styles.sectionTitle}>¿Hablamos sobre tu próximo proyecto?</h2>
                    <p className={styles.sectionSubtitle}>
                        Estoy disponible para posiciones full-time, consultorías técnicas o colaboraciones en proyectos innovadores.
                    </p>
                </div>

                <div className={styles.grid}>
                    <ContactCard
                        email={profile.email}
                        location={profile.location}
                        github={profile.github}
                        linkedin={profile.linkedin}
                    />

                    <ContactForm recipientEmail={profile.email} />
                </div>
            </div>
        </section>
    );
}
