import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { INavItem } from '../../types';

interface NavbarProps {
  items: INavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  const location = useLocation();

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <span style={styles.logoText}>Kilasonia</span>
        </div>
        
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link 
              to="/" 
              style={{
                ...styles.navLink,
                ...(location.pathname === '/' ? styles.activeLink : {})
              }}
            >
              Главная
            </Link>
          </li>
          
          {items.map(item => (
            <li key={item.id} style={styles.navItem}>
              <Link 
                to={item.path}
                style={{
                  ...styles.navLink,
                  ...(location.pathname === item.path ? styles.activeLink : {})
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// Стили вынесены в объект для наглядности
// В проде лучше использовать CSS Modules или styled-components
const styles = {
  nav: {
    backgroundColor: '#1a1a2e',
    padding: '1rem 0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 1000
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  logoText: {
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    gap: '2rem',
    margin: 0,
    padding: 0
  },
  navItem: {
    margin: 0
  },
  navLink: {
    color: '#a8a8b8',
    textDecoration: 'none',
    fontSize: '1rem',
    padding: '0.5rem 0',
    borderBottom: '2px solid transparent',
    transition: 'all 0.3s ease'
  },
  activeLink: {
    color: '#fff',
    borderBottomColor: '#667eea'
  }
};

export default Navbar;