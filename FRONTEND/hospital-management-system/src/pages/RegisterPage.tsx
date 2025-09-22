import React, { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [selectedRole, setSelectedRole] = useState("patient");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/30 p-8 rounded-3xl shadow-2xl w-full max-w-lg z-10 animate-fade-in-up">
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
          <span className="flex-shrink mx-4 text-white/80">Register</span>
          <div className="flex-grow border-t border-white/30"></div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-white/80 mb-2">
            Register as
          </label>
          <div className="flex justify-between space-x-2">
            {["Patient", "Doctor", "Nurse", "Admin"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role.toLowerCase())}
                className={`w-full py-2 rounded-lg text-sm font-semibold transition ${
                  selectedRole === role.toLowerCase()
                    ? "bg-sky-500 text-white shadow-lg"
                    : "bg-white/20 text-white/80 hover:bg-white/30"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg shadow-inner focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition"
            />
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
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                name="confirm-password"
                required
                className="w-full px-4 py-3 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg shadow-inner focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition pr-10"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <IconEyeOff className="h-5 w-5 text-white/70 hover:text-white transition" />
                ) : (
                  <IconEye className="h-5 w-5 text-white/70 hover:text-white transition" />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
              />
              <div className="w-11 h-6 bg-white/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
            </label>
            <span className="text-sm font-medium text-white/80">
              I agree to the{" "}
              <a href="#" className="text-sky-300 hover:text-sky-200">
                Terms and Conditions
              </a>
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 shadow-md transition transform hover:scale-105"
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-white/80">Already have an account? </span>
          <a
            href="/login"
            className="text-sky-300 font-semibold hover:text-sky-200 transition"
          >
            Login here
          </a>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
