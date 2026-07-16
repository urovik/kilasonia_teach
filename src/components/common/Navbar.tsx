import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { INavItem } from '../../types';

interface NavbarProps {
  items: INavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>🚀</span>
          <span style={styles.logoText}>Kilasonia<span style={styles.logoHighlight}>.tech</span></span>
        </Link>

        <button onClick={toggleMenu} style={styles.hamburger}>
          <span style={{ ...styles.hamburgerLine, ...(isOpen ? styles.hamburgerLineActive : {}) }} />
          <span style={{ ...styles.hamburgerLine, ...(isOpen ? styles.hamburgerLineHidden : {}) }} />
          <span style={{ ...styles.hamburgerLine, ...(isOpen ? styles.hamburgerLineActiveReverse : {}) }} />
        </button>

        <ul style={{ ...styles.navList, ...(isOpen ? styles.navListOpen : {}) }}>
          {items.map(item => (
            <li key={item.id}>
              <Link 
                to={item.path} 
                style={{ ...styles.navLink, ...(location.pathname === item.path ? styles.activeLink : {}) }} 
                onClick={closeMenu}
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

const styles: any = {
  nav: {
    backgroundColor: 'rgba(26, 26, 46, 0.95)',
    padding: '12px 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    transition: 'all 0.3s ease',
  },
  navScrolled: {
    padding: '8px 0',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#fff',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  logoIcon: {
    fontSize: '1.5rem',
  },
  logoText: {
    color: '#fff',
  },
  logoHighlight: {
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column' as const,
    gap: '5px',
    cursor: 'pointer',
    padding: '8px',
    background: 'none',
    border: 'none',
  },
  hamburgerLine: {
    display: 'block',
    width: '28px',
    height: '3px',
    background: '#fff',
    borderRadius: '2px',
    transition: 'all 0.3s ease',
    transformOrigin: 'center',
  },
  hamburgerLineActive: {
    transform: 'rotate(45deg) translate(5px, 5px)',
  },
  hamburgerLineHidden: {
    opacity: 0,
    transform: 'scaleX(0)',
  },
  hamburgerLineActiveReverse: {
    transform: 'rotate(-45deg) translate(5px, -5px)',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    gap: '32px',
    margin: 0,
    padding: 0,
    transition: 'all 0.3s ease',
  },
  navListOpen: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    paddingTop: '16px',
    gap: '4px',
  },
  navLink: {
    color: '#a8a8b8',
    textDecoration: 'none',
    fontSize: '1rem',
    padding: '8px 0',
    position: 'relative' as const,
    transition: 'color 0.3s ease',
    display: 'block',
  },
  activeLink: {
    color: '#fff',
  },
};

// CSS для адаптивности и анимаций
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    transition: width 0.3s ease;
  }
  
  .nav-link:hover::after,
  .active-link::after {
    width: 100%;
  }

  .active-link::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    .hamburger {
      display: flex !important;
    }
    .nav-list {
      display: none !important;
    }
    .nav-list.open {
      display: flex !important;
      animation: slideDown 0.3s ease;
    }
    .nav-link::after {
      display: none;
    }
    .active-link {
      background: linear-gradient(90deg, rgba(102,126,234,0.15), transparent);
      border-left: 3px solid #667eea;
      padding-left: 12px !important;
    }
    .logo-text {
      font-size: 1rem !important;
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(styleSheet);

export default Navbar;