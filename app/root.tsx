import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import './styles/tailwind.css';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "/build/_assets/tailwind.css" },
];


export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-red-300 text-red-800 p-8">
        <h1 className="text-6xl font-bold mb-4">Oops! {error.status}</h1>
        <p className="text-2xl mb-2">{error.statusText}</p>
        <p className="text-lg italic">Ada yang salah, tim kami sedang memperbaikinya!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-red-300 text-red-800 p-8">
      <h1 className="text-6xl font-bold mb-4">Something went wrong</h1>
      <p className="text-lg">Mohon maaf atas ketidaknyamanannya.</p>
    </div>
  );
}

// ✅ App layout dengan header, main, footer, dan global styles
export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="font-sans bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <header className="bg-white shadow-md p-4">
          <h1 className="text-2xl font-semibold text-center">🚀 Remix App</h1>
        </header>

        <main className="flex-1 max-w-4xl mx-auto p-4">
          <Outlet />
        </main>

        <footer className="bg-white shadow-inner p-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Remix App. All rights reserved.
        </footer>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
