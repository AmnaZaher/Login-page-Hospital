// src/components/dashboard/staff/StaffProfilePage.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../TopBar';
import { useStaffProfile } from '../../../hooks/useStaffProfile';

// Sub-components (all already exist ✅)
import ProfileHeader from './ProfileHeader';
import PersonalInfoCard from './PersonalInfoCard';
import ProfessionalCard from './ProfessionalCard';
import WorkAccountCard from './WorkAccountCard';
import DeactivateModal from './DeactivateModal';

interface StaffProfilePageProps {
  onMenuClick: () => void;
}

const StaffProfilePage: React.FC<StaffProfilePageProps> = ({ onMenuClick }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isLoading, error, isDeactivating, toggleAccountStatus } = useStaffProfile(id);
  const [showModal, setShowModal] = useState(false);

  // ───── Breadcrumb ─────
  const breadcrumb: React.ReactNode = (
    <span className="text-slate-400">
      <span
        className="cursor-pointer hover:text-slate-600 transition-colors"
        onClick={() => navigate('/dashboard/users')}
      >
        User Management
      </span>
      <span className="mx-2">&rsaquo;</span>
      <span className="text-slate-900">Profile Detail</span>
    </span>
  );

  // ───── Loading State ─────
  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-slate-50 relative font-sans w-full">
        <TopBar title={breadcrumb} onMenuClick={onMenuClick} onAddUserClick={() => {}} />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      </div>
    );
  }

  // ───── Error State ─────
  if (error || !user) {
    return (
      <div className="flex flex-col h-full bg-slate-50 relative font-sans w-full">
        <TopBar title={breadcrumb} onMenuClick={onMenuClick} onAddUserClick={() => {}} />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-red-500 font-bold text-lg">{error ?? 'User not found'}</p>
          <button
            onClick={() => navigate('/dashboard/users')}
            className="text-blue-600 font-bold hover:underline"
          >
            ← Back to User Management
          </button>
        </div>
      </div>
    );
  }

  // ───── Confirm Toggle ─────
  const handleConfirmToggle = async () => {
    await toggleAccountStatus();
    setShowModal(false);
  };

  // ───── Main Render ─────
  return (
    <div className="flex flex-col flex-1 h-full w-full bg-slate-50 relative font-sans overflow-hidden">
      <TopBar title={breadcrumb} onMenuClick={onMenuClick} onAddUserClick={() => {}} />

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-[1200px] mx-auto space-y-6 md:space-y-8 pb-10">

          {/* ── Header ── */}
          <ProfileHeader user={user} />

          {/* ── 3-Column Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <PersonalInfoCard user={user} />
            <ProfessionalCard user={user} />
            <WorkAccountCard user={user} onToggleStatus={() => setShowModal(true)} />
          </div>

        </div>
      </div>

      {/* ── Deactivate/Activate Modal ── */}
      <DeactivateModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmToggle}
        isLoading={isDeactivating}
        userName={user.name}
        isActive={user.status === 'Active'}
      />
    </div>
  );
};

export default StaffProfilePage;