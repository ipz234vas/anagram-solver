import { useEffect, useState } from "react";
import { usersStorage } from "@features/auth";

export function useUsers() {
    const [users, setUsers] = useState(() => usersStorage.load());

    const refresh = () => setUsers(usersStorage.load());

    useEffect(() => {
        refresh();
    }, []);

    const login = (name) => {
        const user = usersStorage.loginByName(name);
        refresh();
        return user;
    };

    const logout = () => {
        usersStorage.logout();
        refresh();
    };

    const updateStatsAfterSession = (session) => {
        const res = usersStorage.updateStatsAfterSession(session);
        refresh();
        return res;
    };

    return {
        state: users,
        currentUser: usersStorage.getCurrentUser(),
        login,
        logout,
        updateStatsAfterSession,
    };
}