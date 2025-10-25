import React, { useState } from "react";
import {
  IconEye,
  IconEyeOff,
  IconMail,
  IconLock,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react";
import { SegmentedControl } from "@mantine/core";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

type Role = "DOCTOR" | "NURSE" | "ADMIN" | "PATIENT";

interface FormState {
  username: string;
  email: string;
  password: string;
  retypePassword: string;
  role: Role;
}

interface AlertState {
  message: string;
  type: "error" | "success" | null;
}

function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    username: "",
    email: "",
    password: "",
    retypePassword: "",
    role: "DOCTOR",
  });
  const [alert, setAlert] = useState<AlertState>({ message: "", type: null });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const updateFormField = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert({ message: "", type: null });

    if (formState.password !== formState.retypePassword) {
      setAlert({ message: "Passwords do not match", type: "error" });
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post(
        process.env.REACT_APP_REGISTER_ENDPOINT || "/users/register",
        formState
      );

      if (response.data.email) {
        setAlert({ message: "Registration successful!", type: "success" });
        setTimeout(() => {
          navigate(`/verify-otp?email=${encodeURIComponent(formState.email)}`);
        }, 1000);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setAlert({ message: errorMessage, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative bg-transparent backdrop-blur-xl border border-white/30 p-8 rounded-2xl shadow-2xl w-full max-w-md z-10 hover:border-white/40 transition-all duration-300">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-lg opacity-50"></div>
            <img
              src="logo.png"
              alt="Logo"
              className="relative h-20 w-20 rounded-full"
            />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-center">
            Preah Ang Duong Hospital
          </h1>
          <p className="text-white/80 text-sm mt-2 text-center">
            Create your account
          </p>
        </div>

        {alert.type && (
          <div
            className={`flex items-center gap-3 p-4 rounded-lg mb-6 animate-fade-in backdrop-blur-sm ${
              alert.type === "error"
                ? "bg-red-500/20 border border-red-500/30 text-red-300"
                : "bg-green-500/20 border border-green-500/30 text-green-300"
            }`}
          >
            {alert.type === "error" ? (
              <IconAlertCircle className="h-5 w-5 flex-shrink-0" />
            ) : (
              <IconCheck className="h-5 w-5 flex-shrink-0" />
            )}
            <p className="text-sm">{alert.message}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <SegmentedControl
            value={formState.role}
            onChange={(value) => updateFormField("role", value)}
            fullWidth
            data={[
              { label: "Doctor", value: "DOCTOR" },
              { label: "Nurse", value: "NURSE" },
              { label: "Admin", value: "ADMIN" },
              { label: "Patient", value: "PATIENT" },
            ]}
            styles={{
              root: {
                backgroundColor: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "0.75rem",
                padding: "0.25rem",
                backdropFilter: "blur(4px)",
              },
              control: {
                backgroundColor: "transparent !important",
                border: "none",
              },
              label: {
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "0.875rem",
              },
              indicator: {
                background:
                  "linear-gradient(to right, rgb(6, 182, 212), rgb(168, 85, 247))",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(6, 182, 212, 0.3)",
              },
            }}
          />

          {/* Username input */}
          <div className="relative">
            <IconMail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
            <input
              type="text"
              placeholder="Username"
              value={formState.username}
              onChange={(e) => updateFormField("username", e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 backdrop-blur-sm"
            />
          </div>

          {/* Email input */}
          <div className="relative">
            <IconMail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
            <input
              type="email"
              placeholder="Email"
              value={formState.email}
              onChange={(e) => updateFormField("email", e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 backdrop-blur-sm"
            />
          </div>

          {/* Password input */}
          <div className="relative">
            <IconLock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formState.password}
              onChange={(e) => updateFormField("password", e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 bg-transparent text-white placeholder-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 backdrop-blur-sm"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
            >
              {showPassword ? (
                <IconEyeOff className="h-5 w-5" />
              ) : (
                <IconEye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Confirm Password input */}
          <div className="relative">
            <IconLock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={formState.retypePassword}
              onChange={(e) =>
                updateFormField("retypePassword", e.target.value)
              }
              className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 backdrop-blur-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3.5 rounded-xl font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-white/70 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-cyan-400 hover:text-cyan-300 font-medium"
          >
            Sign in
          </a>
        </p>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}

export default RegisterPage;
