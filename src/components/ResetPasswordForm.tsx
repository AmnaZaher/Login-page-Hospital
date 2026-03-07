
import React, { useState } from 'react';
import { resetPassword } from '../api/auth';
import { Loader2, Eye, EyeOff, ArrowLeft, ShieldCheck } from 'lucide-react';

interface ResetPasswordFormProps {
  email: string;
  otp: string;
  onContinue: () => void;
  onBack: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ email, otp, onContinue, onBack }) => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const res = await resetPassword(email, otp, newPassword, confirmPassword);
      if (res.isSuccess) {
        onContinue();
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <button
        onClick={onBack}
        className="group flex items-center text-slate-400 hover:text-slate-900 mb-8 transition-colors text-sm font-bold"
      >
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Create New Password</h1>
        <p className="text-slate-500 font-medium">Security authentication</p>
      </div>

      <div className="mb-8">
        <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl flex items-center space-x-4">
          <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600 shrink-0">
            <ShieldCheck size={22} />
          </div>
          <p className="text-xs text-emerald-800 font-medium leading-relaxed">
            Please create a strong password containing at least 8 characters, one number, and one symbol.
          </p>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-slate-700 ml-1">New Password</label>
          <div className="relative group">
            <input
              type={showPass ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-bold tracking-[0.2em] text-blue-900"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-slate-700 ml-1">Confirm Password</label>
          <div className="relative group">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-bold tracking-[0.2em] text-blue-900"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
