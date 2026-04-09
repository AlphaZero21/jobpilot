"use client";

import { useState } from "react";
import { Application, ApplicationCreate } from "@/types/application";
import { createApplication } from "@/lib/api";

type AddApplicationFormProps = {
  onCreated: (newApp: Application) => void;
};

const initialForm: ApplicationCreate = {
  job_id: "",
  company: "",
  title: "",
  location: "",
  url: "",
  source: "indeed",
  status: "applied",
  notes: "",
  resume_used: "",
};

export default function AddApplicationForm({ onCreated }: AddApplicationFormProps) {
  const [form, setForm] = useState<ApplicationCreate>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function updateField<K extends keyof ApplicationCreate>(key: K, value: ApplicationCreate[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const created = await createApplication(form);
      onCreated(created);
      setSuccess("Application added.");
      setForm(initialForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create application");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Add Application</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          value={form.job_id}
          onChange={(e) => updateField("job_id", e.target.value)}
          placeholder="Job ID"
          className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <input
          value={form.company}
          onChange={(e) => updateField("company", e.target.value)}
          placeholder="Company"
          className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <input
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Job Title"
          className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <input
          value={form.location}
          onChange={(e) => updateField("location", e.target.value)}
          placeholder="Location"
          className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
        />
        <input
          value={form.url}
          onChange={(e) => updateField("url", e.target.value)}
          placeholder="Job URL"
          className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 md:col-span-2"
        />
        <input
          value={form.source}
          onChange={(e) => updateField("source", e.target.value)}
          placeholder="Source"
          className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
        />
        <input
          value={form.resume_used}
          onChange={(e) => updateField("resume_used", e.target.value)}
          placeholder="Resume Used"
          className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <textarea
        value={form.notes}
        onChange={(e) => updateField("notes", e.target.value)}
        placeholder="Notes"
        className="mt-4 min-h-[100px] w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
      />

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-gray-900 px-5 py-3 text-white hover:bg-gray-800 disabled:opacity-60"
        >
          {submitting ? "Adding..." : "Add Application"}
        </button>

        {success && <span className="text-sm text-green-600">{success}</span>}
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
    </form>
  );
}