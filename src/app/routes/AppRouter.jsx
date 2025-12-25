import {routes} from "@shared/config/routes.js";
import {StartPage} from "@pages/start-page/StartPage.jsx";
import {GamePage} from "@pages/game-page/GamePage.jsx";
import {ResultPage} from "@pages/result-page/ResultPage.jsx";
import {Routes, Route} from "react-router";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={routes.startPath} element={<StartPage/>}/>
            <Route path={routes.gamePath} element={<GamePage/>}/>
            <Route path={routes.resultsPath} element={<ResultPage/>}/>
            <Route path={routes.userPath} element={<></>}/>
            <Route path={routes.leaderboardPath} element={<></>}/>
            <Route path={"*"} element={<></>}/>
        </Routes>
    )
}

export default AppRouter;