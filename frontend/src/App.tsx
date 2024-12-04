import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import TimeSlots from "./pages/TimeSlots";
import "./App.css";
import ScheduleTasks from "./pages/ScheduleTasks";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-task"
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/time-slots"
          element={
            <ProtectedRoute>
              <TimeSlots />
            </ProtectedRoute>
          }
        />

        <Route
          path="/schedule-tasks"
          element={
            <ProtectedRoute>
              <ScheduleTasks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
