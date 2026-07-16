// Тип для блока контента (может быть текстом, заголовком, списком или кодом)
export interface IContentBlock {
  type: 'text' | 'code' | 'heading' | 'list';
  content: string | string[] | ICodeExample;
}

// Тип для примера кода
export interface ICodeExample {
  title?: string;
  language: string;
  code: string;
}

// Тип для урока
export interface ILesson {
  id: string;
  title: string;
  description?: string;
  content: IContentBlock[];
}

// Тип для главы
export interface IChapter {
  id: string;
  title: string;
  description: string;
  lessons: ILesson[];
}

// Тип для раздела
export interface ISection {
  id: string;
  title: string;
  icon: string;
  description: string;
  chapters: IChapter[];
}

// Тип для навигации
export interface INavItem {
  id: string;
  label: string;
  path: string;
}

// Тип для хлебных крошек
export interface IBreadcrumb {
  label: string;
  path: string;
}