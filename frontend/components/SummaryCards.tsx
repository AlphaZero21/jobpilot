import { Application } from "@/types/application";

type SummaryCardsProps = {
  apps: Application[];
};

export default function SummaryCards({ apps }: SummaryCardsProps) {
  const total = apps.length;
  const interviews = apps.filter((a) => a.status.toLowerCase() === "interview").length;
  const offers = apps.filter((a) => a.status.toLowerCase() === "offer").length;
  const rejected = apps.filter((a) => a.status.toLowerCase() === "rejected").length;

  return (
    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
      <Card title="Total" value={total} />
      <Card title="Interviews" value={interviews} />
      <Card title="Offers" value={offers} />
      <Card title="Rejected" value={rejected} />
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}