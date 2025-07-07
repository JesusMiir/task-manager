import { fetchTasksGroupedByStatus } from "@/app/lib/data";
import { Card } from "@/app/ui/tasks/card";

export default async function TrelloBoard() {
  const tasks = await fetchTasksGroupedByStatus();

  const columns = [
    { key: "todo", label: "Todo" },
    { key: "in_progress", label: "In Progress" },
    { key: "pause", label: "Pause" },
    { key: "done", label: "Done" },
  ];

  return (
    <div className="flex gap-4">
      {columns.map((col) => (
        <div key={col.key} className="w-1/4 p-2 bg-gray-50 rounded">
          <h2 className="text-lg font-semibold mb-2">{col.label}</h2>

          {/* {tasks[col.key].map((task) => (
            <Card key={task.id} task={task} />
          ))} */}
        </div>
      ))}
    </div>
  );
}
