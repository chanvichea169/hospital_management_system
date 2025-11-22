import React, { useState } from "react";
import {
  User,
  Calendar,
  Users,
  Stethoscope,
  Clock,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Activity,
  Heart,
  TrendingUp,
  Award,
  Star,
  CheckCircle,
  AlertCircle,
  Bell,
  Settings,
  LogOut,
  Search,
  Filter,
  MoreVertical,
  Video,
  MessageSquare,
  FileText,
} from "lucide-react";

function DoctorPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const doctorInfo = {
    name: "Dr. Emily White",
    specialty: "Cardiologist",
    email: "emily.white@hospital.com",
    phone: "+1 (555) 123-4567",
    address: "123 Health St, Medical City, CA 90210",
    bio: "Dr. Emily White is a board-certified cardiologist with over 15 years of experience in diagnosing and treating heart conditions. She is dedicated to providing compassionate and comprehensive care to her patients.",
    education: "MD, Harvard Medical School",
    experience: "15+ years",
    patientsTreated: "5,000+",
    rating: 4.9,
    reviews: 342,
  };

  const stats = [
    {
      label: "Total Patients",
      value: "5,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Appointments Today",
      value: "24",
      change: "+3",
      trend: "up",
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Success Rate",
      value: "98.5%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Avg. Rating",
      value: "4.9",
      change: "+0.2",
      trend: "up",
      icon: Star,
      color: "from-amber-500 to-orange-500",
    },
  ];

  const patients = [
    {
      id: 1,
      name: "Alice Johnson",
      age: 45,
      condition: "Hypertension",
      lastVisit: "2023-10-20",
      status: "stable",
      avatar: "AJ",
      priority: "normal",
    },
    {
      id: 2,
      name: "Bob Williams",
      age: 62,
      condition: "Coronary Artery Disease",
      lastVisit: "2023-10-18",
      status: "monitoring",
      avatar: "BW",
      priority: "high",
    },
    {
      id: 3,
      name: "Carol Davis",
      age: 30,
      condition: "Arrhythmia",
      lastVisit: "2023-10-22",
      status: "stable",
      avatar: "CD",
      priority: "normal",
    },
    {
      id: 4,
      name: "David Miller",
      age: 70,
      condition: "Heart Failure",
      lastVisit: "2023-10-15",
      status: "critical",
      avatar: "DM",
      priority: "urgent",
    },
  ];

  const appointments = [
    {
      id: 1,
      patient: "Alice Johnson",
      time: "10:00 AM",
      type: "Follow-up",
      status: "confirmed",
      duration: "30 min",
      avatar: "AJ",
    },
    {
      id: 2,
      patient: "Carol Davis",
      time: "11:00 AM",
      type: "New Patient",
      status: "pending",
      duration: "45 min",
      avatar: "CD",
    },
    {
      id: 3,
      patient: "Frank Green",
      time: "02:00 PM",
      type: "Consultation",
      status: "confirmed",
      duration: "30 min",
      avatar: "FG",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Completed consultation",
      patient: "Alice Johnson",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      id: 2,
      action: "Lab results reviewed",
      patient: "Bob Williams",
      time: "4 hours ago",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      id: 3,
      action: "Prescription updated",
      patient: "Carol Davis",
      time: "5 hours ago",
      icon: Activity,
      color: "text-purple-500",
    },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-purple-500" />
              Today's Schedule
            </h3>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1">
              View All
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 border border-transparent hover:border-purple-200"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold shadow-lg">
                    {appointment.avatar}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">
                    {appointment.patient}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-sm text-slate-500">
                      <Clock className="h-4 w-4" />
                      {appointment.time}
                    </span>
                    <span className="text-sm text-slate-400">•</span>
                    <span className="text-sm text-slate-500">
                      {appointment.duration}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {appointment.type}
                  </span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <Video className="h-4 w-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <MessageSquare className="h-4 w-4 text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Activity className="h-6 w-6 text-blue-500" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex gap-3">
                  <div className={`flex-shrink-0 ${activity.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-slate-500">{activity.patient}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900">My Patients</h3>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300">
            Add Patient
          </button>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <button className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
            <Filter className="h-5 w-5 text-slate-600" />
          </button>
        </div>
      </div>
      <div className="divide-y divide-slate-100">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="group p-6 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {patient.avatar}
                </div>
                {patient.priority === "urgent" && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-slate-900">{patient.name}</p>
                  <span className="text-sm text-slate-500">
                    • {patient.age}y
                  </span>
                </div>
                <p className="text-sm text-slate-600">{patient.condition}</p>
                <p className="text-xs text-slate-400 mt-1">
                  Last visit: {patient.lastVisit}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    patient.status === "stable"
                      ? "bg-green-100 text-green-700"
                      : patient.status === "monitoring"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {patient.status}
                </span>
                <button className="p-2 hover:bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                  <MoreVertical className="h-5 w-5 text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">About Me</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            {doctorInfo.bio}
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-slate-500 mb-1">Education</p>
              <p className="font-semibold text-slate-900">
                {doctorInfo.education}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Experience</p>
              <p className="font-semibold text-slate-900">
                {doctorInfo.experience}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Specialty</p>
              <p className="font-semibold text-slate-900">
                {doctorInfo.specialty}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Patients Treated</p>
              <p className="font-semibold text-slate-900">
                {doctorInfo.patientsTreated}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            Achievements
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Award, label: "Board Certified", value: "Cardiology" },
              { icon: Star, label: "Patient Rating", value: "4.9/5.0" },
              { icon: Users, label: "Total Patients", value: "5,000+" },
              { icon: Heart, label: "Success Rate", value: "98.5%" },
            ].map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200"
                >
                  <Icon className="h-8 w-8 text-blue-500 mb-3" />
                  <p className="text-sm text-slate-600 mb-1">
                    {achievement.label}
                  </p>
                  <p className="font-bold text-slate-900">
                    {achievement.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Contact Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
              <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
              <span className="text-sm text-slate-700">{doctorInfo.email}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
              <Phone className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm text-slate-700">{doctorInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
              <MapPin className="h-5 w-5 text-red-500 flex-shrink-0" />
              <span className="text-sm text-slate-700">
                {doctorInfo.address}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
          <h3 className="text-xl font-bold mb-2">Need Help?</h3>
          <p className="text-blue-100 text-sm mb-4">
            Contact support for any assistance or questions.
          </p>
          <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-lg bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <Stethoscope className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  {doctorInfo.name}
                </h1>
                <p className="text-sm text-slate-600">{doctorInfo.specialty}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-3 hover:bg-slate-100 rounded-xl transition-colors">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-3 hover:bg-slate-100 rounded-xl transition-colors">
                <Settings className="h-5 w-5 text-slate-600" />
              </button>
              <button className="p-3 hover:bg-slate-100 rounded-xl transition-colors">
                <LogOut className="h-5 w-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "patients", label: "Patients", icon: Users },
              { id: "profile", label: "Profile", icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-4 font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "text-blue-600"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </span>
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "overview" && renderOverview()}
        {activeTab === "patients" && renderPatients()}
        {activeTab === "profile" && renderProfile()}
      </main>
    </div>
  );
}

export default DoctorPage;
