import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconUserPlus,
  IconBuildingHospital,
  IconUsers,
  IconShieldLock,
  IconBell,
  IconCalendar,
  IconFileText,
  IconSettings,
  IconChevronRight,
  IconLogout,
} from "@tabler/icons-react";

function SettingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const settingsSections = [
    {
      id: "general",
      icon: IconSettings,
      title: "General Settings",
      description: "Manage hospital information and preferences",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "users",
      icon: IconUsers,
      title: "User Management",
      description: "Create and manage user accounts",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "security",
      icon: IconShieldLock,
      title: "Security & Privacy",
      description: "Configure security settings and permissions",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "notifications",
      icon: IconBell,
      title: "Notifications",
      description: "Manage notification preferences",
      color: "from-orange-500 to-red-500",
    },
    {
      id: "appointments",
      icon: IconCalendar,
      title: "Appointment Settings",
      description: "Configure scheduling and booking options",
      color: "from-indigo-500 to-blue-500",
    },
    {
      id: "reports",
      icon: IconFileText,
      title: "Reports & Analytics",
      description: "View and export system reports",
      color: "from-teal-500 to-cyan-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
              <IconBuildingHospital className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Hospital Management Settings
              </h1>
              <p className="text-slate-600">
                Preah Ang Duong Hospital System Configuration
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/create-user")}
            className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-cyan-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
                <IconUserPlus className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-slate-800 text-lg">
                  Create New User
                </h3>
                <p className="text-sm text-slate-600">
                  Add doctors, nurses, or staff
                </p>
              </div>
              <IconChevronRight className="ml-auto h-5 w-5 text-slate-400 group-hover:text-cyan-500 transition-colors" />
            </div>
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-purple-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <IconUsers className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-slate-800 text-lg">
                  Manage Users
                </h3>
                <p className="text-sm text-slate-600">
                  View and edit user accounts
                </p>
              </div>
              <IconChevronRight className="ml-auto h-5 w-5 text-slate-400 group-hover:text-purple-500 transition-colors" />
            </div>
          </button>

          <button
            onClick={handleLogout}
            className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-red-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl">
                <IconLogout className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-slate-800 text-lg">
                  Sign Out
                </h3>
                <p className="text-sm text-slate-600">
                  Log out from your account
                </p>
              </div>
              <IconChevronRight className="ml-auto h-5 w-5 text-slate-400 group-hover:text-red-500 transition-colors" />
            </div>
          </button>
        </div>

        {/* Settings Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-left overflow-hidden ${
                  activeTab === section.id
                    ? "ring-2 ring-cyan-500 scale-105"
                    : "hover:scale-105"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                ></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 bg-gradient-to-r ${section.color} rounded-xl shadow-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <IconChevronRight
                      className={`h-5 w-5 text-slate-400 group-hover:text-cyan-500 transition-colors ${
                        activeTab === section.id ? "text-cyan-500" : ""
                      }`}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    {section.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {section.description}
                  </p>
                </div>
                {activeTab === section.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Section Content */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            {settingsSections.find((s) => s.id === activeTab)?.title}
          </h2>
          <p className="text-slate-600 mb-6">
            {settingsSections.find((s) => s.id === activeTab)?.description}
          </p>

          {activeTab === "users" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <h4 className="font-semibold text-slate-800">Total Users</h4>
                  <p className="text-sm text-slate-600">
                    Active users in the system
                  </p>
                </div>
                <span className="text-2xl font-bold text-cyan-500">-</span>
              </div>
              <button
                onClick={() => navigate("/create-user")}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
              >
                Create New User Account
              </button>
            </div>
          )}

          {activeTab === "general" && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2">
                  Hospital Information
                </h4>
                <div className="space-y-2 text-sm text-slate-600">
                  <p>
                    <strong>Name:</strong> Preah Ang Duong Hospital
                  </p>
                  <p>
                    <strong>System:</strong> Hospital Management System v1.0
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="text-green-500 font-semibold">Active</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2">
                  Security Options
                </h4>
                <p className="text-sm text-slate-600">
                  Configure password policies, two-factor authentication, and
                  access controls.
                </p>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2">
                  Notification Preferences
                </h4>
                <p className="text-sm text-slate-600">
                  Manage email notifications, SMS alerts, and in-app
                  notifications.
                </p>
              </div>
            </div>
          )}

          {activeTab === "appointments" && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2">
                  Appointment Configuration
                </h4>
                <p className="text-sm text-slate-600">
                  Set booking rules, working hours, and appointment duration.
                </p>
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="font-semibold text-slate-800 mb-2">
                  System Reports
                </h4>
                <p className="text-sm text-slate-600">
                  Generate and export various system reports and analytics.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
