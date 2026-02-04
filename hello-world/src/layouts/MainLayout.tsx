import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';

export const MainLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>My App</h1>
        <nav className={styles.nav}>
          <NavLink
            to="/calculator"
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
          >
            Calculator
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
          >
            Sign Up
          </NavLink>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
