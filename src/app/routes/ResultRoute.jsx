import {Navigate, useLocation} from "react-router";
import {routes} from "@shared/config/routes.js";
import {ResultPage} from "@pages/result-page/ResultPage.jsx";

export function ResultRoute() {
    const { state } = useLocation();

    const result = state?.gameResult ?? state;

    if (!result) {
        return <Navigate to={routes.startPath} replace />;
    }

    return <ResultPage gameResult={result} />;
}
