import { Camera, User } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export interface StaffBasicInfo {
    fullNameEng: string;
    nationalId: string;
    gender: string;
    fullNameAr: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    country: string;
    accountStatus: boolean;
    profilePhoto?: File;
}

interface BasicInfoFormProps {
    info: StaffBasicInfo;
    onChange: (info: StaffBasicInfo) => void;
}

const BasicInfoForm = ({ info, onChange }: BasicInfoFormProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        onChange({
            ...info,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (info.profilePhoto) {
            const url = URL.createObjectURL(info.profilePhoto);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
    }, [info.profilePhoto]);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onChange({
                ...info,
                profilePhoto: e.target.files[0]
            });
        }
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                        <User size={20} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-xl font-extrabold text-slate-900">Section 1: Basic User Information</h2>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-400">Account Status</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            name="accountStatus"
                            checked={info.accountStatus}
                            onChange={handleChange}
                            className="sr-only peer"
                        />
                        <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 lg:gap-16">
                {/* Image Upload Column */}
                <div className="flex flex-col items-center shrink-0 w-full md:w-auto">
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/png, image/jpeg, image/jpg"
                        className="hidden"
                        onChange={handlePhotoChange}
                    />
                    <div
                        className="w-40 h-40 rounded-full border-4 border-slate-100 bg-slate-200 flex flex-col items-center justify-center relative mb-4 overflow-hidden group cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {previewUrl ? (
                            <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover group-hover:opacity-75 transition-opacity" />
                        ) : (
                            <User size={48} className="text-slate-400 mb-2 group-hover:text-slate-500 transition-colors" />
                        )}
                        <button
                            type="button"
                            className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-full border-4 border-white transition-colors shadow-sm z-10"
                        >
                            <Camera size={18} />
                        </button>
                    </div>
                    <p className="text-sm font-semibold text-slate-500 text-center">
                        Upload professional headshot<br />
                        <span className="text-xs text-slate-400 font-medium">(JPG PNG up to 2MB)</span>
                    </p>
                </div>

                {/* Form Fields Column */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="col-span-1 border-b border-slate-100 md:border-none pb-4 md:pb-0">
                        <label className="block text-sm font-bold text-slate-900 mb-2">Full Name (English) *</label>
                        <input
                            type="text"
                            name="fullNameEng"
                            value={info.fullNameEng}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-slate-900 mb-2">National ID</label>
                        <input
                            type="text"
                            name="nationalId"
                            value={info.nationalId}
                            onChange={handleChange}
                            placeholder="XXX-XX-2343"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-slate-900 mb-2">Gender</label>
                        <select
                            name="gender"
                            value={info.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium appearance-none"
                        >
                            <option value="">Select Gender</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                        </select>
                    </div>
                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-slate-900 mb-2 text-right">* الاسم كامل (بالعربي)</label>
                        <input
                            type="text"
                            name="fullNameAr"
                            value={info.fullNameAr}
                            onChange={handleChange}
                            placeholder="ادخل الاسم كامل"
                            dir="rtl"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-slate-900 mb-2">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={info.dateOfBirth}
                            onChange={handleChange}
                            max={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-500 font-medium"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-slate-900 mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={info.email}
                            onChange={handleChange} 
                            placeholder="A.MOHAMED@host.com"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-slate-900 mb-2">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={info.phoneNumber}
                            onChange={handleChange}
                            placeholder="+1 (555) 334-8726"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-slate-900 mb-2">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={info.address}
                            onChange={handleChange}
                            placeholder="256 Oak Valley rd"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-slate-900 mb-2">City</label>
                        <input
                            type="text"
                            name="city"
                            value={info.city}
                            onChange={handleChange}
                            placeholder="Enter your City"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-slate-900 mb-2">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={info.country}
                            onChange={handleChange}
                            placeholder="Enter your Country"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasicInfoForm;
