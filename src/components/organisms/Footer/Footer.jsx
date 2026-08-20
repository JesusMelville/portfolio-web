import { profile } from '@data/profile';
import styles from '@styles/components/organisms/Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p className={styles.copyright}>
                    &copy; {new Date().getFullYear()} {profile.name}. Hecho con React.
                </p>
            </div>
        </footer>
    );
}
