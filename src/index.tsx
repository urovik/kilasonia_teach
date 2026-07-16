import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ========== СТИЛИ ==========
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf8 100%);
    min-height: 100vh;
    color: #1a1a2e;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #667eea, #764ba2);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #5a67d8;
  }

  button {
    font-family: inherit;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-in {
    animation: fadeIn 0.3s ease;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// ========== ЯНДЕКС.МЕТРИКА ==========
const YM_ID = process.env.REACT_APP_YA_ID;

// 1. Загружаем скрипт Метрики
const ymScript = document.createElement('script');
ymScript.type = 'text/javascript';
ymScript.textContent = `
  (function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) { return; }
    }
    k=e.createElement(t), a=e.getElementsByTagName(t)[0],
    k.async=1, k.src=r, a.parentNode.insertBefore(k,a);
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
// 2. Добавляем noscript для пользователей без JS
const noscript = document.createElement('noscript');
noscript.innerHTML = `
  <div>
    <img src="https://mc.yandex.ru/watch/${YM_ID}" 
         style="position:absolute; left:-9999px;" 
         alt="" />
  </div>
`;
document.head.appendChild(noscript);


// ========== РЕНДЕРИНГ ==========
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
