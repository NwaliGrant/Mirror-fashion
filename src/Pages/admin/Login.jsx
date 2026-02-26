import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import MirrorLogo from "../../components/MirrorLogo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@mirror.com" && password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin/products");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <div className="text-center mb-8">
          <MirrorLogo className="text-2xl font-bold text-black inline-block" />
          <p className="font-body text-sm text-gray-500 mt-2">Admin Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="font-body text-xs uppercase text-gray-600 mb-2 block">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-[#C8A96A] focus:outline-none"
                placeholder="admin@mirror.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-body text-xs uppercase text-gray-600 mb-2 block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-[#C8A96A] focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#111111] text-white py-3 rounded-lg font-body text-sm uppercase tracking-wider hover:bg-[#C8A96A] transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
