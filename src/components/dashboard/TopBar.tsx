import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Plus, ChevronDown, Menu } from 'lucide-react';

interface TopBarProps {
    onMenuClick: () => void;
    onAddUserClick?: () => void;
}

const TopBar = ({ onMenuClick, onAddUserClick }: TopBarProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="px-4 md:px-10 py-4 md:py-6 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-10 w-full overflow-visible">
            <div className="flex items-center gap-4 md:gap-12 flex-1 min-w-0">
                <button
                    className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg md:hidden shrink-0"
                    onClick={onMenuClick}
                >
                    <Menu size={24} />
                </button>
                <h1 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight shrink-0 truncate">Dashboard</h1>

                <div className="relative max-w-md w-full ml-10 hidden md:block">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-900"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6 shrink-0">
                <button className="relative text-slate-500 hover:text-slate-800 transition-colors">
                    <Bell size={24} />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                        2
                    </span>
                </button>

                <div className="w-px h-6 md:h-8 bg-slate-200 mx-0 md:mx-1"></div>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-xl font-bold shadow-[0_4px_14px_rgba(37,99,235,0.2)] transition-all active:scale-95"
                    >
                        <Plus size={18} />
                        <span className="hidden md:inline">Add New User</span>
                        <ChevronDown size={16} className={`ml-0 md:ml-1 opacity-70 hidden sm:block transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col z-50">
                            <div className="p-2 space-y-2 pb-0">
                                <button
                                    className="w-full bg-[#5294D2] hover:bg-blue-500 text-white font-semibold py-2 rounded-md text-sm transition-colors"
                                    onClick={() => {
                                        setIsDropdownOpen(false);
                                        if (onAddUserClick) onAddUserClick();
                                    }}
                                >
                                    Patient
                                </button>
                                <button className="w-full bg-[#5294D2] hover:bg-blue-500 text-white font-semibold py-2 rounded-t-md text-sm transition-colors">
                                    Hospital Staff
                                </button>
                            </div>
                            <div className="flex flex-col text-slate-400 text-sm font-medium bg-slate-50 border-t border-slate-200 mt-0 mx-2 mb-2 rounded-b-md">
                                <button className="w-full py-2 border-b border-slate-200 hover:bg-slate-100 transition-colors">Doctor</button>
                                <button className="w-full py-2 border-b border-slate-200 hover:bg-slate-100 transition-colors">Nurse</button>
                                <button className="w-full py-2 border-b border-slate-200 hover:bg-slate-100 transition-colors">Lab Technician</button>
                                <button className="w-full py-2 border-b border-slate-200 hover:bg-slate-100 transition-colors">Radiologist</button>
                                <button className="w-full py-2 rounded-b-md hover:bg-slate-100 transition-colors">Pharmacist</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopBar;
