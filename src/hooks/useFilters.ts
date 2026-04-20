import { useState, useCallback } from 'react';

/**
 * Filters hook — بيتحكم في فلاتر الجداول
 * مثال: Role filter, Status filter, Department filter
 */
export const useFilters = <T extends Record<string, string>>(
    initialFilters: T
) => {
    const [filters, setFilters] = useState<T>(initialFilters);

    const updateFilter = useCallback((key: keyof T, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters(initialFilters);
    }, [initialFilters]);

    const hasActiveFilters = Object.values(filters).some(
        (value, index) => value !== Object.values(initialFilters)[index]
    );

    return {
        filters,
        updateFilter,
        resetFilters,
        hasActiveFilters,
    };
};

// we will use it in tables to filter the data