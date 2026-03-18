import { useState } from 'react';
import { Search, Bell, Plus, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import MedicalHistoryForm from './MedicalHistoryForm';
import type { MedicalRecord } from './MedicalHistoryForm';
import PersonalInfoForm from './PersonalInfoForm';
import type { PersonalInfo } from './PersonalInfoForm';
import AllergiesForm from './AllergiesForm';
import type { AllergyRecord } from './AllergiesForm';
import ChronicDiseasesForm from './ChronicDiseasesForm';
import type { ChronicDiseaseRecord } from './ChronicDiseasesForm';

const RegisterPatient = () => {
    const [step, setStep] = useState(1);
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '1',
        nationalId: '',
        phoneNumber: '',
        email: '',
        address: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        bloodGroup: '1'
    });
    const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
    const [allergyRecords, setAllergyRecords] = useState<AllergyRecord[]>([]);
    const [chronicDiseaseRecords, setChronicDiseaseRecords] = useState<ChronicDiseaseRecord[]>([]);

    const handleAddRecord = (record: MedicalRecord) => {
        setMedicalRecords([...medicalRecords, record]);
    };

    const handleAddAllergy = (record: AllergyRecord) => {
        setAllergyRecords([...allergyRecords, record]);
    };

    const handleRemoveAllergy = (index: number) => {
        setAllergyRecords(allergyRecords.filter((_, i) => i !== index));
    };

    const handleAddChronicDisease = (record: ChronicDiseaseRecord) => {
        setChronicDiseaseRecords([...chronicDiseaseRecords, record]);
    };

    const handleRemoveChronicDisease = (index: number) => {
        setChronicDiseaseRecords(chronicDiseaseRecords.filter((_, i) => i !== index));
    };

    const steps = [
        { num: 1, label: 'Personal Info' },
        { num: 2, label: 'Medical History' },
        { num: 3, label: 'Allergies' },
        { num: 4, label: 'Chronic Diseases' }
    ];

    return (
        <div className="flex flex-col h-full bg-slate-50 font-sans">
            {/* Topbar for the registration view */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-10">
                <div className="flex items-center gap-2 text-sm">
                    <span className="font-bold text-slate-900">Add New User</span>
                    <span className="text-slate-400">›</span>
                    <span className="text-slate-500">Patient</span>
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
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                        <Plus className="w-4 h-4" />
                        Add New User
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-[1000px] mx-auto">
                    {/* Header */}
                    <div className="mb-8 pl-2">
                        <h1 className="text-2xl font-extrabold text-slate-900 mb-8">Register New Patient</h1>

                        {/* Stepper */}
                        <div className="flex items-center justify-center mb-12 relative max-w-3xl mx-auto">
                            {/* Connecting lines */}
                            <div className="absolute top-5 left-8 right-8 h-[2px] bg-slate-200 -z-10 flex">
                                <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}></div>
                                <div className={`h-full bg-slate-200 transition-all duration-300`} style={{ width: `${(1 - (step - 1) / (steps.length - 1)) * 100}%` }}></div>
                            </div>

                            {steps.map((s) => {
                                const isCompleted = s.num < step;
                                const isActive = s.num === step;
                                return (
                                    <div key={s.num} className="flex-1 flex flex-col items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-3 transition-colors ${isCompleted ? 'bg-green-100 text-green-600 border-2 border-green-500' :
                                            isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-200' :
                                                'bg-white text-slate-400 border-2 border-slate-200'
                                            }`}>
                                            {isCompleted ? <Check className="w-5 h-5" /> : s.num}
                                        </div>
                                        <span className={`text-xs font-bold ${isCompleted ? 'text-green-500' :
                                            isActive ? 'text-blue-600' :
                                                'text-slate-400'
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
                            <PersonalInfoForm
                                info={personalInfo}
                                onChange={setPersonalInfo}
                            />
                        )}
                        {step === 2 && (
                            <MedicalHistoryForm
                                records={medicalRecords}
                                onAddRecord={handleAddRecord}
                            />
                        )}
                        {step === 3 && (
                            <AllergiesForm
                                records={allergyRecords}
                                onAddRecord={handleAddAllergy}
                                onRemoveRecord={handleRemoveAllergy}
                            />
                        )}
                        {step === 4 && (
                            <ChronicDiseasesForm
                                records={chronicDiseaseRecords}
                                onAddRecord={handleAddChronicDisease}
                                onRemoveRecord={handleRemoveChronicDisease}
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

                        <div className="flex items-center gap-1.5 mx-4">
                            <span className="text-slate-400 text-sm font-semibold mr-2">Step {step} of 4</span>
                            {[1, 2, 3, 4].map(num => (
                                <div key={num} className={`h-2 rounded-full transition-all ${num === step ? 'w-6 bg-blue-600' : 'w-2 bg-slate-200'
                                    }`} />
                            ))}
                        </div>

                        {step < 4 ? (
                            <button
                                onClick={() => setStep(step + 1)}
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors"
                            >
                                Next Step: {steps[step].label}
                                <ArrowRight className="w-4 h-4 border-l border-blue-500 pl-2 ml-1" />
                            </button>
                        ) : (
                            <button
                                onClick={() => alert('Registration complete! Data ready to send to API.')}
                                className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors shadow-[0_4px_14px_rgba(37,99,235,0.2)]"
                            >
                                Save
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RegisterPatient;
