import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../TopBar';
import { patientApi } from '../../../api/patient';
import { UserRound, FileText, MapPin, Users } from 'lucide-react';

export default function EditPatientProfilePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        nameArabic: '',
        nameEnglish: '',
        nationalId: '',
        gender: 'Female',
        dateOfBirth: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        country: '',
        nextOfKinName: '',
        nextOfKinRelationship: '',
        nextOfKinPhone: '',
        status: 'Active'
    });

    // Display fields for the left panel
    const [displayData, setDisplayData] = useState({
        name: '',
        patientId: '',
        lastVisit: '',
        bloodType: '',
        insuranceType: '',
        avatar: ''
    });

    useEffect(() => {
        const fetchPatient = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const data = await patientApi.getPatientById(id);
                if (data) {
                    setFormData({
                        nameArabic: data.nameArabic || '',
                        nameEnglish: data.name || '',
                        nationalId: data.nationalId || '',
                        gender: data.gender || 'Not Specified',
                        dateOfBirth: data.dateOfBirth || '',
                        phone: data.phone || '',
                        email: data.email || '',
                        address: data.address || '',
                        city: data.city || '',
                        country: data.country || '',
                        nextOfKinName: data.nextOfKin?.name || '',
                        nextOfKinRelationship: data.nextOfKin?.relationship || '',
                        nextOfKinPhone: data.nextOfKin?.phone || '',
                        status: data.status === 'Disabled' ? 'Disabled' : 'Active'
                    });
                    
                    setDisplayData({
                        name: data.name || 'Unknown',
                        patientId: data.patientId || id,
                        lastVisit: data.lastVisit || 'N/A',
                        bloodType: data.bloodType || 'N/A',
                        insuranceType: data.insuranceType || 'N/A',
                        avatar: data.avatar || ''
                    });
                } else {
                    setError('Patient not found.');
                }
            } catch (err) {
                console.error("Failed to fetch patient:", err);
                setError('Failed to fetch patient details.');
            } finally {
                setLoading(false);
            }
        };

        fetchPatient();
    }, [id]);

    const handleSave = async () => {
        if (!id) return;
        setSaving(true);
        setError('');
        try {
            const formatDate = (dateStr: string) => {
                if (!dateStr) return '';
                if (dateStr.includes('T')) return dateStr;
                
                // Handle YYYY-MM-DD (native picker)
                if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                    return `${dateStr}T00:00:00`;
                }
                
                // Handle MM-DD-YYYY or MM/DD/YYYY
                const parts = dateStr.split(/[-/]/);
                if (parts.length === 3) {
                    let [m, d, y] = parts;
                    // Detect if YYYY is at the start (already handled but just in case)
                    if (m.length === 4) return `${m}-${d.padStart(2, '0')}-${y.padStart(2, '0')}T00:00:00`;
                    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}T00:00:00`;
                }
                return dateStr;
            };

            // Reconstruct payload as expected by API
            const payload = {
                fullNameArabic: formData.nameArabic,
                fullNameEnglish: formData.nameEnglish,
                nationalId: formData.nationalId,
                gender: formData.gender === 'Male' ? 1 : formData.gender === 'Female' ? 2 : 0,
                dateOfBirth: formatDate(formData.dateOfBirth),
                phoneNumber: formData.phone,
                email: formData.email,
                address: formData.address,
                city: formData.city,
                country: formData.country,
                isActive: formData.status === 'Active',
            };
            
            await patientApi.updatePatient(id, payload);
            navigate(`/dashboard/users/patient/${id}`);
        } catch (err: any) {
            console.error("Failed to save changes:", err);
            setError(err?.message || 'Failed to save changes.');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm('Are you sure you want to deactivate/delete this account?')) return;
        if (!id) return;
        setSaving(true);
        try {
            await patientApi.deletePatient(id);
            navigate('/dashboard/users');
        } catch (err: any) {
            console.error("Failed to delete account:", err);
            setError(err?.message || 'Failed to delete account.');
            setSaving(false);
        }
    };

    const handleChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const breadcrumb = (
        <span className="text-slate-400 text-sm font-bold tracking-wider">
            <span
                className="cursor-pointer hover:text-slate-600 transition-colors uppercase"
                onClick={() => navigate('/dashboard/users')}
            >
                User Managment
            </span>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-blue-600 uppercase">Edit Patient Profile</span>
        </span>
    );

    if (loading) {
        return (
            <div className="flex flex-col h-full bg-slate-50 w-full relative">
                <TopBar 
                    title={breadcrumb} 
                    onMenuClick={() => {}} 
                    showAddUser={false}
                />
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 h-full w-full bg-slate-50 relative font-sans overflow-hidden">
            <TopBar 
                title={breadcrumb} 
                onMenuClick={() => {}} 
                showAddUser={false} 
            />

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 pb-10">
                    
                    {/* Left Column */}
                    <div className="w-full lg:w-[320px] shrink-0 space-y-6">
                        {/* Profile Info */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col items-center">
                            <div className="relative mb-4">
                                <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
                                    {displayData.avatar ? (
                                        <img src={displayData.avatar} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <UserRound size={40} className="text-slate-400" />
                                    )}
                                </div>
                                <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                            </div>
                            
                            <h2 className="text-lg font-extrabold text-slate-900 uppercase tracking-wide mb-1">{displayData.name}</h2>
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg mb-6">
                                ID: {displayData.patientId}
                            </span>

                            <div className="w-full grid grid-cols-3 gap-2 border-t border-slate-100 pt-6">
                                <div className="text-center">
                                    <p className="text-[9px] font-black tracking-widest text-slate-400 uppercase mb-1">Last Visit</p>
                                    <p className="text-xs font-bold text-slate-900">{displayData.lastVisit}</p>
                                </div>
                                <div className="text-center border-l border-slate-100 pl-2">
                                    <p className="text-[9px] font-black tracking-widest text-slate-400 uppercase mb-1">Blood Type</p>
                                    <p className="text-xs font-bold text-red-500">{displayData.bloodType}</p>
                                </div>
                                <div className="text-center border-l border-slate-100 pl-2">
                                    <p className="text-[9px] font-black tracking-widest text-slate-400 uppercase mb-1">Insurance</p>
                                    <p className="text-xs font-bold text-red-500">{displayData.insuranceType}</p>
                                </div>
                            </div>
                        </div>

                        {/* Account Settings */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <h3 className="text-xs font-black tracking-widest text-slate-500 uppercase mb-5">ACCOUNT SETTINGS</h3>
                            
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl mb-4 border border-slate-100">
                                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                    <UserRound size={16} className="text-slate-400" /> Account Status
                                </div>
                                <button 
                                    onClick={() => handleChange('status', formData.status === 'Active' ? 'Disabled' : 'Active')}
                                    className={`w-11 h-6 rounded-full transition-colors relative ${formData.status === 'Active' ? 'bg-blue-600' : 'bg-slate-300'}`}
                                >
                                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${formData.status === 'Active' ? 'right-1' : 'left-1'}`}></div>
                                </button>
                            </div>

                            <button 
                                onClick={handleDeleteAccount}
                                disabled={saving}
                                className="w-full py-3.5 flex items-center justify-center gap-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl transition-colors disabled:opacity-50">
                                <UserRound size={14} /> Deactivate Account
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Forms */}
                    <div className="flex-1 space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100">
                                {error}
                            </div>
                        )}

                        {/* Personal Information */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="text-blue-600 bg-blue-50 p-2 rounded-lg"><FileText size={18} /></div>
                                <h3 className="text-lg font-extrabold text-slate-900">Personal Information</h3>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2">Full Name Arabic</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        value={formData.nameArabic}
                                        onChange={(e) => handleChange('nameArabic', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2">Full Name English</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        value={formData.nameEnglish}
                                        onChange={(e) => handleChange('nameEnglish', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2">National ID</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        value={formData.nationalId}
                                        onChange={(e) => handleChange('nationalId', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2">Gender</label>
                                    <select 
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                                        value={formData.gender}
                                        onChange={(e) => handleChange('gender', e.target.value)}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2">Date of Birth</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        value={formData.dateOfBirth}
                                        onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                                        placeholder="MM/DD/YYYY"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2">Phone Number</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        value={formData.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-slate-500 mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact & Address */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="text-blue-600 bg-blue-50 p-2 rounded-lg"><MapPin size={18} /></div>
                                <h3 className="text-lg font-extrabold text-slate-900">Contact & Address</h3>
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2">Street Address</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        value={formData.address}
                                        onChange={(e) => handleChange('address', e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-2">City</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                            value={formData.city}
                                            onChange={(e) => handleChange('city', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-2">Country</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                            value={formData.country}
                                            onChange={(e) => handleChange('country', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Next of Kin */}
                        <div className="bg-[#faebeb] rounded-2xl border border-red-50 p-6 md:p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Users size={100} className="text-red-900" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="text-red-700 bg-red-100 p-2 rounded-lg"><Users size={18} /></div>
                                    <h3 className="text-lg font-extrabold text-red-900">Next of Kin (Emergency Contact)</h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-2">Contact Name</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-white border border-white rounded-xl px-4 py-3 text-sm font-medium text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                                            value={formData.nextOfKinName}
                                            onChange={(e) => handleChange('nextOfKinName', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-2">Relationship</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-white border border-white rounded-xl px-4 py-3 text-sm font-medium text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                                            value={formData.nextOfKinRelationship}
                                            onChange={(e) => handleChange('nextOfKinRelationship', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-2">Phone Number</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-white border border-white rounded-xl px-4 py-3 text-sm font-medium text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                                            value={formData.nextOfKinPhone}
                                            onChange={(e) => handleChange('nextOfKinPhone', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 pt-4">
                            <button 
                                onClick={() => navigate(`/dashboard/users/patient/${id}`)}
                                className="text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors px-4 py-2.5"
                            >
                                Discard Changes
                            </button>
                            <button 
                                onClick={handleSave}
                                disabled={saving}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 px-6 rounded-xl transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                            >
                                {saving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Saving...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
