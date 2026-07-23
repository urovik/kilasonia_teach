import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { sectionsData } from '../../data/topics';
import { ISection } from '../../types';
import Achievements from '../common/Achievements';

const qrCode = require('../../assets/qr.jpeg');

type TabId = 'all' | 'C' | 'Python' | 'JavaScript';

interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [showQR, setShowQR] = useState(false);
  const lessonsRef = useRef<HTMLDivElement>(null);

  const tabs: Tab[] = [
    { id: 'all', label: 'Все', icon: '📚' },
    { id: 'C', label: 'C', icon: '⚙️' },
    { id: 'Python', label: 'Python', icon: '🐍' },
    { id: 'JavaScript', label: 'JavaScript', icon: '🌐' },
  ];

  const filteredSections = activeTab === 'all'
    ? sectionsData
    : sectionsData.filter(s => s.id === activeTab);

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

      {/* Достижения */}
      <div style={styles.achievementsWrapper}>
        <Achievements />
      </div>

      {/* Секция с уроками */}
      <div ref={lessonsRef} style={styles.lessonsSection}>
        <h2 style={styles.sectionTitle}>📚 Доступные разделы</h2>

        <div style={styles.tabsContainer}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.tabActive : {})
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <span style={styles.tabIcon}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div style={styles.grid}>
          {filteredSections.map((section: ISection) => {
            const totalLessons = section.chapters.reduce(
              (acc, ch) => acc + ch.lessons.length,
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

        {filteredSections.length === 0 && (
          <div style={styles.emptyState}>
            <p>В этом разделе пока нет уроков. Скоро добавятся!</p>
          </div>
        )}
      </div>

      {/* Секция контактов */}
      <div style={styles.contactSection}>
        <h2 style={styles.contactTitle}>📬 Связаться со мной</h2>
        <div style={styles.contactGrid}>
          <a
            href="https://t.me/Kilaaaaaakod"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...styles.contactCard, ...styles.contactCardTelegram }}
          >
            <span style={styles.contactIcon}>✈️</span>
            <div>
              <h3 style={styles.contactName}>Telegram</h3>
              <p style={styles.contactDesc}>Задавай вопросы</p>
            </div>
            <span style={styles.contactArrow}>→</span>
          </a>

          <a
            href="https://www.youtube.com/@urovik"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...styles.contactCard, ...styles.contactCardYouTube }}
          >
            <span style={styles.contactIcon}>▶️</span>
            <div>
              <h3 style={styles.contactName}>YouTube</h3>
              <p style={styles.contactDesc}>Смотри видео</p>
            </div>
            <span style={styles.contactArrow}>→</span>
          </a>

          <div
            style={{ ...styles.contactCard, ...styles.contactCardQR }}
            onClick={() => setShowQR(!showQR)}
          >
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
            <img src={qrCode} alt="QR-код" style={styles.qrImage} />
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
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    borderRadius: 'var(--radius-lg, 12px)',
    padding: '48px 40px',
    marginBottom: '32px',
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
    background: 'var(--primary, #3b82f6)',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#fff',
    marginBottom: '16px',
    letterSpacing: '0.5px',
  },
  heroTitle: {
    fontSize: '2.8rem',
    color: '#fff',
    lineHeight: 1.2,
    marginBottom: '16px',
  },
  heroHighlight: {
    background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontSize: '1.05rem',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.6,
    marginBottom: '24px',
    maxWidth: '500px',
  },
  heroButton: {
    display: 'inline-block',
    padding: '10px 28px',
    background: 'var(--primary, #3b82f6)',
    color: '#fff',
    borderRadius: 'var(--radius, 8px)',
    border: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  heroDecoration: {
    fontSize: '8rem',
    opacity: 0.06,
    position: 'absolute' as const,
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 0,
  },
  heroEmoji: {
    fontSize: '12rem',
  },
  achievementsWrapper: {
    marginBottom: '32px',
  },
  lessonsSection: {
    marginBottom: '48px',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    color: 'var(--text, #0f172a)',
    marginBottom: '20px',
    textAlign: 'center' as const,
  },
  tabsContainer: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap' as const,
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 20px',
    backgroundColor: 'var(--bg-card, #ffffff)',
    border: '1px solid var(--border, #e2e8f0)',
    borderRadius: 'var(--radius, 8px)',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'var(--text-muted, #64748b)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  tabActive: {
    backgroundColor: 'var(--primary, #3b82f6)',
    color: '#fff',
    borderColor: 'var(--primary, #3b82f6)',
  },
  tabIcon: {
    fontSize: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: 'var(--bg-card, #ffffff)',
    borderRadius: 'var(--radius, 8px)',
    padding: '24px 20px',
    boxShadow: 'var(--shadow-card)',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.2s ease',
    display: 'block',
    border: '1px solid var(--border, #e2e8f0)',
  },
  cardIcon: {
    fontSize: '2.5rem',
    marginBottom: '12px',
  },
  cardTitle: {
    fontSize: '1.2rem',
    color: 'var(--text, #0f172a)',
    marginBottom: '6px',
    fontWeight: 600,
  },
  cardDescription: {
    color: 'var(--text-muted, #64748b)',
    lineHeight: '1.5',
    marginBottom: '16px',
    fontSize: '0.9rem',
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
    fontSize: '0.8rem',
    color: 'var(--text-light, #94a3b8)',
  },
  cardStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  cardArrow: {
    fontSize: '1.2rem',
    color: 'var(--primary, #3b82f6)',
    transition: 'transform 0.2s ease',
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '40px 20px',
    color: 'var(--text-muted, #64748b)',
    backgroundColor: 'var(--bg-card, #ffffff)',
    borderRadius: 'var(--radius, 8px)',
    border: '1px solid var(--border, #e2e8f0)',
  },
  contactSection: {
    backgroundColor: 'var(--bg-card, #ffffff)',
    borderRadius: 'var(--radius, 8px)',
    padding: '28px',
    border: '1px solid var(--border, #e2e8f0)',
  },
  contactTitle: {
    fontSize: '1.5rem',
    textAlign: 'center' as const,
    marginBottom: '20px',
    color: 'var(--text, #0f172a)',
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '12px',
  },
  contactCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    borderRadius: 'var(--radius, 8px)',
    textDecoration: 'none',
    color: 'var(--text, #0f172a)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid var(--border, #e2e8f0)',
    backgroundColor: 'var(--bg, #f8fafc)',
  },
  contactCardTelegram: {
    borderColor: '#e2e8f0',
  },
  contactCardYouTube: {
    borderColor: '#e2e8f0',
  },
  contactCardQR: {
    borderColor: '#e2e8f0',
  },
  contactIcon: {
    fontSize: '1.6rem',
  },
  contactName: {
    fontSize: '0.95rem',
    fontWeight: 600,
    margin: 0,
  },
  contactDesc: {
    fontSize: '0.8rem',
    color: 'var(--text-muted, #64748b)',
    margin: 0,
  },
  contactArrow: {
    marginLeft: 'auto',
    fontSize: '1rem',
    color: 'var(--primary, #3b82f6)',
  },
  qrContainer: {
    marginTop: '16px',
    padding: '20px',
    backgroundColor: 'var(--bg, #f8fafc)',
    borderRadius: 'var(--radius, 8px)',
    textAlign: 'center' as const,
    animation: 'fadeIn 0.3s ease',
  },
  qrText: {
    fontSize: '0.95rem',
    color: 'var(--text-muted, #64748b)',
    marginBottom: '12px',
  },
  qrImage: {
    width: '160px',
    height: '160px',
    borderRadius: 'var(--radius, 8px)',
    border: '1px solid var(--border, #e2e8f0)',
    objectFit: 'contain' as const,
    margin: '0 auto',
  },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .hero-button:hover {
    background: var(--primary-hover, #2563eb) !important;
    transform: translateY(-2px);
  }
  .card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
    border-color: var(--primary, #3b82f6);
  }
  .card:hover .card-arrow {
    transform: translateX(4px);
  }
  .contact-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
  }
  .tab:hover:not(.tab-active) {
    background: var(--bg-hover, #f1f5f9);
  }

  @media (max-width: 1024px) {
    .hero { padding: 40px 32px !important; }
    .hero-title { font-size: 2.4rem !important; }
  }

  @media (max-width: 768px) {
    .hero {
      padding: 32px 24px !important;
      flex-direction: column !important;
      text-align: center !important;
      border-radius: var(--radius, 8px) !important;
    }
    .hero-title { font-size: 2rem !important; }
    .hero-subtitle { font-size: 0.95rem !important; max-width: 100% !important; }
    .hero-decoration { display: none !important; }
    .grid { grid-template-columns: 1fr !important; gap: 16px !important; }
    .contact-grid { grid-template-columns: 1fr !important; }
    .contact-section { padding: 20px !important; }
    .tabs-container { gap: 6px !important; }
    .tab { padding: 6px 14px !important; font-size: 0.8rem !important; }
    .section-title { font-size: 1.5rem !important; }
    .qr-image { width: 140px !important; height: 140px !important; }
  }

  @media (max-width: 480px) {
    .container { padding: 12px 0 !important; }
    .hero { padding: 24px 16px !important; }
    .hero-title { font-size: 1.5rem !important; }
    .hero-button { padding: 8px 20px !important; font-size: 0.85rem !important; }
    .card { padding: 18px 16px !important; }
    .card-title { font-size: 1.05rem !important; }
    .contact-card { padding: 12px 14px !important; }
    .qr-image { width: 120px !important; height: 120px !important; }
    .contact-title { font-size: 1.3rem !important; }
    .section-title { font-size: 1.3rem !important; }
    .tabs-container { gap: 4px !important; }
    .tab { padding: 4px 10px !important; font-size: 0.75rem !important; }
    .tab-icon { font-size: 0.85rem !important; }
  }

  @media (max-width: 360px) {
    .hero { padding: 16px 12px !important; }
    .hero-title { font-size: 1.3rem !important; }
    .card-icon { font-size: 2rem !important; }
    .contact-icon { font-size: 1.4rem !important; }
    .tab { padding: 4px 8px !important; font-size: 0.7rem !important; }
  }
`;
document.head.appendChild(styleSheet);

export default HomePage;