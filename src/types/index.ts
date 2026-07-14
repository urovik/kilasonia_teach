// Урок - самый маленький элемент
export interface ILesson {
  id: string;
  title: string;
  content: string[]; // массив абзацев
  codeExamples?: {
    title: string;
    code: string;
    language: string;
  }[];
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

// Глава - группа уроков по одной теме
export interface IChapter {
  id: string;
  title: string;
  description: string;
  lessons: ILesson[];
}

// Раздел - основная категория (как в Metanit)
export interface ISection {
  id: string;
  title: string;
  icon: string;
  description: string;
  chapters: IChapter[];
}

// Для навигации
export interface INavItem {
  id: string;
  label: string;
  path: string;
}

// Для хлебных крошек
export interface IBreadcrumb {
  label: string;
  path: string;
}