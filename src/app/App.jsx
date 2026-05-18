import { BrowserRouter } from "react-router-dom";
import AppRouter from "@app/routes/AppRouter.jsx";
import {CookiePopup} from "@features/cookie-consent/ui/CookiePopup.jsx";

function App() {
    return (
        <BrowserRouter>
            <AppRouter />
            <CookiePopup />
        </BrowserRouter>
    );
}

export default App;