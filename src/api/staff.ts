// src/api/staff.ts
import { fetchApi } from "./config";
import type { StaffProfile } from "../types/staff.types";

export const staffApi = {
  getProfile: async (id: string): Promise<StaffProfile> => {
    const response = await fetchApi<StaffProfile>(`/Staff/${id}`);
    return response.data!;
  },

  toggleStatus: async (id: string, activate: boolean): Promise<void> => {
    await fetchApi(`/Staff/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status: activate ? "Active" : "Disabled" }),
    });
  },
};
