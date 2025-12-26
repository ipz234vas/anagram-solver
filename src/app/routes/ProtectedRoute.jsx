import {Navigate, Outlet, useLocation} from "react-router";
import {routes} from "@shared/config/routes.js";
import {auth} from "@features/auth";

export function ProtectedRoute({redirectTo = routes.loginPath}) {
    const location = useLocation();

    if (!auth.isAuthenticated()) {
        return (
            <Navigate
                to={redirectTo}
                replace
                state={{from: location}}
            />
        );
    }

    return <Outlet/>;
}