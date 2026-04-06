import { CloudUpload, Upload, File as FileIcon, CheckCircle, Trash2 } from 'lucide-react';

export interface StaffDocument {
    id: string;
    title: string;
    status: 'Not Uploaded' | 'Uploaded';
    filename?: string;
    filesize?: string;
    file?: File;
}

interface UploadDocumentsFormProps {
    documents: StaffDocument[];
    onUpload: (id: string, file: File) => void;
    onRemove: (id: string) => void;
}

import { useRef, useState } from 'react';

const UploadDocumentsForm = ({ documents, onUpload, onRemove }: UploadDocumentsFormProps) => {

    const requiredCount = documents.length;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeUploadId, setActiveUploadId] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && activeUploadId) {
            onUpload(activeUploadId, e.target.files[0]);
        }
        // Reset so same file can be selected again
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleUploadClick = (id: string) => {
        setActiveUploadId(id);
        fileInputRef.current?.click();
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            // Drop onto the first missing document simply for UX
            const nextEmptyId = documents.find(d => d.status === 'Not Uploaded')?.id;
            if (nextEmptyId) {
                onUpload(nextEmptyId, e.dataTransfer.files[0]);
            }
        }
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center shrink-0 shadow-sm shadow-blue-200">
                        <CloudUpload size={20} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-xl font-extrabold text-slate-900">Section 3: Upload Documents</h2>
                </div>
                <div className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-lg text-sm font-bold">
                    {requiredCount} Documents Required
                </div>
            </div>

            <div className="p-6 md:p-8">
                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                />

                {/* Drag and Drop Area */}
                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => {
                        const nextEmptyId = documents.find(d => d.status === 'Not Uploaded')?.id;
                        if (nextEmptyId) handleUploadClick(nextEmptyId);
                    }}
                    className="border-2 border-dashed border-slate-200 rounded-2xl bg-white flex flex-col items-center justify-center py-12 px-4 mb-8 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 pointer-events-none">
                        <Upload size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1 pointer-events-none">Drag & Drop Files Here</h3>
                    <p className="text-sm text-slate-500 mb-3 pointer-events-none">or <span className="text-blue-600 font-semibold underline">browse files</span> from your computer</p>
                    <p className="text-xs font-semibold text-slate-400 pointer-events-none">PDF, JPG OR PNG (MAX 5MB PER FILE)</p>
                </div>

                {/* Documents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents.map((doc) => (
                        <div key={doc.id} className="border border-slate-100 bg-white rounded-xl p-4 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${doc.status === 'Uploaded' ? 'bg-green-50 text-green-500' : 'bg-slate-50 text-slate-400'}`}>
                                    {doc.status === 'Uploaded' ? <CheckCircle size={20} /> : <FileIcon size={20} />}
                                </div>
                                <div className="min-w-0 pr-4">
                                    <h4 className="text-sm font-bold text-slate-900 truncate">{doc.title}</h4>
                                    {doc.status === 'Uploaded' ? (
                                        <p className="text-xs font-semibold text-green-500 truncate">{doc.filename} <span className="text-green-400">({doc.filesize})</span></p>
                                    ) : (
                                        <p className="text-xs font-semibold text-slate-400">Not Uploaded</p>
                                    )}
                                </div>
                            </div>

                            {doc.status === 'Uploaded' ? (
                                <button
                                    onClick={() => onRemove(doc.id)}
                                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                                >
                                    <Trash2 size={18} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleUploadClick(doc.id)}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shrink-0"
                                >
                                    Upload
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UploadDocumentsForm;
