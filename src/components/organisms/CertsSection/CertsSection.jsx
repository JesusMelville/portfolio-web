import React, { useState, useMemo } from 'react';
import { Badge, Button, Icon } from '../../atoms';
import { FilterTabs, CertCard, CertFormModal, CertViewerModal } from '../../molecules';
import { certCategories } from '../../../data';
import { usePortfolio } from '../../../context';
import styles from './CertsSection.module.css';

export function CertsSection() {
    const { certifications, addCertification, openDashboard } = usePortfolio();

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [viewingCert, setViewingCert] = useState(null);

    const categoryCounts = useMemo(() => {
        const counts = { all: certifications.length };
        certCategories.forEach(cat => {
            if (cat.id !== 'all') {
                counts[cat.id] = certifications.filter(c => c.category === cat.id).length;
            }
        });
        return counts;
    }, [certifications]);

    const filteredCerts = useMemo(() => {
        if (selectedCategory === 'all') return certifications;
        return certifications.filter(c => c.category === selectedCategory);
    }, [selectedCategory, certifications]);

    return (
        <section className={styles.certsSection} id="certificaciones">
            <div className={`container ${styles.sectionContainer}`}>
                <div className={styles.sectionHeader}>
                    <Badge variant="secondary" size="md">
                        Educación & Credenciales
                    </Badge>
                    <h2 className={styles.sectionTitle}>Certificaciones Oficiales</h2>
                    <p className={styles.sectionSubtitle}>
                        Acreditaciones, especializaciones y credenciales profesionales verificadas en desarrollo web, React, backend y arquitectura.
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
                        <CertCard
                            key={cert.id}
                            cert={cert}
                            onViewCert={(c) => setViewingCert(c)}
                        />
                    ))}
                </div>
            </div>

            {/* Upload Modal */}
            <CertFormModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onSave={(data) => addCertification(data)}
            />

            {/* Viewer Modal */}
            <CertViewerModal
                cert={viewingCert}
                isOpen={Boolean(viewingCert)}
                onClose={() => setViewingCert(null)}
            />
        </section>
    );
}
