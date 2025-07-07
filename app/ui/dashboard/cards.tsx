import {
  EllipsisHorizontalCircleIcon,
  ArrowPathIcon,
  PauseCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
// import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from "@/app/lib/data";
import Link from "next/link";
import { Task } from "@/app/lib/definitions";

const iconMap = {
  todo: EllipsisHorizontalCircleIcon,
  inProgress: ArrowPathIcon,
  pause: PauseCircleIcon,
  done: CheckCircleIcon,
};

export function Card({
  title,
  value,
  type,
  tasks = [],
}: {
  title: string;
  value: number | string;
  type: "todo" | "inProgress" | "pause" | "done";
  tasks?: Task[];
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>

      <div className="space-y-2 px-4 pb-4">
        {tasks.map((task) => (
          <Link
            key={task.id}
            href={`/trello/tasks/${task.id}/edit`}
            className="block rounded bg-white px-3 py-2 shadow hover:bg-gray-50 transition"
          >
            <p className="font-medium text-sm">{task.title}1 </p>
            <p className="text-gray-500 text-xs">{task.user_name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
