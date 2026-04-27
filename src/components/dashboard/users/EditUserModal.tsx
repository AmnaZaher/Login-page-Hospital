import { useState, useEffect } from 'react';
import { Modal, Button, Input, Select } from '../../ui';
import { patientApi } from '../../../api/patient';
import { staffApi } from '../../../api/staff';

interface EditUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    userType: 'patient' | 'staff';
    userId: string | null;
    onSuccess: () => void;
}

export const EditUserModal = ({ isOpen, onClose, userType, userId, onSuccess }: EditUserModalProps) => {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (!isOpen || !userId) return;
            setLoading(true);
            setError('');
            try {
                if (userType === 'patient') {
                    const data = await patientApi.getPatientById(userId);
                    setFormData({
                        name: data?.name || '',
                        phone: data?.phone || '',
                        email: data?.email || '',
                        address: data?.address || '',
                        status: data?.status === 'Disabled' ? 'Disabled' : 'Active',
                    });
                } else {
                    const data = await staffApi.getStaffById(userId);
                    setFormData({
                        name: data?.name || '',
                        phone: data?.phone || '',
                        email: data?.email || '',
                        location: data?.location || '',
                        status: data?.status === 'Disabled' ? 'Disabled' : 'Active',
                    });
                }
            } catch (err) {
                console.error("Failed to fetch user:", err);
                setError('Failed to fetch user details.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isOpen, userId, userType]);

    const handleSave = async () => {
        if (!userId) return;
        setSaving(true);
        setError('');
        try {
            if (userType === 'patient') {
                await patientApi.updatePatient(userId, formData);
            } else {
                await staffApi.updateStaff(userId, formData);
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error("Failed to save changes:", err);
            setError(err?.message || 'Failed to save changes.');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <div className="p-2">
                <h2 className="text-xl font-extrabold text-slate-900 mb-6">
                    Edit {userType === 'patient' ? 'Patient' : 'Staff Member'}
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-100">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="py-12 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <Input
                            label="Full Name"
                            value={formData.name || ''}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Enter full name"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Phone Number"
                                value={formData.phone || ''}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                placeholder="Enter phone"
                            />
                            <Input
                                label="Email Address"
                                value={formData.email || ''}
                                onChange={(e) => handleChange('email', e.target.value)}
                                placeholder="Enter email"
                                type="email"
                            />
                        </div>

                        {userType === 'patient' ? (
                            <Input
                                label="Address"
                                value={formData.address || ''}
                                onChange={(e) => handleChange('address', e.target.value)}
                                placeholder="Enter address"
                            />
                        ) : (
                            <Input
                                label="Location / Clinic"
                                value={formData.location || ''}
                                onChange={(e) => handleChange('location', e.target.value)}
                                placeholder="Enter location"
                            />
                        )}

                        <div>
                            <label className="block text-sm font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">
                                Status
                            </label>
                            <Select
                                value={formData.status || 'Active'}
                                onChange={(val) => handleChange('status', val)}
                                options={[
                                    { value: 'Active', label: 'Active' },
                                    { value: 'Disabled', label: 'Disabled' },
                                ]}
                                placeholder="Select Status"
                            />
                        </div>

                        <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-100">
                            <Button variant="outline" fullWidth onClick={onClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" fullWidth isLoading={saving} onClick={handleSave}>
                                Save Changes
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};
