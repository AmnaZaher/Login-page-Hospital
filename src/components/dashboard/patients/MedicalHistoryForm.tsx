import React, { useState } from 'react';
import { ClipboardList, Plus } from 'lucide-react';

export interface MedicalRecord {
  condition: string;
  recordDate: string;
  status: string;
  diagnosisDate: string;
  severity: string;
  treatment: string;
  notes: string;
}

interface MedicalHistoryFormProps {
  records: MedicalRecord[];
  onAddRecord: (record: MedicalRecord) => void;
}

const MedicalHistoryForm: React.FC<MedicalHistoryFormProps> = ({ records, onAddRecord }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newRecord, setNewRecord] = useState<MedicalRecord>({
    condition: '',
    recordDate: '',
    status: '1', // 1=Active
    diagnosisDate: '',
    severity: '1', // 1=Mild
    treatment: '',
    notes: ''
  });

  const handleSave = () => {
    if (newRecord.condition) {
      onAddRecord(newRecord);
      setIsAdding(false);
      setNewRecord({
        condition: '',
        recordDate: '',
        status: '1',
        diagnosisDate: '',
        severity: '1',
        treatment: '',
        notes: ''
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Medical History</h2>
        <p className="text-slate-500 text-sm">Document the patient's past and current medical conditions.</p>
      </div>

      {records.length === 0 && !isAdding ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border-t border-slate-100">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <ClipboardList className="w-8 h-8 text-slate-700" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No medical records found</h3>
          <p className="text-slate-500 text-sm max-w-sm mb-8">
            No medical records added yet. Please use the form below to add the patient's clinical history
          </p>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            Add New Record
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* List existing records if any */}
          {records.length > 0 && (
            <div className="space-y-4 mb-8">
              {records.map((record, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-900">{record.condition}</h4>
                    <span className="text-xs font-semibold px-2 py-1 bg-white border border-slate-200 rounded-md text-slate-600">
                      {record.status === '1' ? 'Active' : record.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-2">{record.treatment}</p>
                  <div className="text-xs text-slate-400 flex gap-4">
                    <span>Diagnosed: {record.diagnosisDate}</span>
                    <span>Severity: {record.severity === '1' ? 'Mild' : record.severity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(!isAdding && records.length > 0) && (
            <button
               onClick={() => setIsAdding(true)}
               className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </div>
              Add New Record
            </button>
          )}

          {/* Add form */}
          {isAdding && (
            <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm mt-4">
               <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                   <Plus className="w-4 h-4" />
                 </div>
                 Add New Record
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Medical Condition</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Type 2 Diabetes, Hypertension"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRecord.condition}
                      onChange={(e) => setNewRecord({...newRecord, condition: e.target.value})}
                    />
                 </div>
                 
                 <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Record Date</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-600"
                      value={newRecord.recordDate}
                      onChange={(e) => setNewRecord({...newRecord, recordDate: e.target.value})}
                    />
                 </div>
                 
                 <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                    <select 
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-600 bg-white"
                      value={newRecord.status}
                      onChange={(e) => setNewRecord({...newRecord, status: e.target.value})}
                    >
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                      <option value="3">Resolved</option>
                    </select>
                 </div>

                 <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Diagnosis Date</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-600"
                      value={newRecord.diagnosisDate}
                      onChange={(e) => setNewRecord({...newRecord, diagnosisDate: e.target.value})}
                    />
                 </div>
                 
                 <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Severity</label>
                    <select 
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-600 bg-white"
                      value={newRecord.severity}
                      onChange={(e) => setNewRecord({...newRecord, severity: e.target.value})}
                    >
                      <option value="1">Mild</option>
                      <option value="2">Moderate</option>
                      <option value="3">Severe</option>
                    </select>
                 </div>

                 <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Treatment Description</label>
                    <textarea 
                      placeholder="Describe current medications or therapies..."
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24"
                      value={newRecord.treatment}
                      onChange={(e) => setNewRecord({...newRecord, treatment: e.target.value})}
                    />
                 </div>

                 <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Notes</label>
                    <textarea 
                      placeholder="Any other relevant clinical details..."
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24"
                      value={newRecord.notes}
                      onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
                    />
                 </div>
               </div>
               <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                 <button 
                   onClick={() => setIsAdding(false)}
                   className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-lg transition-colors"
                 >
                   Cancel
                 </button>
                 <button 
                   onClick={handleSave}
                   className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                 >
                   Save Record
                 </button>
               </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicalHistoryForm;
