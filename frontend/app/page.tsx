"use client";

import { useEffect, useMemo, useState } from "react";
import { getApplications, updateApplication } from "@/lib/api";
import { Application } from "@/types/application";
import SummaryCards from "@/components/SummaryCards";
import ApplicationCard from "@/components/ApplicationCard";
import AddApplicationForm from "@/components/AddApplicationForm";

export default function HomePage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadApplications() {
    try {
      setError("");
      const data = await getApplications();
      setApps(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load applications");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  async function handleQuickStatusChange(id: number, nextStatus: string) {
    try {
      const updated = await updateApplication(id, { status: nextStatus });

      setApps((prev) =>
        prev.map((app) => (app.id === id ? updated : app))
      );
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to update application");
    }
  }

  function handleCreated(newApp: Application) {
    setApps((prev) => [newApp, ...prev]);
  }

  const sortedApps = useMemo(() => {
    return [...apps].sort(
      (a, b) =>
        new Date(b.date_updated).getTime() - new Date(a.date_updated).getTime()
    );
  }, [apps]);

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">JobPilot Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Track applications, update statuses, and manage your job search in one place.
          </p>
        </header>

        <SummaryCards apps={apps} />

        <AddApplicationForm onCreated={handleCreated} />

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            Loading applications...
          </div>
        ) : sortedApps.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            No applications found.
          </div>
        ) : (
          <div className="grid gap-4">
            {sortedApps.map((app) => (
              <ApplicationCard
                key={app.id}
                app={app}
                onQuickStatusChange={handleQuickStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}