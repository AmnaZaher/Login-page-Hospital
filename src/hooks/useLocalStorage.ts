import { useState } from 'react';

/**
 * LocalStorage hook — بيحفظ ويسترجع قيم من localStorage
 * مثال: حفظ الـ theme, حفظ الـ filters
 */
export const useLocalStorage = <T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = (value: T | ((prev: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error saving to localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue];
};

// we will use it to save theme and filters
