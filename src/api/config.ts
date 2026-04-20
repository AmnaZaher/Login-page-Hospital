// src/api/config.ts
import type { ApiResponse } from '../types/api.types';

export const BASE_URL = 'https://nabd.runasp.net/api';

export const fetchApi = async <T = any>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> => {
    const url = `${BASE_URL}${endpoint}`;

    const headers = new Headers(options.headers || {});
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }

    const token = localStorage.getItem('accessToken');
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        let errorMsg = data?.message || `API Error: ${response.status}`;
        if (data?.errors) {
            const validationErrors = Object.entries(data.errors)
                .map(([field, msgs]) => `${field}: ${(msgs as string[]).join(', ')}`)
                .join(' | ');
            errorMsg = `${data.title || 'Validation Error'}: ${validationErrors}`;
        }
        throw new Error(errorMsg);
    }

    return data as ApiResponse<T>;
};