"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  ClipboardIcon,
  ArrowPathIcon,
  PauseIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createTask } from "@/app/lib/actions";
import { CustomerField } from "@/app/lib/definitions";
import { TaskState } from "@/app/lib/definitions";

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: TaskState = {
    message: null,
    errors: {},
  };

  const stat = null;

  const [state, formAction] = useActionState<TaskState, FormData>(
    createTask,
    initialState
  );

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            placeholder="Enter task title"
          />

          {/* {state.errors?.title && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.title.join(", ")}
            </p>
          )}
           */}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            placeholder="Write a short description..."
          />
        </div>

        {/* Status */}
        <fieldset className="mb-4">
          <legend className="mb-2 block text-sm font-medium">Status</legend>
          <div className="flex flex-wrap gap-3">
            {[
              {
                value: "todo",
                label: "Todo",
                icon: <ClipboardIcon className="h-4 w-4" />,
              },
              {
                value: "in_progress",
                label: "In Progress",
                icon: <ArrowPathIcon className="h-4 w-4" />,
              },
              {
                value: "pause",
                label: "Pause",
                icon: <PauseIcon className="h-4 w-4" />,
              },
              {
                value: "done",
                label: "Done",
                icon: <CheckCircleIcon className="h-4 w-4" />,
              },
            ].map(({ value, label, icon }) => (
              <label key={value} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="status"
                  value={value}
                  className="h-4 w-4"
                  required
                />
                {label} {icon}
              </label>
            ))}
          </div>
          {/* {state.errors?.status && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.status.join(", ")}
            </p>
          )} */}
        </fieldset>

        {/* Priority */}
        <div className="mb-4">
          <label htmlFor="priority" className="mb-2 block text-sm font-medium">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            defaultValue="medium"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label htmlFor="due_date" className="mb-2 block text-sm font-medium">
            Due Date
          </label>
          <input
            id="due_date"
            name="due_date"
            type="date"
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/trello/tasks"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Task</Button>
      </div>
    </form>
  );
}
