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
    <div style={styles.container}>
      <Breadcrumbs items={breadcrumbs} />
      
      <div style={styles.content}>
        <div style={styles.main}>
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

const styles: any = {
  container: {
    padding: '20px 0',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 220px',
    gap: '24px',
  },
  main: {
    minWidth: 0,
  },
  header: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '2.5rem',
    color: 'var(--text, #2c3e50)',
    marginBottom: '8px',
  },
  description: {
    fontSize: '1.1rem',
    color: 'var(--text-muted, #6b7a8a)',
  },
  chapters: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
  },
  chapter: {
    backgroundColor: 'var(--bg-card, #ffffff)',
    borderRadius: 'var(--radius, 10px)',
    padding: '24px',
    boxShadow: '0 1px 3px var(--shadow, rgba(44,62,80,0.08))',
  },
  chapterTitle: {
    fontSize: '1.5rem',
    color: 'var(--text, #2c3e50)',
    marginBottom: '8px',
  },
  chapterDescription: {
    color: 'var(--text-muted, #6b7a8a)',
    marginBottom: '16px',
  },
  lessonList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  lessonItem: {
    padding: '8px 0',
    borderBottom: '1px solid var(--border, #dce4ec)',
  },
  lessonLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: 'var(--text, #2c3e50)',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: 'var(--radius-sm, 6px)',
    transition: 'background 0.2s ease',
  },
  lessonNumber: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    backgroundColor: 'var(--primary, #3498db)',
    color: '#fff',
    borderRadius: '50%',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  error: {
    padding: '40px',
    textAlign: 'center' as const,
    fontSize: '1.2rem',
    color: 'var(--error, #e74c3c)',
  },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .lesson-link:hover {
    background: var(--bg-hover, #e8ecf0);
  }

  @media (max-width: 1024px) {
    .content {
      grid-template-columns: 1fr 200px !important;
      gap: 16px !important;
    }
    .title { font-size: 2.2rem !important; }
    .chapter { padding: 20px !important; }
  }

  @media (max-width: 768px) {
    .content {
      display: flex !important;
      flex-direction: column !important;
      gap: 16px !important;
    }
    .title { font-size: 1.8rem !important; }
    .description { font-size: 1rem !important; }
    .chapter { padding: 16px !important; }
    .chapter-title { font-size: 1.3rem !important; }
    .header { margin-bottom: 24px !important; }
  }

  @media (max-width: 480px) {
    .container { padding: 12px 0 !important; }
    .title { font-size: 1.5rem !important; }
    .description { font-size: 0.9rem !important; }
    .chapter { padding: 12px !important; border-radius: var(--radius-sm, 6px) !important; }
    .chapter-title { font-size: 1.1rem !important; }
    .lesson-link { font-size: 0.9rem !important; padding: 6px 8px !important; }
    .lesson-number { width: 24px !important; height: 24px !important; font-size: 0.7rem !important; }
    .lesson-item { padding: 4px 0 !important; }
  }
`;
document.head.appendChild(styleSheet);

export default SectionPage;