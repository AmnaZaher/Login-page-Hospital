// src/hooks/useStaffProfile.ts
import { useState, useEffect, useCallback } from 'react';
import { staffApi } from '../api/staff';
import type { StaffProfile } from '../types/staff.types';

// TODO: Remove when API is ready
const mockStaffData: Record<string, StaffProfile> = {
  '1': {
    id: '1',
    name: 'Dr. Ali Mohamed Ahmed',
    role: 'Senior Cardiologist',
    department: 'Cardiology Department',
    licenseId: '#MC-55635-2024',
    location: 'Clinic Wing A, Room 23',
    email: 'A.MOHAMED@host.com',
    nationalId: 'XXX-XX-2343',
    phone: '+1 (555) 334-8726',
    address: '256 Oah Valley rd, Apartment 12B, Springfield, IL',
    gender: 'Male',
    experience: '12 Years',
    qualifications: 'MD from Johns Hopkins University',
    status: 'Active',
    lastLogin: '2 hours ago from terminal B-12',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  '2': {
    id: '2',
    name: 'Nurse Amr Mohamed',
    role: 'Senior Nurse',
    department: 'Emergency Department',
    licenseId: '#NR-22123-2023',
    location: 'ER Ward, Station 2',
    email: 'A.MOHAMED@host.com',
    nationalId: 'XXX-XX-4421',
    phone: '+1 (555) 442-1299',
    address: '112 North Ave, Springfield, IL',
    gender: 'Male',
    experience: '8 Years',
    qualifications: 'BSN from State University',
    status: 'Disabled',
    lastLogin: 'Jan 12, 2024',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
};

const USE_MOCK = true; // TODO: Set to false when API is ready

interface UseStaffProfileReturn {
  user: StaffProfile | null;
  isLoading: boolean;
  error: string | null;
  isDeactivating: boolean;
  toggleAccountStatus: () => Promise<void>;
}

export const useStaffProfile = (id: string | undefined): UseStaffProfileReturn => {
  const [user, setUser] = useState<StaffProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeactivating, setIsDeactivating] = useState(false);

  // Fetch profile
  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (USE_MOCK) {
          await new Promise((r) => setTimeout(r, 400));
          const data = mockStaffData[id] ?? mockStaffData['1'];
          setUser(data);
        } else {
          const data = await staffApi.getProfile(id);
          setUser(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  // Toggle activate/deactivate
  const toggleAccountStatus = useCallback(async () => {
    if (!user) return;

    setIsDeactivating(true);
    try {
      const newStatus = user.status === 'Active' ? 'Disabled' : 'Active';

      if (!USE_MOCK) {
        await staffApi.toggleStatus(user.id, newStatus === 'Active');
      } else {
        await new Promise((r) => setTimeout(r, 1000));
      }

      setUser((prev) =>
        prev ? { ...prev, status: newStatus } : prev
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Status update failed');
    } finally {
      setIsDeactivating(false);
    }
  }, [user]);

  return { user, isLoading, error, isDeactivating, toggleAccountStatus };
};