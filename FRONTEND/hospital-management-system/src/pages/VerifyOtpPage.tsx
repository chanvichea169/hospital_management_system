import React, { useState, useEffect } from "react";
import {
  IconMail,
  IconKey,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

interface AlertState {
  message: string;
  type: "error" | "success" | null;
}

function VerifyOtpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [alert, setAlert] = useState<AlertState>({ message: "", type: null });
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    if (emailParam) setEmail(decodeURIComponent(emailParam));
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setAlert({ message: "Please enter OTP.", type: "error" });
      return;
    }

    setIsLoading(true);
    setAlert({ message: "", type: null });

    try {
      // JSON payload for verify OTP
      const payload = {
        email,
        otp: parseInt(otp),
      };

      const response = await api.post(
        process.env.REACT_APP_VERIFY_OTP_ENDPOINT || "/users/verify-otp",
        payload
      );

      if (response.status === 200) {
        setAlert({ message: "OTP verified successfully!", type: "success" });
        setTimeout(() => {
          navigate("/dashboard"); // Redirect to dashboard after success
        }, 1000);
      } else {
        setAlert({ message: "Invalid OTP. Please try again.", type: "error" });
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "OTP verification failed. Please try again.";
      setAlert({ message: errorMessage, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) return;
    setIsResending(true);
    setAlert({ message: "", type: null });

    try {
      await api.post(
        process.env.REACT_APP_RESEND_OTP_ENDPOINT || "/users/resend-otp",
        { email }
      );
      setAlert({
        message: "OTP resent successfully. Check your email.",
        type: "success",
      });
      setTimer(60);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to resend OTP.";
      setAlert({ message: errorMessage, type: "error" });
    } finally {
      setIsResending(false);
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
            Verify Your Email
          </h1>
          <p className="text-white/80 text-sm mt-2 text-center">
            We've sent a verification code to your email
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

        <form className="space-y-6" onSubmit={handleVerify}>
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Email Address
            </label>
            <div className="relative group">
              <IconMail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <input
                type="email"
                value={email}
                readOnly
                className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white/70 placeholder-white/50 border border-white/30 rounded-xl cursor-not-allowed backdrop-blur-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Verification Code
            </label>
            <div className="relative group">
              <IconKey className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                required
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200 backdrop-blur-sm tracking-widest text-center text-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3.5 rounded-xl font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-cyan-500/25"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/70 text-sm mb-2">Didn't receive the code?</p>
          <button
            onClick={handleResendOtp}
            disabled={isResending || timer > 0}
            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {timer > 0
              ? `Resend in ${timer}s`
              : isResending
              ? "Resending..."
              : "Resend Code"}
          </button>
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

export default VerifyOtpPage;
