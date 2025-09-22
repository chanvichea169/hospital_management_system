import React, { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('bg.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/30 p-8 rounded-3xl shadow-2xl w-full max-w-md z-10 animate-fade-in-up">
        <div className="flex flex-col items-center mb-6">
          <div className="mb-4">
            <img
              src="logo.png"
              alt="Preah Ang Duong Hospital Logo"
              className="h-24 w-24 object-contain drop-shadow-lg"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-cyan-500 text-center drop-shadow-lg">
            Preah Ang Duong Hospital
          </h1>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-white/30"></div>
          <span className="flex-shrink mx-4 text-white/80">Login</span>
          <div className="flex-grow border-t border-white/30"></div>
        </div>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full px-4 py-3 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg shadow-inner focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                className="w-full px-4 py-3 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg shadow-inner focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition pr-10"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <IconEyeOff className="h-5 w-5 text-white/70 hover:text-white transition" />
                ) : (
                  <IconEye className="h-5 w-5 text-white/70 hover:text-white transition" />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 shadow-md transition transform hover:scale-105"
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-white/80">Don't have an account? </span>
          <a
            href="/register"
            className="text-sky-300 font-semibold hover:text-sky-200 transition"
          >
            Register here
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
