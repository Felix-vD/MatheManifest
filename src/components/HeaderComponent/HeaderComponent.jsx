// src/components/Header/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Make sure you have this CSS module

const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles.logoContainer}>
                    {/* Replace with your logo */}
                    <Link to="/" className={styles.logoLink}>MathemaniFest</Link>
                </div>
                <div className={styles.navLinks}>
                    <Link to="/" className={styles.navLink}>Home</Link>
                    <Link to="/ranking" className={styles.navLink}>Ranking</Link>
                    <Link to="/profile" className={styles.navLink}>Profile</Link>
                    <Link to="/faq" className={styles.navLink}>FAQ</Link>
                    <Link to="/contact" className={styles.navLink}>Contact</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
