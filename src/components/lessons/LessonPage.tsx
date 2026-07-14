import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { sectionsData } from '../../data/topics';
import Breadcrumbs from '../common/Breadcrumbs';
import Sidebar from '../common/Sidebar';
import { ILesson } from '../../types';

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

  const breadcrumbs = [
    { label: section.title, path: `/section/${section.id}` },
    { label: chapter.title, path: `/section/${section.id}/chapter/${chapter.id}` },
    { label: lesson.title, path: '' }
  ];

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />

      <div style={styles.container}>
        {/* Левое меню с уроками */}
        <aside style={styles.sidebarLeft}>
          <h3 style={styles.sidebarTitle}>{chapter.title}</h3>
          <ul style={styles.lessonList}>
            {allLessons.map((l: ILesson, index: number) => (
              <li 
                key={l.id}
                style={{
                  ...styles.lessonItem,
                  ...(l.id === lessonId ? styles.activeLesson : {})
                }}
              >
                <Link 
                  to={`/section/${section.id}/chapter/${chapter.id}/lesson/${l.id}`}
                  style={{
                    ...styles.lessonLink,
                    ...(l.id === lessonId ? styles.activeLessonLink : {})
                  }}
                >
                  <span style={styles.lessonNumber}>{index + 1}</span>
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Основной контент урока */}
        <main style={styles.content}>
          <h1 style={styles.lessonTitle}>{lesson.title}</h1>
          
          <div style={styles.lessonBody}>
            {lesson.content.map((paragraph: string, index: number) => (
              <p key={index} style={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          {lesson.codeExamples && lesson.codeExamples.length > 0 && (
            <div style={styles.codeExamples}>
              <h3 style={styles.codeTitle}>Примеры кода</h3>
              {lesson.codeExamples.map((example, index) => (
                <div key={index} style={styles.codeBlock}>
                  <div style={styles.codeHeader}>
                    <span>{example.title}</span>
                    <span style={styles.codeLanguage}>{example.language}</span>
                  </div>
                  <pre style={styles.code}>
                    <code>{example.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}

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

        {/* Правая боковая панель с соцсетями */}
        <Sidebar />
      </div>
    </div>
  );
};

const styles = {
  error: {
    padding: '2rem',
    textAlign: 'center' as const,
    fontSize: '1.2rem',
    color: '#f44336'
  },
  container: {
    display: 'grid' as const,
    gridTemplateColumns: '280px 1fr 220px', // 3 колонки: меню, контент, сайдбар
    gap: '2rem'
  },
  sidebarLeft: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    alignSelf: 'start' as const,
    position: 'sticky' as const,
    top: '80px'
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
    borderRadius: '6px',
    marginBottom: '0.25rem',
    transition: 'background 0.2s ease'
  },
  activeLesson: {
    backgroundColor: '#f0f4ff'
  },
  lessonLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem 0.75rem',
    color: '#333',
    textDecoration: 'none',
    fontSize: '0.9rem',
    borderRadius: '6px',
    transition: 'background 0.2s ease'
  },
  activeLessonLink: {
    color: '#667eea',
    fontWeight: 500
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
    fontWeight: 'bold'
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  lessonTitle: {
    fontSize: '2rem',
    color: '#1a1a2e',
    marginBottom: '1.5rem'
  },
  lessonBody: {
    marginBottom: '2rem'
  },
  paragraph: {
    lineHeight: '1.8',
    color: '#333',
    marginBottom: '1rem',
    fontSize: '1.05rem',
    whiteSpace: 'pre-wrap' as const // для сохранения переносов строк
  },
  codeExamples: {
    marginBottom: '2rem'
  },
  codeTitle: {
    fontSize: '1.2rem',
    color: '#1a1a2e',
    marginBottom: '1rem'
  },
  codeBlock: {
    backgroundColor: '#1a1a2e',
    borderRadius: '8px',
    marginBottom: '1rem',
    overflow: 'hidden'
  },
  codeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 1rem',
    backgroundColor: '#2a2a4e',
    color: '#fff',
    fontSize: '0.85rem'
  },
  codeLanguage: {
    color: '#667eea',
    fontWeight: 'bold'
  },
  code: {
    padding: '1rem',
    margin: 0,
    color: '#e0e0e0',
    fontFamily: 'Consolas, monospace',
    fontSize: '0.9rem',
    lineHeight: 1.6,
    overflow: 'auto'
  },
  lessonNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1.5rem',
    borderTop: '2px solid #f0f0f0'
  },
  navButton: {
    padding: '0.5rem 1.5rem',
    backgroundColor: '#667eea',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '8px',
    transition: 'background 0.3s ease'
  },
  lessonCounter: {
    color: '#666',
    fontSize: '0.9rem'
  }
};

export default LessonPage;