import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import HomePage from './components/pages/HomePage';
import SectionPage from './components/sections/SectionPage';
import LessonPage from './components/lessons/LessonPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="section/:sectionId" element={<SectionPage />} />
          <Route path="section/:sectionId/chapter/:chapterId/lesson/:lessonId" element={<LessonPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;