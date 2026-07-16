import React, { useState } from 'react';

const Sidebar: React.FC = () => {
  const [showQR, setShowQR] = useState(false);

  return (
    <div style={styles.sidebar}>
      <div style={styles.section}>
        <h3 style={styles.title}>🌐 Связаться со мной</h3>
        <div style={styles.socialLinks}>
          <a href="https://t.me/your_channel" target="_blank" rel="noopener noreferrer" style={{ ...styles.socialLink, ...styles.telegram }}>
            <span style={styles.icon}>✈️</span>
            <span>Telegram</span>
            <span style={styles.linkArrow}>→</span>
          </a>
          <a href="https://youtube.com/your_channel" target="_blank" rel="noopener noreferrer" style={{ ...styles.socialLink, ...styles.youtube }}>
            <span style={styles.icon}>▶️</span>
            <span>YouTube</span>
            <span style={styles.linkArrow}>→</span>
          </a>
        </div>
      </div>

      <div style={styles.divider} />

      <div style={styles.section}>
        <h3 style={styles.title}>❤️ Поддержать автора</h3>
        <div style={styles.supportBlock} onClick={() => setShowQR(!showQR)}>
          <p style={styles.supportText}>
            {showQR ? 'Скрыть QR-код' : 'Нажми, чтобы показать QR-код'}
          </p>
          {showQR && (
            <div style={styles.qrContainer}>
              <img src={require('../../assets/qr.jpeg')}  alt="QR-код" style={styles.qrImage} />
              <p style={styles.qrHint}>Спасибо за поддержку! 🙌</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: any = {
  sidebar: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    position: 'sticky',
    top: '80px',
    alignSelf: 'start' as const,
    minWidth: '200px',
  },
  section: {
    marginBottom: '16px',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#1a1a2e',
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: '2px solid #f0f0f0',
  },
  socialLinks: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    borderRadius: '10px',
    textDecoration: 'none',
    color: '#333',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  telegram: {
    backgroundColor: '#f0f4ff',
    border: '1px solid #e8ecff',
  },
  youtube: {
    backgroundColor: '#fff5f5',
    border: '1px solid #ffd4d4',
  },
  icon: {
    fontSize: '1.3rem',
  },
  linkArrow: {
    marginLeft: 'auto',
    fontSize: '1rem',
    color: '#667eea',
    transition: 'transform 0.3s ease',
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #f0f0f0, transparent)',
    margin: '12px 0',
  },
  supportBlock: {
    padding: '12px',
    background: 'linear-gradient(135deg, #fff5f5, #f0f4ff)',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center' as const,
  },
  supportText: {
    fontSize: '0.9rem',
    color: '#555',
    margin: 0,
    fontWeight: 500,
  },
  qrContainer: {
    marginTop: '12px',
    animation: 'fadeIn 0.3s ease',
  },
  qrImage: {
    width: '120px',
    height: '120px',
    borderRadius: '10px',
    border: '3px solid #fff',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    objectFit: 'contain' as const,
  },
  qrHint: {
    fontSize: '0.8rem',
    color: '#888',
    fontStyle: 'italic',
    marginTop: '8px',
  },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .social-link:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.06);
  }
  .support-block:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.1);
  }
  @media (max-width: 768px) {
    .sidebar {
      position: relative !important;
      top: 0 !important;
      width: 100% !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Sidebar;