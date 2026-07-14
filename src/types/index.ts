export interface ILesson {
  id: string;
  title: string;
  description: string;
  content: string[]; // массив абзацев
  duration: number; // в минутах
  difficulty: 'easy' | 'medium' | 'hard';
} // Тип для одного урока

// Тип для темы (раздела)
export interface Itopic{
    id: string;
    title: string;
    icon: string;
    description: string;
    lessons: ILesson[];
}

// Тип для навигации
export interface INavItem {
  id: string;
  label: string;
  path: string;
}