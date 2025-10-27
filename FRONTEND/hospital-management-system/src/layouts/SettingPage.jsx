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
      title: "General",
    },
    {
      id: "users",
      icon: IconUsers,
      title: "Users",
    },
    {
      id: "security",
      icon: IconShieldLock,
      title: "Security",
    },
    {
      id: "notifications",
      icon: IconBell,
      title: "Notifications",
    },
    {
      id: "appointments",
      icon: IconCalendar,
      title: "Appointments",
    },
    {
      id: "reports",
      icon: IconFileText,
      title: "Reports",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings />;
      case "users":
        return <UserManagement />;
      case "security":
        return <SecuritySettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col bg-white shadow-lg">
        <div className="p-6 flex items-center gap-3">
          <IconBuildingHospital className="h-8 w-8 text-cyan-500" />
          <h1 className="text-xl font-bold text-slate-800">Settings</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === section.id
                    ? "bg-cyan-500 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{section.title}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <IconLogout className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}

const GeneralSettings = () => (
  <div>
    <h2 className="text-3xl font-bold text-slate-800 mb-2">General Settings</h2>
    <p className="text-slate-600 mb-8">Manage hospital information and preferences.</p>
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold text-slate-700 mb-4">Hospital Information</h3>
      <div className="space-y-3 text-slate-600">
        <p><strong>Name:</strong> Preah Ang Duong Hospital</p>
        <p><strong>System:</strong> Hospital Management System v1.0</p>
        <p><strong>Status:</strong> <span className="text-green-500 font-semibold">Active</span></p>
      </div>
    </div>
  </div>
);

const UserManagement = () => (
  <div>
    <h2 className="text-3xl font-bold text-slate-800 mb-2">User Management</h2>
    <p className="text-slate-600 mb-8">Create and manage user accounts.</p>
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold text-slate-700 mb-6">Create New User</h3>
      <form className="space-y-4 max-w-lg mx-auto">
        <InputField label="Full Name" type="text" placeholder="Enter full name" />
        <InputField label="Email Address" type="email" placeholder="Enter email address" />
        <InputField label="Password" type="password" placeholder="Enter password" />
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Role</label>
          <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition-all">
            <option>Admin</option>
            <option>Doctor</option>
            <option>Nurse</option>
            <option>Receptionist</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
        >
          <IconUserPlus className="inline-block h-5 w-5 mr-2" />
          Create User
        </button>
      </form>
    </div>
  </div>
);

const SecuritySettings = () => (
  <div>
    <h2 className="text-3xl font-bold text-slate-800 mb-2">Security & Privacy</h2>
    <p className="text-slate-600 mb-8">Configure security settings and permissions.</p>
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold text-slate-700 mb-6">Update Password</h3>
      <form className="space-y-4 max-w-lg mx-auto">
        <InputField label="Current Password" type="password" placeholder="Enter your current password" />
        <InputField label="New Password" type="password" placeholder="Enter a new password" />
        <InputField label="Confirm New Password" type="password" placeholder="Confirm your new password" />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
        >
          <IconShieldLock className="inline-block h-5 w-5 mr-2" />
          Update Password
        </button>
      </form>
    </div>
  </div>
);

const InputField = ({ label, type, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition-all"
    />
  </div>
);

export default SettingPage;
