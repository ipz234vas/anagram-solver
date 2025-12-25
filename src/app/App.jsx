import {AppLayout} from "@app/layout/AppLayout.jsx";
import AppRouter from "@app/routes/AppRouter.jsx";
import {BrowserRouter} from "react-router"

function App() {
    return (
        <BrowserRouter>
            <AppLayout title="Anagram Solver" subtitle="Lab 4">
                <AppRouter/>
            </AppLayout>
        </BrowserRouter>
    );
}

export default App;