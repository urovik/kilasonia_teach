import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import HomePage from './components/pages/HomePage';
import SectionPage from './components/sections/SectionPage';
import LessonPage from './components/lessons/LessonPage';
import PageTransition from './components/common/PageTransition';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          } />
          <Route path="section/:sectionId" element={
            <PageTransition>
              <SectionPage />
            </PageTransition>
          } />
          <Route 
            path="section/:sectionId/chapter/:chapterId/lesson/:lessonId" 
            element={
              <PageTransition>
                <LessonPage />
              </PageTransition>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;