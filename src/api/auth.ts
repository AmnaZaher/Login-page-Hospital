import { fetchApi } from './config';

export const login = async (username: string, password: string) => {
    return await fetchApi('/Account/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });
};

export const forgetPassword = async (email: string) => {
    return await fetchApi('/Account/forget-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
    });
};

export const resetPassword = async (
    email: string,
    otp: string,
    newPassword: string,
    confirmPassword: string
) => {
    return await fetchApi('/Account/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email, otp, newPassword, confirmPassword }),
    });
};
