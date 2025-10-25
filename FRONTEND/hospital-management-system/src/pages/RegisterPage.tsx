import React, { useState } from "react";
import api from "../api/api";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("DOCTOR");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post(
        process.env.REACT_APP_REGISTER_ENDPOINT || "/users/register",
        {
          username,
          email,
          password,
          role,
        }
      );

      setSuccess("Registered successfully. Please check OTP email.");
    } catch (err) {
      // Normalize unknown error type into a string message
      if (typeof err === "object" && err !== null && "response" in err) {
        const anyErr: any = err;
        setError(anyErr.response?.data || "Registration failed");
      } else if (err instanceof Error) {
        setError(err.message || "Registration failed");
      } else {
        setError(String(err) || "Registration failed");
      }
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
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="DOCTOR">Doctor</option>
          <option value="NURSE">Nurse</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button
          type="submit"
          className="bg-sky-500 text-white py-2 rounded-lg w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
