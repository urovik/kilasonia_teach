import React from 'react';
import { Link } from 'react-router-dom';
import { sectionsData } from '../../data/topics';
import { ISection } from '../../types';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1 style={styles.title}>Добро пожаловать в kilasonia.tech!</h1>
      <p style={styles.subtitle}>
        Выбери раздел и начни изучение программирования
      </p>
      
      <div style={styles.grid}>
        {sectionsData.map((section: ISection) => {
          const totalLessons = section.chapters.reduce(
            (acc, chapter) => acc + chapter.lessons.length, 
            0
          );
          
          return (
            <Link 
              key={section.id} 
              to={`/section/${section.id}`}
              style={styles.card}
            >
              <div style={styles.cardIcon}>{section.icon}</div>
              <h2 style={styles.cardTitle}>{section.title}</h2>
              <p style={styles.cardDescription}>{section.description}</p>
              <div style={styles.cardFooter}>
                <span>{section.chapters.length} глав, {totalLessons} уроков</span>
                <span style={styles.arrow}>→</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Секция с контактами и поддержкой */}
      <div style={styles.contactSection}>
        <h2 style={styles.contactTitle}>Связаться со мной</h2>
        <div style={styles.contactContainer}>
          {/* Telegram */}
          <a 
            href="https://telegram.me/Kilaaaaaakod" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.contactCard}
          >
            <div style={styles.contactIcon}>✈️</div>
            <div style={styles.contactInfo}>
              <h3 style={styles.contactName}>Telegram</h3>
              <p style={styles.contactDesc}>Задавай вопросы и общайся</p>
            </div>
            <span style={styles.contactArrow}>→</span>
          </a>

          {/* YouTube */}
          <a 
            href="https://www.youtube.com/@urovik" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.contactCard}
          >
            <div style={styles.contactIcon}>▶️</div>
            <div style={styles.contactInfo}>
              <h3 style={styles.contactName}>YouTube</h3>
              <p style={styles.contactDesc}>Смотри видеоуроки</p>
            </div>
            <span style={styles.contactArrow}>→</span>
          </a>

          {/* Поддержка с QR */}
          <div style={styles.contactCardSupport}>
            <div style={styles.contactIcon}>❤️</div>
            <div style={styles.contactInfo}>
              <h3 style={styles.contactName}>Поддержать проект</h3>
              <p style={styles.contactDesc}>Отсканируй QR-код для поддержки</p>
            </div>
            <img 
               src={require('../../assets/qr.jpeg')} 
              alt="QR-код для поддержки"
              style={styles.qrSmall}
            />
          </div>
        </div>
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
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'transform 0.3s ease, boxShadow 0.3s ease',
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
  },
  
  // Стили для секции контактов
  contactSection: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginTop: '1rem'
  },
  contactTitle: {
    fontSize: '1.8rem',
    color: '#1a1a2e',
    marginBottom: '1.5rem',
    textAlign: 'center' as const
  },
  contactContainer: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem'
  },
  contactCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 1.5rem',
    backgroundColor: '#f8f9ff',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#333',
    border: '2px solid #e8ecff',
    transition: 'all 0.3s ease'
  },
  contactCardSupport: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 1.5rem',
    backgroundColor: '#fff5f5',
    borderRadius: '12px',
    border: '2px solid #ffd4d4',
    transition: 'all 0.3s ease'
  },
  contactIcon: {
    fontSize: '2rem',
    minWidth: '40px',
    textAlign: 'center' as const
  },
  contactInfo: {
    flex: 1
  },
  contactName: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#1a1a2e',
    margin: 0
  },
  contactDesc: {
    fontSize: '0.85rem',
    color: '#888',
    margin: '0.25rem 0 0 0'
  },
  contactArrow: {
    fontSize: '1.2rem',
    color: '#667eea'
  },
  qrSmall: {
    width: '60px',
    height: '60px',
    borderRadius: '8px',
    border: '2px solid #f0f0f0',
    padding: '4px',
    backgroundColor: '#fff',
    objectFit: 'contain' as const
  }
};

// Добавляем hover эффекты через CSS
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .contact-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.15);
    border-color: #667eea;
    background-color: #f0f4ff;
  }
  .contact-card-support:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(255, 77, 77, 0.15);
    border-color: #ff6b6b;
    background-color: #fff0f0;
  }
`;
document.head.appendChild(styleSheet);

export default HomePage;