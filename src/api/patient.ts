// src/api/patient.ts
import { fetchApi } from "./config";
import type { PatientProfile, PatientListItem, Visit } from "../types/patient.types";

export interface PatientListResponse {
  patients: PatientListItem[];
  totalCount: number;
}

export const patientApi = {
  getPatients: async (params: { SearchKey?: string; PageIndex?: number; PageSize?: number }) => {
    const query = new URLSearchParams();
    if (params.SearchKey) query.append('SearchKey', params.SearchKey);
    if (params.PageIndex) query.append('PageIndex', params.PageIndex.toString());
    if (params.PageSize) query.append('PageSize', params.PageSize.toString());

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
