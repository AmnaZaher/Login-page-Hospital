import { fetchApi } from './config';

// ----- Types -----
export type AppointmentStatus = 0 | 1 | 2 | 3; // 0=Scheduled, 1=Completed, 2=NoShow, 3=Cancelled

export interface Appointment {
    id: number;
    appointmentCode?: string;
    patientId: number;
    patientName: string;
    patientAvatar?: string;
    doctorId: number;
    doctorName: string;
    clinicId?: number;
    clinicName?: string;
    clinicWing?: string;
    dateTime: string; // ISO string
    status: AppointmentStatus;
    notes?: string;
}

export interface BookAppointmentDto {
    patientId: number;
    doctorId: number;
    clinicId?: number;
    dateTime: string; // ISO string
    notes?: string;
}

export interface AppointmentListParams {
    PageIndex?: number;
    PageSize?: number;
    PatientId?: number | string;
    DoctorId?: number | string;
    ClinicId?: number | string;
    Status?: number | string;
    StartDate?: string;
    EndDate?: string;
    SearchKey?: string;
    search?: string;
}

// ----- API Calls -----

export const bookAppointment = async (payload: BookAppointmentDto) => {
    return await fetchApi('/Appointment/Book', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
};

export const getAppointmentDetails = async (id: number | string) => {
    return await fetchApi(`/Appointment/Details/${id}`, {
        method: 'GET',
    });
};

export const updateAppointment = async (id: number | string, payload: Partial<BookAppointmentDto>) => {
    return await fetchApi(`/Appointment/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
};

export const changeAppointmentStatus = async (id: number | string, status: AppointmentStatus) => {
    return await fetchApi(`/Appointment/status/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    });
};

export const deleteAppointment = async (id: number | string) => {
    return await fetchApi(`/Appointment/${id}`, {
        method: 'DELETE',
    });
};

export const listAppointments = async (params?: AppointmentListParams) => {
    const q = new URLSearchParams();
    if (params?.PageIndex !== undefined) q.append('PageIndex', params.PageIndex.toString());
    if (params?.PageSize !== undefined) q.append('PageSize', params.PageSize.toString());
    if (params?.PatientId) q.append('PatientId', params.PatientId.toString());
    if (params?.DoctorId) q.append('DoctorId', params.DoctorId.toString());
    if (params?.ClinicId) q.append('ClinicId', params.ClinicId.toString());
    if (params?.Status !== undefined && params.Status !== '') q.append('Status', params.Status.toString());
    if (params?.StartDate) q.append('StartDate', params.StartDate);
    if (params?.EndDate) q.append('EndDate', params.EndDate);
    if (params?.SearchKey) q.append('SearchKey', params.SearchKey);
    if (params?.search) q.append('search', params.search);

    const qs = q.toString();
    return fetchApi<any>(`/Appointment/Appointments${qs ? `?${qs}` : ''}`);
};
