"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Task } from "@/app/lib/definitions";
import { updateTask, TaskState } from "@/app/lib/actions";
import { Button } from "@/app/ui/button";

export default function Form({ task }: { task: Task }) {
  const initialState: TaskState = { message: null, errors: {} };
  const updateTaskWithId = updateTask.bind(null, task.id);
  // const [state, formAction] = useActionState(updateTaskWithId, initialState);

  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 space-y-4">
        <div>
          <input type="hidden" name="taskId" value={task.id} />
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={task.title}
            required
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={task.description || ""}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={task.status}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="pause">Paused</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium mb-1">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            defaultValue={task.priority}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="due_date" className="block text-sm font-medium mb-1">
            Due Date
          </label>
          <input
            id="due_date"
            name="due_date"
            type="date"
            defaultValue={
              task.due_date
                ? new Date(task.due_date).toISOString().split("T")[0]
                : ""
            }
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/trello/tasks"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Task</Button>
      </div>
    </form>
  );
}
