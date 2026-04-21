// src/api/patient.ts
import { fetchApi } from "./config";
import type { PatientProfile, PatientListItem, Visit } from "../types/patient.types";

export interface PatientListResponse {
  patients: PatientListItem[];
  totalCount: number;
}

export const patientApi = {
  getPatients: async (params: { 
    SearchKey?: string; 
    PageIndex?: number; 
    PageSize?: number; 
    sort?: number;
    Gender?: string;
    IsActive?: boolean;
    LastVisit?: string;
  }) => {
    const query = new URLSearchParams();
    if (params.SearchKey) query.append('SearchKey', params.SearchKey);
    if (params.Gender) query.append('Gender', params.Gender);
    if (params.IsActive !== undefined) query.append('IsActive', params.IsActive.toString());
    if (params.LastVisit) query.append('LastVisit', params.LastVisit);
    if (params.PageIndex !== undefined) query.append('PageIndex', params.PageIndex.toString());
    if (params.PageSize !== undefined) query.append('PageSize', params.PageSize.toString());
    if (params.sort !== undefined) query.append('sort', params.sort.toString());

    const response = await fetchApi<PatientListResponse>(`/Admin/Patients?${query.toString()}`);
    return response.data;
  },

  getPatientById: async (idOrNationalId: string): Promise<PatientProfile | null> => {
    // Similarly, search patients using SearchKey (National ID is most reliable)
    try {
      const response = await fetchApi<PatientListResponse>(`/Admin/Patients?SearchKey=${idOrNationalId}&PageIndex=0&PageSize=1`);
      const matches = response.data?.patients || [];
      return matches[0] ? (matches[0] as unknown as PatientProfile) : null;
    } catch (error) {
      console.error('API getPatientById failed:', error);
      return null;
    }
  },

  getPatientProfile: async (): Promise<PatientProfile> => {
    const response = await fetchApi<PatientProfile>(`/Patient/My/Profile`);
    return response.data!;
  },

  getVisitHistory: async (): Promise<Visit[]> => {
      const response = await fetchApi<Visit[]>('/MedicalRecorde/VisitHistory');
      return response.data!;
  },

  getVisitDetails: async (visitId: string | number): Promise<any> => {
      const response = await fetchApi<any>(`/Visit/${visitId}`);
      return response.data!;
  }
};
