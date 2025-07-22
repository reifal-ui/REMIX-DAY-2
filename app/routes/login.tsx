import { json, redirect, ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createUserSession } from "~/sessions";
import { verifyLogin } from "~/auth";

export const action = async ({request}: ActionFunctionArgs) => {
    const formData = await request.formData();
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    const remember = formData.get("remember") === "on";

    if (!username || !password) {
        return json({error: "Username and password are required"}, 
            {status: 400});
    }

    const user = await verifyLogin(username, password);
    if(!user) {
        return json({ error: "Invalid credentials"}, {status: 401 });
    }

    return createUserSession(user.id, remember, "/dashboard");
};

export default function Login() {
    const actionData = useActionData<typeof action>();

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form method="post" className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>

          {actionData?.error && (
            <p className="text-red-500 text-sm">{actionData.error}</p>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </Form>
      </div>
    </div>
      );
    
}