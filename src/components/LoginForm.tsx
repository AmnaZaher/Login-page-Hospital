
import React, { useState } from 'react';
import { login } from '../api/auth';
import { Loader2, Eye, EyeOff, User, Lock } from 'lucide-react';

interface LoginFormProps {
  onForgotPassword: () => void;
  // Let App handle the routing after successful login. Instead of navigating we might just reload or change global state, but for now we can just alert or pass a callback.
}

const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await login(username, password);
      if (res.isSuccess && res.data) {
        // Store token
        localStorage.setItem('accessToken', res.data.accessToken);
        if (res.data.refreshToken) {
          localStorage.setItem('refreshToken', res.data.refreshToken);
        }
        // Instead of redirecting for now, we'll just show an alert or let it be. App doesn't have a main dashboard yet in types.
        // Assuming there isn't an onLoginSuccess, we'll just alert success.
        alert('Login successful!');
        window.location.reload(); // Quick hack for a generic app
      } else {
        setError(res.message || 'Invalid credentials');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Login</h1>
        <p className="text-slate-500 font-medium">
          Enter your your account details to continue
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-slate-700 ml-1">
            Username
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <User size={18} />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-900"
              placeholder="e.g. jdoe_admin"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-slate-700 ml-1">
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Lock size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-11 pr-12 py-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-900"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between py-1">
          <label className="flex items-center space-x-2.5 cursor-pointer group">
            <div className="relative flex items-center">
              <input type="checkbox" className="peer sr-only" />
              <div className="w-5 h-5 border-2 border-slate-200 rounded group-hover:border-blue-400 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all"></div>
              <svg className="absolute w-3 h-3 text-white ml-1 opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-500 group-hover:text-slate-700 transition-colors">Remember me</span>
          </label>
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 transition-all"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center bg-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_8px_30px_rgb(37,99,235,0.2)] hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Login"}
        </button>


      </form>
    </div>
  );
};

export default LoginForm;
