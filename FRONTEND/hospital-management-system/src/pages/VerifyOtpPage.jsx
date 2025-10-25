import React, { useState } from "react";
import api from "../api";

function VerifyOtpPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post(
        process.env.REACT_APP_VERIFY_OTP_ENDPOINT,
        {
          email,
          otp,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      setSuccess("OTP verified! You are logged in.");
      // redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-sky-500 text-white py-2 rounded-lg w-full"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
}

export default VerifyOtpPage;
