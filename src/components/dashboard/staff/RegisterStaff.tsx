import { useState } from 'react';
import { ArrowLeft, ArrowRight, Loader2, Search, Bell } from 'lucide-react';
import { registerStaff } from '../../../api/auth';
import { AddUserButton } from '../shared/AddUserButton';
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
    { id: '9', title: 'Curriculum Vitae (CV)', status: 'Not Uploaded' }
];

interface RegisterStaffProps {
    initialRole?: string;
    onSwitchView?: (type: 'patient' | 'staff', role?: string) => void;
}

const RegisterStaff = ({ initialRole = 'Doctor', onSwitchView }: RegisterStaffProps) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

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
        accountStatus: true
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
        setDocuments(docs => docs.map(d =>
            d.id === id ? { ...d, status: 'Uploaded', filename: 'resume_V2.pdf', filesize: '1.2MB' } : d
        ));
    };

    const handleRemove = (id: string) => {
        setDocuments(docs => docs.map(d =>
            d.id === id ? { ...d, status: 'Not Uploaded', filename: undefined, filesize: undefined, file: undefined } : d
        ));
    };

    const handleSave = async () => {
        setIsSubmitting(true);
        setSubmitMessage(null);
        try {
            const formData = new FormData();
            formData.append('FullNameEnglish', basicInfo.fullNameEng);
            formData.append('FullNameArabic', basicInfo.fullNameAr);
            formData.append('Email', basicInfo.email);
            formData.append('NationalId', basicInfo.nationalId);

            if (basicInfo.phoneNumber) formData.append('PhoneNumber', basicInfo.phoneNumber);
            if (basicInfo.gender) {
                // Determine gender enum: 'Male' -> 1, 'Female' -> 2
                formData.append('Gender', basicInfo.gender === 'Female' ? '2' : '1');
            }
            if (basicInfo.profilePhoto) formData.append('ProfilePhoto', basicInfo.profilePhoto);

            formData.append('Role', roleDetails.role);

            const natIdDoc = documents.find(d => d.id === '1');
            if (natIdDoc?.file) formData.append('NationalIdFile', natIdDoc.file);

            const qualDoc = documents.find(d => d.id === '2');
            if (qualDoc?.file) formData.append('QualificationCertificate', qualDoc.file);

            const medLicDoc = documents.find(d => d.id === '4');
            if (medLicDoc?.file) formData.append('MedicalPracticeLicense', medLicDoc.file);

            const res = await registerStaff(formData);
            if (res.isSuccess) {
                setSubmitMessage({ type: 'success', text: 'Registration completed successfully' });
            } else {
                setSubmitMessage({ type: 'error', text: res.message || 'Registration failed' });
            }
        } catch (err: any) {
            setSubmitMessage({ type: 'error', text: err.message || 'Network error occurred' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const steps = [
        { num: 1, label: 'Basic Info' },
        { num: 2, label: 'Role Details' },
        { num: 3, label: 'Documents' }
    ];

    return (
        <div className="flex flex-col h-full bg-slate-50 font-sans">
            {/* Topbar for the registration view */}
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
                        <h1 className="text-2xl font-extrabold text-slate-900 mb-8">Register New Staff Member</h1>

                        {submitMessage && (
                            <div className={`mb-8 p-4 rounded-xl text-sm font-semibold border ${submitMessage.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                                }`}>
                                {submitMessage.text}
                            </div>
                        )}

                        {/* Stepper */}
                        <div className="flex items-center justify-center mb-12 relative max-w-2xl mx-auto">
                            {/* Connecting lines */}
                            <div className="absolute top-5 left-[15%] right-[15%] h-[2px] bg-slate-200 -z-10 flex">
                                <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}></div>
                                <div className={`h-full bg-slate-200 transition-all duration-300`} style={{ width: `${(1 - (step - 1) / (steps.length - 1)) * 100}%` }}></div>
                            </div>

                            {steps.map((s) => {
                                const isCompleted = s.num < step;
                                const isActive = s.num === step;
                                return (
                                    <div key={s.num} className="flex-1 flex flex-col items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-3 transition-colors ${isActive || isCompleted
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                            : 'bg-white text-slate-400 border-2 border-slate-200'
                                            }`}>
                                            {s.num}
                                        </div>
                                        <span className={`text-xs font-bold ${isActive || isCompleted ? 'text-blue-600' : 'text-slate-400'
                                            }`}>
                                            {s.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Step Content */}
                    <div className="mb-8">
                        {step === 1 && (
                            <BasicInfoForm
                                info={basicInfo}
                                onChange={setBasicInfo}
                            />
                        )}
                        {step === 2 && (
                            <RoleDetailsForm
                                details={roleDetails}
                                onChange={setRoleDetails}
                            />
                        )}
                        {step === 3 && (
                            <UploadDocumentsForm
                                documents={['Lab Technician', 'Radiologist', 'Pharmacist'].includes(roleDetails.role)
                                    ? documents.filter(doc => doc.title !== 'Certificate of Registration in the Medical Syndicate')
                                    : documents}
                                onUpload={handleUpload}
                                onRemove={handleRemove}
                            />
                        )}
                    </div>

                    {/* Bottom Navigation Toolbar */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6 shadow-sm flex items-center justify-between">
                        <button
                            onClick={() => step > 1 && setStep(step - 1)}
                            disabled={step === 1}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors ${step === 1
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Previous
                        </button>

                        <div className="flex items-center gap-1.5 mx-4 hidden md:flex">
                            <span className="text-slate-400 text-sm font-semibold mr-2">Step {step} of 3</span>
                            {[1, 2, 3].map(num => (
                                <div key={num} className={`h-2 rounded-full transition-all ${num === step ? 'w-6 bg-blue-600' : 'w-2 bg-slate-200'
                                    }`} />
                            ))}
                        </div>

                        {step < 3 ? (
                            <button
                                onClick={() => setStep(step + 1)}
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors"
                            >
                                Next Step: {steps[step].label}
                                <ArrowRight className="w-4 h-4 border-l border-blue-500 pl-2 ml-1" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSave}
                                disabled={isSubmitting}
                                className="flex items-center justify-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors shadow-[0_4px_14px_rgba(34,197,94,0.2)] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Registration'}
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RegisterStaff;
