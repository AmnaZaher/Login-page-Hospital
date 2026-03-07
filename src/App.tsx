
import React, { useState } from 'react';
import { AuthStep } from './types';
import type { AuthState } from './types';
import AuthLayout from './components/AuthLayout';
import LoginForm from './components/LoginForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import OtpVerificationForm from './components/OtpVerificationForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import SuccessScreen from './components/SuccessScreen';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    step: AuthStep.LOGIN,
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigateTo = (step: AuthStep, email: string = authState.email, otp?: string) => {
    setIsLoading(true);
    // Simulate API latency for a professional feel during transitions not involving actual fetch
    setTimeout(() => {
      setAuthState({ step, email, otp: otp || authState.otp });
      setIsLoading(false);
    }, 600);
  };

  const renderForm = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] animate-in fade-in duration-300">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Processing request...</p>
        </div>
      );
    }

    switch (authState.step) {
      case AuthStep.LOGIN:
        return <LoginForm onForgotPassword={() => navigateTo(AuthStep.FORGOT_PASSWORD)} />;
      case AuthStep.FORGOT_PASSWORD:
        return (
          <ForgotPasswordForm
            onContinue={(email) => navigateTo(AuthStep.VERIFY_OTP, email)}
            onBack={() => navigateTo(AuthStep.LOGIN)}
          />
        );
      case AuthStep.VERIFY_OTP:
        return (
          <OtpVerificationForm
            email={authState.email}
            onVerify={(otp) => navigateTo(AuthStep.RESET_PASSWORD, authState.email, otp)}
            onBack={() => navigateTo(AuthStep.FORGOT_PASSWORD)}
          />
        );
      case AuthStep.RESET_PASSWORD:
        return (
          <ResetPasswordForm
            email={authState.email}
            otp={authState.otp || ''}
            onContinue={() => navigateTo(AuthStep.SUCCESS)}
            onBack={() => navigateTo(AuthStep.VERIFY_OTP)}
          />
        );
      case AuthStep.SUCCESS:
        return <SuccessScreen onBackToLogin={() => navigateTo(AuthStep.LOGIN)} />;
      default:
        return <LoginForm onForgotPassword={() => navigateTo(AuthStep.FORGOT_PASSWORD)} />;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8 bg-slate-50">
      <AuthLayout>
        {renderForm()}
      </AuthLayout>
    </div>
  );
};

export default App;