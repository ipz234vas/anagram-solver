import {AppLayout} from "./layout/AppLayout.jsx";
import {StartPage} from "../pages/start-page/StartPage.jsx";
import {GamePage} from "../pages/game-page/GamePage.jsx";
import {ResultPage} from "../pages/result-page/ResultPage.jsx";

function App() {
    return (
        <AppLayout title="Anagram Solver" subtitle="Lab 1">
            {/*<StartPage/>*/}
            {/*<GamePage/>*/}
            <ResultPage/>
        </AppLayout>
    );
}

export default App
