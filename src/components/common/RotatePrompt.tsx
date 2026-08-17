import React, { useState, useEffect } from 'react';

interface RotatePromptProps {
  children: React.ReactNode;
}

const RotatePrompt: React.FC<RotatePromptProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isMobileDevice = window.innerWidth < 768;
      const isLandscapeMode = window.innerWidth > window.innerHeight;
      
      setIsMobile(isMobileDevice);
      setIsLandscape(isLandscapeMode);
    };

    // Проверяем при загрузке
    checkOrientation();

    // Следим за изменением размера окна
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Если не мобильное устройство — показываем контент
  if (!isMobile) {
    return <>{children}</>;
  }

  // Если мобильное и горизонтальное — показываем контент
  if (isLandscape) {
    return <>{children}</>;
  }

  // Если мобильное и вертикальное — показываем подсказку
  return (
    <div style={styles.overlay}>
      <div style={styles.prompt}>
        <div style={styles.icon}>📱</div>
        <h2 style={styles.title}>Поверните телефон</h2>
        <p style={styles.description}>
          Для лучшего отображения кода и уроков<br />
          поверните телефон в горизонтальное положение
        </p>
        <div style={styles.animation}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <rect
              x="10"
              y="20"
              width="60"
              height="40"
              rx="8"
              stroke="#667eea"
              strokeWidth="3"
              fill="rgba(102, 126, 234, 0.1)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 40 40"
                to="90 40 40"
                dur="2s"
                repeatCount="indefinite"
              />
            </rect>
            <circle cx="40" cy="40" r="4" fill="#667eea">
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
        <p style={styles.hint}>↻ Поверните устройство</p>
      </div>
    </div>
  );
};

const styles: any = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column' as const,
    padding: '20px',
  },
  prompt: {
    backgroundColor: 'var(--bg-card)',
    borderRadius: '16px',
    padding: '40px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center' as const,
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
  },
  icon: {
    fontSize: '4rem',
    marginBottom: '16px',
  },
  title: {
    fontSize: '1.5rem',
    color: 'var(--text)',
    marginBottom: '12px',
  },
  description: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6',
    marginBottom: '24px',
  },
  animation: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '16px',
  },
  hint: {
    fontSize: '0.9rem',
    color: 'var(--primary)',
    fontWeight: 500,
  },
};

export default RotatePrompt;