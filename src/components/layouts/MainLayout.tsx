import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import { getNavItems } from '../../data/topics';
import RotatePrompt from '../common/RotatePrompt';

const MainLayout: React.FC = () => {
  const navItems = getNavItems();

  return (
    <RotatePrompt>
      <div style={styles.layout}>
        <Navbar items={navItems} />
        <main style={styles.main}>
          <div style={styles.container}>
            <Outlet />
          </div>
        </main>
      </div>
    </RotatePrompt>
  );
};

const styles = {
  layout: {
    minHeight: '100vh',
    backgroundColor: 'var(--bg, #f8fafc)',
  },
  main: {
    padding: '24px 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px',
  },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @media (max-width: 768px) {
    .main { padding: 16px 0 !important; }
    .container { padding: 0 12px !important; }
  }

  @media (max-width: 480px) {
    .main { padding: 12px 0 !important; }
    .container { padding: 0 10px !important; }
  }
`;
document.head.appendChild(styleSheet);

export default MainLayout;