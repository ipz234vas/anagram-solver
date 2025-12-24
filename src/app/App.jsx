import {AppLayout} from "@app/layout/AppLayout.jsx";
import {StartPage} from "@pages/start-page/StartPage.jsx";
import {GamePage} from "@pages/game-page/GamePage.jsx";
import {ResultPage} from "@pages/result-page/ResultPage.jsx";
import {useState} from "react";

function App() {
    const [page, setPage] = useState("start");

    const goToStart = () => setPage("start");
    const goToGame = () => setPage("game");
    const goToResults = () => setPage("results");

    const settings = {
        minWordLength: 4,
        maxWordLength: 6,
        timeSeconds: 60,
        category: 'Їжа'
    };

    const renderPage = () => {
        switch (page) {
            case "start":
                return <StartPage settings={settings} onStart={goToGame}/>;
            case "game":
                return <GamePage settings={settings} onGameEnd={goToResults}/>;
            case "results":
                return <ResultPage onGoHome={goToStart} onPlayAgain={goToGame}/>;
            default:
                return null;
        }
    };

    return <AppLayout title="Anagram Solver" subtitle="Lab 1">{renderPage()}</AppLayout>;
}

export default App
