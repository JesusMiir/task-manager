"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { createUser } from "@/app/lib/actions";

const initialState = { message: null, errors: {} };

export default function RegisterPage() {
  const [state, formAction] = useActionState(createUser, initialState);

  useEffect(() => {
    if (state.message) {
      // Redirigir manualmente al login después de crear usuario
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000); // pequeña pausa para que el usuario vea el mensaje
    }
  }, [state.message]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Create your account
        </h1>

        <form action={formAction} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
            {state.errors?.email && (
              <p className="text-sm text-red-500 mt-1">{state.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-md bg-teal-600 px-4 py-2 text-white font-semibold hover:bg-teal-700 transition-colors"
          >
            Register
          </button>
        </form>

        {state.message && (
          <p className="text-green-600 text-center">{state.message}</p>
        )}
        {state.errors?.form && (
          <p className="text-red-600 text-center">{state.errors.form}</p>
        )}

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-teal-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
