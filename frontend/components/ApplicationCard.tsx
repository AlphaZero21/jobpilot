import { Application } from "@/types/application";
import StatusBadge from "./StatusBadge";

type ApplicationCardProps = {
  app: Application;
  onQuickStatusChange: (id: number, nextStatus: string) => void;
};

export default function ApplicationCard({
  app,
  onQuickStatusChange,
}: ApplicationCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{app.title}</h2>
          <p className="text-base text-gray-700">{app.company}</p>
          <p className="text-sm text-gray-500">
            {app.location || "No location"} • {app.source || "Unknown source"}
          </p>
          {app.url && (
            <a
              href={app.url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-sm text-blue-600 hover:underline"
            >
              View job posting
            </a>
          )}
        </div>

        <StatusBadge status={app.status} />
      </div>

      {app.notes && (
        <p className="mt-4 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
          {app.notes}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => onQuickStatusChange(app.id, "applied")}
          className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
        >
          Mark Applied
        </button>
        <button
          onClick={() => onQuickStatusChange(app.id, "interview")}
          className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
        >
          Mark Interview
        </button>
        <button
          onClick={() => onQuickStatusChange(app.id, "offer")}
          className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
        >
          Mark Offer
        </button>
        <button
          onClick={() => onQuickStatusChange(app.id, "rejected")}
          className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
        >
          Mark Rejected
        </button>
      </div>

      <p className="mt-4 text-xs text-gray-400">
        Applied: {new Date(app.date_applied).toLocaleString()}
      </p>
    </div>
  );
}