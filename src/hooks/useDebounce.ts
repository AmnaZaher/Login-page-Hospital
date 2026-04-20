import { useState, useEffect } from 'react';

/**
 * Debounce hook — بيستنى اليوزر يخلص كتابة قبل ما ينفذ
 * مثال: Search input — مش هيبعت request كل حرف، هيستنى 500ms
 */
export const useDebounce = <T>(value: T, delay: number = 500): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
};

// we will use it in search input to avoid too many requests
