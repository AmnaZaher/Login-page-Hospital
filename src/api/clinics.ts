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
    return fetchApi('/Clinics/ClinicStatistical', {
        method: 'GET',
    });
};

export const createClinic = async (clinic: CreateClinicDto) => {
    return fetchApi('/Clinics', {
        method: 'POST',
        body: JSON.stringify({
            ClinicCode: clinic.clinicCode,
            ClinicNameAr: clinic.clinicNameAr,
            ClinicNameEn: clinic.clinicNameEn,
            Specialization: clinic.specialization,
            WorkingDays: clinic.workingDays,
            IsActive: clinic.isActive
        }),
    });
};

export const updateClinic = async (id: number, clinic: UpdateClinicDto) => {
    return fetchApi(`/Clinics/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            ClinicCode: clinic.clinicCode,
            ClinicNameAr: clinic.clinicNameAr,
            ClinicNameEn: clinic.clinicNameEn,
            Specialization: clinic.specialization,
            WorkingDays: clinic.workingDays,
            IsActive: clinic.isActive
        }),
    });
};

export const deleteClinic = async (id: number) => {
    return fetchApi(`/Clinics/${id}`, {
        method: 'DELETE',
    });
};

export const getClinicById = async (id: number) => {
    return fetchApi<Clinic>(`/Clinics/${id}`, {
        method: 'GET',
    });
};
