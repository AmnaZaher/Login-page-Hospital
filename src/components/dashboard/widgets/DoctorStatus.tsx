import React from "react";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  avatar: string;
  status: "AVAILABLE" | "BUSY";
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    avatar: "https://i.pravatar.cc/150?img=45",
    status: "AVAILABLE",
  },
  {
    id: 2,
    name: "Dr. Michael Sterling",
    specialty: "Orthopedics",
    avatar: "https://i.pravatar.cc/150?img=68",
    status: "BUSY",
  },
];

const DoctorStatus: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">Doctors Status</h3>
        <button className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="flex items-center gap-4">
            <div className="relative">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-12 h-12 rounded-2xl object-cover shrink-0 bg-slate-100 shadow-sm"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate tracking-tight">
                {doctor.name}
              </p>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">
                {doctor.specialty}
              </p>
            </div>
            <div
              className={`px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm shrink-0 border ${
                doctor.status === "AVAILABLE"
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                  : "bg-amber-50 text-amber-600 border-amber-100"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    doctor.status === "AVAILABLE" ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                {doctor.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default DoctorStatus;
