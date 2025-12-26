import { Navigate } from "react-router";
import { routes } from "@shared/config/routes.js";
import { usersStorage } from "@features/auth";

export function ProfileRoute() {
    const user = usersStorage.getCurrentUser();
    if (!user)
        return <Navigate to={routes.loginPath} replace />;

    return <Navigate to={routes.buildUserPath(user.id)} replace />;
}
