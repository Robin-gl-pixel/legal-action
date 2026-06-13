export function getApiBaseUrl(): string {
  const value = process.env.API_BASE_URL ?? "http://localhost:8000";
  return value.replace(/\/$/, "");
}
