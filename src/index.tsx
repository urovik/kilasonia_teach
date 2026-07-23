import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';

// ========== ГЛОБАЛЬНЫЕ СТИЛИ ==========
const styles = `
  :root {
    /* Основные цвета - минималистичная палитра */
    --bg: #f8fafc;
    --bg-card: #ffffff;
    --bg-hover: #f1f5f9;
    --bg-input: #f1f5f9;
    
    /* Текст */
    --text: #0f172a;
    --text-muted: #64748b;
    --text-light: #94a3b8;
    
    /* Акцент - спокойный синий */
    --primary: #3b82f6;
    --primary-hover: #2563eb;
    --primary-light: #eff6ff;
    --primary-dark: #1e40af;
    
    /* Границы и тени */
    --border: #e2e8f0;
    --shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
    --shadow-hover: 0 4px 12px rgba(15, 23, 42, 0.08);
    --shadow-card: 0 1px 2px rgba(15, 23, 42, 0.04);
    
    /* Скругления */
    --radius: 8px;
    --radius-sm: 4px;
    --radius-lg: 12px;
    
    /* Отступы */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-6: 24px;
    --space-8: 32px;
    
    /* Navbar */
    --nav-bg: rgba(255, 255, 255, 0.92);
    --nav-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
    
    /* Код */
    --code-bg: #0f172a;
    --code-text: #e2e8f0;
    --code-border: #1e293b;
    
    /* Статусы */
    --success: #22c55e;
    --success-bg: #f0fdf4;
    --error: #ef4444;
    --error-bg: #fef2f2;
    
    /* Шрифты */
    --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
    --font-mono: 'Fira Code', 'Consolas', monospace;
  }

  /* Темная тема */
  [data-theme="dark"] {
    --bg: #0f172a;
    --bg-card: #1e293b;
    --bg-hover: #334155;
    --bg-input: #1e293b;
    
    --text: #f1f5f9;
    --text-muted: #94a3b8;
    --text-light: #64748b;
    
    --primary: #60a5fa;
    --primary-hover: #93bbfc;
    --primary-light: #1e293b;
    --primary-dark: #3b82f6;
    
    --border: #334155;
    --shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    --shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.4);
    --shadow-card: 0 1px 2px rgba(0, 0, 0, 0.2);
    
    --nav-bg: rgba(15, 23, 42, 0.92);
    --nav-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    
    --code-bg: #0f172a;
    --code-text: #e2e8f0;
    --code-border: #1e293b;
    
    --success: #4ade80;
    --success-bg: #1a2e1a;
    --error: #f87171;
    --error-bg: #2e1a1a;
  }

  /* Сброс */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-sans);
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    transition: background 0.3s ease, color 0.3s ease;
    min-height: 100vh;
  }

  a {
    color: var(--primary);
    text-decoration: none;
  }
  a:hover {
    color: var(--primary-hover);
  }

  code, pre {
    font-family: var(--font-mono);
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--bg);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--text-muted);
  }

  /* Анимации */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-in {
    animation: fadeIn 0.3s ease;
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Container */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }

  /* Типографика */
  h1, h2, h3, h4, h5, h6 {
    color: var(--text);
    font-weight: 600;
    line-height: 1.3;
  }

  /* Утилиты */
  .text-center { text-align: center; }
  .text-muted { color: var(--text-muted); }
  .text-sm { font-size: 0.875rem; }
  .text-xs { font-size: 0.75rem; }

  /* Адаптивность */
  @media (max-width: 768px) {
    html { font-size: 15px; }
    .container { padding: 0 12px; }
  }

  @media (max-width: 480px) {
    html { font-size: 14px; }
    .container { padding: 0 10px; }
  }

  @media (max-width: 360px) {
    html { font-size: 13px; }
    .container { padding: 0 8px; }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// ========== ЯНДЕКС.МЕТРИКА ==========
const YM_ID = process.env.REACT_APP_YA_ID;

const ymScript = document.createElement('script');
ymScript.type = 'text/javascript';
ymScript.textContent = `
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) {
    if (document.scripts[j].src === r) { return; }
  }
  k=e.createElement(t);
  a=e.getElementsByTagName(t)[0];
  k.async=1;
  k.src=r;
  a.parentNode.insertBefore(k,a);
})(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}', 'ym');

ym(${YM_ID}, 'init', {
  ssr: true,
  webvisor: true,
  clickmap: true,
  ecommerce: "dataLayer",
  referrer: document.referrer,
  url: location.href,
  accurateTrackBounce: true,
  trackLinks: true
});
`;
document.head.appendChild(ymScript);

const noscript = document.createElement('noscript');
noscript.innerHTML = `
<div>
  <img src="https://mc.yandex.ru/watch/${YM_ID}" style="position:absolute; left:-9999px;" alt="" />
</div>
`;
document.head.appendChild(noscript);

// ========== РЕНДЕРИНГ ==========
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);