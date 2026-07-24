import type { Job } from "./types";

// In-memory job store. Single-process only — fine for `next dev`, not for serverless prod.
// Swap for Supabase before deploying multi-instance.
const g = globalThis as unknown as { __presenceJobs?: Map<string, Job> };
const jobs = (g.__presenceJobs ??= new Map<string, Job>());

export const store = {
  get: (id: string) => jobs.get(id),
  set: (job: Job) => jobs.set(job.id, job),
  patch: (id: string, patch: Partial<Job>) => {
    const j = jobs.get(id);
    if (!j) return;
    jobs.set(id, { ...j, ...patch, steps: { ...j.steps, ...(patch.steps ?? {}) } });
  },
};
