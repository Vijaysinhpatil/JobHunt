// export const USER_API_END_POINT = "https://jobhunt-backend-pi.vercel.app/api/v1/user"
// export const JOB_API_END_POINT ="https://jobhunt-backend-pi.vercel.app/api/v1/job"
// export const APPLICATION_API_END_POINT = "https://jobhunt-backend-pi.vercel.app/api/v1/application"
// export const COMPANY_API_END_POINT = "https://jobhunt-backend-pi.vercel.app/api/v1/company"
// export const CONTACT_API_END_POINT = "https://jobhunt-backend-pi.vercel.app/api/v1"

// API Base URL - uses environment variable in production, localhost in development
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// API Endpoints
export const USER_API_END_POINT = `${API_BASE}/user`;
export const JOB_API_END_POINT = `${API_BASE}/job`;
export const APPLICATION_API_END_POINT = `${API_BASE}/application`;
export const COMPANY_API_END_POINT = `${API_BASE}/company`;
export const CONTACT_API_END_POINT = `${API_BASE}`;


