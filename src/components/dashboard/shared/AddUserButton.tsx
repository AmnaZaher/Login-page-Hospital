import { useState, useRef, useEffect } from 'react';
import { Plus, ChevronDown } from 'lucide-react';

interface AddUserButtonProps {
    onClick: (type: 'patient' | 'staff', role?: string) => void;
}

export const AddUserButton = ({ onClick }: AddUserButtonProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isStaffOpen, setIsStaffOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
                setIsStaffOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const STAFF_ROLES = [
        { label: 'Doctor', desc: 'Physician / Specialist' },
        { label: 'Nurse', desc: 'RN / LPN / NP' },
        { label: 'Lab Technician', desc: 'Laboratory staff' },
        { label: 'Radiologist', desc: 'Imaging specialist' },
        { label: 'Pharmacist', desc: 'Pharmacy staff' },
    ];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-xl font-bold shadow-[0_4px_14px_rgba(37,99,235,0.2)] transition-all active:scale-95 text-sm md:text-base"
            >
                <Plus size={18} />
                <span className="hidden sm:inline">Add New User</span>
                <ChevronDown size={16} className={`ml-0 md:ml-1 opacity-70 hidden sm:block transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-slate-100 py-2 z-50 overflow-hidden">
                    {/* Patient option */}
                    <button
                        onClick={() => {
                            setIsDropdownOpen(false);
                            setIsStaffOpen(false);
                            onClick('patient');
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-2"
                    >
                        Patient
                    </button>

                    {/* Divider */}
                    <div className="border-t border-slate-100 my-1" />

                    {/* Hospital Staff expandable */}
                    <button
                        onClick={() => setIsStaffOpen(!isStaffOpen)}
                        className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between"
                    >
                        <span>Hospital Staff</span>
                        <svg
                            className={`w-4 h-4 text-slate-400 transition-transform ${isStaffOpen ? 'rotate-90' : ''}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Staff sub-options */}
                    {isStaffOpen && (
                        <div className="bg-slate-50 border-t border-slate-100">
                            {STAFF_ROLES.map((role) => (
                                <button
                                    key={role.label}
                                    onClick={() => {
                                        setIsDropdownOpen(false);
                                        setIsStaffOpen(false);
                                        onClick('staff', role.label);
                                    }}
                                    className="w-full text-left pl-7 pr-4 py-2 hover:bg-blue-600 hover:text-white transition-colors group"
                                >
                                    <span className="text-sm font-semibold text-slate-700 group-hover:text-white block">{role.label}</span>
                                    <span className="text-[11px] text-slate-400 group-hover:text-blue-100">{role.desc}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
