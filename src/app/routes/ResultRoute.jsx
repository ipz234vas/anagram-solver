import {Navigate, useNavigate} from "react-router";
import { routes } from "@shared/config/routes.js";
import { ResultPage } from "@pages/result-page/ResultPage.jsx";
import { useGameResultStore } from "@features/game-result";

export function ResultRoute() {
    const navigate = useNavigate();
    const result = useGameResultStore((s) => s.lastResult);
    const clearLastResult = useGameResultStore((s) => s.clearLastResult);

    if (!result) {
        return <Navigate to={routes.startPath} replace />;
    }

    const goHome = () => {
        clearLastResult();
        navigate(routes.startPath);
    };

    const playAgain = () => {
        clearLastResult();
        navigate(routes.gamePath);
    };

    return <ResultPage result={result} onGoHome={goHome} onPlayAgain={playAgain} />;
}