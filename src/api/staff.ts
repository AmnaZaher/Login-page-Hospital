// src/api/staff.ts
import { fetchApi } from "./config";
import type { StaffProfile, StaffMember } from "../types/staff.types";

export interface StaffListResponse {
  staffs: StaffMember[];
  totalCount: number;
}

export const staffApi = {
  getStaffs: async (params: { 
    Role?: string; 
    SearchKey?: string; 
    Gender?: string; 
    IsActive?: boolean; 
    PageIndex?: number; 
    PageSize?: number;
    sort?: number;
    LastLoginFrom?: string;
    LastLoginTo?: string;
  }) => {
    const query = new URLSearchParams();
    if (params.Role) query.append('Role', params.Role);
    if (params.SearchKey) query.append('SearchKey', params.SearchKey);
    if (params.Gender) query.append('Gender', params.Gender);
    if (params.IsActive !== undefined) query.append('IsActive', params.IsActive.toString());
    if (params.PageIndex !== undefined) query.append('PageIndex', params.PageIndex.toString());
    if (params.PageSize !== undefined) query.append('PageSize', params.PageSize.toString());
    if (params.sort !== undefined) query.append('sort', params.sort.toString());
    if (params.LastLoginFrom) query.append('LastLoginFrom', params.LastLoginFrom);
    if (params.LastLoginTo) query.append('LastLoginTo', params.LastLoginTo);

    const response = await fetchApi<StaffListResponse>(`/Admin/Staffs?${query.toString()}`);
    return response.data;
  },

  getStaffById: async (idOrNationalId: string): Promise<StaffProfile | null> => {
    // We use the SearchKey parameter to find the specific staff member
    try {
      const response = await fetchApi<StaffListResponse>(`/Admin/Staffs?SearchKey=${idOrNationalId}&PageIndex=0&PageSize=1`);
      
      // Handle various pagination response shapes from backend (staffs, items, data, etc.)
      const list = response.data?.staffs || (response.data as any)?.items || (response.data as any)?.data || [];
      const item = list[0];
      
      if (!item) return null;

      const rolesMap: Record<string, string> = {
        '0': 'Admin', '1': 'Doctor', '2': 'Nurse', '3': 'Lab Technician', '4': 'Radiologist', '5': 'Pharmacist',
        'Admin': 'Admin', 'Doctor': 'Doctor', 'Nurse': 'Nurse', 'Lab Technician': 'Lab Technician', 'Radiologist': 'Radiologist', 'Pharmacist': 'Pharmacist'
      };
      
      // Comprehensive search for role
      const findRole = () => {
        const direct = item.role ?? item.Role ?? item.roleId ?? item.RoleId ?? item.staffRole ?? item.StaffRole ?? item.roleName ?? item.RoleName;
        if (direct !== undefined && direct !== null) {
          if (typeof direct === 'object') return direct.name ?? direct.Name ?? rolesMap[direct.id ?? direct.Id] ?? 'Staff';
          const s = String(direct);
          return rolesMap[s] ?? (isNaN(parseInt(s)) ? s : 'Staff');
        }
        for (const k in item) {
          if (k.toLowerCase().includes('role')) {
            const val = item[k];
            if (val !== undefined && val !== null) {
              if (typeof val === 'object') return val.name ?? val.Name ?? rolesMap[val.id ?? val.Id] ?? 'Staff';
              const s = String(val);
              return rolesMap[s] ?? (isNaN(parseInt(s)) ? s : 'Staff');
            }
          }
        }
        return item.specialization ?? item.Specialization ?? 'Staff';
      };

      const roleVal = findRole();

      // Comprehensive search for dept
      const findDept = () => {
        const direct = item.dept ?? item.department ?? item.deptName ?? item.Dept ?? item.Department ?? item.departmentName ?? item.DepartmentName;
        if (direct !== undefined && direct !== null) {
          if (typeof direct === 'object') return direct.name ?? direct.Name ?? 'General';
          return String(direct);
        }
        for (const k in item) {
          if (k.toLowerCase().includes('dept') || k.toLowerCase().includes('depart')) {
            const val = item[k];
            if (val) return typeof val === 'object' ? (val.name ?? val.Name) : String(val);
          }
        }
        return item.specialization ?? item.Specialization ?? 'General';
      };
      
      const deptVal = findDept();

      // Safe mapping to prevent UI crashes if backend fields are missing or PascalCase
      return {
        id: item.id || item.Id || idOrNationalId,
        name: item.name || item.fullNameEnglish || item.FullNameEnglish || 'Unknown',
        role: roleVal,
        department: deptVal,
        licenseId: item.licenseNumber || 'N/A',
        location: item.location || item.city || 'Hospital',
        email: item.email || item.Email || 'No Email',
        nationalId: item.nationalId || item.NationalId || idOrNationalId,
        phone: item.phoneNumber || item.phone || 'N/A',
        address: item.address || item.Address || 'N/A',
        gender: item.gender || 'Not Specified',
        experience: item.experience || 'N/A',
        qualifications: item.qualification || 'N/A',
        status: item.isActive === false ? 'Disabled' : (item.status || 'Active'),
        lastLogin: item.lastLogin || 'N/A',
        avatar: item.avatar || item.PersonalPhotos || '',
        ...item
      } as unknown as StaffProfile;
    } catch (error) {
      console.error('API getStaffById failed:', error);
      return null;
    }
  },

  getProfile: async (id: string): Promise<StaffProfile> => {
    const response = await fetchApi<StaffProfile>(`/Staff/${id}`);
    return response.data!;
  },

  toggleStatus: async (id: string, activate: boolean): Promise<void> => {
    await fetchApi(`/Staff/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status: activate ? "Active" : "Disabled" }),
    });
  },
};

