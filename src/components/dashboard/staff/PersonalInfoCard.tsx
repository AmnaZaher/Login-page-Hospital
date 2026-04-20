// src/components/dashboard/staff/PersonalInfoCard.tsx
import React from 'react';
import { Card } from '../../ui';
import InfoRow from './helpers/InfoRow';
import type { StaffProfile } from '../../../types/staff.types';

interface PersonalInfoCardProps {
  user: StaffProfile;
}

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({ user }) => (
  <Card className="overflow-hidden flex flex-col !p-0">
    <div className="px-8 py-6 border-b border-slate-100/60">
      <h2 className="text-xl font-extrabold text-slate-900 text-center tracking-tight">
        Personal Information
      </h2>
    </div>
    <div className="p-8 space-y-6 flex-1">
      <InfoRow label="Full Name" value={user.name} />
      <InfoRow label="National ID" value={user.nationalId} />
      <InfoRow label="Phone Number" value={user.phone} />
      <InfoRow label="Email Address" value={user.email} />
      <InfoRow label="Address" value={user.address} />
      <InfoRow label="Gender" value={user.gender} />
    </div>
  </Card>
);

export default PersonalInfoCard;