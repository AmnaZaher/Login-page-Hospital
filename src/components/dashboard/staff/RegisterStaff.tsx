import { useState } from 'react';
import { Search, Bell } from 'lucide-react';
import { registerStaff } from '../../../api/auth';
import { AddUserButton } from '../shared/AddUserButton';
import { Stepper, Button } from '../../ui';
import BasicInfoForm, { type StaffBasicInfo } from './BasicInfoForm';
import RoleDetailsForm, { type StaffRoleDetails } from './RoleDetailsForm';
import UploadDocumentsForm, { type StaffDocument } from './UploadDocumentsForm';

const initialDocuments: StaffDocument[] = [
    { id: '1', title: 'National ID', status: 'Not Uploaded' },
    { id: '2', title: 'Qualification Certificate', status: 'Not Uploaded' },
    { id: '3', title: 'Internship Certificate', status: 'Not Uploaded' },
    { id: '4', title: 'Medical Practice License', status: 'Not Uploaded' },
    { id: '5', title: 'Medical Fitness Certificate', status: 'Not Uploaded' },
    { id: '6', title: 'Birth Certificate', status: 'Not Uploaded' },
    { id: '7', title: 'Criminal Record Certificate', status: 'Not Uploaded' },
    { id: '8', title: 'Certificate of Registration in the Medical Syndicate', status: 'Not Uploaded' },
    { id: '9', title: 'Curriculum Vitae (CV)', status: 'Not Uploaded' },
];

const STEPS = [
    { label: 'Basic Info' },
    { label: 'Role Details' },
    { label: 'Documents' },
];

interface RegisterStaffProps {
    initialRole?: string;
    onSwitchView?: (type: 'patient' | 'staff', role?: string) => void;
}

const RegisterStaff = ({ initialRole = 'Doctor', onSwitchView }: RegisterStaffProps) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);

    // Step 1 State
    const [basicInfo, setBasicInfo] = useState<StaffBasicInfo>({
        fullNameEng: '',
        nationalId: '',
        gender: '',
        fullNameAr: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
        address: '',
        city: '',
        country: '',
        accountStatus: true,
    });

    // Step 2 State
    const [roleDetails, setRoleDetails] = useState<StaffRoleDetails>({
        role: initialRole,
        educationalQualification: '',
        medicalSyndicateNumber: '',
        graduationYear: '',
        specialization: '',
        dateOfAppointment: '',
        clinicId: '',
        doctorId: '',
        qualification: '',
        syndicateRegistrationNumber: '',
        nurseLevel: '',
        nursingLicenseNumber: '',
        ltLicenseNumber: '',
        canPerformTests: false,
        canApproveResults: false,
        canManageEquipment: false,
        radiologistLicenseNumber: '',
        pharmacyDegree: '',
        pharmacyLicenseNumber: '',
        employmentDate: '',
        shiftType: '',
    });

    // Step 3 State
    const [documents, setDocuments] = useState<StaffDocument[]>(initialDocuments);

    const handleUpload = (id: string, _file: File) => {
        setDocuments((docs) =>
            docs.map((d) =>
                d.id === id
                    ? { ...d, status: 'Uploaded', filename: 'resume_V2.pdf', filesize: '1.2MB' }
                    : d
            )
        );
    };

    const handleRemove = (id: string) => {
        setDocuments((docs) =>
            docs.map((d) =>
                d.id === id
                    ? { ...d, status: 'Not Uploaded', filename: undefined, filesize: undefined, file: undefined }
                    : d
            )
        );
    };

    const handleSave = async () => {
        setIsSubmitting(true);
        setSubmitMessage(null);
        try {
            const formData = new FormData();
            formData.append('FullNameEnglish', basicInfo.fullNameEng);
            formData.append('FullNameArabic', basicInfo.fullNameAr || basicInfo.fullNameEng); // Required field
            formData.append('Email', basicInfo.email);
            formData.append('NationalId', basicInfo.nationalId);
            formData.append('Password', basicInfo.nationalId); // Use National ID as password
            let roleInt = '3';
            switch(roleDetails.role) {
                case 'Admin': roleInt = '0'; break;
                case 'Doctor': roleInt = '1'; break;
                case 'Nurse': roleInt = '2'; break;
                case 'Lab Technician': roleInt = '3'; break;
                case 'Radiologist': roleInt = '4'; break;
                case 'Pharmacist': roleInt = '5'; break;
            }
            formData.append('Role', roleInt);
            formData.append('IsActive', 'true');

            if (basicInfo.phoneNumber) formData.append('PhoneNumber', basicInfo.phoneNumber);
            if (basicInfo.address) formData.append('Address', basicInfo.address);
            if (basicInfo.city) formData.append('City', basicInfo.city);
            if (basicInfo.country) formData.append('Country', basicInfo.country);

            // Gender mapping: 1 for Male, 2 for Female ($int32)
            const genderVal = basicInfo.gender === 'Female' ? '2' : '1';
            formData.append('Gender', genderVal);

            if (basicInfo.profilePhoto) formData.append('PersonalPhotos', basicInfo.profilePhoto);

            // Document mapping (PascalCase)
            const natIdDoc = documents.find((d) => d.id === '1');
            if (natIdDoc?.file) formData.append('NationalIdFile', natIdDoc.file);

            const qualDoc = documents.find((d) => d.id === '2');
            if (qualDoc?.file) formData.append('QualificationCertificate', qualDoc.file);

            const medLicDoc = documents.find((d) => d.id === '4');
            if (medLicDoc?.file) formData.append('MedicalPracticeLicense', medLicDoc.file);

            const res = await registerStaff(formData);
            
            if (res.isSuccess) {
                setSubmitMessage({ type: 'success', text: 'Staff member registered successfully' });
                // Reset form or navigate back after delay
                setTimeout(() => {
                    if (onSwitchView) onSwitchView('staff', 'Doctor'); // Reset to list or default
                }, 2000);
            } else {
                setSubmitMessage({ type: 'error', text: res.message || 'Registration failed' });
            }
        } catch (err: any) {
            console.error('Staff registration error:', err);
            setSubmitMessage({ type: 'error', text: err.message || 'Network error occurred' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 font-sans">
            {/* Top Bar */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-10">
                <div className="flex items-center gap-2 text-sm">
                    <span className="font-bold text-slate-900">Add New User</span>
                    <span className="text-slate-400">›</span>
                    <span className="text-slate-500">Hospital Staff</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                        />
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
                    </button>
                    <AddUserButton
                        onClick={(type: 'patient' | 'staff', role?: string) => {
                            if (onSwitchView) onSwitchView(type, role);
                        }}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-[1240px] mx-auto">
                    {/* Header */}
                    <div className="mb-8 pl-2">
                        <h1 className="text-2xl font-extrabold text-slate-900 mb-8">
                            Register New Staff Member
                        </h1>

                        {/* Submit Message */}
                        {submitMessage && (
                            <div
                                className={`mb-8 p-4 rounded-xl text-sm font-semibold border ${
                                    submitMessage.type === 'success'
                                        ? 'bg-green-50 text-green-700 border-green-200'
                                        : 'bg-red-50 text-red-700 border-red-200'
                                }`}
                            >
                                {submitMessage.text}
                            </div>
                        )}

                        {/* Stepper */}
                        <Stepper steps={STEPS} currentStep={step} className="mb-12" />
                    </div>

                    {/* Step Content */}
                    <div className="mb-8">
                        {step === 1 && (
                            <BasicInfoForm info={basicInfo} onChange={setBasicInfo} />
                        )}
                        {step === 2 && (
                            <RoleDetailsForm details={roleDetails} onChange={setRoleDetails} />
                        )}
                        {step === 3 && (
                            <UploadDocumentsForm
                                documents={
                                    ['Lab Technician', 'Radiologist', 'Pharmacist'].includes(roleDetails.role)
                                        ? documents.filter(
                                              (doc) =>
                                                  doc.title !== 'Certificate of Registration in the Medical Syndicate'
                                          )
                                        : documents
                                }
                                onUpload={handleUpload}
                                onRemove={handleRemove}
                            />
                        )}
                    </div>

                    {/* Bottom Navigation */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6 shadow-sm flex items-center justify-between">
                        <Button
                            variant="outline"
                            onClick={() => step > 1 && setStep(step - 1)}
                            disabled={step === 1}
                            icon={
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            }
                        >
                            Previous
                        </Button>

                        {/* Step Indicator */}
                        <div className="flex items-center gap-1.5 mx-4 hidden md:flex">
                            <span className="text-slate-400 text-sm font-semibold mr-2">
                                Step {step} of 3
                            </span>
                            {[1, 2, 3].map((num) => (
                                <div
                                    key={num}
                                    className={`h-2 rounded-full transition-all ${
                                        num === step ? 'w-6 bg-blue-600' : 'w-2 bg-slate-200'
                                    }`}
                                />
                            ))}
                        </div>

                        {step < 3 ? (
                            <Button
                                variant="primary"
                                onClick={() => setStep(step + 1)}
                                icon={
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                }
                                iconPosition="right"
                            >
                                Next Step: {STEPS[step].label}
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSave}
                                isLoading={isSubmitting}
                                className="bg-green-500 hover:bg-green-600 text-white shadow-[0_4px_14px_rgba(34,197,94,0.2)]"
                            >
                                {isSubmitting ? '' : 'Submit Registration'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterStaff;