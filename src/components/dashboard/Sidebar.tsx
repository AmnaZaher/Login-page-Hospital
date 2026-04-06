import {
    LayoutDashboard,
    Users,
    FileBox,
    CalendarCheck,
    Building2,
    ReceiptText,
    Settings,
    LogOut,
    X
} from 'lucide-react';
import { logout as apiLogout } from '../../api/auth';

interface SidebarProps {
    isOpen: boolean;
    activeTab?: string;
    onClose: () => void;
    onLogout: () => void;
    onTabChange?: (tab: string) => void;
}

const Sidebar = ({ isOpen, activeTab = 'dashboard', onClose, onLogout, onTabChange }: SidebarProps) => {
    const navItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'users', icon: Users, label: 'User Management' },
        { id: 'reports', icon: FileBox, label: 'Reports' },
        { id: 'appointments', icon: CalendarCheck, label: 'Appointments' },
        { id: 'departments', icon: Building2, label: 'Departments' },
        { id: 'billing', icon: ReceiptText, label: 'Billing' },
        { id: 'settings', icon: Settings, label: 'Setting' },
    ];

    return (
        <aside className={`w-[100px] bg-[#097FE7] flex flex-col items-center py-4 text-white h-screen shrink-0 shadow-lg z-30 transition-transform duration-300 absolute md:relative ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} top-0 left-0`}>
            {/* Close button for mobile */}
            <button
                onClick={onClose}
                className="absolute top-3 right-3 md:hidden text-white/70 hover:text-white"
            >
                <X size={20} />
            </button>

            <nav className="flex-1 w-full flex flex-col overflow-y-auto mt-2 scrollbar-none">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange && onTabChange(item.id)}
                        className={`flex flex-col items-center justify-center w-full py-2.5 gap-1 transition-all shrink-0
              ${activeTab === item.id ? 'opacity-100 bg-white/10 border-l-4 border-white' : 'opacity-60 hover:opacity-100 hover:bg-white/5 border-l-4 border-transparent'}`}
                    >
                        <item.icon size={22} strokeWidth={1.5} />
                        <span className="text-[9px] uppercase font-bold tracking-wider leading-tight text-center px-1">{item.label}</span>
                    </button>
                ))}
            </nav>

            <button
                onClick={async () => {
                    try {
                        const refreshToken = localStorage.getItem('refreshToken');
                        if (refreshToken) {
                            await apiLogout(refreshToken);
                        }
                    } catch (e) {
                        console.error('Logout error', e);
                    } finally {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        onLogout();
                    }
                }}
                className="flex flex-col items-center justify-center w-full py-3 opacity-60 hover:opacity-100 hover:text-red-300 transition-colors shrink-0 cursor-pointer"
            >
                <LogOut size={22} strokeWidth={1.5} />
                <span className="text-[9px] uppercase font-bold tracking-wider mt-1">Log out</span>
            </button>
        </aside>
    );
};

export default Sidebar;
