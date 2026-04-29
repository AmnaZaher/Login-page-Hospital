import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Building2,
  Zap,
  Search,
  Loader2,
} from "lucide-react";
import {
  getClinics,
  getClinicStats,
  updateClinic,
  deleteClinic,
} from "../../../api/clinics";
import type { Clinic, ClinicStats } from "../../../types/clinics.types";
import { useNavigate } from "react-router-dom";

interface ClinicsListProps {
  onAddClinic: () => void;
  onEditClinic?: (clinic: Clinic) => void;
}

import DeleteModal from "./DeleteModal";

const ClinicsList: React.FC<ClinicsListProps> = ({
  onAddClinic,
  onEditClinic,
}) => {
  const navigate = useNavigate();
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [stats, setStats] = useState<ClinicStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  // Delete Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clinicToDelete, setClinicToDelete] = useState<Clinic | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [clinicsRes, statsRes] = await Promise.all([
        getClinics({
          PageIndex: page - 1,
          PageSize: pageSize,
          search: searchTerm,
        }),
        getClinicStats(),
      ]);

      let validClinics: Clinic[] = [];
      const anyRes = clinicsRes as any;
      const extractedList =
        anyRes?.data?.data ||
        anyRes?.data?.clinics ||
        anyRes?.clinics ||
        anyRes?.items ||
        anyRes?.data?.items ||
        (Array.isArray(anyRes?.data) ? anyRes.data : []) ||
        (Array.isArray(anyRes) ? anyRes : []);

      if (Array.isArray(extractedList)) {
        validClinics = extractedList.map((c: any) => ({
          ...c,
          id: c.id || c.Id,
        }));
      }

      const totalPagesValue = anyRes?.data?.totalPages || anyRes?.totalPages;
      if (totalPagesValue) {
        setTotalPages(totalPagesValue);
      }

      setClinics(validClinics);

      const anyStats = statsRes as any;
      setStats(anyStats?.data || anyStats || null);
    } catch (err) {
      console.error("Error fetching clinics data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchTerm]);

  const handleToggleStatus = async (clinic: Clinic) => {
    try {
      await updateClinic(clinic.id, {
        isActive: !clinic.isActive,
      });
      fetchData();
    } catch (err) {
      console.error("Failed to update clinic status", err);
    }
  };

  const openDeleteModal = (e: React.MouseEvent, clinic: Clinic) => {
    e.stopPropagation();
    setClinicToDelete(clinic);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!clinicToDelete) return;
    const idToDelete = clinicToDelete.id;
    if (!idToDelete) {
      alert("Error: Clinic ID not found.");
      return;
    }

    try {
      await deleteClinic(idToDelete);
      
      // Optimistic update: remove from local state immediately
      setClinics(prev => prev.filter(c => (c.id || (c as any).Id) !== idToDelete));
      
      // Small delay and then re-fetch to sync with server
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsDeleteModalOpen(false);
      setClinicToDelete(null);
      await fetchData();
    } catch (err: any) {
      console.error("Failed to delete clinic", err);
      alert(`Failed to delete clinic: ${err.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50 font-sans">
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <span className="text-slate-500 cursor-pointer hover:text-[#1A6FC4] transition-colors" onClick={() => navigate('/dashboard')}>Dashboards</span>
              <span>{"\u203A"}</span>
              <span className="text-[#1A6FC4]">Clinics</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Clinics Management
            </h1>
            <p className="text-slate-500 mt-1">
              Oversee all satellite facilities and specialized care centers.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search clinics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6FC4] w-64 shadow-sm"
              />
            </div>
            <button
              onClick={onAddClinic}
              className="bg-[#0D4A8A] hover:bg-[#0b3c73] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-md"
            >
              <Plus size={18} />
              Add New Clinic
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                  <th className="px-6 py-4">Clinic ID</th>
                  <th className="px-6 py-4">Clinic Name AR</th>
                  <th className="px-6 py-4">Clinic Name EN</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-slate-500"
                    >
                      <Loader2
                        className="animate-spin mx-auto mb-2"
                        size={24}
                      />
                      Loading clinics...
                    </td>
                  </tr>
                ) : clinics.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-slate-500"
                    >
                      No clinics found.
                    </td>
                  </tr>
                ) : (
                  clinics.map((clinic) => (
                    <tr
                      key={clinic.id}
                      className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                      onClick={() =>
                        navigate(`/dashboard/clinics/${clinic.id}`)
                      }
                    >
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-semibold">
                          {clinic.clinicCode || `C-${clinic.id}`}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1A6FC4]/10 text-[#1A6FC4] flex items-center justify-center">
                            <Building2 size={16} />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">
                              {clinic.clinicNameAr || "N/A"}
                            </div>
                            <div className="text-xs text-slate-500">
                              {clinic.specialization}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1A6FC4]/10 text-[#1A6FC4] flex items-center justify-center">
                            <Building2 size={16} />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">
                              {clinic.clinicNameEn || "N/A"}
                            </div>
                            <div className="text-xs text-slate-500">
                              {clinic.specialization}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleStatus(clinic)}
                            className={`w-10 h-5 rounded-full relative transition-colors ${clinic.isActive ? "bg-[#1A6FC4]" : "bg-slate-300"}`}
                          >
                            <div
                              className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all ${clinic.isActive ? "left-[22px]" : "left-1"}`}
                            />
                          </button>
                          <span
                            className={`text-xs font-bold ${clinic.isActive ? "text-[#1A6FC4]" : "text-slate-500"}`}
                          >
                            {clinic.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 text-slate-400">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditClinic?.(clinic);
                            }}
                            className="hover:text-[#1A6FC4] transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={(e) => openDeleteModal(e, clinic)}
                            className="hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {!loading && clinics.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
              <div>
                Showing {(page - 1) * pageSize + 1} to{" "}
                {Math.min(
                  page * pageSize,
                  clinics.length > 0
                    ? (page - 1) * pageSize + clinics.length
                    : 0,
                )}{" "}
                clinics
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 disabled:opacity-50"
                >
                  {"\u2039"}
                </button>
                <button className="w-8 h-8 flex items-center justify-center bg-[#1A6FC4] text-white font-bold rounded">
                  {page}
                </button>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 disabled:opacity-50"
                >
                  {"\u203A"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1A6FC4]/10 rounded-xl flex items-center justify-center text-[#1A6FC4]">
              <Building2 size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">
                {stats?.totalClinics || 0}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Clinics
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
              <Zap size={24} className="fill-current" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">
                {stats?.activeUnits || 0}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Active Units
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={clinicToDelete?.clinicNameEn || clinicToDelete?.clinicNameAr || "Clinic"}
        itemId={clinicToDelete?.id.toString() || ""}
      />
    </div>
  );
};

export default ClinicsList;
