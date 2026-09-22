import React, { useState, useMemo } from 'react';
import { Badge, Icon } from '../../atoms';
import { FilterTabs, CertCard } from '../../molecules';
import { certifications, certCategories } from '../../../data';
import styles from './CertsSection.module.css';

export function CertsSection() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categoryCounts = useMemo(() => {
        const counts = { all: certifications.length };
        certCategories.forEach(cat => {
            if (cat.id !== 'all') {
                counts[cat.id] = certifications.filter(c => c.category === cat.id).length;
            }
        });
        return counts;
    }, []);

    const filteredCerts = useMemo(() => {
        if (selectedCategory === 'all') return certifications;
        return certifications.filter(c => c.category === selectedCategory);
    }, [selectedCategory]);

    return (
        <section className={styles.certsSection} id="certificaciones">
            <div className={`container ${styles.sectionContainer}`}>
                <div className={styles.sectionHeader}>
                    <Badge variant="secondary" size="md">
                        Educación & Credenciales
                    </Badge>
                    <h2 className={styles.sectionTitle}>Certificaciones Profesionales</h2>
                    <p className={styles.sectionSubtitle}>
                        Acreditaciones oficiales y especializaciones que avalan mis conocimientos en arquitectura, desarrollo full stack y frontend.
                    </p>
                </div>

                <div className={styles.controlBar}>
                    <FilterTabs
                        categories={certCategories}
                        activeCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                        counts={categoryCounts}
                    />
                </div>

                <div className={styles.certsGrid}>
                    {filteredCerts.map((cert) => (
                        <CertCard key={cert.id} cert={cert} />
                    ))}
                </div>
            </div>
        </section>
    );
}
