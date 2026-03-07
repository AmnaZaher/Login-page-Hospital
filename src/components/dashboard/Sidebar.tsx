import {
    LayoutDashboard,
    Users,
    FileBox,
    CalendarCheck,
    Building2,
    ReceiptText,
    Settings,
    LogOut
} from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', active: true },
        { icon: Users, label: 'User Management', active: false },
        { icon: FileBox, label: 'Reports', active: false },
        { icon: CalendarCheck, label: 'Appointments', active: false },
        { icon: Building2, label: 'Departments', active: false },
        { icon: ReceiptText, label: 'Billing', active: false },
        { icon: Settings, label: 'Setting', active: false },
    ];

    return (
        <aside className="w-[100px] bg-[#097FE7] flex flex-col items-center py-8 text-white h-screen sticky top-0 shrink-0 shadow-lg z-20 transition-colors">
            <div className="flex-1 w-full space-y-6 flex flex-col mt-4">
                {navItems.map((item, index) => (
                    <button
                        key={index}
                        className={`flex flex-col items-center justify-center w-full py-3 gap-1.5 transition-all
              ${item.active ? 'opacity-100 bg-white/10 border-l-4 border-white' : 'opacity-60 hover:opacity-100 hover:bg-white/5 border-l-4 border-transparent'}`}
                    >
                        <item.icon size={28} strokeWidth={1.5} />
                        <span className="text-[10px] uppercase font-bold tracking-widest">{item.label}</span>
                    </button>
                ))}
            </div>

            <button className="flex flex-col items-center justify-center w-full py-4 opacity-60 hover:opacity-100 hover:text-red-300 transition-colors mt-auto">
                <LogOut size={26} strokeWidth={1.5} />
                <span className="text-[10px] uppercase font-bold tracking-widest mt-1.5">Log out</span>
            </button>
        </aside>
    );
};

export default Sidebar;
