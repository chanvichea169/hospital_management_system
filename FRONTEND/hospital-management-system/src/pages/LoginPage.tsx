import React, { useState } from "react";
import {
  IconEye,
  IconEyeOff,
  IconMail,
  IconLock,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react";
import api from "../api/api";

interface FormState {
  email: string;
  password: string;
}

interface AlertState {
  message: string;
  type: "error" | "success" | null;
}

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState<AlertState>({ message: "", type: null });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const updateFormField = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert({ message: "", type: null });
    setIsLoading(true);

    try {
      const response = await api.post(
        process.env.REACT_APP_LOGIN_ENDPOINT || "/users/login",
        formState
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setAlert({
          message: "Login successful! Redirecting...",
          type: "success",
        });
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        const msg = response.data.message || "Login successful!";
        setAlert({ message: msg, type: "success" });
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data ||
        "Login failed. Please try again.";
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
          <p className="text-white/80 text-sm mt-2">Sign in to your account</p>
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
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Email
            </label>
            <div className="relative group">
              <IconMail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="email"
                value={formState.email}
                onChange={(e) => updateFormField("email", e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200 backdrop-blur-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Password
            </label>
            <div className="relative group">
              <IconLock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                value={formState.password}
                onChange={(e) => updateFormField("password", e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full pl-12 pr-12 py-3.5 bg-transparent text-white placeholder-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200 backdrop-blur-sm"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <IconEyeOff className="h-5 w-5" />
                ) : (
                  <IconEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3.5 rounded-xl font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/25"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/70 text-sm">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Create account
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
