import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, Mail } from 'lucide-react';
import Button from '../../components/ui/Button';

interface OtpVerificationFormProps {
    email: string;
    onVerify: (otp: string) => void;
    onBack: () => void;
}

const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({ email, onVerify, onBack }) => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [timer, setTimer] = useState(59);
    const [isVerifying, setIsVerifying] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Countdown timer
    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(countdown);
    }, []);

    // Auto-focus first input
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Move to next input
        if (element.value !== '' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit if all filled
        if (newOtp.every((val) => val !== '')) {
            setIsVerifying(true);
            setTimeout(() => {
                onVerify(newOtp.join(''));
                setIsVerifying(false);
            }, 400);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
        if (pastedData.length === 6 && /^\d+$/.test(pastedData)) {
            const newOtp = pastedData.split('');
            setOtp(newOtp);
            inputRefs.current[5]?.focus();
            setTimeout(() => onVerify(pastedData), 400);
        }
    };

    const handleResendCode = () => {
        if (timer > 0) return;
        setTimer(59);
        setOtp(new Array(6).fill(''));
        inputRefs.current[0]?.focus();
        // TODO: Call resend API
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
                    Verify your Email
                </h1>
                <p className="text-slate-500 font-medium">Two-step verification</p>
            </div>

            {/* Info Box */}
            <div className="mb-8">
                <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex items-start space-x-4">
                    <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600 shrink-0">
                        <Mail size={20} />
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                            Verification Code
                        </p>
                        <p className="text-sm text-blue-700/80 leading-relaxed">
                            We've sent a 6-digit code to{' '}
                            <span className="font-bold text-blue-900">{email}</span>.
                        </p>
                        <button
                            onClick={onBack}
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 underline underline-offset-2"
                        >
                            Change email
                        </button>
                    </div>
                </div>
            </div>

            {/* OTP Input Grid */}
            <div className="grid grid-cols-6 gap-2.5 mb-8" onPaste={handlePaste}>
                {otp.map((data, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        ref={(el) => { inputRefs.current[index] = el; }}
                        value={data}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-full aspect-square text-2xl font-black text-center text-blue-900 bg-white border-2 border-slate-100 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm placeholder:text-slate-200"
                        placeholder="-"
                    />
                ))}
            </div>

            {/* Timer + Resend */}
            <div className="flex flex-col items-center space-y-4">
                <div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors ${
                        timer > 0
                            ? 'bg-slate-50 border-slate-200 text-slate-600'
                            : 'bg-red-50 border-red-100 text-red-600'
                    }`}
                >
                    <Clock size={14} className={timer > 0 ? 'animate-pulse' : ''} />
                    <span className="text-xs font-black tabular-nums tracking-widest">
                        00:{timer < 10 ? `0${timer}` : timer}
                    </span>
                </div>

                <p className="text-sm text-slate-500 font-medium">
                    Didn't receive code?{' '}
                    <button
                        onClick={handleResendCode}
                        disabled={timer > 0}
                        className={`font-bold transition-colors ${
                            timer > 0
                                ? 'text-slate-300 cursor-not-allowed'
                                : 'text-blue-600 hover:text-blue-800'
                        }`}
                    >
                        Resend Code
                    </button>
                </p>
            </div>

            {/* Verify Button */}
            <div className="mt-8">
                <Button
                    onClick={() => onVerify(otp.join(''))}
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isVerifying}
                    disabled={otp.some((val) => val === '')}
                >
                    Verify Account
                </Button>
            </div>
        </div>
    );
};

export default OtpVerificationForm;