// src/components/dashboard/staff/helpers/AccountInfoItem.tsx
import React from 'react';

interface AccountInfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

const AccountInfoItem: React.FC<AccountInfoItemProps> = ({ icon, label, value }) => (
  <div className="flex gap-4 items-center">
    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-[11px] font-black tracking-widest text-[#b0bec5] uppercase mb-0.5">
        {label}
      </p>
      {typeof value === 'string' ? (
        <p className="text-sm font-extrabold text-slate-900">{value}</p>
      ) : (
        value
      )}
    </div>
  </div>
);

export default AccountInfoItem;