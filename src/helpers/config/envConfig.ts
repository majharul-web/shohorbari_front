export const getBaseUrl = (): string => {
  return import.meta.env.VITE_BASE_API || "http://localhost:8000/api/v1";
};
