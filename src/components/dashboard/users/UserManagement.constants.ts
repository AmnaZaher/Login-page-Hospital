// src/components/dashboard/users/UserManagement.constants.ts
import type { FilterConfig } from '../../table';

export const staffFilterConfig: FilterConfig[] = [
    {
        key: 'role',
        label: 'Role',
        type: 'select',
        placeholder: 'All Roles',
        options: [
            { value: '1', label: 'Admin' },
            { value: '2', label: 'Doctor' },
            { value: '3', label: 'Nurse' },
            { value: '6', label: 'Lab Technician' },
            { value: '5', label: 'Radiologist' },
            { value: '4', label: 'Pharmacist' },
        ],
    },
    {
        key: 'status',
        label: 'Status',
        type: 'select',
        placeholder: 'All Statuses',
        options: [
            { value: 'Active', label: 'Active' },
            { value: 'Disabled', label: 'Disabled' },
        ],
    },
    {
        key: 'sort',
        label: 'Sort By',
        type: 'select',
        placeholder: 'Newest First',
        options: [
            { value: 'Newest', label: 'Newest' },
            { value: 'Oldest', label: 'Oldest' },
            { value: 'Name A→Z', label: 'Name A→Z' },
            { value: 'Name Z→A', label: 'Name Z→A' },
        ],
        hidePlaceholder: true,
    },
];

export const patientFilterConfig: FilterConfig[] = [
    {
        key: 'gender',
        label: 'Gender',
        type: 'select',
        placeholder: 'All Genders',
        options: [
            { value: 'Female', label: 'Female' },
            { value: 'Male', label: 'Male' },
        ],
    },
    {
        key: 'status',
        label: 'Status',
        type: 'select',
        placeholder: 'All Statuses',
        options: [
            { value: 'Active', label: 'Active' },
            { value: 'Disabled', label: 'Disabled' },
        ],
    },
    { key: 'lastVisit', label: 'Last Visit', type: 'date', placeholder: 'mm / dd / yy' },
    {
        key: 'sort',
        label: 'Sort By',
        type: 'select',
        placeholder: 'Newest First',
        options: [
            { value: 'Newest', label: 'Newest' },
            { value: 'Oldest', label: 'Oldest' },
            { value: 'Name A→Z', label: 'Name A→Z' },
            { value: 'Name Z→A', label: 'Name Z→A' },
        ],
        hidePlaceholder: true,
    },
];
