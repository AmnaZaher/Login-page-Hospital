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

    let data: any = null;
    const text = await response.text();
    try {
        data = text ? JSON.parse(text) : {};
    } catch {
        data = { message: text };
    }

    if (!response.ok) {
        let errorMsg = (data as any)?.message || data?.error || 'API Request Failed';
        if (response.status === 401) errorMsg = 'Unauthorized access. Please login.';
        if (response.status === 403) errorMsg = 'Access forbidden.';
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