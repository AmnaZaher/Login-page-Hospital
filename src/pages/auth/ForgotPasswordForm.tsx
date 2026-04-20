import React, { useState } from 'react';
import { forgetPassword } from '../../api/auth';
import { ArrowLeft, Mail, Info } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface ForgotPasswordFormProps {
    onContinue: (email: string) => void;
    onBack: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onContinue, onBack }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setError(null);
        setIsLoading(true);

        try {
            const res = await forgetPassword(email);
            if (res.isSuccess) {
                onContinue(email);
            } else {
                setError(res.message || 'Failed to send reset code');
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
                Back to Login
            </button>

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
                    Forgot Password
                </h1>
                <p className="text-slate-500 font-medium">Reset your secure access</p>
            </div>

            {/* Info Box */}
            <div className="mb-8">
                <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex items-start space-x-4">
                    <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600 shrink-0">
                        <Info size={20} />
                    </div>
                    <p className="text-xs text-blue-800 font-medium leading-relaxed">
                        Enter the email address associated with your account and we'll send you a 6-digit verification code.
                    </p>
                </div>
            </div>

            {/* Form */}
            <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                        {error}
                    </div>
                )}

                {/* Email Input */}
                <Input
                    label="Professional Email"
                    icon={<Mail size={18} />}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. name@company.com"
                    required
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isLoading}
                >
                    Send Verification Code
                </Button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-slate-500 font-medium pt-8">
                Remembered your password?{' '}
                <button onClick={onBack} className="text-blue-600 font-bold hover:underline">
                    Login
                </button>
            </p>
        </div>
    );
};

export default ForgotPasswordForm;