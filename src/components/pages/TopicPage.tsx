import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { topicsData } from '../../data/topics';
import { ILesson } from '../../types';

const TopicPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [selectedLesson, setSelectedLesson] = useState<ILesson | null>(null);
  
  const topic = topicsData.find(t => t.id === topicId);

  if (!topic) {
    return <div style={styles.error}>Тема не найдена</div>;
  }

  const currentLesson = selectedLesson || topic.lessons[0];

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>{topic.icon} {topic.title}</h1>
        <p style={styles.description}>{topic.description}</p>
      </div>

      <div style={styles.content}>
        <aside style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>Уроки</h3>
          <ul style={styles.lessonList}>
            {topic.lessons.map((lesson: ILesson) => (
              <li 
                key={lesson.id}
                style={{
                  ...styles.lessonItem,
                  ...(currentLesson.id === lesson.id ? styles.activeLesson : {})
                }}
                onClick={() => setSelectedLesson(lesson)}
              >
                <div style={styles.lessonItemContent}>
                  <span style={styles.lessonTitle}>{lesson.title}</span>
                  <span style={styles.lessonDuration}>⏱ {lesson.duration} мин</span>
                </div>
                <span style={styles.difficultyBadge(lesson.difficulty)}>
                  {lesson.difficulty}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        <main style={styles.lessonContent}>
          <h2 style={styles.lessonTitle}>{currentLesson.title}</h2>
          <p style={styles.lessonDescription}>{currentLesson.description}</p>
          
          <div style={styles.lessonBody}>
            {currentLesson.content.map((paragraph: string, index: number) => (
              <p key={index} style={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <div style={styles.lessonNav}>
            <button 
              onClick={() => {
                const currentIndex = topic.lessons.findIndex((l: ILesson) => l.id === currentLesson.id);
                if (currentIndex > 0) {
                  setSelectedLesson(topic.lessons[currentIndex - 1]);
                }
              }}
              disabled={topic.lessons[0].id === currentLesson.id}
              style={styles.navButton}
            >
              ← Предыдущий
            </button>
            
            <span style={styles.lessonCounter}>
              {topic.lessons.findIndex((l: ILesson) => l.id === currentLesson.id) + 1} / {topic.lessons.length}
            </span>
            
            <button 
              onClick={() => {
                const currentIndex = topic.lessons.findIndex((l: ILesson) => l.id === currentLesson.id);
                if (currentIndex < topic.lessons.length - 1) {
                  setSelectedLesson(topic.lessons[currentIndex + 1]);
                }
              }}
              disabled={topic.lessons[topic.lessons.length - 1].id === currentLesson.id}
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

const styles = {
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
    display: 'grid' as const,
    gridTemplateColumns: '300px 1fr',
    gap: '2rem'
  },
  sidebar: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    alignSelf: 'start' as const
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
    alignItems: 'center',
    marginBottom: '0.25rem'
  },
  lessonTitle: {
    fontSize: '1rem',
    fontWeight: 500,
    color: '#1a1a2e'
  },
  lessonDuration: {
    fontSize: '0.85rem',
    color: '#888'
  },
  difficultyBadge: (difficulty: string) => ({
    padding: '2px 10px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    backgroundColor: 
      difficulty === 'easy' ? '#4caf50' : 
      difficulty === 'medium' ? '#ff9800' : 
      '#f44336',
    color: '#fff',
    display: 'inline-block'
  }),
  lessonContent: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  lessonDescription: {
    color: '#666',
    fontSize: '1.1rem',
    marginBottom: '1.5rem'
  },
  lessonBody: {
    marginBottom: '2rem'
  },
  paragraph: {
    lineHeight: '1.8',
    color: '#333',
    marginBottom: '1rem'
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
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    ':hover': {
      backgroundColor: '#5a67d8'
    },
    ':disabled': {
      backgroundColor: '#ccc',
      cursor: 'not-allowed'
    }
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

export default TopicPage;