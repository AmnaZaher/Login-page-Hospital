export const PATHS = {
  // Auth
  LOGIN: "/",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_OTP: "/verify-otp",
  RESET_PASSWORD: "/reset-password",
  SUCCESS: "/success",

  // Dashboard
  DASHBOARD: "/dashboard",
  USER_MANAGEMENT: "/dashboard/users",
  STAFF_PROFILE: "/dashboard/users/staff",
  PATIENT_PROFILE: "/dashboard/users/patient",
  ADD_STAFF: "/dashboard/users/add-staff",
  ADD_PATIENT: "/dashboard/users/add-patient",
  EDIT_STAFF: "/dashboard/users/staff/edit",   // ← NEW
  REPORTS: "/dashboard/reports",
  APPOINTMENTS: "/dashboard/appointments",
  DEPARTMENTS: "/dashboard/departments",
  BILLING: "/dashboard/billing",
  SETTINGS: "/dashboard/settings",
} as const;