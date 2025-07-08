import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchTasksById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [task] = await Promise.all([fetchTasksById(id)]);

  if (!task) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Trello", href: "/trello" },
          {
            label: "Edit Tasks",
            href: `/trello/tasks/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form task={task} />
    </main>
  );
}
