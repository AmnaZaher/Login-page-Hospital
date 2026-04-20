import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { AddUserButton } from './shared/AddUserButton';

interface TopBarProps {
    title?: React.ReactNode;
    searchPlaceholder?: string;
    onMenuClick: () => void;
    onAddUserClick?: (type: 'patient' | 'staff', role?: string) => void;
    showSearch?: boolean;
    showNotifications?: boolean;
    showAddUser?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
    title = 'Dashboard',
    searchPlaceholder = 'Search users...',
    onMenuClick,
    onAddUserClick,
    showSearch = true,
    showNotifications = true,
    showAddUser = true,
}) => {
    return (
        <header className="px-4 md:px-10 py-4 md:py-6 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-10 w-full overflow-visible">
            {/* Left Side */}
            <div className="flex items-center gap-4 md:gap-12 flex-1 min-w-0">
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

                {/* Search */}
                {showSearch && (
                    <div className="relative max-w-md w-full ml-10 hidden md:block">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-900"
                        />
                    </div>
                )}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3 md:gap-6 shrink-0">
                {/* Notifications */}
                {showNotifications && (
                    <button className="relative text-slate-500 hover:text-slate-800 transition-colors">
                        <Bell size={24} />
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                            2
                        </span>
                    </button>
                )}

                {/* Divider */}
                {showAddUser && showNotifications && (
                    <div className="w-px h-6 md:h-8 bg-slate-200 mx-0 md:mx-1"></div>
                )}

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