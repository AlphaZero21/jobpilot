export type Application = {
  id: number;
  job_id: string;
  company: string;
  title: string;
  location?: string;
  url?: string;
  source?: string;
  status: string;
  notes?: string;
  resume_used?: string;
  date_applied: string;
  date_updated: string;
};

export type ApplicationCreate = {
  job_id: string;
  company: string;
  title: string;
  location?: string;
  url?: string;
  source?: string;
  status?: string;
  notes?: string;
  resume_used?: string;
};

export type ApplicationUpdate = {
  status?: string;
  notes?: string;
  resume_used?: string;
};