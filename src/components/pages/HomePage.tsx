import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { sectionsData } from '../../data/topics';
import { ISection } from '../../types';

// Импорт QR-кода (если в assets)
const qrCode = require('../../assets/qr.jpeg');

const HomePage: React.FC = () => {
  const [showQR, setShowQR] = useState(false);
  const lessonsRef = useRef<HTMLDivElement>(null);

  const scrollToLessons = () => {
    lessonsRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div style={styles.container}>
      {/* Hero секция */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>🚀 Учись программировать</span>
          <h1 style={styles.heroTitle}>
            Добро пожаловать в <br />
            <span style={styles.heroHighlight}>Kilasonia.tech</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Бесплатные уроки по программированию на русском языке.
            <br />
            От основ до продвинутых тем.
          </p>
          <button onClick={scrollToLessons} style={styles.heroButton}>
            Начать учиться ↓
          </button>
        </div>
        <div style={styles.heroDecoration}>
          <span style={styles.heroEmoji}>💻</span>
        </div>
      </div>

      {/* Секция с уроками - сюда будем скроллить */}
      <div ref={lessonsRef} style={styles.lessonsSection}>
        <h2 style={styles.sectionTitle}>📚 Доступные разделы</h2>
        <div style={styles.grid}>
          {sectionsData.map((section: ISection, index: number) => {
            const totalLessons = section.chapters.reduce(
              (acc, chapter) => acc + chapter.lessons.length,
              0
            );

            const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
            const color = colors[index % colors.length];

            return (
              <Link 
                key={section.id} 
                to={`/section/${section.id}`} 
                style={{ ...styles.card, borderTop: `4px solid ${color}` }}
              >
                <div style={styles.cardIcon}>{section.icon}</div>
                <h2 style={styles.cardTitle}>{section.title}</h2>
                <p style={styles.cardDescription}>{section.description}</p>
                <div style={styles.cardFooter}>
                  <span style={styles.cardStats}>
                    <span style={styles.cardStat}>📚 {section.chapters.length} глав</span>
                    <span style={styles.cardStat}>📖 {totalLessons} уроков</span>
                  </span>
                  <span style={styles.cardArrow}>→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Секция контактов */}
      <div style={styles.contactSection}>
        <h2 style={styles.contactTitle}>📬 Связаться со мной</h2>
        <div style={styles.contactGrid}>
          <a href="https://t.me/your_channel" target="_blank" rel="noopener noreferrer" style={{ ...styles.contactCard, ...styles.contactCardTelegram }}>
            <span style={styles.contactIcon}>✈️</span>
            <div>
              <h3 style={styles.contactName}>Telegram</h3>
              <p style={styles.contactDesc}>Задавай вопросы</p>
            </div>
            <span style={styles.contactArrow}>→</span>
          </a>

          <a href="https://youtube.com/your_channel" target="_blank" rel="noopener noreferrer" style={{ ...styles.contactCard, ...styles.contactCardYouTube }}>
            <span style={styles.contactIcon}>▶️</span>
            <div>
              <h3 style={styles.contactName}>YouTube</h3>
              <p style={styles.contactDesc}>Смотри видео</p>
            </div>
            <span style={styles.contactArrow}>→</span>
          </a>

          <div style={{ ...styles.contactCard, ...styles.contactCardQR }} onClick={() => setShowQR(!showQR)}>
            <span style={styles.contactIcon}>❤️</span>
            <div>
              <h3 style={styles.contactName}>Поддержать</h3>
              <p style={styles.contactDesc}>
                {showQR ? 'Скрыть QR' : 'Нажми для QR'}
              </p>
            </div>
            <span style={styles.contactArrow}>{showQR ? '▲' : '▼'}</span>
          </div>
        </div>

        {showQR && (
          <div style={styles.qrContainer}>
            <p style={styles.qrText}>Отсканируй QR-код для поддержки проекта 🙌</p>
            <img src={require('../../assets/qr.jpeg')} alt="QR-код" style={styles.qrImage} />
          </div>
        )}
      </div>
    </div>
  );
};

const styles: any = {
  container: {
    padding: '20px 0',
  },
  hero: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    borderRadius: '16px',
    padding: '48px 40px',
    marginBottom: '48px',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  heroContent: {
    flex: 1,
    zIndex: 1,
  },
  heroBadge: {
    display: 'inline-block',
    padding: '4px 16px',
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '16px',
  },
  heroTitle: {
    fontSize: '2.8rem',
    color: '#fff',
    lineHeight: 1.2,
    marginBottom: '16px',
  },
  heroHighlight: {
    background: 'linear-gradient(45deg, #667eea, #f093fb)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.6,
    marginBottom: '24px',
  },
  heroButton: {
    display: 'inline-block',
    padding: '12px 32px',
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    color: '#fff',
    borderRadius: '30px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  },
  heroDecoration: {
    fontSize: '8rem',
    opacity: 0.1,
    position: 'absolute' as const,
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 0,
  },
  heroEmoji: {
    fontSize: '12rem',
  },
  lessonsSection: {
    marginBottom: '48px',
  },
  sectionTitle: {
    fontSize: '2rem',
    color: '#1a1a2e',
    marginBottom: '24px',
    textAlign: 'center' as const,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '28px 24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    display: 'block',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  cardIcon: {
    fontSize: '3rem',
    marginBottom: '12px',
  },
  cardTitle: {
    fontSize: '1.3rem',
    color: '#1a1a2e',
    marginBottom: '8px',
  },
  cardDescription: {
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '16px',
    fontSize: '0.95rem',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '8px',
  },
  cardStats: {
    display: 'flex',
    gap: '12px',
    fontSize: '0.85rem',
    color: '#888',
  },
  cardStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  cardArrow: {
    fontSize: '1.5rem',
    color: '#667eea',
    transition: 'transform 0.3s ease',
  },
  contactSection: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  },
  contactTitle: {
    fontSize: '1.8rem',
    textAlign: 'center' as const,
    marginBottom: '24px',
    color: '#1a1a2e',
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
  },
  contactCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '18px 20px',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#333',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  contactCardTelegram: {
    backgroundColor: '#f0f4ff',
    border: '2px solid #e8ecff',
  },
  contactCardYouTube: {
    backgroundColor: '#fff5f5',
    border: '2px solid #ffd4d4',
  },
  contactCardQR: {
    background: 'linear-gradient(135deg, #fff5f5, #f0f4ff)',
    border: '2px solid #e8ecff',
  },
  contactIcon: {
    fontSize: '2rem',
  },
  contactName: {
    fontSize: '1rem',
    fontWeight: 600,
    margin: 0,
  },
  contactDesc: {
    fontSize: '0.85rem',
    color: '#888',
    margin: 0,
  },
  contactArrow: {
    marginLeft: 'auto',
    fontSize: '1.2rem',
    color: '#667eea',
  },
  qrContainer: {
    marginTop: '20px',
    padding: '24px',
    background: 'linear-gradient(135deg, #fafafa, #f5f7fa)',
    borderRadius: '12px',
    textAlign: 'center' as const,
    animation: 'fadeIn 0.3s ease',
  },
  qrText: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '16px',
  },
  qrImage: {
    width: '180px',
    height: '180px',
    borderRadius: '12px',
    border: '3px solid #fff',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    objectFit: 'contain' as const,
  },
};

// CSS для анимаций
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .hero-button:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
  }
  
  .hero-button:active {
    transform: scale(0.98);
  }
  
  .card:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.15);
  }
  
  .card:hover .card-arrow {
    transform: translateX(6px);
  }
  
  .contact-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.08);
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    .hero {
      padding: 32px 24px !important;
      flex-direction: column !important;
      text-align: center !important;
    }
    .hero-title {
      font-size: 2rem !important;
    }
    .hero-subtitle {
      font-size: 1rem !important;
    }
    .hero-decoration {
      display: none !important;
    }
    .grid {
      grid-template-columns: 1fr !important;
    }
    .contact-grid {
      grid-template-columns: 1fr !important;
    }
    .contact-section {
      padding: 20px !important;
    }
    .qr-image {
      width: 140px !important;
      height: 140px !important;
    }
  }

  @media (max-width: 480px) {
    .hero {
      padding: 24px 16px !important;
      border-radius: 12px !important;
    }
    .hero-title {
      font-size: 1.5rem !important;
    }
    .hero-badge {
      font-size: 0.7rem !important;
    }
    .hero-button {
      padding: 10px 24px !important;
      font-size: 0.9rem !important;
    }
    .card {
      padding: 20px 16px !important;
    }
    .card-title {
      font-size: 1.1rem !important;
    }
    .contact-card {
      padding: 14px 16px !important;
    }
    .qr-image {
      width: 120px !important;
      height: 120px !important;
    }
    .contact-title {
      font-size: 1.4rem !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default HomePage;