import React, { useState } from 'react';
import { login } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import { User, Lock } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface LoginFormProps {
    onForgotPassword: () => void;
    onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const auth = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const res = await login(username, password);
            if (res.isSuccess && res.data) {
                auth.login(res.data.accessToken, res.data.refreshToken || '');
                onLoginSuccess();
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
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
                    Login
                </h1>
                <p className="text-slate-500 font-medium">
                    Enter your account details to continue
                </p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                        {error}
                    </div>
                )}

                {/* Username */}
                <Input
                    label="Username"
                    icon={<User size={18} />}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. jdoe_admin"
                    required
                />

                {/* Password */}
                <Input
                    label="Password"
                    icon={<Lock size={18} />}
                    isPassword
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                />

                {/* Remember Me + Forgot Password */}
                <div className="flex items-center justify-between py-1">
                    <label className="flex items-center space-x-2.5 cursor-pointer group">
                        <div className="relative flex items-center">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="w-5 h-5 border-2 border-slate-200 rounded group-hover:border-blue-400 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all"></div>
                            <svg
                                className="absolute w-3 h-3 text-white ml-1 opacity-0 peer-checked:opacity-100 transition-opacity"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="4"
                            >
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="text-sm font-semibold text-slate-500 group-hover:text-slate-700 transition-colors">
                            Remember me
                        </span>
                    </label>

                    <button
                        type="button"
                        onClick={onForgotPassword}
                        className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 transition-all"
                    >
                        Forgot password?
                    </button>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isLoading}
                >
                    Login
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;