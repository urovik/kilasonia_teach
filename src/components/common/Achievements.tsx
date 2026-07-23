import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useProgress } from '../../hooks/useProgress';
import { achievements, Achievement } from '../../utils/achievements';

const ACHIEVEMENTS_KEY = 'kilasonia_achievements';

const Achievements: React.FC = () => {
  const { getCompletedCount, currentStreak, progress } = useProgress();
  const [unlocked, setUnlocked] = useState<string[]>(() => {
    const saved = localStorage.getItem(ACHIEVEMENTS_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  
  const prevCompletedRef = useRef(getCompletedCount());
  const isFirstRender = useRef(true);

  const completedCount = getCompletedCount();

  // ✅ Проверка достижений с дополнительными параметрами
  const checkAchievements = useCallback(() => {
    const newlyUnlocked: Achievement[] = [];
    
    // Проверяем время (для "Ночной совы")
    const hour = new Date().getHours();
    const isNight = hour >= 0 && hour < 6;
    
    // Проверяем, завершен ли какой-то курс
    // TODO: реализовать проверку завершения курса
    const courseComplete = false;
    
    achievements.forEach((ach: Achievement) => {
      if (unlocked.includes(ach.id)) return;
      
      let isUnlocked = false;
      
      // Для специальных достижений передаем доп. параметры
      if (ach.id === 'night_owl') {
        isUnlocked = ach.condition(completedCount, currentStreak, { isNight });
      } else if (ach.id === 'complete_course') {
        isUnlocked = ach.condition(completedCount, currentStreak, { courseComplete });
      } else {
        isUnlocked = ach.condition(completedCount, currentStreak);
      }
      
      if (isUnlocked) {
        newlyUnlocked.push(ach);
      }
    });

    if (newlyUnlocked.length > 0) {
      const newIds = newlyUnlocked.map((a: Achievement) => a.id);
      const updatedUnlocked = [...unlocked, ...newIds];
      setUnlocked(updatedUnlocked);
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(updatedUnlocked));
      
      const lastAchievement = newlyUnlocked[newlyUnlocked.length - 1];
      setNewAchievement(lastAchievement);
      
      setTimeout(() => {
        setNewAchievement(null);
      }, 5000);
      
      return true;
    }
    return false;
  }, [completedCount, currentStreak, unlocked]);

  // ✅ Проверяем при монтировании и при изменении progress
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      checkAchievements();
      return;
    }

    const currentCompleted = getCompletedCount();
    if (prevCompletedRef.current !== currentCompleted) {
      prevCompletedRef.current = currentCompleted;
      checkAchievements();
    }
  }, [progress, getCompletedCount, checkAchievements]);

  // ✅ Принудительная проверка
  const forceCheck = useCallback(() => {
    const newlyUnlocked: Achievement[] = [];
    const hour = new Date().getHours();
    const isNight = hour >= 0 && hour < 6;
    const courseComplete = false;
    
    achievements.forEach((ach: Achievement) => {
      if (!unlocked.includes(ach.id)) {
        let isUnlocked = false;
        if (ach.id === 'night_owl') {
          isUnlocked = ach.condition(completedCount, currentStreak, { isNight });
        } else if (ach.id === 'complete_course') {
          isUnlocked = ach.condition(completedCount, currentStreak, { courseComplete });
        } else {
          isUnlocked = ach.condition(completedCount, currentStreak);
        }
        if (isUnlocked) {
          newlyUnlocked.push(ach);
        }
      }
    });

    if (newlyUnlocked.length > 0) {
      const newIds = newlyUnlocked.map((a: Achievement) => a.id);
      const updatedUnlocked = [...unlocked, ...newIds];
      setUnlocked(updatedUnlocked);
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(updatedUnlocked));
    }
  }, [completedCount, currentStreak, unlocked]);

  const unlockedAchievements = achievements.filter((a: Achievement) => unlocked.includes(a.id));
  const lockedAchievements = achievements.filter((a: Achievement) => !unlocked.includes(a.id));

  // Отладка
  console.log('📊 Достижения:', {
    completed: completedCount,
    unlocked: unlockedAchievements.length,
    total: achievements.length,
    list: unlockedAchievements.map(a => a.name),
    streak: currentStreak,
  });

  return (
    <div style={styles.container}>
      {newAchievement && (
        <div style={styles.notification}>
          <span style={styles.notificationIcon}>{newAchievement.icon}</span>
          <div>
            <div style={styles.notificationTitle}>Новое достижение!</div>
            <div style={styles.notificationName}>{newAchievement.name}</div>
            <div style={styles.notificationDesc}>{newAchievement.description}</div>
          </div>
        </div>
      )}

      <div style={styles.header}>
        <h3 style={styles.title}>🏅 Достижения</h3>
        <span style={styles.count}>
          {unlockedAchievements.length} / {achievements.length}
        </span>
      </div>

      <div style={styles.grid}>
        {unlockedAchievements.map((ach: Achievement) => (
          <div key={ach.id} style={styles.unlocked} title={ach.description}>
            <span style={styles.icon}>{ach.icon}</span>
            <span style={styles.name}>{ach.name}</span>
          </div>
        ))}
        {lockedAchievements.map((ach: Achievement) => (
          <div key={ach.id} style={styles.locked} title={`🔒 ${ach.description}`}>
            <span style={styles.icon}>🔒</span>
            <span style={styles.name}>{ach.name}</span>
          </div>
        ))}
      </div>

      {unlockedAchievements.length === achievements.length && (
        <div style={styles.completed}>
          🎉 Все достижения получены!
        </div>
      )}

      <button onClick={forceCheck} style={styles.debugButton} title="Принудительно проверить">
        🔄
      </button>
    </div>
  );
};

const styles: any = {
  container: {
    position: 'relative' as const,
    padding: '16px',
    backgroundColor: 'var(--bg-card)',
    borderRadius: 'var(--radius, 8px)',
    border: '1px solid var(--border, #e2e8f0)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--text, #0f172a)',
    margin: 0,
  },
  count: {
    fontSize: '0.8rem',
    color: 'var(--text-muted, #64748b)',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
  },
  unlocked: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    backgroundColor: 'var(--success-bg, #f0fdf4)',
    borderRadius: '20px',
    fontSize: '0.8rem',
    border: '1px solid var(--success, #22c55e)',
    cursor: 'default',
  },
  locked: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    backgroundColor: 'var(--bg-hover, #f1f5f9)',
    borderRadius: '20px',
    fontSize: '0.8rem',
    opacity: 0.5,
    border: '1px solid var(--border, #e2e8f0)',
    cursor: 'default',
  },
  icon: {
    fontSize: '0.9rem',
  },
  name: {
    color: 'var(--text, #0f172a)',
  },
  completed: {
    marginTop: '12px',
    padding: '8px',
    textAlign: 'center' as const,
    fontSize: '0.9rem',
    color: 'var(--success, #22c55e)',
    backgroundColor: 'var(--success-bg, #f0fdf4)',
    borderRadius: 'var(--radius-sm, 4px)',
  },
  debugButton: {
    position: 'absolute' as const,
    top: '8px',
    right: '8px',
    background: 'none',
    border: 'none',
    fontSize: '0.8rem',
    cursor: 'pointer',
    opacity: 0.3,
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'opacity 0.2s',
  },
  notification: {
    position: 'fixed' as const,
    bottom: '20px',
    right: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    backgroundColor: 'var(--bg-card, #ffffff)',
    borderRadius: 'var(--radius, 8px)',
    boxShadow: 'var(--shadow-hover, 0 4px 12px rgba(15,23,42,0.08))',
    border: '2px solid var(--success, #22c55e)',
    animation: 'slideUp 0.5s ease',
    zIndex: 1000,
    maxWidth: '320px',
  },
  notificationIcon: {
    fontSize: '2rem',
    flexShrink: 0,
  },
  notificationTitle: {
    fontSize: '0.75rem',
    color: 'var(--text-muted, #64748b)',
  },
  notificationName: {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--text, #0f172a)',
  },
  notificationDesc: {
    fontSize: '0.8rem',
    color: 'var(--text-muted, #64748b)',
  },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .debug-button:hover {
    opacity: 1 !important;
  }

  @media (max-width: 480px) {
    .notification {
      bottom: 10px !important;
      right: 10px !important;
      left: 10px !important;
      max-width: unset !important;
      padding: 14px 16px !important;
    }
    .notification-icon { font-size: 1.6rem !important; }
    .notification-name { font-size: 0.9rem !important; }
  }
`;
document.head.appendChild(styleSheet);

export default Achievements;