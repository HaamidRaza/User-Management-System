import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Mail, Lock, LogIn, Loader2, ShieldCheck, Info } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const allowedRedirects = ["/dashboard", "/profile", "/users"];
  const from = allowedRedirects.includes(location.state?.from?.pathname)
    ? location.state.from.pathname
    : "/dashboard";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9EDCC] flex flex-col items-center justify-center p-2 md:p-6">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#61210F] text-[#F9EDCC] rounded-2xl shadow-lg mb-4 transform -rotate-2">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-3xl font-black text-[#61210F] tracking-tighter">
            USER-MS
          </h1>
          <p className="text-[#61210F]/60 text-sm font-bold uppercase tracking-widest mt-1">
            Management Portal
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-[#61210F]/10 rounded-2xl p-4 md:p-8 shadow-2xl shadow-[#61210F]/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-[#61210F]/40 uppercase tracking-[0.2em] ml-1">
                Identity Email
              </label>
              <div className="relative mt-2">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#61210F]/30"
                  size={18}
                />
                <input
                  name="email"
                  type="email"
                  required
                  autoFocus
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-[#61210F]/2 border border-[#61210F]/10 rounded-2xl text-[#61210F] font-medium placeholder:text-[#61210F]/20 focus:outline-none focus:ring-2 focus:ring-[#EDAE49] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-[#61210F]/40 uppercase tracking-[0.2em]">
                  Security Key
                </label>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#61210F]/30"
                  size={18}
                />
                <input
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-[#61210F]/2 border border-[#61210F]/10 rounded-2xl text-[#61210F] font-medium placeholder:text-[#61210F]/20 focus:outline-none focus:ring-2 focus:ring-[#EDAE49] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 mt-4 bg-[#61210F] text-[#F9EDCC] rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-[#61210F]/20 hover:opacity-95 active:scale-[0.98] disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <LogIn size={18} />
                  Authorize Session
                </>
              )}
            </button>
          </form>

          <div className="mt-2 pt-6 border-t border-[#61210F]/5 text-center">
            <p className="text-sm text-[#61210F]/60 font-medium">
              New to the platform?{" "}
              <Link
                to="/register"
                className="text-[#EDAE49] font-bold hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Subtle Demo Credentials */}
        <div className="mt-8 bg-[#61210F]/5 border border-[#61210F]/5 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3 text-[#61210F]/60">
            <Info size={14} />
            <span className="text-[10px] font-black uppercase tracking-wider">
              Sandbox Credentials
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <CredentialItem
              role="Admin"
              email="admin@example.com"
              pass="Admin@123"
            />
            <CredentialItem
              role="Manager"
              email="manager@example.com"
              pass="Manager@123"
            />
            <CredentialItem
              role="User"
              email="user@example.com"
              pass="User@123"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CredentialItem = ({ role, email, pass }) => (
  <div className="flex flex-wrap items-center justify-between text-[11px] bg-white/50 px-3 py-2 rounded-lg border border-[#61210F]/5">
    <span className="font-bold text-[#61210F]/80 w-16">{role}:</span>
    <span className="text-[#61210F]/60 font-mono">{email}</span>
    <span className="text-[#61210F]/30 mx-2">/</span>
    <span className="text-[#61210F]/60 font-mono">{pass}</span>
  </div>
);

export default Login;
