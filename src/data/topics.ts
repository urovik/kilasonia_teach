import { Itopic } from "../types";


export const topicsData: Itopic[] = [
  {
    id: 'C',
    title: 'язык C',
    icon: 'C',
    description: 'Изучи C с нуля до продвинутого уровня',
    lessons: [
      {
        id: 'C-intro',
        title: 'Введение в язык си',
        description: 'Что такое си и как он работает в браузере',
        content: [
          'си — это язык программирования',
        ],
        duration: 15,
        difficulty: 'easy'
      }
    ]
  }
];

// Навигация генерируется из данных
export const getNavItems = () => {
  return topicsData.map(topic => ({
    id: topic.id,
    label: topic.title,
    path: `/topic/${topic.id}`
  }));
};