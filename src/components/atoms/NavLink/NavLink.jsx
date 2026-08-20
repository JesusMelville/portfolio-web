import styles from '@styles/components/atoms/NavLink.module.css';

export function NavLink({ href, children, active }) {
    return (
        <a 
            href={href} 
            className={`${styles.navLink} ${active ? styles.active : ''}`}
        >
            {children}
        </a>
    );
}
