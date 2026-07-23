import { useState, useEffect, useCallback, useRef } from 'react';
import { sectionsData } from '../data/topics';

const PROGRESS_KEY = 'kilasonia_progress';

interface ProgressData {
  completedLessons: string[];
  lastVisit: string;
  totalLessons: number;
  currentStreak: number;
  longestStreak: number;
  lastStreakDate: string;
}

export const useProgress = () => {
  // ✅ Подсчет общего количества уроков
  const calculateTotalLessons = useCallback(() => {
    return sectionsData.reduce(
      (acc, section) => acc + section.chapters.reduce(
        (sum, chapter) => sum + chapter.lessons.length,
        0
      ),
      0
    );
  }, []);

  const [progress, setProgress] = useState<ProgressData>(() => {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          totalLessons: calculateTotalLessons()
        };
      } catch {
        return {
          completedLessons: [],
          lastVisit: new Date().toISOString(),
          totalLessons: calculateTotalLessons(),
          currentStreak: 0,
          longestStreak: 0,
          lastStreakDate: ''
        };
      }
    }
    return {
      completedLessons: [],
      lastVisit: new Date().toISOString(),
      totalLessons: calculateTotalLessons(),
      currentStreak: 0,
      longestStreak: 0,
      lastStreakDate: ''
    };
  });

  // ✅ Сохраняем в localStorage
  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }, [progress]);

  // ✅ Обновляем totalLessons при изменении данных (только один раз)
  const totalLessonsRef = useRef(calculateTotalLessons());
  const [totalLessons, setTotalLessonsState] = useState(totalLessonsRef.current);

  // ✅ Обновляем totalLessons при монтировании
  useEffect(() => {
    const newTotal = calculateTotalLessons();
    if (totalLessonsRef.current !== newTotal) {
      totalLessonsRef.current = newTotal;
      setTotalLessonsState(newTotal);
      setProgress(prev => ({ ...prev, totalLessons: newTotal }));
    }
  }, [calculateTotalLessons]);

  // ✅ Проверка и обновление стрика
  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    const lastDate = progress.lastStreakDate ? new Date(progress.lastStreakDate).toDateString() : null;

    if (lastDate === today) {
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    let newStreak = progress.currentStreak;
    let newLongest = progress.longestStreak;

    if (lastDate === yesterdayStr) {
      newStreak += 1;
    } else if (lastDate !== today) {
      newStreak = 1;
    }

    if (newStreak > newLongest) {
      newLongest = newStreak;
    }

    setProgress(prev => ({
      ...prev,
      currentStreak: newStreak,
      longestStreak: newLongest,
      lastStreakDate: new Date().toISOString()
    }));
  }, [progress.currentStreak, progress.longestStreak, progress.lastStreakDate]);

  // ✅ Вызываем при каждом визите
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const toggleLesson = useCallback((lessonId: string) => {
    setProgress(prev => {
      const isCompleted = prev.completedLessons.includes(lessonId);
      const newCompleted = isCompleted
        ? prev.completedLessons.filter(id => id !== lessonId)
        : [...prev.completedLessons, lessonId];

      return {
        ...prev,
        completedLessons: newCompleted,
        lastVisit: new Date().toISOString()
      };
    });
  }, []);

  const isLessonCompleted = useCallback((lessonId: string) => {
    return progress.completedLessons.includes(lessonId);
  }, [progress.completedLessons]);

  const getCompletedCount = useCallback(() => {
    return progress.completedLessons.length;
  }, [progress.completedLessons]);

  const getProgressPercentage = useCallback(() => {
    const total = progress.totalLessons || 1;
    return Math.min(Math.round((getCompletedCount() / total) * 100), 100);
  }, [getCompletedCount, progress.totalLessons]);

  const getCourseProgress = useCallback((courseId: string) => {
    const course = sectionsData.find(s => s.id === courseId);
    if (!course) return { completed: 0, total: 0, percentage: 0 };

    const allLessons = course.chapters.flatMap(ch => ch.lessons);
    const total = allLessons.length;
    const completed = allLessons.filter(l => progress.completedLessons.includes(l.id)).length;

    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }, [progress.completedLessons]);

  const setTotalLessons = useCallback((total: number) => {
    totalLessonsRef.current = total;
    setTotalLessonsState(total);
    setProgress(prev => ({ ...prev, totalLessons: total }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({
      completedLessons: [],
      lastVisit: new Date().toISOString(),
      totalLessons: calculateTotalLessons(),
      currentStreak: 0,
      longestStreak: 0,
      lastStreakDate: ''
    });
  }, [calculateTotalLessons]);

  return {
    progress,
    toggleLesson,
    isLessonCompleted,
    getCompletedCount,
    getProgressPercentage,
    getCourseProgress,
    setTotalLessons,
    resetProgress,
    currentStreak: progress.currentStreak,
    longestStreak: progress.longestStreak,
  };
};