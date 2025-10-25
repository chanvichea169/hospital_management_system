import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import Header from "../components/Header/Header";
import Random from "../components/Random";
import AdminDashboard from "../layouts/AdminDashboard";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import VerifyOtpPage from "../pages/VerifyOtpPage";
import SettingPage from "../layouts/SettingPage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen">
    <SideBar />
    <div className="flex flex-col flex-1">
      <Header />
      <main className="p-4 flex-1">{children}</main>
    </div>
  </div>
);

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <PublicRoute>
              <VerifyOtpPage />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/create-user"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <RegisterPage />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <AdminDashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <div>Doctors Page</div>
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <div>Patients Page</div>
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <div>Appointments Page</div>
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacy"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <div>Pharmacy Page</div>
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <div>Schedule Page</div>
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <SettingPage />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* 404 / fallback */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Random />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
