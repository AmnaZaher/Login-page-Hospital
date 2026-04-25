import React, { useState } from 'react';
import { Save, Info, Clock, Share2 } from 'lucide-react';
import { createClinic } from '../../../api/clinics';
import type { CreateClinicDto } from '../../../types/clinics.types';

interface AddClinicProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const AddClinic: React.FC<AddClinicProps> = ({ onCancel, onSuccess }) => {
  const [form, setForm] = useState<CreateClinicDto>({
    clinicNameAr: '',
    clinicNameEn: '',
    clinicCode: '',
    specialization: '',
    workingDays: '',
    isActive: true,
  });
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday']);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.clinicCode.trim()) return setError('Clinic Code is required.');
    if (!form.specialization.trim()) return setError('Specialization is required.');

    try {
      setSubmitting(true);
      const workingDays = selectedDays.join(',');
      const res: any = await createClinic({ ...form, workingDays });
      
      if (res && res.isSuccess === false) {
          throw new Error(res.message || 'Failed to create clinic due to server validation.');
      }
      
      onSuccess();
    } catch (err: any) {
      setError(err?.message || 'Failed to create clinic. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50 font-sans">
      <div className="max-w-[1200px] mx-auto space-y-6">
        
        {/* Breadcrumb & Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <span>Dashboards</span>
            <span>{"\u203A"}</span>
            <span
              className="text-slate-500 cursor-pointer hover:text-[#1A6FC4] transition-colors"
              onClick={onCancel}
            >
              Clinics
            </span>
            <span>{"\u203A"}</span>
            <span className="text-[#1A6FC4]">Add New Clinic</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Add New Clinic</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Enter the foundational details for the new clinical unit. This information will be used for scheduling and patient admission records.
          </p>
        </div>

        {/* Main Form Card */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
            
            {/* Active Toggle (top-right) */}
            <div className="flex justify-end">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, isActive: !prev.isActive }))}
                  aria-label="Toggle active status"
                  className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${ form.isActive ? 'bg-[#1A6FC4]' : 'bg-slate-300' }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow ${ form.isActive ? 'left-[26px]' : 'left-1' }`}
                  />
                </button>
                <span className={`text-sm font-bold ${ form.isActive ? 'text-[#1A6FC4]' : 'text-slate-400' }`}>
                  { form.isActive ? 'Active' : 'Inactive' }
                </span>
              </div>
            </div>

            {/* Row 1: Clinic Name AR & EN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Clinic Name AR
                </label>
                <input
                  type="text"
                  name="clinicNameAr"
                  placeholder="e.g. West Wing Cardiology"
                  value={form.clinicNameAr || ''}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1A6FC4] placeholder:text-slate-300 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Clinic Name EN
                </label>
                <input
                  type="text"
                  name="clinicNameEn"
                  placeholder="e.g. West Wing Cardiology"
                  value={form.clinicNameEn || ''}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1A6FC4] placeholder:text-slate-300 transition"
                />
              </div>
            </div>

            {/* Row 2: Clinic Code & Specialization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Clinic Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="clinicCode"
                  placeholder="e.g. C-9912"
                  value={form.clinicCode}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1A6FC4] placeholder:text-slate-300 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Specialization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="specialization"
                  placeholder="e.g. Cardiology"
                  value={form.specialization}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1A6FC4] placeholder:text-slate-300 transition"
                />
              </div>
            </div>

            {/* Working Days */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Working Days
              </label>
              <div className="flex flex-wrap gap-2">
                {DAYS_OF_WEEK.map(day => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                      selectedDays.includes(day)
                        ? 'bg-[#0D4A8A] text-white border-[#0D4A8A] shadow-md'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-[#1A6FC4] hover:text-[#1A6FC4]'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Clinic Discovery Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
              <Info size={18} className="text-[#1A6FC4] mt-0.5 shrink-0" />
              <div>
                <div className="font-bold text-slate-700 text-sm mb-0.5">Clinic Discovery</div>
                <div className="text-xs text-slate-500">
                  Clinics marked as "Active" will immediately appear in the patient portal for online appointment booking.
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#0D4A8A] hover:bg-[#0b3c73] disabled:opacity-60 text-white px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-md"
              >
                {submitting ? (
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Save size={16} />
                )}
                Save Clinic
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="text-slate-600 hover:text-slate-900 px-6 py-3 rounded-lg text-sm font-bold border border-slate-200 hover:border-slate-300 bg-white transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>

        {/* Bottom Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex gap-4">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <div className="font-bold text-slate-800 mb-1">Audit Logging</div>
              <div className="text-xs text-slate-500 leading-relaxed">
                Every change to clinic status is recorded with a timestamp and administrator ID for regulatory compliance.
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex gap-4">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 shrink-0">
              <Share2 size={20} />
            </div>
            <div>
              <div className="font-bold text-slate-800 mb-1">Internal Sync</div>
              <div className="text-xs text-slate-500 leading-relaxed">
                Changes sync automatically with the Doctor's schedule and the central billing system within 60 seconds.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddClinic;
