import { useState } from 'react';
import styles from '@styles/components/molecules/ContactForm.module.css';

export function ContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <form className={styles.contactForm} onSubmit={handleSubmit}>
            {submitted && (
                <div className={styles.success}>
                    Mensaje enviado correctamente!
                </div>
            )}
            
            <div className={styles.formGroup}>
                <label className={styles.label}>Nombre</label>
                <input
                    type="text"
                    className={styles.input}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input
                    type="email"
                    className={styles.input}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Mensaje</label>
                <textarea
                    className={styles.textarea}
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                ></textarea>
            </div>

            <button type="submit" className={styles.submitButton}>
                Enviar mensaje
            </button>
        </form>
    );
}
