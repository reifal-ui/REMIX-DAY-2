import { LoaderFunctionArgs } from "@remix-run/node";
import { destroyUserSession } from "~/sessions";

export const loader = async ({request}: LoaderFunctionArgs) => {
    return destroyUserSession(request);
};