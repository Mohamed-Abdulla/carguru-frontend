import { AnalyticsStats, Car, RecommendResult, RecommendationPreferences } from "./types";

console.log(process.env.NEXT_PUBLIC_API_URL)
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: { message?: string } })?.error?.message ?? `API error ${res.status}`);
  }
  const json = await res.json();
  return json.data as T;
}

// ── Cars ──────────────────────────────────────────────────────────────────────

export async function getCars(params?: Record<string, string | number>): Promise<{ data: Car[]; total: number }> {
  const qs = params ? "?" + new URLSearchParams(params as Record<string, string>).toString() : "";
  const res = await fetch(`${API_BASE}/api/cars${qs}`, { next: { revalidate: 60 } });
  const json = await res.json();
  return { data: json.data, total: json.meta?.total ?? 0 };
}

export async function getCarById(id: number): Promise<Car> {
  return apiFetch<Car>(`/api/cars/${id}`);
}

// ── Recommendations ───────────────────────────────────────────────────────────

export async function getRecommendations(prefs: RecommendationPreferences): Promise<RecommendResult> {
  const res = await fetch(`${API_BASE}/api/recommendations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prefs),
    cache: "no-store",
  });
  const json = await res.json();
  return json.data as RecommendResult;
}

// ── Analytics ─────────────────────────────────────────────────────────────────

export async function getStats(): Promise<AnalyticsStats> {
  return apiFetch<AnalyticsStats>("/api/analytics/stats");
}

export async function getPopular(limit = 6): Promise<Car[]> {
  return apiFetch<Car[]>(`/api/analytics/popular?limit=${limit}`);
}
