// Email validation
export const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Phone validation
export const isValidPhone = (phone: string): boolean => {
    const regex = /^\+?[\d\s\-()]{10,}$/;
    return regex.test(phone);
};

// National ID validation
export const isValidNationalId = (id: string): boolean => {
    return id.length >= 5;
};

// Required field
export const isRequired = (value: string): boolean => {
    return value.trim().length > 0;
};

// Min length
export const hasMinLength = (value: string, min: number): boolean => {
    return value.length >= min;
};

// Password strength
export const isStrongPassword = (password: string): boolean => {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
};

// File size validation (in MB)
export const isValidFileSize = (file: File, maxSizeMB: number): boolean => {
    return file.size <= maxSizeMB * 1024 * 1024;
};

// File type validation
export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
    return allowedTypes.includes(file.type);
};