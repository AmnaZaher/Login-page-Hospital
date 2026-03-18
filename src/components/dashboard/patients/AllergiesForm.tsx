import { useState } from 'react';
import { Trash2, AlertCircle, Plus } from 'lucide-react';

export interface AllergyRecord {
    allergenType: string;
    allergenName: string;
    severityLevel: string;
    onsetDate: string;
    reactionDetails: string;
}

interface AllergiesFormProps {
    records: AllergyRecord[];
    onAddRecord: (record: AllergyRecord) => void;
    onRemoveRecord?: (index: number) => void;
}

const AllergiesForm = ({ records, onAddRecord, onRemoveRecord }: AllergiesFormProps) => {
    // Local state for the "new" record being added
    const [newRecord, setNewRecord] = useState<AllergyRecord>({
        allergenType: 'Medication / Drug',
        allergenName: '',
        severityLevel: 'Severe / Anaphylactic',
        onsetDate: '',
        reactionDetails: ''
    });

    const handleAdd = () => {
        onAddRecord(newRecord);
        // Reset local form immediately after adding
        setNewRecord({
            allergenType: 'Medication / Drug',
            allergenName: '',
            severityLevel: 'Severe / Anaphylactic',
            onsetDate: '',
            reactionDetails: ''
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Patient Allergies</h2>
                    <p className="text-slate-500 text-sm">Please list all known drug, food, and environmental allergies.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl shadow-sm transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Allergy
                </button>
            </div>

            {records.length === 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm transition-all text-center">
                    <p className="text-slate-500 font-medium pb-2">No known allergies have been added yet.</p>
                    <p className="text-xs text-slate-400">Fill out the fields below to add an allergy record.</p>
                </div>
            )}

            {records.map((record, index) => (
                <div key={index} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs">
                                {index + 1}
                            </span>
                            Allergy Record
                        </h3>
                        {onRemoveRecord && (
                            <button
                                onClick={() => onRemoveRecord(index)}
                                className="text-slate-400 hover:text-red-500 transition-colors"
                                title="Delete Allergy Record"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Allergen Type</label>
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 bg-white appearance-none"
                                    value={record.allergenType}
                                    disabled
                                >
                                    <option value={record.allergenType}>{record.allergenType}</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Allergen Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed"
                                value={record.allergenName}
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Severity Level</label>
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 appearance-none cursor-not-allowed"
                                    value={record.severityLevel}
                                    disabled
                                >
                                    <option value={record.severityLevel}>{record.severityLevel}</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Onset Date (Approx.)</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed"
                                value={record.onsetDate}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Reaction Details & Notes</label>
                        <textarea
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 resize-none cursor-not-allowed"
                            rows={3}
                            value={record.reactionDetails}
                            readOnly
                        ></textarea>
                    </div>
                </div>
            ))}

            {/* Input Form for New Record */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm mt-8 border-t-4 border-t-blue-500">
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs">
                            {records.length + 1}
                        </span>
                        New Allergy Record
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Allergen Type</label>
                        <div className="relative">
                            <select
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 bg-white appearance-none"
                                value={newRecord.allergenType}
                                onChange={(e) => setNewRecord({ ...newRecord, allergenType: e.target.value })}
                            >
                                <option value="Medication / Drug">Medication / Drug</option>
                                <option value="Food">Food</option>
                                <option value="Environmental">Environmental</option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Allergen Name</label>
                        <input
                            type="text"
                            placeholder="Penicillin"
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                            value={newRecord.allergenName}
                            onChange={(e) => setNewRecord({ ...newRecord, allergenName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Severity Level</label>
                        <div className="relative">
                            <select
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 bg-white appearance-none"
                                value={newRecord.severityLevel}
                                onChange={(e) => setNewRecord({ ...newRecord, severityLevel: e.target.value })}
                            >
                                <option value="Severe / Anaphylactic">Severe / Anaphylactic</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Mild">Mild</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Onset Date (Approx.)</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                            value={newRecord.onsetDate}
                            onChange={(e) => setNewRecord({ ...newRecord, onsetDate: e.target.value })}
                        />
                    </div>
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Reaction Details & Notes</label>
                    <textarea
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 resize-none placeholder:text-slate-300"
                        placeholder="Patient experiences severe hives and difficulty breathing within 30 minutes of administration."
                        rows={3}
                        value={newRecord.reactionDetails}
                        onChange={(e) => setNewRecord({ ...newRecord, reactionDetails: e.target.value })}
                    ></textarea>
                </div>

                <div className="bg-[#D3E4F4] rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-slate-700">Enter as much detail as possible to help healthcare providers ensure safe treatment plans.</p>
                </div>
            </div>
        </div>
    );
};

export default AllergiesForm;
