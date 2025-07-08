import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import { fetchLatestInvoices, fetchCardData } from "@/app/lib/data";
import { Suspense } from "react";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from "@/app/ui/skeletons";
import { fetchTasksGroupedByStatus } from "@/app/lib/data";
import { Task } from "@/app/lib/definitions";

export const dynamic = "force-dynamic";

export default async function Page() {
  // const revenue = await fetchRevenue();
  /*
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  */
  const tasksByStatus = await fetchTasksGroupedByStatus();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Trello
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <Card
            title="Todo"
            value={tasksByStatus.todo.length}
            type="todo"
            tasks={tasksByStatus.todo}
          />
          <Card
            title="In Progress"
            value={tasksByStatus.in_progress.length}
            type="inProgress"
            tasks={tasksByStatus.in_progress}
          />
          <Card
            title="Pause"
            value={tasksByStatus.pause.length}
            type="pause"
            tasks={tasksByStatus.pause}
          />
          <Card
            title="Done"
            value={tasksByStatus.done.length}
            type="done"
            tasks={tasksByStatus.done}
          />
        </Suspense>
      </div>
    </main>
  );
}
