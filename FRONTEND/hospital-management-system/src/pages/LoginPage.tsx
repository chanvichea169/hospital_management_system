import React, { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import api from "../api/api";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");

    try {
      const response = await api.post(
        process.env.REACT_APP_LOGIN_ENDPOINT || "/users/login",
        { email, password }
      );

      // Backend might return a message like "OTP sent" if user not verified
      if (response.data.token) {
        // Login successful
        localStorage.setItem("token", response.data.token);
        setInfo("Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else if (response.data.message) {
        // OTP required
        setInfo(response.data.message);
      }
    } catch (err: any) {
      // Catch backend errors
      if (err.response?.data) {
        setError(err.response.data);
      } else {
        setError("Login failed. Please try again.");
      }
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

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/30 p-8 rounded-3xl shadow-2xl w-full max-w-md z-10 animate-fade-in-up">
        <div className="flex flex-col items-center mb-6">
          <img src="logo.png" alt="Logo" className="h-24 w-24 mb-4" />
          <h1 className="text-2xl font-extrabold text-cyan-500 text-center">
            Preah Ang Duong Hospital
          </h1>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {info && <p className="text-green-400 text-center mb-4">{info}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg pr-10"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <IconEyeOff className="h-5 w-5 text-white/70" />
                ) : (
                  <IconEye className="h-5 w-5 text-white/70" />
                )}
              </div>
            </div>
          </div>

          <button className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
