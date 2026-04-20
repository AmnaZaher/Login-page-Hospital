export interface StaffMember {
    id: string;
    name: string;
    subtitle: string;
    username: string;
    role: 'Doctor' | 'Nurse' | 'Lab Technician' | 'Radiologist' | 'Pharmacist' | 'Admin';
    lastLogin: string;
    dept: string;
    status: 'Active' | 'Disabled';
    avatar: string;
}

export interface StaffProfile {
    id: string;
    name: string;
    role: string;
    department: string;
    licenseId: string;
    location: string;
    email: string;
    nationalId: string;
    phone: string;
    address: string;
    gender: string;
    experience: string;
    qualifications: string;
    status: 'Active' | 'Disabled';
    lastLogin: string;
    avatar: string;
}

export interface StaffFilters {
    role: string;
    status: string;
    department: string;
}