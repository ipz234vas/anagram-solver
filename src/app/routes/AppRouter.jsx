import {Routes, Route} from "react-router";
import {routes} from "@shared/config/routes.js";
import {AppLayout} from "@app/layout/AppLayout.jsx";
import {PageNotFound} from "@pages/not-found/PageNotFound.jsx";
import {StartPage} from "@pages/start-page/StartPage.jsx";
import {GamePage} from "@pages/game-page/GamePage.jsx";
import {ProtectedRoute} from "@app/routes/ProtectedRoute.jsx";
import {LoginPage} from "@pages/login-page/LoginPage.jsx";
import {ProfileRoute} from "@app/routes/ProfileRoute.jsx";
import {LeaderboardPage} from "@pages/leaderboard-page/LeaderboardPage.jsx";
import {UserRoute} from "@app/routes/UserRoute.jsx";
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
                        profileLink={{to: routes.profilePath, label: "Профіль"}}
                    />
                }
            >
                <Route path={routes.loginPath} element={<LoginPage/>}/>

                <Route element={<ProtectedRoute/>}>
                    <Route path={routes.startPath} element={<StartPage/>}/>
                    <Route path={routes.gamePath} element={<GamePage/>}/>
                    <Route path={routes.resultsPath} element={<ResultRoute/>}/>
                    <Route path={routes.profilePath} element={<ProfileRoute/>}/>
                    <Route path={routes.userPath} element={<UserRoute/>}/>
                    <Route path={routes.leaderboardPath} element={<LeaderboardPage/>}/>
                </Route>

                <Route path="*" element={<PageNotFound/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;
