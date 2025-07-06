import {
  EllipsisHorizontalCircleIcon,
  ArrowPathIcon,
  PauseCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
// import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from "@/app/lib/data";
import Link from "next/link";

const iconMap = {
  todo: EllipsisHorizontalCircleIcon,
  inProgress: ArrowPathIcon,
  pause: PauseCircleIcon,
  done: CheckCircleIcon,
};

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      <Card title="Todo" value={0} type="todo" />
      <Card title="In Progress" value={0} type="inProgress" />
      <Card title="Pause" value={0} type="pause" />
      <Card title="Done" value={0} type="done" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "todo" | "inProgress" | "pause" | "done";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>

      {/* <Link href="#">
        <div
          className={`
            truncate rounded-xl bg-white px-4 py-2 text-justify text-2xl border border-gray-200
            `}
        >
          <p>Task</p>
          <small className="text-xs	">User</small>
        </div>
      </Link> */}
    </div>
  );
}
