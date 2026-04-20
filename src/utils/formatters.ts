// Format date to "Jan 12, 2024"
export const formatDate = (date: string | Date): string => {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

// Format date to "Wednesday, April 8, 2026"
export const formatFullDate = (date: Date = new Date()): string => {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// Format phone number
export const formatPhone = (phone: string): string => {
    if (!phone) return '-';
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');
    // Format as +1 (555) 334-8726
    if (cleaned.length === 11) {
        return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

// Capitalize first letter
export const capitalize = (text: string): string => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
};

// Format number with commas (e.g., 1,234)
export const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
};