export const routes = {
    startPath: "/",
    gamePath: "/game",
    resultsPath: "/results",
    userPath: "/user/:id",
    buildUserPath: (id) => `/user/${id}`,
    leaderboardPath: "/leaderboard",
    loginPath: "/login",
    profilePath: "/profile",
};