"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { signIn } from "@/auth";
import { AuthError, User } from "next-auth";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { TaskState } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const TaskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["todo", "in_progress", "pause", "done"]),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  due_date: z.string().optional(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

const CreateTask = TaskFormSchema;

export async function createUser(prevState: TaskState, formData: FormData) {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!name || !email || !password) {
    return { message: null, errors: { form: "Missing fields" } };
  }

  try {
    const existingUser = await sql<User[]>`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return { message: null, errors: { email: "User already exists" } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;

    return { message: "User created successfully!", errors: {} };
  } catch (error) {
    console.error("Register error:", error);
    return { message: null, errors: { form: "Database error" } };
  }
}

export async function createTask(prevState: TaskState, formData: FormData) {
  const session = await auth();
  const user = session?.user;

  console.log(user);

  if (!user?.id) {
    console.error("user is undefined. Cannot create task.");
    return { message: "Unauthorized. Please log in.", errors: {} } as TaskState;
  }

  const validatedFields = CreateTask.safeParse({
    title: formData.get("title"),
    status: formData.get("status"),
    description: formData.get("description"),
    priority: formData.get("priority"),
    due_date: formData.get("due_date"),
  });

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to create task.",
    } as TaskState;
  }

  const { title, status, description, priority, due_date } =
    validatedFields.data;

  try {
    await sql`
      INSERT INTO tasks (title, status, description, priority, due_date, user_id)
      VALUES (${title}, ${status}, ${description ?? ""}, ${priority}, ${
      due_date || null
    }, ${user.id})
    `;
  } catch (error) {
    console.error(error);
    return {
      message: "Database error. Failed to create task.",
      errors: {},
    } as TaskState;
  }

  console.log("🚀 Creating task with:", {
    title,
    status,
    description,
    priority,
    due_date,
    user_id: user.id,
  });

  revalidatePath("/trello/tasks");
  redirect("/trello/tasks");
}

// export async function createInvoice(prevState: State, formData: FormData) {
//   const validatedFields = CreateInvoice.safeParse({
//     customerId: formData.get("customerId"),
//     amount: formData.get("amount"),
//     status: formData.get("status"),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing Fields. Failed to Create Invoice.",
//     };
//   }

//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;
//   const date = new Date().toISOString().split("T")[0];

//   try {
//     await sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
//       `;
//   } catch (error) {
//     console.error(error);
//   }

//   revalidatePath("/dashboard/invoices");
//   redirect("/dashboard/invoices");
// }

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
    throw new Error("Failed to Delete Invoice");
  }
}

export async function deleteTask(id: string) {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    throw new Error("Failed to Delete task");
  }

  try {
    await sql`DELETE FROM tasks WHERE id = ${id} AND user_name = ${
      user?.name || ""
    }`;
    revalidatePath("/trello/tasks");
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
    throw new Error("Failed to Delete task");
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function updateTask(
  id: string,
  prevState: TaskState,
  formData: FormData
) {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    return { message: "Unauthorized. Please log in." } as TaskState;
  }

  const validatedFields = TaskFormSchema.safeParse({
    title: formData.get("title"),
    status: formData.get("status"),
    description: formData.get("description"),
    priority: formData.get("priority"),
    due_date: formData.get("due_date"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update task.",
    } as TaskState;
  }

  const { title, status, description, priority, due_date } =
    validatedFields.data;

  try {
    await sql`
      UPDATE tasks
      SET title = ${title},
          status = ${status},
          description = ${description ?? ""},
          priority = ${priority},
          due_date = ${due_date || null}
      WHERE id = ${id} AND user_id = ${user.id}
    `;
  } catch (error) {
    console.error(error);
    return { message: "Database error. Failed to update task." } as TaskState;
  }

  revalidatePath("/trello");
  redirect("/trello");
}
