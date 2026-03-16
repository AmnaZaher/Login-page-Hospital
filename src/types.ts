
export const AuthStep = {
  LOGIN: 'LOGIN',
  REGISTER_PATIENT: 'REGISTER_PATIENT',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  VERIFY_OTP: 'VERIFY_OTP',
  RESET_PASSWORD: 'RESET_PASSWORD',
  SUCCESS: 'SUCCESS',
  DASHBOARD: 'DASHBOARD'
} as const;

export type AuthStep = typeof AuthStep[keyof typeof AuthStep];

export interface AuthState {
  step: AuthStep;
  email: string;
  otp?: string;
}
