import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchTasksById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const task = await fetchTasksById(params.id);

  if (!task) {
    notFound();
  }

  return (
    <main className="p-4 md:p-8 space-y-6">
      <Breadcrumbs breadcrumbs={[{ label: "Trello", href: "/trello" }]} />

      <h1 className="text-2xl font-semibold mb-2">{task.title}</h1>

      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium mb-1">Fecha límite</label>
          <div className="w-full rounded-md border border-gray-200 bg-gray-100 p-2 text-sm text-gray-700">
            {task.due_date
              ? new Date(task.due_date).toLocaleString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Sin fecha definida"}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <div className="w-full rounded-md border border-gray-200 bg-gray-100 p-2 text-sm text-gray-700 whitespace-pre-line">
            {task.description || "Sin descripción"}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Estado</label>
            <div className="rounded-md border border-gray-200 bg-gray-100 p-2 text-sm text-gray-700">
              {task.status}
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Prioridad</label>
            <div className="rounded-md border border-gray-200 bg-gray-100 p-2 text-sm text-gray-700">
              {task.priority}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
