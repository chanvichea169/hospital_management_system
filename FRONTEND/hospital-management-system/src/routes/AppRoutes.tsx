import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import Header from "../components/Header/Header";
import Random from "../components/Random";
import AdminDashboard from "../layouts/AdminDashboard";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="*"
          element={
            <div className="flex min-h-screen">
              <SideBar />
              <div className="flex flex-col flex-1">
                <Header />
                <main className="p-4 flex-1">
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/doctors" element={<div>Doctors Page</div>} />
                    <Route
                      path="/patients"
                      element={<div>Patients Page</div>}
                    />
                    <Route
                      path="/appointments"
                      element={<div>Appointments Page</div>}
                    />
                    <Route
                      path="/pharmacy"
                      element={<div>Pharmacy Page</div>}
                    />
                    <Route
                      path="/schedule"
                      element={<div>Schedule Page</div>}
                    />
                    <Route
                      path="/settings"
                      element={<div>Settings Page</div>}
                    />
                    <Route path="*" element={<Random />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
