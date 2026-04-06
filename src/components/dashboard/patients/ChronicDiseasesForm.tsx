import { useState } from 'react';
import { Trash2, Plus, Upload } from 'lucide-react';

export interface ChronicDiseaseRecord {
    diseaseName: string;
    diseaseCode: string; // Optional
    diagnosisDate: string;
    currentStatus: string;
    medications: string;
    notes: string;
}

interface ChronicDiseasesFormProps {
    records: ChronicDiseaseRecord[];
    onAddRecord: (record: ChronicDiseaseRecord) => void;
    onRemoveRecord?: (index: number) => void;
}

const ChronicDiseasesForm = ({ records, onAddRecord, onRemoveRecord }: ChronicDiseasesFormProps) => {
    // Local state for the "new" record being added
    const [newRecord, setNewRecord] = useState<ChronicDiseaseRecord>({
        diseaseName: '',
        diseaseCode: '',
        diagnosisDate: '',
        currentStatus: 'Stable',
        medications: '',
        notes: ''
    });

    const handleAdd = () => {
        // Basic validation to ensure we don't add completely empty records if they misclick
        if (!newRecord.diseaseName.trim()) return;

        onAddRecord(newRecord);
        // Reset local form immediately after adding
        setNewRecord({
            diseaseName: '',
            diseaseCode: '',
            diagnosisDate: '',
            currentStatus: 'Stable',
            medications: '',
            notes: ''
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Chronic Diseases</h2>
                    <p className="text-slate-500 text-sm">Please list any long-term medical conditions.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl shadow-sm transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Chronic Disease
                </button>
            </div>

            {records.length > 0 && records.map((record, index) => (
                <div key={index} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm mb-6">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs">
                                {index + 1}
                            </span>
                            Disease Record
                        </h3>
                        {onRemoveRecord && (
                            <button
                                onClick={() => onRemoveRecord(index)}
                                className="text-slate-400 hover:text-red-500 transition-colors"
                                title="Delete Disease Record"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Disease Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed"
                                value={record.diseaseName}
                                readOnly
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">CD Disease Code (Optional)</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed"
                                value={record.diseaseCode}
                                readOnly
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Diagnosis Date</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed"
                                value={record.diagnosisDate}
                                readOnly
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Current Status</label>
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 appearance-none cursor-not-allowed"
                                    value={record.currentStatus}
                                    disabled
                                >
                                    <option value={record.currentStatus}>{record.currentStatus}</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Medications</label>
                        <textarea
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 resize-none cursor-not-allowed"
                            rows={2}
                            value={record.medications}
                            readOnly
                            disabled
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Notes</label>
                        <textarea
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 resize-none cursor-not-allowed"
                            rows={2}
                            value={record.notes}
                            readOnly
                            disabled
                        ></textarea>
                    </div>
                </div>
            ))}

            {/* Input Form for New Record */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm mb-8 border-t-4 border-t-blue-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Disease Name</label>
                        <input
                            type="text"
                            placeholder="Type 2 Diabetes"
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                            value={newRecord.diseaseName}
                            onChange={(e) => setNewRecord({ ...newRecord, diseaseName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">CD Disease Code (Optional)</label>
                        <input
                            type="text"
                            placeholder="O. E11.9"
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                            value={newRecord.diseaseCode}
                            onChange={(e) => setNewRecord({ ...newRecord, diseaseCode: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Diagnosis Date</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                            value={newRecord.diagnosisDate}
                            onChange={(e) => setNewRecord({ ...newRecord, diagnosisDate: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Current Status</label>
                        <div className="relative">
                            <select
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 bg-white appearance-none"
                                value={newRecord.currentStatus}
                                onChange={(e) => setNewRecord({ ...newRecord, currentStatus: e.target.value })}
                            >
                                <option value="Stable">Stable</option>
                                <option value="Active">Active</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Managed">Managed</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Medications</label>
                    <textarea
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 resize-none placeholder:text-slate-300"
                        placeholder="Metformin 500mg - Twice daily"
                        rows={2}
                        value={newRecord.medications}
                        onChange={(e) => setNewRecord({ ...newRecord, medications: e.target.value })}
                    ></textarea>
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Notes</label>
                    <textarea
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 resize-none placeholder:text-slate-300"
                        placeholder="Condition managed through diet and regular exercise. Annual eye exams required."
                        rows={2}
                        value={newRecord.notes}
                        onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                    ></textarea>
                </div>
            </div>

            {/* "Upload" Optional Extra Record Trigger matching Mockup */}
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-transparent mt-8 transition-colors hover:border-blue-300 hover:bg-slate-50">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-600">
                    <Upload className="w-5 h-5" />
                </div>
                <h4 className="text-slate-900 font-bold mb-2">Any other chronic conditions?</h4>
                <p className="text-slate-400 text-sm mb-6">You can add as many records as needed for your medical history</p>

                <button
                    onClick={handleAdd}
                    className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-2 px-6 rounded-lg transition-colors flex items-center justify-center shadow-sm"
                >
                    <Plus className="w-4 h-4 mr-2 text-slate-400" /> Add Another Record
                </button>
            </div>

        </div>
    );
};

export default ChronicDiseasesForm;
