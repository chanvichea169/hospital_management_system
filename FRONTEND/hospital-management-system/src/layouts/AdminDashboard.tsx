import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconChevronRight,
  IconUsers,
  IconActivity,
  IconCalendar,
  IconFileText,
  IconUserPlus,
  IconInfoCircle,
  IconCircleCheck,
  IconAlertTriangle,
} from "@tabler/icons-react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <p className="text-gray-500">
          Manage your hospital system effectively.
        </p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Users"
          value="1,234"
          icon={IconUsers}
          color="from-cyan-400 to-blue-500"
        />
        <DashboardCard
          title="Active Patients"
          value="567"
          icon={IconActivity}
          color="from-green-400 to-emerald-500"
        />
        <DashboardCard
          title="Appointments Today"
          value="89"
          icon={IconCalendar}
          color="from-purple-400 to-pink-500"
        />
        <DashboardCard
          title="Pending Approvals"
          value="12"
          icon={IconFileText}
          color="from-orange-400 to-red-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <ChartCard title="Appointments Last 7 Days">
          <LineChart />
        </ChartCard>
        <ChartCard title="Patients by Department">
          <BarChart />
        </ChartCard>
        <ChartCard title="User Roles Distribution">
          <PieChart />
        </ChartCard>
      </div>

      {/* Users Table */}
      <UserManagementContent />

      {/* System Logs */}
      <SystemLogsContent />
    </div>
  );
}

/* ---------------- Dashboard Cards ---------------- */
const DashboardCard: React.FC<{
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}> = ({ title, value, icon: Icon, color }) => (
  <div className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
    <div
      className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 rounded-2xl`}
    ></div>
    <div className="relative flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h4 className="text-3xl font-bold text-gray-800 mt-1">{value}</h4>
      </div>
      <div
        className={`p-3 rounded-full bg-gradient-to-r ${color} text-white shadow-lg`}
      >
        <Icon className="h-7 w-7" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm text-blue-500 hover:text-blue-600 transition-colors">
      View Details <IconChevronRight className="h-4 w-4 ml-1" />
    </div>
  </div>
);

/* ---------------- Charts ---------------- */
const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
    <h3 className="text-gray-800 font-bold mb-4">{title}</h3>
    {children}
  </div>
);

const LineChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Appointments",
        data: [12, 19, 8, 14, 20, 9, 15],
        borderColor: "#06b6d4",
        backgroundColor: "rgba(6,182,212,0.2)",
        tension: 0.4,
      },
    ],
  };
  const options = { responsive: true, plugins: { legend: { display: false } } };
  return <Line data={data} options={options} />;
};

const BarChart = () => {
  const data = {
    labels: [
      "Cardiology",
      "Neurology",
      "Pediatrics",
      "Oncology",
      "Orthopedics",
    ],
    datasets: [
      {
        label: "Patients",
        data: [30, 45, 25, 20, 15],
        backgroundColor: "rgba(99,102,241,0.7)",
      },
    ],
  };
  const options = { responsive: true, plugins: { legend: { display: false } } };
  return <Bar data={data} options={options} />;
};

const PieChart = () => {
  const data = {
    labels: ["Admin", "Doctor", "Nurse", "Patient"],
    datasets: [
      {
        label: "Roles",
        data: [5, 20, 15, 50],
        backgroundColor: ["#06b6d4", "#8b5cf6", "#10b981", "#fbbf24"],
      },
    ],
  };
  const options = { responsive: true };
  return <Pie data={data} options={options} />;
};

/* ---------------- Users Table ---------------- */
const UserManagementContent = () => (
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow mb-8">
    <h3 className="text-gray-800 font-bold mb-4">Manage Users</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {["Name", "Email", "Role", "Status", "Action"].map((title) => (
              <th
                key={title}
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            {
              name: "John Doe",
              email: "john.doe@example.com",
              role: "Admin",
              status: "Active",
            },
            {
              name: "Jane Smith",
              email: "jane.smith@example.com",
              role: "Doctor",
              status: "Active",
            },
            {
              name: "Peter Jones",
              email: "peter.jones@example.com",
              role: "Nurse",
              status: "Inactive",
            },
          ].map((user, idx) => (
            <tr key={idx} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-gray-800">{user.name}</td>
              <td className="px-6 py-4 text-gray-500">{user.email}</td>
              <td className="px-6 py-4 text-gray-500">{user.role}</td>
              <td
                className={`px-6 py-4 font-semibold ${
                  user.status === "Active" ? "text-green-500" : "text-red-500"
                }`}
              >
                {user.status}
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-blue-500 hover:text-blue-600 font-medium">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center transition-colors">
      <IconUserPlus className="h-5 w-5 mr-2" /> Add New User
    </button>
  </div>
);

/* ---------------- System Logs ---------------- */
const SystemLogsContent = () => (
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
    <h3 className="text-gray-800 font-bold mb-4">System Logs</h3>
    <div className="space-y-2">
      <LogEntry
        type="info"
        message="[2025-10-27 10:30] User 'John Doe' logged in."
      />
      <LogEntry
        type="success"
        message="[2025-10-27 10:25] Appointment created for 'Jane Smith'."
      />
      <LogEntry
        type="warning"
        message="[2025-10-27 10:15] Database connection warning."
      />
      <LogEntry
        type="error"
        message="[2025-10-27 10:00] Failed login attempt for 'admin'."
      />
    </div>
  </div>
);

const LogEntry: React.FC<{
  type: "info" | "success" | "warning" | "error";
  message: string;
}> = ({ type, message }) => {
  let icon;
  let colorClass;
  switch (type) {
    case "info":
      icon = <IconInfoCircle className="h-5 w-5 text-blue-500" />;
      colorClass = "bg-blue-50";
      break;
    case "success":
      icon = <IconCircleCheck className="h-5 w-5 text-green-500" />;
      colorClass = "bg-green-50";
      break;
    case "warning":
      icon = <IconAlertTriangle className="h-5 w-5 text-yellow-500" />;
      colorClass = "bg-yellow-50";
      break;
    case "error":
      icon = <IconAlertTriangle className="h-5 w-5 text-red-500" />;
      colorClass = "bg-red-50";
      break;
    default:
      icon = <IconInfoCircle className="h-5 w-5 text-gray-500" />;
      colorClass = "bg-gray-50";
  }
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg ${colorClass}`}>
      {icon}
      <p className="text-gray-700 text-sm">{message}</p>
    </div>
  );
};

export default AdminDashboard;
