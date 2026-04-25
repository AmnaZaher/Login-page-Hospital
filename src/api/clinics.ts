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

export const deleteClinic = async (id: number) => {
    return fetchApi<void>(`/Clinics/${id}`, {
        method: 'DELETE',
    });
};
