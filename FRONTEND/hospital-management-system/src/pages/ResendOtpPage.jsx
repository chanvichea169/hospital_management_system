import React, { useState } from "react";
import api from "../api";

function ResendOtpPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResend = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await api.post(process.env.REACT_APP_RESEND_OTP_ENDPOINT, { email });
      setMessage("OTP resent successfully. Check your email.");
    } catch (err) {
      setError(err.response?.data || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleResend}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-sky-500 text-white py-2 rounded-lg w-full"
        >
          Resend OTP
        </button>
      </form>
    </div>
  );
}

export default ResendOtpPage;
