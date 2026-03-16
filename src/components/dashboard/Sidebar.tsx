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
        <aside className={`w-[100px] bg-[#097FE7] flex flex-col items-center py-8 text-white h-screen shrink-0 shadow-lg z-30 transition-transform duration-300 absolute md:relative ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} top-0 left-0`}>
            {/* Close button for mobile */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 md:hidden text-white/70 hover:text-white"
            >
                <X size={24} />
            </button>

            <div className="flex-1 w-full space-y-6 flex flex-col mt-4">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange && onTabChange(item.id)}
                        className={`flex flex-col items-center justify-center w-full py-3 gap-1.5 transition-all
              ${activeTab === item.id ? 'opacity-100 bg-white/10 border-l-4 border-white' : 'opacity-60 hover:opacity-100 hover:bg-white/5 border-l-4 border-transparent'}`}
                    >
                        <item.icon size={28} strokeWidth={1.5} />
                        <span className="text-[10px] uppercase font-bold tracking-widest">{item.label}</span>
                    </button>
                ))}
            </div>

            <button
                onClick={() => {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    onLogout();
                }}
                className="flex flex-col items-center justify-center w-full py-4 opacity-60 hover:opacity-100 hover:text-red-300 transition-colors mt-auto cursor-pointer"
            >
                <LogOut size={26} strokeWidth={1.5} />
                <span className="text-[10px] uppercase font-bold tracking-widest mt-1.5">Log out</span>
            </button>
        </aside>
    );
};

export default Sidebar;
