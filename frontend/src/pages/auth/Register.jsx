import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  ShieldCheck, 
  Loader2, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const isMatch = form.confirm.length > 0 && form.password === form.confirm;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      return toast.error('Passwords do not match');
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9EDCC] flex flex-col items-center justify-center p-2 md:p-6">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#61210F] text-[#F9EDCC] rounded-2xl shadow-lg mb-4 transform rotate-2">
            <UserPlus size={28} />
          </div>
          <h1 className="text-3xl font-black text-[#61210F] tracking-tighter uppercase">Join System</h1>
          <p className="text-[#61210F]/60 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
            Create your administrative identity
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-[#61210F]/10 rounded-2xl p-4 md:p-8 shadow-2xl shadow-[#61210F]/5">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#61210F]/40 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#61210F]/30" size={17} />
                <input
                  name="name"
                  type="text"
                  required
                  autoFocus
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-[#61210F]/[0.02] border border-[#61210F]/10 rounded-2xl text-[#61210F] text-sm font-medium placeholder:text-[#61210F]/20 focus:outline-none focus:ring-2 focus:ring-[#EDAE49] transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#61210F]/40 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#61210F]/30" size={17} />
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  className="w-full pl-11 pr-4 py-3 bg-[#61210F]/[0.02] border border-[#61210F]/10 rounded-2xl text-[#61210F] text-sm font-medium placeholder:text-[#61210F]/20 focus:outline-none focus:ring-2 focus:ring-[#EDAE49] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#61210F]/40 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#61210F]/30" size={17} />
                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-[#61210F]/[0.02] border border-[#61210F]/10 rounded-2xl text-[#61210F] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#EDAE49] transition-all"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-[#61210F]/40 uppercase tracking-widest">Confirm Password</label>
                {form.confirm && (
                  <span className={`text-[9px] font-bold uppercase tracking-tighter flex items-center gap-1 ${isMatch ? 'text-green-600' : 'text-[#EA2B1F]'}`}>
                    {isMatch ? <><CheckCircle2 size={10} /> Match</> : <><XCircle size={10} /> No Match</>}
                  </span>
                )}
              </div>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-[#61210F]/30" size={17} />
                <input
                  name="confirm"
                  type="password"
                  required
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-4 py-3 bg-[#61210F]/[0.02] border border-[#61210F]/10 rounded-2xl text-[#61210F] text-sm font-medium focus:outline-none focus:ring-2 transition-all ${form.confirm && !isMatch ? 'ring-1 ring-[#EA2B1F]/30' : 'focus:ring-[#EDAE49]'}`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 mt-4 bg-[#61210F] text-[#F9EDCC] rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-[#61210F]/20 hover:opacity-95 active:scale-[0.98] disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                'Initialize Account'
              )}
            </button>
          </form>

          <div className="mt-4 pt-6 border-t border-[#61210F]/5 text-center">
            <p className="text-sm text-[#61210F]/60 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-[#EDAE49] font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
        
        <p className="mt-8 text-center text-[10px] font-bold text-[#61210F]/30 uppercase tracking-[0.15em]">
          Standard User Permissions Apply &bull; Role elevation requires admin approval
        </p>
      </div>
    </div>
  );
};

export default Register;