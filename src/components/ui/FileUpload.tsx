import React, { useRef, useState } from 'react';
import { Upload, CheckCircle2, Trash2, FileText } from 'lucide-react';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    accept?: string;
    maxSizeMB?: number;
    label?: string;
    uploadedFileName?: string;
    onRemove?: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
    onFileSelect,
    accept = '.pdf,.jpg,.png',
    maxSizeMB = 5,
    label,
    uploadedFileName,
    onRemove,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFile = (file: File) => {
        setError(null);

        // Check size
        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`File size must be less than ${maxSizeMB}MB`);
            return;
        }

        onFileSelect(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            handleFile(e.target.files[0]);
        }
    };

    // If file is uploaded — show success state
    if (uploadedFileName) {
        return (
            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <div className="flex-1 min-w-0">
                    {label && <p className="text-xs font-bold text-emerald-600">{label}</p>}
                    <p className="text-sm font-medium text-slate-700 truncate">{uploadedFileName}</p>
                </div>
                {onRemove && (
                    <button
                        onClick={onRemove}
                        className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                )}
            </div>
        );
    }

    // Not uploaded — show upload area
    return (
        <div className="space-y-2">
            {label && (
                <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-bold text-slate-700">{label}</span>
                </div>
            )}

            <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`
                    border-2 border-dashed rounded-xl p-6
                    flex flex-col items-center justify-center gap-2
                    cursor-pointer transition-all
                    ${dragActive
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/50'
                    }
                `}
            >
                <Upload className={`w-8 h-8 ${dragActive ? 'text-blue-500' : 'text-slate-400'}`} />
                <p className="text-sm font-bold text-slate-700">Drag & Drop Files Here</p>
                <p className="text-xs text-slate-400">
                    or <span className="text-blue-500 font-bold underline">browse files</span> from your computer
                </p>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    PDF, JPG OR PNG (MAX {maxSizeMB}MB PER FILE)
                </p>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleChange}
                className="hidden"
            />

            {error && (
                <p className="text-xs font-medium text-red-500 ml-1">{error}</p>
            )}
        </div>
    );
};

export default FileUpload;

//رفع الملفات (Drag & Drop)
//FileUpload موحد