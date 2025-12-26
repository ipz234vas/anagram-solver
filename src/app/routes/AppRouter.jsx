import {Routes, Route} from "react-router";
import {routes} from "@shared/config/routes.js";
import {AppLayout} from "@app/layout/AppLayout.jsx";
import {StartPage} from "@pages/start-page/StartPage.jsx";
import {GamePage} from "@pages/game-page/GamePage.jsx";
import {PageNotFound} from "@pages/not-found/PageNotFound.jsx";
import {ResultRoute} from "@app/routes/ResultRoute.jsx";

const navLinks = [
    {to: routes.startPath, label: "Головна", end: true},
    {to: routes.leaderboardPath, label: "Таблиця лідерів"},
];

const AppRouter = () => {
    return (
        <Routes>
            <Route
                element={
                    <AppLayout
                        title="Anagram Solver"
                        subtitle="Lab 4"
                        navLinks={navLinks}
                        profileLink={{to: routes.buildUserPath(1), label: "Профіль"}}
                    />
                }
            >
                <Route path={routes.startPath} element={<StartPage/>}/>

                <Route path={routes.gamePath} element={<GamePage/>}/>
                <Route path={routes.resultsPath} element={<ResultRoute/>}/>

                <Route path={routes.userPath} element={<div>TODO: Profile</div>}/>
                <Route path={routes.leaderboardPath} element={<div>TODO: Leaderboard</div>}/>

                <Route path="*" element={<PageNotFound/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;
