import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import EmployeesPage from './pages/employess/Employess';
import Dashboard from './pages/dashboard/Dashboard';
import Employee from './pages/employess/employee-profile/Employee';
import { DashboardProvider } from './exports/context/Context';
import './App.css';
import Schedule from './pages/schedule/Schedule';

const App = () => {
  return (
    <div className="main">
      <DashboardProvider>
        <Navbar />
        <Routes>
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees/:id" element={<Employee />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </DashboardProvider>
    </div>
  );
};

export default App;
