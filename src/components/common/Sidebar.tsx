import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div style={styles.sidebar}>
      <div style={styles.section}>
        <h3 style={styles.title}>Связаться со мной</h3>
        <div style={styles.socialLinks}>
          <a 
            href="https://telegram.me/Kilaaaaaakod" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.socialLink}
          >
            <span style={styles.icon}>✈️</span>
            <span>Telegram</span>
          </a>
          <a 
            href="https://www.youtube.com/@urovik" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.socialLink}
          >
            <span style={styles.icon}>▶️</span>
            <span>YouTube</span>
          </a>
        </div>
      </div>

      <div style={styles.divider} />

      <div style={styles.section}>
        <h3 style={styles.title}>Поддержать автора</h3>
        <div style={styles.qrContainer}>
          <p style={styles.qrText}>
            Отсканируй QR-код для поддержки проекта
          </p>
          <img 
            src={require('../../assets/qr.jpeg')}  
            alt="QR-код для поддержки"
            style={styles.qrImage}
          />
          <p style={styles.qrHint}>
            Спасибо, что поддерживаешь проект! 🙌
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    position: 'sticky' as const,
    top: '80px',
    alignSelf: 'start' as const,
    minWidth: '200px'
  },
  section: {
    marginBottom: '1.5rem'
  },
  title: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#1a1a2e',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #f0f0f0'
  },
  icon: {
    fontSize: '1.2rem',
    width: '20px',
    textAlign: 'center' as const
  },
  socialLinks: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem'
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#333',
    textDecoration: 'none',
    padding: '0.5rem 0.75rem',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  },
  divider: {
    height: '1px',
    backgroundColor: '#f0f0f0',
    margin: '1rem 0'
  },
  qrContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem'
  },
  qrText: {
    fontSize: '0.9rem',
    color: '#555',
    textAlign: 'center' as const,
    margin: 0
  },
  qrImage: {
    width: '100%',
    maxWidth: '180px',
    height: 'auto',
    borderRadius: '12px',
    border: '2px solid #f0f0f0',
    padding: '8px',
    backgroundColor: '#fff'
  },
  qrHint: {
    fontSize: '0.85rem',
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center' as const,
    margin: 0
  }
};

export default Sidebar;