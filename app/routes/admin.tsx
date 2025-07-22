import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getSession } from "~/sessions";
import { getUserById } from "~/auth";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({request}: LoaderFunctionArgs) => {
    const session = await getSession(request);
    const userId = session.get("userId");

    if (!userId) return redirect("/login");

    const user = await getUserById(userId);

    if (!user || user.role !== "admin") {
        throw new Response(
            "Forbidden",
            {status: 403}
        );
    }

    return user;
};

export default function AdminPage() {
    const user = useLoaderData<typeof loader>();

    return (
        <div className="p-4">
          <h1 className="text-2xl">Admin Panel</h1>
          <p>Welcome, {user.username} (Role: {user.role})</p>
        </div>
      );
}