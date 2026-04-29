import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClinicsList from './ClinicsList';
import AddClinic from './AddClinic';
import type { Clinic } from '../../../types/clinics.types';

type ClinicsView = 'list' | 'add';

const ClinicsContainer: React.FC = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<ClinicsView>('list');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddSuccess = () => {
    setView('list');
    setRefreshKey(k => k + 1); // force re-fetch
  };

  const handleEditClinic = (clinic: Clinic) => {
    navigate(`/dashboard/clinics/edit/${clinic.id}`);
  };

  if (view === 'add') {
    return (
      <AddClinic
        onCancel={() => setView('list')}
        onSuccess={handleAddSuccess}
      />
    );
  }

  return (
    <ClinicsList
      key={refreshKey}
      onAddClinic={() => setView('add')}
      onEditClinic={handleEditClinic}
    />
  );
};

export default ClinicsContainer;
