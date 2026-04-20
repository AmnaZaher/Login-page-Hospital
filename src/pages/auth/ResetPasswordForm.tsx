import React, { useState } from 'react';
import { resetPassword } from '../../api/auth';
import { ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface ResetPasswordFormProps {
    email: string;
    otp: string;
    onContinue: () => void;
    onBack: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ email, otp, onContinue, onBack }) => {
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
            {/* Back Button */}
            <button
                onClick={onBack}
                className="group flex items-center text-slate-400 hover:text-slate-900 mb-8 transition-colors text-sm font-bold"
            >
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back
            </button>

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
                    Create New Password
                </h1>
                <p className="text-slate-500 font-medium">Security authentication</p>
            </div>

            {/* Info Box */}
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

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                        {error}
                    </div>
                )}

                {/* New Password */}
                <Input
                    label="New Password"
                    icon={<Lock size={18} />}
                    isPassword
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                />

                {/* Confirm Password */}
                <Input
                    label="Confirm Password"
                    icon={<Lock size={18} />}
                    isPassword
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    error={
                        confirmPassword && newPassword !== confirmPassword
                            ? 'Passwords do not match'
                            : undefined
                    }
                />

                {/* Submit Button */}
                <div className="pt-2">
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        isLoading={isLoading}
                    >
                        Update Password
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordForm;