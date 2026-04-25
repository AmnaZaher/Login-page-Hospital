import React, { useState } from 'react';
import ClinicsList from './ClinicsList';
import AddClinic from './AddClinic';
import type { Clinic } from '../../../types/clinics.types';

type ClinicsView = 'list' | 'add';

const ClinicsContainer: React.FC = () => {
  const [view, setView] = useState<ClinicsView>('list');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddSuccess = () => {
    setView('list');
    setRefreshKey(k => k + 1); // force re-fetch
  };

  const handleEditClinic = (_clinic: Clinic) => {
    // Future: navigate to edit form
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
