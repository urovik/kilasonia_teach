import React from 'react';
import { Link } from 'react-router-dom';
import { IBreadcrumb } from '../../types';

interface BreadcrumbsProps {
  items: IBreadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav style={styles.breadcrumb}>
      <Link to="/" style={styles.link}>Главная</Link>
      {items.map((item, index) => (
        <span key={item.path}>
          <span style={styles.separator}> / </span>
          {index === items.length - 1 ? (
            <span style={styles.current}>{item.label}</span>
          ) : (
            <Link to={item.path} style={styles.link}>{item.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
};

const styles: any = {
  breadcrumb: {
    padding: '12px 0',
    fontSize: '0.9rem',
    color: 'var(--text-muted, #6b7a8a)',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '2px',
  },
  link: {
    color: 'var(--primary, #3498db)',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  separator: {
    margin: '0 4px',
    color: 'var(--text-light, #95a5a6)',
  },
  current: {
    color: 'var(--text, #2c3e50)',
    fontWeight: 500,
  },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @media (max-width: 768px) {
    .breadcrumb { font-size: 0.8rem !important; padding: 8px 0 !important; }
    .separator { margin: 0 2px !important; }
  }

  @media (max-width: 480px) {
    .breadcrumb { font-size: 0.7rem !important; padding: 6px 0 !important; gap: 0px !important; }
    .separator { margin: 0 1px !important; }
  }
`;
document.head.appendChild(styleSheet);

export default Breadcrumbs;