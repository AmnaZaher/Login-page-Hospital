// src/components/dashboard/staff/ProfessionalCard.tsx
import React from 'react';
import { Card } from '../../ui';
import InfoRow from './helpers/InfoRow';
import type { StaffProfile } from '../../../types/staff.types';

interface ProfessionalCardProps {
  user: StaffProfile;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ user }) => (
  <Card className="overflow-hidden flex flex-col !p-0">
    <div className="px-8 py-6 border-b border-slate-100/60">
      <h2 className="text-xl font-extrabold text-slate-900 text-center tracking-tight">
        Professional Details
      </h2>
    </div>
    <div className="p-8 space-y-6 flex-1">
      <InfoRow label="Clinical Role" value={user.role} />
      <InfoRow label="Department" value={user.department} />
      <div>
        <p className="text-xs font-bold text-[#b0bec5] mb-1">Clinic Assignment</p>
        <span className="inline-block mt-1 bg-[#eff6ff] text-blue-600 px-3 py-1.5 rounded-lg text-sm font-bold">
          {user.location}
        </span>
      </div>
      <InfoRow label="License Number" value={`${user.licenseId} (${user.status})`} />
      <InfoRow label="Professional Experience" value={user.experience} />
      <InfoRow label="Qualifications" value={user.qualifications} />
    </div>
  </Card>
);

export default ProfessionalCard;