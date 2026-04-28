import React, { useEffect, useState, useCallback } from 'react';
import {
    Search, Edit2, Trash2, Loader2, CalendarCheck,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import {
    listAppointments, deleteAppointment, type Appointment
} from '../../../api/appointments';
import { getClinics } from '../../../api/clinics';
import { staffApi } from '../../../api/staff';

/* ─────────────── helpers ─────────────── */
const STATUS_MAP: Record<number, { label: string; color: string; bg: string }> = {
    0: { label: 'Scheduled', color: '#1A6FC4', bg: '#EFF6FF' },
    1: { label: 'Completed', color: '#16a34a', bg: '#F0FDF4' },
    2: { label: 'No Show',   color: '#b45309', bg: '#FFFBEB' },
    3: { label: 'Cancelled', color: '#dc2626', bg: '#FEF2F2' },
};

const STATUS_OPTIONS = [
    { value: '', label: 'All Statuses' },
    { value: '0', label: 'Scheduled' },
    { value: '1', label: 'Completed' },
    { value: '2', label: 'No Show' },
    { value: '3', label: 'Cancelled' },
];

function StatusBadge({ status }: { status: number }) {
    const s = STATUS_MAP[status] ?? { label: 'Unknown', color: '#64748b', bg: '#F1F5F9' };
    return (
        <span style={{ color: s.color, background: s.bg }}
            className="text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
            {s.label}
        </span>
    );
}

function initials(name: string) {
    return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function fmtDateTime(iso: string) {
    try {
        const d = new Date(iso);
        return {
            date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        };
    } catch { return { date: iso, time: '' }; }
}

import { useNavigate } from 'react-router-dom';

/* ─────────────── Main Page ─────────────── */


const AppointmentManagementPage: React.FC = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    // Filters
    const [search, setSearch] = useState('');
    const [filterDoctor, setFilterDoctor] = useState('');
    const [filterClinic, setFilterClinic] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterFrom, setFilterFrom] = useState('');
    const [filterTo, setFilterTo] = useState('');

    // Dropdowns for modal
    const [doctors, setDoctors] = useState<any[]>([]);
    const [clinics, setClinics] = useState<any[]>([]);

    /* ── Fetch appointments ── */
    const fetchAppointments = useCallback(async () => {
        setLoading(true);
        try {
            const res = await listAppointments({
                PageIndex: page - 1,
                PageSize: pageSize,
                SearchKey: search || undefined,
                search: search || undefined,
                DoctorId: filterDoctor || undefined,
                ClinicId: filterClinic || undefined,
                Status: filterStatus !== '' ? filterStatus : undefined,
                StartDate: filterFrom || undefined,
                EndDate: filterTo || undefined,
            });
            const raw: any = res;
            // Normalise various API shapes
            const list: Appointment[] =
                raw?.data?.appointments ??
                raw?.data?.data ??
                raw?.data?.items ??
                (Array.isArray(raw?.data) ? raw.data : []) ??
                raw?.appointments ??
                raw?.items ??
                (Array.isArray(raw) ? raw : []) ??
                [];
            const total: number =
                raw?.data?.totalCount ??
                raw?.data?.total ??
                raw?.totalCount ??
                list.length;
            setAppointments(list);
            setTotalCount(total);
        } catch (err) {
            console.error('Failed to fetch appointments:', err);
            setAppointments([]);
        } finally {
            setLoading(false);
        }
    }, [page, search, filterDoctor, filterClinic, filterStatus, filterFrom, filterTo]);

    /* ── Fetch sidebar data (doctors, clinics, patients) ── */
    useEffect(() => {
        const load = async () => {
            try {
                const [drRes, clinicRes] = await Promise.all([
                    staffApi.getStaffs({ PageIndex: 0, PageSize: 100 }),
                    getClinics({ PageIndex: 0, PageSize: 100 }),
                ]);

                const staffList = (drRes as any)?.staffs ?? (drRes as any)?.items ?? (drRes as any)?.data ?? (drRes as any)?.data?.data ?? (Array.isArray(drRes) ? drRes : []);
                const drList = staffList.filter((s: any) => {
                    const rolesMap: Record<string, string> = { '1': 'Admin', '2': 'Doctor', '3': 'Nurse', '4': 'Pharmacist', '5': 'Radiologist', '6': 'Lab Technician' };
                    let r = s.role ?? s.Role ?? s.roleName ?? s.RoleName ?? s.roleId ?? s.RoleId ?? s.staffRole ?? s.StaffRole;
                    let rStr = typeof r === 'object' ? (r?.name ?? r?.Name ?? rolesMap[r?.id ?? r?.Id]) : String(r);
                    rStr = rolesMap[rStr] ?? rStr;
                    
                    if (!rStr || rStr === 'undefined') {
                        for (const k in s) {
                            if (k.toLowerCase().includes('role')) {
                                const val = s[k];
                                rStr = typeof val === 'object' ? (val?.name ?? val?.Name ?? rolesMap[val?.id ?? val?.Id]) : String(val);
                                rStr = rolesMap[rStr] ?? rStr;
                                break;
                            }
                        }
                    }
                    return rStr === 'Doctor' || rStr === '2';
                }).map((d: any) => ({
                    ...d,
                    id: d.id || d.Id || d.nationalId || d.NationalId,
                    name: d.fullNameEnglish || d.FullNameEnglish || d.name || d.Name || `Dr. #${d.id || d.Id}`
                }));
                setDoctors(drList);

                const clinicList = (clinicRes as any)?.data?.data ?? (clinicRes as any)?.data?.items ??
                    (Array.isArray((clinicRes as any)?.data) ? (clinicRes as any).data : []);
                setClinics(clinicList);


            } catch (e) {
                console.error('Failed to load dropdown data:', e);
            }
        };
        load();
    }, []);

    useEffect(() => { fetchAppointments(); }, [fetchAppointments]);

    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this appointment?')) return;
        try {
            await deleteAppointment(id);
            fetchAppointments();
        } catch (err: any) {
            alert(err.message || 'Failed to delete appointment.');
        }
    };

    /* ─── render ─── */
    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50 font-sans">
            <div className="max-w-[1300px] mx-auto space-y-5">

                {/* ── Header ── */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                            <span className="cursor-pointer hover:text-[#1A6FC4]" onClick={() => navigate('/dashboard')}>Dashboards</span><span>›</span>
                            <span className="text-[#1A6FC4]">Appointments</span>
                        </div>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Appointment Management</h1>
                        <p className="text-slate-500 text-sm mt-0.5">Schedule and monitor patient visits across all departments.</p>
                    </div>
                </div>

                {/* ── Filters ── */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {/* Patient Search */}
                        <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Patient</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <input
                                    id="apt-search"
                                    type="text"
                                    placeholder="Name or ID..."
                                    value={search}
                                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6FC4] bg-white"
                                />
                            </div>
                        </div>

                        {/* Doctor */}
                        <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Doctor</label>
                            <select value={filterDoctor} onChange={e => { setFilterDoctor(e.target.value); setPage(1); }}
                                className="w-full py-2 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6FC4] bg-white appearance-none"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}>
                                <option value="">All Doctors</option>
                                {doctors.map((d: any) => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Clinic */}
                        <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Clinic</label>
                            <select value={filterClinic} onChange={e => { setFilterClinic(e.target.value); setPage(1); }}
                                className="w-full py-2 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6FC4] bg-white appearance-none"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}>
                                <option value="">All Clinics</option>
                                {clinics.map((c: any) => (
                                    <option key={c.id} value={c.id}>{c.clinicNameEn || c.clinicNameAr || `Clinic #${c.id}`}</option>
                                ))}
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Status</label>
                            <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
                                className="w-full py-2 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6FC4] bg-white appearance-none"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}>
                                {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                            </select>
                        </div>

                        {/* Date Range */}
                        <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Date Range</label>
                            <div className="flex items-center gap-1.5">
                                <input type="date" value={filterFrom}
                                    onChange={e => { setFilterFrom(e.target.value); setPage(1); }}
                                    className="flex-1 min-w-0 py-2 px-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#1A6FC4] bg-white" />
                                <span className="text-slate-400 text-xs shrink-0">–</span>
                                <input type="date" value={filterTo}
                                    onChange={e => { setFilterTo(e.target.value); setPage(1); }}
                                    className="flex-1 min-w-0 py-2 px-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#1A6FC4] bg-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Table ── */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                                    <th className="px-5 py-4">ID</th>
                                    <th className="px-5 py-4">Patient Name</th>
                                    <th className="px-5 py-4">Doctor Name</th>
                                    <th className="px-5 py-4">Clinic</th>
                                    <th className="px-5 py-4">Date & Time</th>
                                    <th className="px-5 py-4">Status</th>
                                    <th className="px-5 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="py-16 text-center text-slate-400">
                                            <Loader2 className="animate-spin mx-auto mb-2" size={28} />
                                            <span className="text-sm">Loading appointments...</span>
                                        </td>
                                    </tr>
                                ) : appointments.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-16 text-center text-slate-400">
                                            <CalendarCheck className="mx-auto mb-2 opacity-30" size={36} />
                                            <p className="text-sm font-medium">No appointments found.</p>
                                            <p className="text-xs mt-1">Try adjusting your filters or create a new appointment.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    appointments.map((apt) => {
                                        const { date, time } = fmtDateTime(apt.dateTime);
                                        return (
                                            <tr key={apt.id} className="hover:bg-slate-50/60 transition-colors">
                                                {/* ID */}
                                                <td className="px-5 py-3.5">
                                                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-bold">
                                                        #APT-{apt.id}
                                                    </span>
                                                </td>
                                                {/* Patient */}
                                                <td className="px-5 py-3.5">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-8 h-8 rounded-full bg-[#1A6FC4]/10 text-[#1A6FC4] flex items-center justify-center text-xs font-bold shrink-0">
                                                            {apt.patientAvatar
                                                                ? <img src={apt.patientAvatar} className="w-8 h-8 rounded-full object-cover" alt="" />
                                                                : initials(apt.patientName || 'P')}
                                                        </div>
                                                        <span className="font-semibold text-slate-800 text-sm">{apt.patientName || '—'}</span>
                                                    </div>
                                                </td>
                                                {/* Doctor */}
                                                <td className="px-5 py-3.5 text-sm text-slate-700">{apt.doctorName || '—'}</td>
                                                {/* Clinic */}
                                                <td className="px-5 py-3.5 text-sm text-slate-600">
                                                    {apt.clinicName
                                                        ? <>{apt.clinicName}{apt.clinicWing ? ` – ${apt.clinicWing}` : ''}</>
                                                        : '—'}
                                                </td>
                                                {/* Date/Time */}
                                                <td className="px-5 py-3.5">
                                                    <div className="text-sm font-medium text-slate-800">{date}</div>
                                                    <div className="text-xs text-slate-500">{time}</div>
                                                </td>
                                                {/* Status */}
                                                <td className="px-5 py-3.5">
                                                    <StatusBadge status={apt.status} />
                                                </td>
                                                {/* Actions */}
                                                <td className="px-5 py-3.5 text-right">
                                                    <div className="flex items-center justify-end gap-3 text-slate-400">
                                                        <button onClick={() => navigate(`/dashboard/appointments/edit/${apt.id}`)}
                                                            className="hover:text-[#1A6FC4] transition-colors" title="Edit">
                                                            <Edit2 size={15} />
                                                        </button>
                                                        <button onClick={() => handleDelete(apt.id)}
                                                            className="hover:text-red-500 transition-colors" title="Delete">
                                                            <Trash2 size={15} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ── Pagination ── */}
                    {!loading && appointments.length > 0 && (
                        <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
                            <span>
                                Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, totalCount)} of {totalCount} entries
                            </span>
                            <div className="flex items-center gap-1">
                                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 disabled:opacity-40 transition-colors">
                                    <ChevronLeft size={16} />
                                </button>
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    const pg = i + 1;
                                    return (
                                        <button key={pg} onClick={() => setPage(pg)}
                                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors
                                                ${page === pg ? 'bg-[#1A6FC4] text-white' : 'hover:bg-slate-100 text-slate-600'}`}>
                                            {pg}
                                        </button>
                                    );
                                })}
                                {totalPages > 5 && <span className="text-slate-400 px-1">…</span>}
                                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 disabled:opacity-40 transition-colors">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppointmentManagementPage;
