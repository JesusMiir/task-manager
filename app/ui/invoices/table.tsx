import Image from "next/image";
import { UpdateInvoice, DeleteInvoice } from "@/app/ui/invoices/buttons";
import InvoiceStatus from "@/app/ui/invoices/status";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { fetchTasks } from "@/app/lib/data";
import { auth } from "@/auth";

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const tasks = await fetchTasks();
  const displayedTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );

  const session = await auth();
  const user = session?.user;

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {displayedTasks?.map((task) => {
              return (
                <div
                  key={task.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">{task.title}</div>
                      <p className="text-sm text-gray-500">{task.user_name}</p>
                    </div>
                    {/* <InvoiceStatus status={} /> */}
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">{task.priority}</p>
                      <p>
                        {task.due_date
                          ? new Date(task.due_date).toLocaleDateString("es-ES")
                          : "-"}
                      </p>
                    </div>
                    <div className="flex justify-end gap-2">
                      {user?.name == task.user_name && (
                        <>
                          <UpdateInvoice id={task.id} />
                          <DeleteInvoice id={task.id} />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  User
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Priority
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {displayedTasks?.map((task) => (
                <tr
                  key={task.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">{task.title}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {task.user_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {task.priority}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{task.status}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {task.due_date
                      ? new Date(task.due_date).toLocaleDateString("es-ES")
                      : "-"}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {user?.name == task.user_name && (
                        <>
                          <UpdateInvoice id={task.id} />
                          <DeleteInvoice id={task.id} />
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
