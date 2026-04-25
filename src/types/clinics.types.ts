export interface Clinic {
  id: number;
  clinicCode: string;
  clinicNameAr: string | null;
  clinicNameEn: string | null;
  specialization: string;
  workingDays: string | null;
  isActive: boolean;
  // Let's include extra fields if they exist in the GET response
}

export interface CreateClinicDto {
  clinicCode: string;
  clinicNameAr?: string | null;
  clinicNameEn?: string | null;
  specialization: string;
  workingDays?: string | null;
  isActive: boolean;
}

export interface UpdateClinicDto {
  clinicCode?: string | null;
  clinicNameAr?: string | null;
  clinicNameEn?: string | null;
  specialization?: string | null;
  workingDays?: string | null;
  isActive?: boolean | null;
}

export interface ClinicStats {
  totalClinics?: number;
  activeUnits?: number;
}
