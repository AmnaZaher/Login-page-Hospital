import { useState } from 'react';
import { Modal, Button } from '../../ui';
import { patientApi } from '../../../api/patient';
import { staffApi } from '../../../api/staff';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    userType: 'patient' | 'staff';
    userId: string | null;
    userName: string;
    onSuccess: () => void;
}

export const DeleteConfirmModal = ({ isOpen, onClose, userType, userId, userName, onSuccess }: DeleteConfirmModalProps) => {
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async () => {
        if (!userId) return;
        setDeleting(true);
        setError('');
        try {
            if (userType === 'patient') {
                await patientApi.deletePatient(userId);
            } else {
                await staffApi.deleteStaff(userId);
            }
            onSuccess();
            onClose();
        } catch (err) {
            console.error("Failed to delete user:", err);
            setError('Failed to delete user.');
        } finally {
            setDeleting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm">
            <div className="text-center py-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                    Delete {userType === 'patient' ? 'Patient' : 'Staff Member'}?
                </h3>
                
                {error && (
                    <div className="mb-4 mt-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-100">
                        {error}
                    </div>
                )}

                <p className="text-slate-500 font-medium mb-8">
                    Are you sure you want to delete <strong>{userName}</strong>? This action cannot be undone and will permanently remove their records from the system.
                </p>
                <div className="flex gap-3">
                    <Button variant="outline" fullWidth onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" fullWidth isLoading={deleting} onClick={handleDelete}>
                        Yes, Delete
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
