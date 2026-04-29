import { fetchApi } from './config';
import type { Clinic, CreateClinicDto, UpdateClinicDto, ClinicStats } from '../types/clinics.types';

export const getClinics = async (params?: {
    PageSize?: number;
    PageIndex?: number;
    isActive?: boolean;
    search?: string;
}) => {
    let queryParams = new URLSearchParams();
    if (params) {
        if (params.PageSize !== undefined) queryParams.append('PageSize', params.PageSize.toString());
        if (params.PageIndex !== undefined) queryParams.append('PageIndex', params.PageIndex.toString());
        if (params.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
        if (params.search) queryParams.append('search', params.search);
    }
    
    const queryString = queryParams.toString();
    const endpoint = `/Clinics${queryString ? `?${queryString}` : ''}`;
    
    return fetchApi<any>(endpoint, {
        method: 'GET',
    });
};

export const getClinicStats = async () => {
    return fetchApi<ClinicStats>('/Clinics/ClinicStatistical', {
        method: 'GET',
    });
};

export const createClinic = async (data: CreateClinicDto) => {
    return fetchApi<Clinic>('/Clinics', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const updateClinic = async (id: number, data: UpdateClinicDto) => {
    return fetchApi<Clinic>(`/Clinics/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

export const deleteClinic = async (id: number | string) => {
    console.log(`[ClinicAPI] Attempting to delete clinic with ID: ${id}`);
    
    // 1. Try standard endpoint
    try {
        console.log(`[ClinicAPI] DELETE /Clinics/${id}`);
        return await fetchApi<void>(`/Clinics/${id}`, {
            method: 'DELETE',
        });
    } catch (err: any) {
        console.warn(`[ClinicAPI] Standard DELETE failed for ID ${id}:`, err.message);
    }
    
    // 2. Try Admin (Singular)
    try {
        console.log(`[ClinicAPI] DELETE /Admin/Clinic/${id}`);
        return await fetchApi<void>(`/Admin/Clinic/${id}`, {
            method: 'DELETE',
        });
    } catch (err: any) {
        console.warn(`[ClinicAPI] Admin (singular) DELETE failed for ID ${id}:`, err.message);
    }

    // 3. Try Admin (Plural)
    try {
        console.log(`[ClinicAPI] DELETE /Admin/Clinics/${id}`);
        return await fetchApi<void>(`/Admin/Clinics/${id}`, {
            method: 'DELETE',
        });
    } catch (err: any) {
        console.error(`[ClinicAPI] All DELETE attempts failed for clinic ${id}:`, err.message);
        throw new Error(`Clinic deletion failed. The server might not permit deleting this record. Error: ${err.message}`);
    }
};
export const getClinicById = async (id: number) => {
    return fetchApi<Clinic>(`/Clinics/${id}`, {
        method: 'GET',
    });
};
