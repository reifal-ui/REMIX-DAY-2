import { createCookieSessionStorage, redirect } from "@remix-run/node";

const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "session",
        secrets: ["supersecret"],
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        httpOnly: true
    }
});

export async function getSession(request: Request) {
    return sessionStorage.getSession(
        request.headers.get("Cookie")
    );
}

export async function createUserSession(userId: string, remember: boolean, redirectTo: string) {
    const session = await sessionStorage.getSession();
    session.set("userId", userId);

    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await sessionStorage.commitSession(session, {
                maxAge: remember ? 60 * 60 * 24 * 30 : undefined // 30 days if remember is true
            })
        }
    });
}

export async function destroyUserSession(request: Request) {
    const session = await getSession(request);
    return redirect ("/login", {
        headers: {
            "Set-Cookie": await sessionStorage.destroySession(session)
        }
    });
}