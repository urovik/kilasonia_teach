// src/utils/achievements.ts

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  // ✅ Расширяем тип, чтобы принимать дополнительные параметры
  condition: (completed: number, streak?: number, extra?: any) => boolean;
}

export const achievements: Achievement[] = [
  // 📚 Достижения за количество уроков
  {
    id: 'first_lesson',
    name: 'Первый шаг',
    description: 'Пройди свой первый урок',
    icon: '👣',
    condition: (completed: number) => completed >= 1,
  },
  {
    id: 'three_lessons',
    name: 'Начинающий',
    description: 'Пройди 3 урока',
    icon: '🌱',
    condition: (completed: number) => completed >= 3,
  },
  {
    id: 'five_lessons',
    name: 'Ученик',
    description: 'Пройди 5 уроков',
    icon: '📚',
    condition: (completed: number) => completed >= 5,
  },
  {
    id: 'ten_lessons',
    name: 'Программист',
    description: 'Пройди 10 уроков',
    icon: '💻',
    condition: (completed: number) => completed >= 10,
  },
  {
    id: 'fifteen_lessons',
    name: 'Кодер',
    description: 'Пройди 15 уроков',
    icon: '👨‍💻',
    condition: (completed: number) => completed >= 15,
  },
  {
    id: 'twenty_lessons',
    name: 'Разработчик',
    description: 'Пройди 20 уроков',
    icon: '⚡',
    condition: (completed: number) => completed >= 20,
  },
  {
    id: 'twenty_five_lessons',
    name: 'Эксперт',
    description: 'Пройди 25 уроков',
    icon: '🌟',
    condition: (completed: number) => completed >= 25,
  },
  {
    id: 'fifty_lessons',
    name: 'Мастер',
    description: 'Пройди 50 уроков',
    icon: '🏆',
    condition: (completed: number) => completed >= 50,
  },
  {
    id: 'hundred_lessons',
    name: 'Легенда',
    description: 'Пройди 100 уроков',
    icon: '👑',
    condition: (completed: number) => completed >= 100,
  },

  // 🔥 Достижения за стрик (серию)
  {
    id: 'streak_3',
    name: 'Начинающий стрик',
    description: 'Занимайся 3 дня подряд',
    icon: '🔥',
    condition: (completed: number, streak?: number) => streak !== undefined && streak >= 3,
  },
  {
    id: 'streak_7',
    name: 'Неделя без остановки',
    description: 'Занимайся 7 дней подряд',
    icon: '🔥',
    condition: (completed: number, streak?: number) => streak !== undefined && streak >= 7,
  },
  {
    id: 'streak_14',
    name: 'Две недели без остановки',
    description: 'Занимайся 14 дней подряд',
    icon: '🔥',
    condition: (completed: number, streak?: number) => streak !== undefined && streak >= 14,
  },
  {
    id: 'streak_30',
    name: 'Месяц без остановки',
    description: 'Занимайся 30 дней подряд',
    icon: '⭐',
    condition: (completed: number, streak?: number) => streak !== undefined && streak >= 30,
  },
  {
    id: 'streak_100',
    name: '100 дней без остановки',
    description: 'Занимайся 100 дней подряд',
    icon: '💎',
    condition: (completed: number, streak?: number) => streak !== undefined && streak >= 100,
  },

  // 🎯 Специальные достижения
  {
    id: 'complete_course',
    name: 'Завершитель курса',
    description: 'Пройди все уроки одного курса',
    icon: '📖',
    condition: (completed: number, streak?: number, extra?: any) => extra?.courseComplete === true,
  },
  {
    id: 'night_owl',
    name: 'Ночная сова',
    description: 'Пройди урок после полуночи',
    icon: '🦉',
    condition: (completed: number, streak?: number, extra?: any) => extra?.isNight === true,
  },
];