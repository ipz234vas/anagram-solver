import { AppLayout } from "@app/layout/AppLayout.jsx";
import { StartPage } from "@pages/start-page/StartPage.jsx";
import { GamePage } from "@pages/game-page/GamePage.jsx";
import { useState } from "react";

function App() {
    const [page, setPage] = useState("start");
    const [gameKey, setGameKey] = useState(0);

    const goToStart = () => setPage("start");

    const goToGame = () => {
        setGameKey(prev => prev + 1);
        setPage("game");
    };

    const renderPage = () => {
        switch (page) {
            case "start":
                return <StartPage onStart={goToGame} />;
            case "game":
                return (
                    <GamePage
                        key={gameKey}
                        onGameEnd={goToGame}
                        onGoHome={goToStart}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <AppLayout title="Anagram Solver" subtitle="Lab 1">
            {renderPage()}
        </AppLayout>
    );
}

export default App;