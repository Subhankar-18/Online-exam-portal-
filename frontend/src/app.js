import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './login';
import AdminPage from './AdminPage';
import StudentPage from './StudentPage';
import TeacherPage from './TeacherPage';
import CoursePage from './CoursePage';
import TeacherDashBoard from './TeacherDashBoard';
import StudentDashboard from "./StudentDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/students" element={<StudentPage />} />
        <Route path="/teachers" element={<TeacherPage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/teacherdashboard" element={<TeacherDashBoard />}/>
        <Route path="/studentdashboard" element={<StudentDashboard />}/>
      </Routes>
    </Router>
  );
}

export default App;