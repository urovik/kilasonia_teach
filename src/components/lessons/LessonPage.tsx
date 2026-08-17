import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sectionsData } from '../../data/topics';
import { IContentBlock, ICodeExample } from '../../types';
import { useProgress } from '../../hooks/useProgress';

const LessonPage: React.FC = () => {
  const { sectionId, chapterId, lessonId } = useParams<{
    sectionId: string;
    chapterId: string;
    lessonId: string;
  }>();

  const { isLessonCompleted, toggleLesson, setTotalLessons } = useProgress();
  
  const [forceUpdate, setForceUpdate] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const prevLessonIdRef = React.useRef(lessonId);
  
  useEffect(() => {
    if (prevLessonIdRef.current !== lessonId) {
      prevLessonIdRef.current = lessonId;
      setForceUpdate(prev => prev + 1);
      setIsNavOpen(false);
    }
  }, [lessonId]);

  const section = useMemo(() => {
    return sectionId ? sectionsData.find((s) => s.id === sectionId) : undefined;
  }, [sectionId, forceUpdate]);

  const chapter = useMemo(() => {
    return section?.chapters.find((c) => c.id === chapterId);
  }, [section, chapterId, forceUpdate]);

  const lesson = useMemo(() => {
    return chapter?.lessons.find((l) => l.id === lessonId);
  }, [chapter, lessonId, forceUpdate]);

  useEffect(() => {
    if (sectionId) {
      const foundSection = sectionsData.find((s) => s.id === sectionId);
      if (foundSection) {
        const total = foundSection.chapters.reduce(
          (acc, ch) => acc + ch.lessons.length,
          0
        );
        setTotalLessons(total);
      }
    }
  }, [sectionId, setTotalLessons]);

  const getChapterUrl = useCallback((targetChapterId: string) => {
    if (!section) return '';
    const targetChapter = section.chapters.find(c => c.id === targetChapterId);
    if (!targetChapter || targetChapter.lessons.length === 0) return '';
    return `/section/${sectionId}/chapter/${targetChapterId}/lesson/${targetChapter.lessons[0].id}`;
  }, [section, sectionId]);

  const shareLesson = useCallback(() => {
    const url = window.location.href;
    const title = lesson?.title || 'Урок на Kilasonia.tech';

    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: `Изучаю "${title}" на Kilasonia.tech`,
          url: url,
        })
        .catch(() => {});
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert('🔗 Ссылка скопирована в буфер обмена!');
        })
        .catch(() => {
          prompt('Скопируй ссылку:', url);
        });
    }
  }, [lesson?.title]);

  const handleLessonChange = useCallback(() => {
    setForceUpdate(prev => prev + 1);
  }, []);

  const toggleNav = useCallback(() => {
    setIsNavOpen(prev => !prev);
  }, []);

  if (!sectionId || !chapterId || !lessonId) {
    return <div style={styles.error}>Неверный URL</div>;
  }

  if (!section || !chapter || !lesson) {
    return <div style={styles.error}>Урок не найден</div>;
  }

  const allLessons = chapter.lessons;
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const isCompleted = isLessonCompleted(lessonId);

  const currentChapterIndex = section.chapters.findIndex(c => c.id === chapterId);
  const prevChapter = currentChapterIndex > 0 ? section.chapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex < section.chapters.length - 1 ? section.chapters[currentChapterIndex + 1] : null;

  const renderContent = (block: IContentBlock, index: number) => {
    switch (block.type) {
      case 'text':
        return (
          <p key={`${forceUpdate}-${index}`} style={styles.paragraph}>
            {block.content as string}
          </p>
        );
      case 'heading':
        return (
          <h2 key={`${forceUpdate}-${index}`} style={styles.heading}>
            {block.content as string}
          </h2>
        );
      case 'list':
        return (
          <ul key={`${forceUpdate}-${index}`} style={styles.list}>
            {(block.content as string[]).map((item, i) => (
              <li key={`${forceUpdate}-${i}`} style={styles.listItem}>
                {item}
              </li>
            ))}
          </ul>
        );
      case 'code': {
        const codeExample = block.content as ICodeExample;
        return (
          <div key={`${forceUpdate}-${index}`} style={styles.codeBlock}>
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
      }
      default:
        return null;
    }
  };

  return (
    <div style={styles.container} key={forceUpdate}>
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
        <button 
          onClick={toggleNav} 
          style={styles.navToggle}
          aria-label="Показать меню уроков"
        >
          ☰ {chapter.title}
        </button>

        <aside 
          style={{
            ...styles.sidebar,
            ...(isNavOpen ? styles.sidebarOpen : {}),
          }}
        >
          <div style={styles.sidebarHeader}>
            <h3 style={styles.sidebarTitle}>{chapter.title}</h3>
            <button 
              onClick={toggleNav} 
              style={styles.sidebarClose}
              aria-label="Закрыть меню"
            >
              ✕
            </button>
          </div>
          <ul style={styles.lessonList}>
            {allLessons.map((l: any, index: number) => {
              const isCompletedLesson = isLessonCompleted(l.id);
              return (
                <li
                  key={`${forceUpdate}-${l.id}`}
                  style={{
                    ...styles.lessonItem,
                    ...(l.id === lessonId ? styles.activeLesson : {}),
                  }}
                >
                  <Link
                    to={`/section/${section.id}/chapter/${chapter.id}/lesson/${l.id}`}
                    style={{
                      ...styles.lessonLink,
                      ...(l.id === lessonId ? styles.activeLessonLink : {}),
                    }}
                    onClick={() => {
                      handleLessonChange();
                      setIsNavOpen(false);
                    }}
                  >
                    <span style={styles.lessonNumber}>{index + 1}</span>
                    {l.title}
                    {isCompletedLesson && <span style={styles.checkMark}>✅</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        {isNavOpen && (
          <div style={styles.overlay} onClick={toggleNav} />
        )}

        <main style={styles.main}>
          <div style={styles.headerRow}>
            <h1 style={styles.lessonTitle}>{lesson.title}</h1>
            <div style={styles.headerButtons}>
              <button onClick={shareLesson} style={styles.shareButton}>
                🔗 Поделиться
              </button>
              <button
                onClick={() => toggleLesson(lessonId)}
                style={{
                  ...styles.completeButton,
                  ...(isCompleted ? styles.completeButtonActive : {}),
                }}
              >
                {isCompleted ? '✅ Пройдено' : '📝 Отметить'}
              </button>
            </div>
          </div>

          {lesson.description && (
            <p style={styles.lessonDescription}>{lesson.description}</p>
          )}

          <div className="lesson-body" style={styles.lessonBody}>
            {lesson.content.map((block, index) => renderContent(block, index))}
          </div>

          <div style={styles.lessonNav}>
            <div style={styles.navGroup}>
              {prevLesson && (
                <Link
                  to={`/section/${section.id}/chapter/${chapter.id}/lesson/${prevLesson.id}`}
                  style={styles.navButton}
                  onClick={handleLessonChange}
                >
                  ← {prevLesson.title}
                </Link>
              )}
              {!prevLesson && prevChapter && (
                <Link
                  to={getChapterUrl(prevChapter.id)}
                  style={styles.navButton}
                  onClick={handleLessonChange}
                >
                  ← {prevChapter.title}
                </Link>
              )}
            </div>

            <span style={styles.lessonCounter}>
              {currentIndex + 1} / {allLessons.length}
            </span>

            <div style={styles.navGroup}>
              {nextLesson && (
                <Link
                  to={`/section/${section.id}/chapter/${chapter.id}/lesson/${nextLesson.id}`}
                  style={styles.navButton}
                  onClick={handleLessonChange}
                >
                  {nextLesson.title} →
                </Link>
              )}
              {!nextLesson && nextChapter && (
                <Link
                  to={getChapterUrl(nextChapter.id)}
                  style={styles.navButton}
                  onClick={handleLessonChange}
                >
                  {nextChapter.title} →
                </Link>
              )}
            </div>
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
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexWrap: 'wrap' as const,
  },
  breadcrumbLink: {
    color: 'var(--primary)',
    textDecoration: 'none',
  },
  breadcrumbSep: {
    color: 'var(--text-light)',
  },
  breadcrumbCurrent: {
    color: 'var(--text)',
    fontWeight: 500,
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '280px 1fr',
    gap: '24px',
    position: 'relative' as const,
  },
  navToggle: {
    display: 'none',
    padding: '10px 16px',
    backgroundColor: 'var(--bg-card)',
    color: 'var(--text)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    fontSize: '0.95rem',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left' as const,
    marginBottom: '8px',
  },
  sidebar: {
    backgroundColor: 'var(--bg-card)',
    borderRadius: 'var(--radius)',
    padding: '18px',
    boxShadow: '0 1px 3px var(--shadow)',
    alignSelf: 'start' as const,
    position: 'sticky' as const,
    top: '80px',
    maxHeight: 'calc(100vh - 100px)',
    overflowY: 'auto' as const,
  },
  sidebarOpen: {
    display: 'block',
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '300px',
    height: '100%',
    zIndex: 1001,
    borderRadius: 0,
    boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
    animation: 'slideIn 0.3s ease',
  },
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  sidebarClose: {
    display: 'none',
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    padding: '4px 8px',
  },
  overlay: {
    display: 'none',
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease',
  },
  sidebarTitle: {
    fontSize: '1rem',
    color: 'var(--text)',
    margin: 0,
    paddingBottom: '8px',
    borderBottom: '1px solid var(--border)',
  },
  lessonList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  lessonItem: {
    borderRadius: 'var(--radius-sm)',
    marginBottom: '2px',
  },
  activeLesson: {
    backgroundColor: 'var(--bg-hover)',
  },
  lessonLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '6px 10px',
    color: 'var(--text)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    borderRadius: 'var(--radius-sm)',
    transition: 'background 0.2s ease',
  },
  activeLessonLink: {
    color: 'var(--primary)',
    fontWeight: 500,
  },
  lessonNumber: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '22px',
    height: '22px',
    backgroundColor: 'var(--bg-hover)',
    color: 'var(--text-muted)',
    borderRadius: '50%',
    fontSize: '0.7rem',
    fontWeight: 600,
  },
  checkMark: {
    fontSize: '0.75rem',
    marginLeft: 'auto',
  },
  main: {
    backgroundColor: 'var(--bg-card)',
    borderRadius: 'var(--radius)',
    padding: '28px',
    boxShadow: '0 1px 3px var(--shadow)',
    minWidth: 0,
    maxWidth: '100%',
    overflow: 'hidden',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '12px',
    marginBottom: '4px',
  },
  headerButtons: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const,
  },
  shareButton: {
    padding: '6px 14px',
    backgroundColor: 'var(--bg-hover)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap' as const,
  },
  completeButton: {
    padding: '6px 14px',
    backgroundColor: 'var(--bg-hover)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap' as const,
  },
  completeButtonActive: {
    backgroundColor: 'var(--success)',
    border: '2px solid var(--success)',
    color: '#fff',
  },
  lessonTitle: {
    fontSize: '1.8rem',
    color: 'var(--text)',
    marginBottom: '4px',
  },
  lessonDescription: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    marginBottom: '20px',
    borderLeft: '3px solid var(--primary)',
    paddingLeft: '14px',
  },
  lessonBody: {
    marginBottom: '24px',
    maxWidth: '100%',
    overflow: 'hidden',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
  },
  paragraph: {
    lineHeight: '1.8',
    color: 'var(--text)',
    marginBottom: '14px',
    fontSize: '1rem',
    maxWidth: '100%',
    wordWrap: 'break-word',
  },
  heading: {
    fontSize: '1.3rem',
    color: 'var(--text)',
    marginTop: '24px',
    marginBottom: '12px',
    paddingBottom: '6px',
    borderBottom: '1px solid var(--border)',
    maxWidth: '100%',
    wordWrap: 'break-word',
  },
  list: {
    margin: '12px 0',
    paddingLeft: '22px',
    lineHeight: '1.8',
    maxWidth: '100%',
    wordWrap: 'break-word',
  },
  listItem: {
    marginBottom: '6px',
    fontSize: '1rem',
    color: 'var(--text)',
    maxWidth: '100%',
    wordWrap: 'break-word',
  },
  codeBlock: {
    backgroundColor: 'var(--code-bg)',
    borderRadius: 'var(--radius-sm)',
    margin: '16px 0',
    overflow: 'hidden',
    maxWidth: '100%',
  },
  codeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '6px 14px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: 'var(--text-muted)',
    fontSize: '0.8rem',
  },
  codeLanguage: {
    color: 'var(--primary)',
    fontWeight: 500,
  },
  code: {
    padding: '14px',
    margin: 0,
    color: 'var(--code-text)',
    fontFamily: 'Consolas, monospace',
    fontSize: '0.85rem',
    lineHeight: 1.6,
    overflow: 'auto',
    maxWidth: '100%',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
  },
  lessonNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '1px solid var(--border)',
    flexWrap: 'wrap' as const,
    gap: '10px',
  },
  navGroup: {
    display: 'flex',
    gap: '8px',
  },
  navButton: {
    padding: '6px 18px',
    backgroundColor: 'var(--bg-hover)',
    color: 'var(--text)',
    textDecoration: 'none',
    borderRadius: 'var(--radius-sm)',
    transition: 'background 0.2s ease',
    fontSize: '0.9rem',
    whiteSpace: 'nowrap' as const,
  },
  lessonCounter: {
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
  },
  error: {
    padding: '40px',
    textAlign: 'center' as const,
    fontSize: '1.1rem',
    color: 'var(--error)',
  },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .share-button:hover,
  .complete-button:hover {
    background: var(--border);
  }
  .nav-button:hover {
    background: var(--border);
  }
  .complete-button-active:hover {
    background: var(--success);
    opacity: 0.9;
  }

  @keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (max-width: 1024px) {
    .content {
      grid-template-columns: 220px 1fr !important;
      gap: 16px !important;
    }
    .main { padding: 24px !important; }
    .lesson-title { font-size: 1.6rem !important; }
  }

  @media (max-width: 768px) {
    .content {
      display: block !important;
    }
    .nav-toggle {
      display: block !important;
    }
    .sidebar {
      display: none !important;
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 300px !important;
      height: 100% !important;
      z-index: 1001 !important;
      border-radius: 0 !important;
      box-shadow: 0 4px 30px rgba(0,0,0,0.3) !important;
      animation: slideIn 0.3s ease !important;
      max-height: none !important;
      overflow-y: auto !important;
      padding: 20px !important;
    }
    .sidebar-open {
      display: block !important;
    }
    .sidebar-close {
      display: block !important;
    }
    .overlay {
      display: block !important;
    }
    .main { padding: 18px !important; }
    .lesson-title { font-size: 1.4rem !important; }
    .header-row {
      flex-direction: column !important;
      align-items: stretch !important;
    }
    .header-buttons {
      flex-direction: row !important;
      width: 100% !important;
    }
    .share-button,
    .complete-button {
      flex: 1 !important;
      text-align: center !important;
      font-size: 0.8rem !important;
      padding: 6px 10px !important;
    }
    .breadcrumbs { font-size: 0.8rem !important; }
    .paragraph,
    .list-item { font-size: 0.95rem !important; }
    .heading { font-size: 1.3rem !important; }
    .lesson-nav {
      flex-wrap: wrap !important;
      justify-content: center !important;
      gap: 8px !important;
    }
    .nav-group {
      flex-wrap: wrap !important;
      justify-content: center !important;
    }
    .nav-button { font-size: 0.85rem !important; padding: 6px 14px !important; }
  }

  @media (max-width: 480px) {
    .main { padding: 14px !important; border-radius: var(--radius-sm) !important; }
    .sidebar { width: 280px !important; padding: 16px !important; }
    .sidebar-title { font-size: 0.9rem !important; }
    .lesson-title {
      font-size: 1.2rem !important;
      margin-bottom: 8px !important;
    }
    .header-buttons {
      flex-direction: column !important;
      width: 100% !important;
    }
    .share-button,
    .complete-button {
      width: 100% !important;
      text-align: center !important;
      font-size: 0.8rem !important;
      padding: 6px 10px !important;
    }
    .paragraph,
    .list-item { font-size: 0.9rem !important; line-height: 1.5 !important; }
    .heading { font-size: 1.1rem !important; }
    .code {
      font-size: 0.7rem !important;
      padding: 8px !important;
    }
    .code-block { border-radius: var(--radius-sm) !important; }
    .breadcrumbs {
      font-size: 0.7rem !important;
      flex-wrap: wrap !important;
      gap: 2px !important;
    }
    .breadcrumb-sep { margin: 0 2px !important; }
    .lesson-number {
      min-width: 18px !important;
      height: 18px !important;
      font-size: 0.6rem !important;
    }
    .lesson-link {
      font-size: 0.8rem !important;
      padding: 4px 8px !important;
    }
    .lesson-nav {
      flex-direction: column !important;
      gap: 6px !important;
    }
    .nav-group {
      flex-direction: column !important;
      width: 100% !important;
    }
    .nav-button {
      width: 100% !important;
      text-align: center !important;
      font-size: 0.8rem !important;
      padding: 6px 12px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default LessonPage;