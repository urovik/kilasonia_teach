import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { sectionsData } from '../../data/topics';
import Breadcrumbs from '../common/Breadcrumbs';
import Sidebar from '../common/Sidebar';

const SectionPage: React.FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const section = sectionsData.find(s => s.id === sectionId);

  if (!section) {
    return <div style={styles.error}>Раздел не найден</div>;
  }

  const breadcrumbs = [
    { label: section.title, path: `/section/${section.id}` }
  ];

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />
      
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.header}>
            <h1 style={styles.title}>{section.icon} {section.title}</h1>
            <p style={styles.description}>{section.description}</p>
          </div>

          <div style={styles.chapters}>
            {section.chapters.map(chapter => (
              <div key={chapter.id} style={styles.chapter}>
                <h2 style={styles.chapterTitle}>{chapter.title}</h2>
                <p style={styles.chapterDescription}>{chapter.description}</p>
                
                <ul style={styles.lessonList}>
                  {chapter.lessons.map((lesson, index) => (
                    <li key={lesson.id} style={styles.lessonItem}>
                      <Link 
                        to={`/section/${section.id}/chapter/${chapter.id}/lesson/${lesson.id}`}
                        style={styles.lessonLink}
                      >
                        <span style={styles.lessonNumber}>
                          {index + 1}
                        </span>
                        {lesson.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Правая боковая панель */}
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
    gridTemplateColumns: '1fr 220px',
    gap: '2rem'
  },
  content: {
    // Основной контент
  },
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
  chapters: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2rem'
  },
  chapter: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  chapterTitle: {
    fontSize: '1.5rem',
    color: '#1a1a2e',
    marginBottom: '0.5rem'
  },
  chapterDescription: {
    color: '#666',
    marginBottom: '1.5rem'
  },
  lessonList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  lessonItem: {
    padding: '0.5rem 0',
    borderBottom: '1px solid #f0f0f0'
  },
  lessonLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    color: '#333',
    textDecoration: 'none',
    padding: '0.5rem',
    borderRadius: '6px',
    transition: 'background 0.2s ease'
  },
  lessonNumber: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    backgroundColor: '#667eea',
    color: '#fff',
    borderRadius: '50%',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  }
};

export default SectionPage;