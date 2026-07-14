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

const styles = {
  breadcrumb: {
    padding: '1rem 0',
    fontSize: '0.9rem',
    color: '#666'
  },
  link: {
    color: '#667eea',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  },
  separator: {
    margin: '0 0.5rem',
    color: '#ccc'
  },
  current: {
    color: '#333',
    fontWeight: 500
  }
};

export default Breadcrumbs;