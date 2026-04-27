import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemId: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm, itemName, itemId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={32} />
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Clinic</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Are you sure you want to delete this clinic? This action will remove all associated patient assignments and historical logs.
          </p>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4 mb-6 text-left">
            <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center text-slate-500 font-bold">
               {itemName.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{itemName}</p>
              <p className="text-[11px] text-slate-500 font-medium italic">ID: #{itemId}</p>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 flex items-start gap-3 mb-8 text-left">
            <Info size={16} className="text-orange-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-orange-700 font-bold uppercase leading-tight">
              This action cannot be undone. Please proceed with caution.
            </p>
          </div>

          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">
              Cancel
            </button>
            <button onClick={onConfirm} className="flex-1 py-3 bg-[#A63A3A] text-white rounded-xl font-bold text-sm hover:bg-red-800 transition-colors shadow-lg shadow-red-200">
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;