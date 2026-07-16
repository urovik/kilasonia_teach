import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { sectionsData } from '../../data/topics';
import { IContentBlock, ICodeExample } from '../../types';

const LessonPage: React.FC = () => {
  const { sectionId, chapterId, lessonId } = useParams<{
    sectionId: string;
    chapterId: string;
    lessonId: string;
  }>();

  const section = sectionsData.find(s => s.id === sectionId);
  const chapter = section?.chapters.find(c => c.id === chapterId);
  const lesson = chapter?.lessons.find(l => l.id === lessonId);

  if (!section || !chapter || !lesson) {
    return <div style={styles.error}>Урок не найден</div>;
  }

  const allLessons = chapter.lessons;
  const currentIndex = allLessons.findIndex(l => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

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
    <div style={styles.container}>
      {/* Хлебные крошки */}
      <div style={styles.breadcrumbs}>
        <Link to="/" style={styles.breadcrumbLink}>Главная</Link>
        <span style={styles.breadcrumbSep}> / </span>
        <Link to={`/section/${section.id}`} style={styles.breadcrumbLink}>
          {section.title}
        </Link>
        <span style={styles.breadcrumbSep}> / </span>
        <span style={styles.breadcrumbCurrent}>{lesson.title}</span>
      </div>

      <div style={styles.content}>
        {/* Левое меню */}
        <aside style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>{chapter.title}</h3>
          <ul style={styles.lessonList}>
            {allLessons.map((l: any, index: number) => (
              <li key={l.id} style={{ ...styles.lessonItem, ...(l.id === lessonId ? styles.activeLesson : {}) }}>
                <Link
                  to={`/section/${section.id}/chapter/${chapter.id}/lesson/${l.id}`}
                  style={{ ...styles.lessonLink, ...(l.id === lessonId ? styles.activeLessonLink : {}) }}
                >
                  <span style={styles.lessonNumber}>{index + 1}</span>
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Основной контент */}
        <main style={styles.main}>
          <h1 style={styles.lessonTitle}>{lesson.title}</h1>
          
          {lesson.description && (
            <p style={styles.lessonDescription}>{lesson.description}</p>
          )}

          <div style={styles.lessonBody}>
            {lesson.content.map((block, index) => renderContent(block, index))}
          </div>

          {/* Навигация между уроками */}
          <div style={styles.lessonNav}>
            {prevLesson && (
              <Link
                to={`/section/${section.id}/chapter/${chapter.id}/lesson/${prevLesson.id}`}
                style={styles.navButton}
              >
                ← {prevLesson.title}
              </Link>
            )}
            <span style={styles.lessonCounter}>
              {currentIndex + 1} / {allLessons.length}
            </span>
            {nextLesson && (
              <Link
                to={`/section/${section.id}/chapter/${chapter.id}/lesson/${nextLesson.id}`}
                style={styles.navButton}
              >
                {nextLesson.title} →
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const styles: any = {
  container: {
    padding: '20px 0',
  },
  breadcrumbs: {
    marginBottom: '20px',
    fontSize: '0.9rem',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexWrap: 'wrap' as const,
  },
  breadcrumbLink: {
    color: '#667eea',
    textDecoration: 'none',
  },
  breadcrumbSep: {
    color: '#ccc',
  },
  breadcrumbCurrent: {
    color: '#333',
    fontWeight: 500,
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '280px 1fr',
    gap: '24px',
  },
  sidebar: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
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
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: '2px solid #f0f0f0',
  },
  lessonList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  lessonItem: {
    borderRadius: '6px',
    marginBottom: '4px',
  },
  activeLesson: {
    backgroundColor: '#f0f4ff',
  },
  lessonLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 12px',
    color: '#333',
    textDecoration: 'none',
    fontSize: '0.9rem',
    borderRadius: '6px',
    transition: 'background 0.2s ease',
  },
  activeLessonLink: {
    color: '#667eea',
    fontWeight: 500,
  },
  lessonNumber: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '24px',
    height: '24px',
    backgroundColor: '#f0f0f0',
    color: '#666',
    borderRadius: '50%',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  },
  main: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  lessonTitle: {
    fontSize: '2rem',
    color: '#1a1a2e',
    marginBottom: '8px',
  },
  lessonDescription: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '24px',
    borderLeft: '4px solid #667eea',
    paddingLeft: '16px',
  },
  lessonBody: {
    marginBottom: '24px',
  },
  paragraph: {
    lineHeight: '1.8',
    color: '#333',
    marginBottom: '16px',
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
    paddingTop: '20px',
    borderTop: '2px solid #f0f0f0',
    flexWrap: 'wrap' as const,
    gap: '12px',
  },
  navButton: {
    padding: '8px 20px',
    backgroundColor: '#667eea',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '8px',
    transition: 'background 0.3s ease',
    fontSize: '0.95rem',
    whiteSpace: 'nowrap' as const,
  },
  lessonCounter: {
    color: '#666',
    fontSize: '0.9rem',
  },
  error: {
    padding: '40px',
    textAlign: 'center' as const,
    fontSize: '1.2rem',
    color: '#f44336',
  },
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
    .main {
      padding: 20px !important;
    }
    .lesson-title {
      font-size: 1.5rem !important;
    }
    .paragraph, .list-item {
      font-size: 0.95rem !important;
    }
    .heading {
      font-size: 1.3rem !important;
    }
  }
  @media (max-width: 480px) {
    .main {
      padding: 16px !important;
    }
    .lesson-title {
      font-size: 1.25rem !important;
    }
    .code {
      font-size: 0.8rem !important;
      padding: 12px !important;
    }
    .breadcrumbs {
      font-size: 0.7rem !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default LessonPage;