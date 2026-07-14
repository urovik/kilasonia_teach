import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import { getNavItems } from '../../data/topics';

const MainLayout: React.FC = () => {
  const navItems = getNavItems();

  return (
    <div style={styles.layout}>
      <Navbar items={navItems} />
      <main style={styles.main}>
        <div style={styles.container}>
          <Outlet /> {/* Здесь будут рендериться дочерние страницы */}
        </div>
      </main>
    </div>
  );
};

const styles = {
  layout: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa'
  },
  main: {
    padding: '2rem 0'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  }
};

export default MainLayout;