import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Button from '../../components/ui/Button';

interface SuccessScreenProps {
    onBackToLogin: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ onBackToLogin }) => {
    return (
        <div className="animate-in fade-in zoom-in duration-500 text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={48} />
                </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
                Password Changed!
            </h1>

            {/* Description */}
            <p className="text-slate-500 font-medium mb-10 max-w-xs mx-auto">
                Your password has been successfully reset. You can now use your new password to log in to your account.
            </p>

            {/* Back to Login Button */}
            <Button
                onClick={onBackToLogin}
                variant="primary"
                size="lg"
                fullWidth
            >
                Back to Login
            </Button>
        </div>
    );
};

export default SuccessScreen;