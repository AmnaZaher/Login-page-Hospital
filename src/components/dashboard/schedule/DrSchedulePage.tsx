import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import TopBar from '../TopBar';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Schedule {
    id: number;
    doctorName: string;
    initials: string;
    specialty: string;
    clinic: string;
    day: string;
    fromTime: string;
    toTime: string;
}

interface DrSchedulePageProps {
    onMenuClick: () => void;
    onAddUserClick: (type: 'patient' | 'staff', role?: string) => void;
}

const DAY_OPTIONS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const DAY_COLORS: Record<string, string> = {
    Monday: 'bg-blue-500 text-white',
    Tuesday: 'bg-blue-500 text-white',
    Wednesday: 'bg-green-500 text-white',
    Thursday: 'bg-orange-500 text-white',
    Friday: 'bg-blue-500 text-white',
    Saturday: 'bg-pink-500 text-white',
    Sunday: 'bg-slate-500 text-white',
};

// ─── Mock data ───────────────────────────────────────────────────────────────
const MOCK_SCHEDULES: Schedule[] = [
    { id: 1, doctorName: 'Dr. Sarah Jenkins', initials: 'SJ', specialty: 'Cardiologist', clinic: 'Cardiology Unit', day: 'Monday', fromTime: '08:00 AM', toTime: '04:00 PM' },
    { id: 2, doctorName: 'Dr. Michael Chen', initials: 'MC', specialty: 'Pediatrician', clinic: 'Pediatrics Ward', day: 'Tuesday', fromTime: '09:00 AM', toTime: '05:00 PM' },
    { id: 3, doctorName: 'Dr. Elena Rodriguez', initials: 'ER', specialty: 'Surgeon', clinic: 'Emergency Center', day: 'Friday', fromTime: '10:00 PM', toTime: '06:00 AM' },
];

// ─── Reusable Components ─────────────────────────────────────────────────────

const SelectField = ({
    label,
    options,
    value,
    onChange,
    placeholder,
}: {
    label: string;
    options: string[];
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
}) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
            {label}
        </label>
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-9"
            >
                <option value="">{placeholder}</option>
                {options.map((o) => (
                    <option key={o} value={o}>{o}</option>
                ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
    </div>
);

const TimeField = ({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
            {label}
        </label>
        <input
            type="time"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="--:-- --"
            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
);

const InputField = ({
    label,
    placeholder,
    value,
    onChange,
}: {
    label: string;
    placeholder: string;
    value: string;
    onChange: (v: string) => void;
}) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
            {label}
        </label>
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400"
        />
    </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const DrSchedulePage = ({ onMenuClick, onAddUserClick}: DrSchedulePageProps) => {
    //const navigate = useNavigate();
    // Create form state
    const [doctor, setDoctor] = useState('');
    const [clinic, setClinic] = useState('');
    const [day, setDay] = useState('Sunday');
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');

    // Filter state
    const [filterDoctor, setFilterDoctor] = useState('');
    const [filterClinic, setFilterClinic] = useState('');
    const [filterStart, setFilterStart] = useState('');
    const [filterEnd, setFilterEnd] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;

    const schedules = MOCK_SCHEDULES;

    return (
        <div className="flex flex-col min-h-screen bg-[#f1f5f9]">
            <TopBar
                title="DR. Schedule"
                onMenuClick={onMenuClick}
                showAddUser={true}
                onAddUserClick={onAddUserClick}
                // onAddUserClick={() => {
                //     navigate('/dashboard/users/');
                // }}
            />
            {/* ── Main Content ── */}
            <div className="flex flex-col gap-5 p-6 md:p-8">

                {/* Breadcrumb + Title */}
                <div>
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
                        <span>Dashboards</span>
                        <span className="text-slate-300">›</span>
                        <span className="text-blue-600">Doctor Management</span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        Doctor Schedule Management
                    </h2>
                    <p className="text-sm text-slate-400 mt-0.5 font-medium">
                        Configure hospital shift rosters and clinical rotations
                    </p>
                </div>

                {/* ── Create Schedule Card ── */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    {/* Card header */}
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                            <Plus size={12} className="text-white" strokeWidth={3} />
                        </div>
                        <h3 className="text-sm font-bold text-slate-800">Create Schedule</h3>
                    </div>

                    {/* Row 1: Doctor / Clinic / Day */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <SelectField
                            label="Doctor"
                            placeholder="Select Doctor"
                            options={['Dr. Sarah Jenkins', 'Dr. Michael Chen', 'Dr. Elena Rodriguez']}
                            value={doctor}
                            onChange={setDoctor}
                        />
                        <SelectField
                            label="Clinic"
                            placeholder="Select Clinic"
                            options={['Cardiology Unit', 'Pediatrics Ward', 'Emergency Center']}
                            value={clinic}
                            onChange={setClinic}
                        />
                        <SelectField
                            label="Day"
                            placeholder="Select Day"
                            options={DAY_OPTIONS}
                            value={day}
                            onChange={setDay}
                        />
                    </div>

                    {/* Row 2: From Time / To Time / Button */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <TimeField label="From Time" value={fromTime} onChange={setFromTime} />
                        <TimeField label="To Time" value={toTime} onChange={setToTime} />
                        <div className="flex flex-col justify-end">
                            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-2.5 rounded-lg transition-all text-sm">
                                <Plus size={16} strokeWidth={2.5} />
                                Add Schedule
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Filter Card ── */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <InputField
                            label="Doctor"
                            placeholder="Select Doctor"
                            value={filterDoctor}
                            onChange={setFilterDoctor}
                        />
                        <SelectField
                            label="Clinic"
                            placeholder="Select Clinic"
                            options={['Cardiology Unit', 'Pediatrics Ward', 'Emergency Center']}
                            value={filterClinic}
                            onChange={setFilterClinic}
                        />
                        <InputField
                            label="Start Date"
                            placeholder="mm, dd, yyyy"
                            value={filterStart}
                            onChange={setFilterStart}
                        />
                        <InputField
                            label="End Date"
                            placeholder="mm, dd, yyyy"
                            value={filterEnd}
                            onChange={setFilterEnd}
                        />
                    </div>
                </div>

                {/* ── Table Card ── */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 bg-white">
                                    {['Doctor Name', 'Clinic', 'Day', 'From Time', 'To Time', 'Actions'].map((col) => (
                                        <th
                                            key={col}
                                            className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500"
                                        >
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {schedules.map((s) => (
                                    <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                                        {/* Doctor */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                                    <span className="text-[10px] font-extrabold text-blue-600">
                                                        {s.initials}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-800 text-sm leading-tight">
                                                        {s.doctorName}
                                                    </p>
                                                    <p className="text-xs text-slate-400">{s.specialty}</p>
                                                </div>
                                            </div>
                                        </td>
                                        {/* Clinic */}
                                        <td className="px-5 py-4 text-slate-600 font-medium">{s.clinic}</td>
                                        {/* Day */}
                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-block px-3 py-1 rounded text-xs font-bold ${DAY_COLORS[s.day] ?? 'bg-slate-100 text-slate-600'}`}
                                            >
                                                {s.day}
                                            </span>
                                        </td>
                                        {/* From Time */}
                                        <td className="px-5 py-4 text-slate-600 font-medium">{s.fromTime}</td>
                                        {/* To Time */}
                                        <td className="px-5 py-4 text-slate-600 font-medium">{s.toTime}</td>
                                        {/* Actions */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <button className="p-1.5 rounded text-blue-500 hover:bg-blue-50 transition-colors">
                                                    <Pencil size={15} />
                                                </button>
                                                <button className="p-1.5 rounded text-red-500 hover:bg-red-50 transition-colors">
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-200">
                        <p className="text-xs text-slate-400 font-medium">
                            Showing 3 of 42 active schedules
                        </p>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                className="w-8 h-8 flex items-center justify-center rounded text-slate-400 hover:bg-slate-100 transition-colors"
                            >
                                <ChevronLeft size={15} />
                            </button>
                            {[1, 2, 3].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setCurrentPage(p)}
                                    className={`w-8 h-8 rounded text-xs font-bold transition-colors ${
                                        currentPage === p
                                            ? 'bg-blue-600 text-white'
                                            : 'text-slate-500 hover:bg-slate-100'
                                    }`}
                                >
                                    {p}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                className="w-8 h-8 flex items-center justify-center rounded text-slate-400 hover:bg-slate-100 transition-colors"
                            >
                                <ChevronRight size={15} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrSchedulePage;