import {AppLayout} from "./layout/AppLayout.jsx";
import {StartPage} from "../pages/StartPage/StartPage.jsx";
import {GamePage} from "../pages/game-page/GamePage.jsx";

function App() {
    return (
        <AppLayout title="Anagram Solver" subtitle="Lab 1">
            {/*<StartPage/>*/}
            <GamePage/>
        </AppLayout>
    );
}

export default App
