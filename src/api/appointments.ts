import { fetchApi } from './config';

export const bookAppointment = async (payload: any) => {
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

export const updateAppointment = async (id: number | string, payload: any) => {
    return await fetchApi(`/Appointment/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
};

export const changeAppointmentStatus = async (id: number | string, status: number) => {
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

export const listAppointments = async () => {
    return await fetchApi('/Appointment/Appointments', {
        method: 'GET',
    });
};
