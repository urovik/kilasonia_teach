import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { sectionsData } from '../../data/topics';
import { ILesson, IContentBlock, ICodeExample } from '../../types';

const TopicPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [selectedLesson, setSelectedLesson] = useState<ILesson | null>(null);
  
  // Ищем раздел по ID
  const section = sectionsData.find(s => s.id === topicId);
  
  // Собираем все уроки из всех глав раздела
  const allLessons = section?.chapters.flatMap(chapter => chapter.lessons) || [];

  if (!section) {
    return <div style={styles.error}>Раздел не найден</div>;
  }

  const currentLesson = selectedLesson || allLessons[0];

  // Функция для рендеринга контента
  const renderContent = (block: IContentBlock, index: number) => {
    switch (block.type) {
      case 'text':
        return (
          <p key={index} style={styles.paragraph}>
            {block.content as string}
          </p>
        );

      case 'heading':
        return (
          <h2 key={index} style={styles.heading}>
            {block.content as string}
          </h2>
        );

      case 'list':
        return (
          <ul key={index} style={styles.list}>
            {(block.content as string[]).map((item, i) => (
              <li key={i} style={styles.listItem}>{item}</li>
            ))}
          </ul>
        );

      case 'code':
        const codeExample = block.content as ICodeExample;
        return (
          <div key={index} style={styles.codeBlock}>
            {codeExample.title && (
              <div style={styles.codeHeader}>
                <span>{codeExample.title}</span>
                <span style={styles.codeLanguage}>{codeExample.language}</span>
              </div>
            )}
            <pre style={styles.code}>
              <code>{codeExample.code}</code>
            </pre>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>{section.icon} {section.title}</h1>
        <p style={styles.description}>{section.description}</p>
      </div>

      <div style={styles.content}>
        <aside style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>Уроки</h3>
          <ul style={styles.lessonList}>
            {allLessons.map((lesson: ILesson) => (
              <li 
                key={lesson.id}
                style={{
                  ...styles.lessonItem,
                  ...(currentLesson?.id === lesson.id ? styles.activeLesson : {})
                }}
                onClick={() => setSelectedLesson(lesson)}
              >
                <div style={styles.lessonItemContent}>
                  <span style={styles.lessonTitle}>{lesson.title}</span>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        <main style={styles.lessonContent}>
          <h2 style={styles.lessonTitle}>{currentLesson?.title}</h2>
          
          {currentLesson?.description && (
            <p style={styles.lessonDescription}>{currentLesson.description}</p>
          )}

          <div style={styles.lessonBody}>
            {currentLesson?.content.map((block, index) => renderContent(block, index))}
          </div>

          <div style={styles.lessonNav}>
            <button 
              onClick={() => {
                const currentIndex = allLessons.findIndex(l => l.id === currentLesson?.id);
                if (currentIndex > 0) {
                  setSelectedLesson(allLessons[currentIndex - 1]);
                }
              }}
              disabled={allLessons[0]?.id === currentLesson?.id}
              style={styles.navButton}
            >
              ← Предыдущий
            </button>
            
            <span style={styles.lessonCounter}>
              {allLessons.findIndex(l => l.id === currentLesson?.id) + 1} / {allLessons.length}
            </span>
            
            <button 
              onClick={() => {
                const currentIndex = allLessons.findIndex(l => l.id === currentLesson?.id);
                if (currentIndex < allLessons.length - 1) {
                  setSelectedLesson(allLessons[currentIndex + 1]);
                }
              }}
              disabled={allLessons[allLessons.length - 1]?.id === currentLesson?.id}
              style={styles.navButton}
            >
              Следующий →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

const styles: any = {
  header: {
    marginBottom: '2rem'
  },
  title: {
    fontSize: '2.5rem',
    color: '#1a1a2e',
    marginBottom: '0.5rem'
  },
  description: {
    fontSize: '1.1rem',
    color: '#666'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '2rem',
  },
  sidebar: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    alignSelf: 'start' as const,
    position: 'sticky' as const,
    top: '80px',
    maxHeight: 'calc(100vh - 100px)',
    overflowY: 'auto' as const,
  },
  sidebarTitle: {
    fontSize: '1.1rem',
    color: '#1a1a2e',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #f0f0f0'
  },
  lessonList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  lessonItem: {
    padding: '0.75rem',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    marginBottom: '0.5rem',
    border: '2px solid transparent'
  },
  activeLesson: {
    backgroundColor: '#f0f4ff',
    borderColor: '#667eea'
  },
  lessonItemContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  lessonTitle: {
    fontSize: '1rem',
    fontWeight: 500,
    color: '#1a1a2e'
  },
  lessonContent: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  lessonDescription: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '20px',
    borderLeft: '4px solid #667eea',
    paddingLeft: '16px',
  },
  lessonBody: {
    marginBottom: '2rem'
  },
  paragraph: {
    lineHeight: '1.8',
    color: '#333',
    marginBottom: '1rem',
    fontSize: '1.05rem',
  },
  heading: {
    fontSize: '1.5rem',
    color: '#1a1a2e',
    marginTop: '24px',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '2px solid #f0f0f0',
  },
  list: {
    margin: '16px 0',
    paddingLeft: '24px',
    lineHeight: '1.8',
  },
  listItem: {
    marginBottom: '8px',
    fontSize: '1.05rem',
    color: '#333',
  },
  codeBlock: {
    backgroundColor: '#1a1a2e',
    borderRadius: '8px',
    margin: '16px 0',
    overflow: 'hidden',
  },
  codeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 16px',
    backgroundColor: '#2a2a4e',
    color: '#fff',
    fontSize: '0.85rem',
  },
  codeLanguage: {
    color: '#667eea',
    fontWeight: 'bold',
  },
  code: {
    padding: '16px',
    margin: 0,
    color: '#e0e0e0',
    fontFamily: 'Consolas, monospace',
    fontSize: '0.9rem',
    lineHeight: 1.6,
    overflow: 'auto',
  },
  lessonNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1.5rem',
    borderTop: '2px solid #f0f0f0',
    flexWrap: 'wrap' as const,
    gap: '12px',
  },
  navButton: {
    padding: '0.5rem 1.5rem',
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    fontSize: '0.95rem',
    whiteSpace: 'nowrap' as const,
  },
  lessonCounter: {
    color: '#666',
    fontSize: '0.9rem'
  },
  error: {
    padding: '2rem',
    textAlign: 'center' as const,
    fontSize: '1.2rem',
    color: '#f44336'
  }
};

// Адаптивные стили
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @media (max-width: 768px) {
    .content {
      display: flex !important;
      flex-direction: column !important;
      gap: 16px !important;
    }
    .sidebar {
      position: relative !important;
      top: 0 !important;
      max-height: none !important;
      padding: 16px !important;
    }
    .lesson-content {
      padding: 20px !important;
    }
    .title {
      font-size: 2rem !important;
    }
    .paragraph, .list-item {
      font-size: 0.95rem !important;
    }
    .heading {
      font-size: 1.3rem !important;
    }
    .lesson-nav {
      flex-wrap: wrap !important;
      justify-content: center !important;
      gap: 8px !important;
    }
    .nav-button {
      font-size: 0.85rem !important;
      padding: 6px 14px !important;
    }
  }
  @media (max-width: 480px) {
    .lesson-content {
      padding: 16px !important;
    }
    .title {
      font-size: 1.5rem !important;
    }
    .code {
      font-size: 0.8rem !important;
      padding: 12px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default TopicPage;