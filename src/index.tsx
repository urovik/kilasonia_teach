import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';

// ========== ГЛОБАЛЬНЫЕ СТИЛИ ==========
const styles = `
  :root {
    --bg: #f8fafc;
    --bg-card: #ffffff;
    --bg-hover: #f1f5f9;
    --text: #0f172a;
    --text-muted: #64748b;
    --text-light: #94a3b8;
    --primary: #3b82f6;
    --primary-hover: #2563eb;
    --border: #e2e8f0;
    --shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
    --shadow-hover: 0 4px 12px rgba(15, 23, 42, 0.08);
    --radius: 8px;
    --radius-sm: 4px;
    --radius-lg: 12px;
    --nav-bg: rgba(255, 255, 255, 0.92);
    --code-bg: #0f172a;
    --code-text: #e2e8f0;
    --success: #22c55e;
    --success-bg: #f0fdf4;
    --error: #ef4444;
    --error-bg: #fef2f2;
    --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
    --font-mono: 'Fira Code', 'Consolas', monospace;
    
    /* Базовые размеры */
    --font-base: 16px;
    --container-padding: 20px;
    --card-padding: 24px;
    --gap: 24px;
  }

  [data-theme="dark"] {
    --bg: #0f172a;
    --bg-card: #1e293b;
    --bg-hover: #334155;
    --text: #f1f5f9;
    --text-muted: #94a3b8;
    --text-light: #64748b;
    --primary: #60a5fa;
    --primary-hover: #93bbfc;
    --border: #334155;
    --shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    --shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.4);
    --nav-bg: rgba(15, 23, 42, 0.92);
    --code-bg: #0f172a;
    --code-text: #e2e8f0;
    --success: #4ade80;
    --success-bg: #1a2e1a;
    --error: #f87171;
    --error-bg: #2e1a1a;
  }

  /* ========== Сброс ========== */
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  html {
    font-size: var(--font-base);
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
    overflow-x: hidden;
  }

  a { color: var(--primary); text-decoration: none; }
  a:hover { color: var(--primary-hover); }
  code, pre { font-family: var(--font-mono); }
  img { max-width: 100%; height: auto; display: block; }
  button { font-family: inherit; cursor: pointer; }

  /* ========== Scrollbar ========== */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }

  /* ========== Анимации ========== */
  @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation: fadeIn 0.3s ease; }

  /* ========== Container ========== */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--container-padding);
    width: 100%;
  }

  /* ========== Типографика ========== */
  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.25rem; }
  h1, h2, h3, h4, h5, h6 { color: var(--text); font-weight: 600; line-height: 1.3; }

  .text-center { text-align: center; }
  .text-muted { color: var(--text-muted); }
  .text-sm { font-size: 0.875rem; }
  .text-xs { font-size: 0.75rem; }

  /* ========== АДАПТИВНОСТЬ ========== */
  
  /* Планшеты и маленькие десктопы */
  @media (max-width: 1024px) {
    :root {
      --container-padding: 16px;
      --card-padding: 20px;
      --gap: 20px;
    }
    h1 { font-size: 2.2rem; }
    h2 { font-size: 1.8rem; }
    h3 { font-size: 1.3rem; }
  }

  /* Мобильные телефоны (горизонтальные) */
  @media (max-width: 768px) {
    :root {
      --font-base: 15px;
      --container-padding: 14px;
      --card-padding: 16px;
      --gap: 16px;
    }
    h1 { font-size: 1.8rem; }
    h2 { font-size: 1.5rem; }
    h3 { font-size: 1.2rem; }
    h4 { font-size: 1.1rem; }
  }

  /* Маленькие телефоны (вертикальные) */
  @media (max-width: 480px) {
    :root {
      --font-base: 14px;
      --container-padding: 10px;
      --card-padding: 14px;
      --gap: 12px;
    }
    h1 { font-size: 1.5rem; }
    h2 { font-size: 1.3rem; }
    h3 { font-size: 1.1rem; }
    h4 { font-size: 1rem; }
  }

  /* Очень маленькие телефоны */
  @media (max-width: 360px) {
    :root {
      --font-base: 13px;
      --container-padding: 8px;
      --card-padding: 12px;
      --gap: 10px;
    }
    h1 { font-size: 1.3rem; }
    h2 { font-size: 1.1rem; }
    h3 { font-size: 1rem; }
  }

  /* Сетка для карточек */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--gap);
  }

  @media (max-width: 640px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }

  /* ========== АДАПТИВНОСТЬ ДЛЯ КОНТЕНТА ========== */
.lesson-body {
  max-width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
}

.lesson-body * {
  max-width: 100%;
  overflow-wrap: break-word;
}

.lesson-body pre,
.lesson-body code {
  max-width: 100%;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  font-size: 0.85rem;
}

.lesson-body ul,
.lesson-body ol {
  padding-left: 20px;
}

.lesson-body img {
  max-width: 100%;
  height: auto;
}

.lesson-body table {
  display: block;
  overflow-x: auto;
  max-width: 100%;
}

/* Для маленьких экранов */
@media (max-width: 480px) {
  .lesson-body pre,
  .lesson-body code {
    font-size: 0.75rem;
    padding: 8px !important;
  }
  
  .lesson-body ul,
  .lesson-body ol {
    padding-left: 16px;
  }
  
  .lesson-body h1 { font-size: 1.3rem; }
  .lesson-body h2 { font-size: 1.1rem; }
  .lesson-body h3 { font-size: 1rem; }
  .lesson-body h4 { font-size: 0.95rem; }
}
  * ========== АДАПТИВНОСТЬ ДЛЯ МОБИЛЬНЫХ ========== */

/* Ограничение ширины */
.lesson-body,
.lesson-content,
.section-content {
  max-width: 100%;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-word;
}

/* Для кода */
pre, code {
  max-width: 100%;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  font-size: 0.85rem;
}

/* Для всех текстовых элементов */
p, h1, h2, h3, h4, h5, h6, li, span, div {
  max-width: 100%;
  overflow-wrap: break-word;
}

/* Для списков */
ul, ol {
  padding-left: 20px;
}

/* Для картинок */
img {
  max-width: 100%;
  height: auto;
}

/* ========== МОБИЛЬНЫЕ НАСТРОЙКИ ========== */
@media (max-width: 768px) {
  .lesson-body {
    padding: 0 4px !important;
  }
  
  .lesson-body h1 {
    font-size: 1.4rem !important;
  }
  
  .lesson-body h2 {
    font-size: 1.2rem !important;
  }
  
  .lesson-body h3 {
    font-size: 1rem !important;
  }
  
  .lesson-body p,
  .lesson-body li {
    font-size: 0.95rem !important;
    line-height: 1.6 !important;
  }
  
  .lesson-body pre,
  .lesson-body code {
    font-size: 0.75rem !important;
    padding: 8px !important;
  }
  
  .lesson-body ul,
  .lesson-body ol {
    padding-left: 16px !important;
  }
}

@media (max-width: 480px) {
  .lesson-body {
    padding: 0 2px !important;
  }
  
  .lesson-body h1 {
    font-size: 1.2rem !important;
  }
  
  .lesson-body h2 {
    font-size: 1.1rem !important;
  }
  
  .lesson-body h3 {
    font-size: 0.95rem !important;
  }
  
  .lesson-body p,
  .lesson-body li {
    font-size: 0.9rem !important;
    line-height: 1.5 !important;
  }
  
  .lesson-body pre,
  .lesson-body code {
    font-size: 0.7rem !important;
    padding: 6px !important;
  }
  
  .lesson-body ul,
  .lesson-body ol {
    padding-left: 12px !important;
  }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// ========== ЯНДЕКС.МЕТРИКА ==========
// ✅ ID берется ТОЛЬКО из .env, без запасного варианта
const YM_ID = process.env.REACT_APP_YA_ID;

if (YM_ID) {
  // Загружаем скрипт Метрики
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

  // Добавляем noscript
  const noscript = document.createElement('noscript');
  noscript.innerHTML = `
    <div>
      <img src="https://mc.yandex.ru/watch/${YM_ID}" style="position:absolute; left:-9999px;" alt="" />
    </div>
  `;
  document.head.appendChild(noscript);
}

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