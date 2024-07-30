import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import RegistrationPage from './pages/RegistrationPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import Footer from './components/layout/Footer';
import LoginForm from './pages/LoginForm';
import UserDashboard from './pages/UserDashboard ';
import HomePage from './pages/HomePage';
import ErrorBoundary from './components/ErrorBoundary';
import LoadAllUsers from './pages/LoadAllUsers';

function App() {
  // Simulating user authentication
  const [user, setUser] = useState(null); 

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />

        <div style={{ flex: 1, padding: '20px' }}>
          <ErrorBoundary>
            <Routes>
              <Route path="/user-dashboard" element={<UserDashboard user={user} />} />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginForm setUser={setUser} />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/" element={<HomePage />} /> 
              <Route path="/admin/loadAllUser" element={<LoadAllUsers />} />
            </Routes>
          </ErrorBoundary>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
