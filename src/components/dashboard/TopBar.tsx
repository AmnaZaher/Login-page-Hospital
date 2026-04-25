import React from 'react';
import { Menu, Search } from 'lucide-react';
import { AddUserButton } from './shared/AddUserButton';

interface TopBarProps {
    title?: React.ReactNode;
    onMenuClick: () => void;
    onAddUserClick?: (type: 'patient' | 'staff', role?: string) => void;
    onSearch?: (query: string) => void;         // kept for compatibility
    searchPlaceholder?: string;                  // kept for compatibility
    showAddUser?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
    title = 'Dashboard',
    onMenuClick,
    onAddUserClick,
    onSearch,
    searchPlaceholder,
    showAddUser = true,
}) => {
    return (
        <header className="px-4 md:px-10 py-4 md:py-6 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-10 w-full overflow-visible">
            {/* Left Side */}
            <div className="flex items-center gap-4 min-w-0">
                {/* Mobile Menu Button */}
                <button
                    className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg md:hidden shrink-0"
                    onClick={onMenuClick}
                >
                    <Menu size={24} />
                </button>

                {/* Title */}
                <h1 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight shrink-0 truncate">
                    {title}
                </h1>
            </div>

            {/* Search Part - Only if onSearch is provided */}
            {onSearch && (
                <div className="hidden md:flex flex-1 max-w-2xl mx-10">
                    <div className="relative w-full group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                            placeholder={searchPlaceholder || "Search..."}
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                </div>
            )}

            {/* Right Side */}
            <div className="flex items-center gap-3 md:gap-6 shrink-0 ml-auto">
                {/* Mobile Search Button (Optional, not requested but good for UX) */}
                {/* {onSearch && <button className="p-2 text-slate-400 md:hidden"><Search size={22} /></button>} */}
                
                {/* Add User Button */}
                {showAddUser && onAddUserClick && (
                    <AddUserButton
                        onClick={(type, role) => {
                            onAddUserClick(type, role);
                        }}
                    />
                )}
            </div>
        </header>
    );
};

export default TopBar;