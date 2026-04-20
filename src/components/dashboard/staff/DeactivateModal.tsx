// src/components/dashboard/staff/DeactivateModal.tsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button, Modal } from '../../ui';

interface DeactivateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  userName: string;
  isActive: boolean;
}

const DeactivateModal: React.FC<DeactivateModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  userName,
  isActive,
}) => {
  const action = isActive ? 'Deactivate' : 'Activate';
  const colorClass = isActive ? 'red' : 'blue';

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center py-4">
        <div
          className={`w-16 h-16 bg-${colorClass}-100 rounded-full flex items-center justify-center mx-auto mb-6`}
        >
          <AlertTriangle className={`w-8 h-8 text-${colorClass}-600`} />
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 mb-2">
          {action} Account?
        </h3>
        <p className="text-slate-500 font-medium mb-8">
          {isActive
            ? `This will disable ${userName}'s access to the system. You can reactivate later.`
            : `This will restore ${userName}'s access to the system.`}
        </p>

        <div className="flex gap-3">
          <Button variant="outline" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={isActive ? 'danger' : 'primary'}
            fullWidth
            isLoading={isLoading}
            onClick={onConfirm}
          >
            Yes, {action}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeactivateModal;