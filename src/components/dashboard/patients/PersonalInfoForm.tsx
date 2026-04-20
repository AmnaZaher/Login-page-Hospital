import { User, Activity, FileText } from 'lucide-react';

export interface PersonalInfo {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    nationalId: string;
    phoneNumber: string;
    email: string;
    address: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    bloodGroup: string;
}

interface PersonalInfoFormProps {
    info: PersonalInfo;
    onChange: (info: PersonalInfo) => void;
}

const PersonalInfoForm = ({ info, onChange }: PersonalInfoFormProps) => {

    const handleChange = (field: keyof PersonalInfo, value: string) => {
        onChange({ ...info, [field]: value });
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
            <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Personal Information
                </h2>
                <p className="text-slate-500 text-sm">Enter the patient's demographic and contact details</p>
            </div>

            <div className="space-y-8">
                {/* Name Section */}
                <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider bg-slate-50 px-3 py-1.5 rounded-lg inline-flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400" />
                        Identity Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                                value={info.firstName}
                                onChange={(e) => handleChange('firstName', e.target.value)}
                                placeholder="John"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Middle Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                                value={info.middleName}
                                onChange={(e) => handleChange('middleName', e.target.value)}
                                placeholder="Edward"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                                value={info.lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)}
                                placeholder="Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                                value={info.dateOfBirth}
                                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
                            <select
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 bg-white"
                                value={info.gender}
                                onChange={(e) => handleChange('gender', e.target.value)}
                            >
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                                <option value="3">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">National ID</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                                value={info.nationalId}
                                onChange={(e) => handleChange('nationalId', e.target.value)}
                                placeholder="e.g. 1234567890"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact info */}
                <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider bg-slate-50 px-3 py-1.5 rounded-lg inline-flex items-center gap-2 mt-4">
                        <User className="w-4 h-4 text-slate-400" />
                        Contact Info
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                                value={info.phoneNumber}
                                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                placeholder="+1 234 567 890"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                                value={info.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                placeholder="john.doe@example.com"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Address</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                                value={info.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                                placeholder="123 Main St, Springfield, IL"
                            />
                        </div>
                    </div>
                </div>

                {/* Emergency & Medical Basics */}
                <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider bg-slate-50 px-3 py-1.5 rounded-lg inline-flex items-center gap-2 mt-4">
                        <Activity className="w-4 h-4 text-slate-400" />
                        Emergency & Basics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Emergency Contact Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                                value={info.emergencyContactName}
                                onChange={(e) => handleChange('emergencyContactName', e.target.value)}
                                placeholder="Jane Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Emergency Contact Phone</label>
                            <input
                                type="tel"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                                value={info.emergencyContactPhone}
                                onChange={(e) => handleChange('emergencyContactPhone', e.target.value)}
                                placeholder="+1 987 654 321"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Blood Group</label>
                            <select
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 bg-white"
                                value={info.bloodGroup}
                                onChange={(e) => handleChange('bloodGroup', e.target.value)}
                            >
                                <option value="1">A+</option>
                                <option value="2">A-</option>
                                <option value="3">B+</option>
                                <option value="4">B-</option>
                                <option value="5">AB+</option>
                                <option value="6">AB-</option>
                                <option value="7">O+</option>
                                <option value="8">O-</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoForm;
