import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getSession } from "~/sessions";
import { getUserById } from "~/auth";
import { Link, useLoaderData } from "@remix-run/react";

export const loader = async ({request}: LoaderFunctionArgs) => {
    const session = await getSession(request);
    const userId = session.get("userId");

    if (!userId) return redirect("/login");

    const user = await getUserById(userId);

    if (!user) return redirect("/login");

    return user;
};

export default function Dashboard() {
    const user = useLoaderData<typeof loader>();

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">Welcome to Your Dashboard</h1>
          <Link
            to="/logout"
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </Link>
        </header>
  
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Overview</h2>
            <p className="text-gray-600">Summary of your recent activities and updates.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Profile</h2>
            <p className="text-gray-600">Manage your profile and account settings.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Analytics</h2>
            <p className="text-gray-600">Track your performance and stats.</p>
          </div>
        </section>
      </div>
    );
}