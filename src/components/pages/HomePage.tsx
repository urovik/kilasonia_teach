import React from 'react';
import { Link } from 'react-router-dom';
import { topicsData } from '../../data/topics';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1 style={styles.title}>Добро пожаловать в kilasonia.tech!</h1>
      <p style={styles.subtitle}>
        Выбери тему и начни изучение программирования
      </p>
      
      <div style={styles.grid}>
        {topicsData.map(topic => (
          <Link 
            key={topic.id} 
            to={`/topic/${topic.id}`}
            style={styles.card}
          >
            <div style={styles.cardIcon}>{topic.icon}</div>
            <h2 style={styles.cardTitle}>{topic.title}</h2>
            <p style={styles.cardDescription}>{topic.description}</p>
            <div style={styles.cardFooter}>
              <span>{topic.lessons.length} уроков</span>
              <span style={styles.arrow}>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const styles = {
  title: {
    fontSize: '2.5rem',
    color: '#1a1a2e',
    marginBottom: '0.5rem'
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '3rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'block'
  },
  cardIcon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  cardTitle: {
    fontSize: '1.5rem',
    color: '#1a1a2e',
    marginBottom: '0.5rem'
  },
  cardDescription: {
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '1rem'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#667eea',
    fontWeight: 'bold'
  },
  arrow: {
    fontSize: '1.5rem'
  }
};

export default HomePage;