import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { INavItem } from '../../types';
import { useProgress } from '../../hooks/useProgress';
import { useTheme } from '../../contexts/ThemeContext';

interface NavbarProps {
  items: INavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getCompletedCount, getProgressPercentage, progress, currentStreak } = useProgress();
  const { theme, toggleTheme } = useTheme();

  const totalLessons = progress.totalLessons || 1;
  const completedCount = getCompletedCount();
  const percentage = getProgressPercentage();

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
          <span style={styles.logoIcon}>📚</span>
          <span style={styles.logoText}>Kilasonia<span style={styles.logoHighlight}>.tech</span></span>
        </Link>

        <div style={styles.progressWrapper}>
          <div style={styles.progressContainer}>
            <div style={{ ...styles.progressBar, width: `${percentage}%` }} />
          </div>
          <span style={styles.progressText}>{completedCount}/{totalLessons}</span>
        </div>

        {currentStreak > 1 && (
          <div style={styles.streakBadge}>
            🔥 {currentStreak} дней
          </div>
        )}

        <div style={styles.rightGroup}>
          <button onClick={toggleTheme} style={styles.themeToggle} title="Сменить тему">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button onClick={toggleMenu} style={styles.hamburger} aria-label="Меню">
            <span style={{ ...styles.hamburgerLine, ...(isOpen ? styles.hamburgerLineActive : {}) }} />
            <span style={{ ...styles.hamburgerLine, ...(isOpen ? styles.hamburgerLineHidden : {}) }} />
            <span style={{ ...styles.hamburgerLine, ...(isOpen ? styles.hamburgerLineActiveReverse : {}) }} />
          </button>
        </div>

        <ul style={{ ...styles.navList, ...(isOpen ? styles.navListOpen : {}) }}>
          {items.map((item) => (
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
    backgroundColor: 'var(--nav-bg)',
    padding: '12px 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid var(--border)',
    transition: 'all 0.3s ease',
  },
  navScrolled: {
    padding: '8px 0',
    boxShadow: '0 1px 3px var(--shadow)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '8px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--text)',
    fontSize: '1.2rem',
    fontWeight: 600,
    textDecoration: 'none',
    flexShrink: 0,
  },
  logoIcon: { fontSize: '1.3rem' },
  logoText: { color: 'var(--text)' },
  logoHighlight: { color: 'var(--primary)' },
  progressWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: '1 1 auto',
    maxWidth: '200px',
    minWidth: '80px',
  },
  progressContainer: {
    flex: 1,
    height: '4px',
    backgroundColor: 'var(--border)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    background: 'var(--primary)',
    borderRadius: '2px',
    transition: 'width 0.5s ease',
  },
  progressText: {
    fontSize: '0.65rem',
    color: 'var(--text-muted)',
    minWidth: '36px',
    textAlign: 'right' as const,
  },
  streakBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 10px',
    backgroundColor: 'var(--success-bg, #f0fdf4)',
    color: 'var(--success, #22c55e)',
    borderRadius: '20px',
    fontSize: '0.7rem',
    fontWeight: 600,
    border: '1px solid var(--success, #22c55e)',
    whiteSpace: 'nowrap' as const,
  },
  rightGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  themeToggle: {
    background: 'none',
    border: 'none',
    fontSize: '1.1rem',
    cursor: 'pointer',
    padding: '6px 8px',
    borderRadius: '6px',
    color: 'var(--text-muted)',
    transition: 'all 0.3s ease',
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column' as const,
    gap: '4px',
    cursor: 'pointer',
    padding: '6px',
    background: 'none',
    border: 'none',
  },
  hamburgerLine: {
    display: 'block',
    width: '24px',
    height: '2px',
    background: 'var(--text)',
    borderRadius: '1px',
    transition: 'all 0.3s ease',
    transformOrigin: 'center',
  },
  hamburgerLineActive: { transform: 'rotate(45deg) translate(4px, 4px)' },
  hamburgerLineHidden: { opacity: 0, transform: 'scaleX(0)' },
  hamburgerLineActiveReverse: { transform: 'rotate(-45deg) translate(4px, -4px)' },
  navList: {
    display: 'flex',
    listStyle: 'none',
    gap: '24px',
    margin: 0,
    padding: 0,
    transition: 'all 0.3s ease',
  },
  navListOpen: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    paddingTop: '12px',
    gap: '2px',
  },
  navLink: {
    color: 'var(--text-muted)',
    textDecoration: 'none',
    fontSize: '0.95rem',
    padding: '6px 0',
    position: 'relative' as const,
    transition: 'color 0.3s ease',
    display: 'block',
  },
  activeLink: {
    color: 'var(--text)',
    fontWeight: 500,
  },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .theme-toggle:hover {
    background: var(--bg-hover);
    transform: rotate(15deg);
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: width 0.3s ease;
  }

  .nav-link:hover::after,
  .active-link::after { width: 100%; }
  .active-link::after { width: 100%; }

  @media (max-width: 1024px) {
    .nav-list { gap: 16px !important; }
    .progress-wrapper { max-width: 150px !important; }
  }

  @media (max-width: 768px) {
    .hamburger { display: flex !important; }
    .nav-list { display: none !important; }
    .nav-list.open { display: flex !important; animation: slideDown 0.3s ease; }
    .nav-link::after { display: none; }
    .active-link {
      background: var(--bg-hover);
      border-left: 3px solid var(--primary);
      padding-left: 12px !important;
    }
    .logo-text { font-size: 0.95rem !important; }
    .progress-wrapper {
      max-width: 120px !important;
      min-width: 50px !important;
    }
    .progress-text { font-size: 0.55rem !important; min-width: 28px !important; }
    .logo-icon { font-size: 1.1rem !important; }
    .container { padding: 0 12px !important; gap: 4px !important; }
    .streak-badge { font-size: 0.6rem !important; padding: 1px 8px !important; }
  }

  @media (max-width: 480px) {
    .nav { padding: 8px 0 !important; }
    .logo { font-size: 1rem !important; }
    .logo-icon { font-size: 1rem !important; }
    .progress-wrapper { max-width: 90px !important; min-width: 40px !important; }
    .progress-text { font-size: 0.5rem !important; min-width: 24px !important; }
    .theme-toggle { font-size: 0.95rem !important; padding: 4px 6px !important; }
    .hamburger { padding: 4px !important; }
    .hamburger-line { width: 20px !important; }
    .container { padding: 0 8px !important; gap: 2px !important; }
    .streak-badge { font-size: 0.5rem !important; padding: 1px 6px !important; }
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);

export default Navbar;