import {AppLayout} from "./layout/AppLayout.jsx";
import {StartPage} from "../pages/StartPage/StartPage.jsx";

function App() {
    return (
        <AppLayout title="Anagram Solver" subtitle="Lab 1">
            <StartPage/>
        </AppLayout>
    );
}

export default App
