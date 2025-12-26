import {useMemo} from "react";
import {useNavigate, useParams} from "react-router";
import {routes} from "@shared/config/routes.js";
import { usersStorage } from "@features/auth";
import {PageNotFound} from "@pages/not-found/PageNotFound.jsx";
import {UserPage} from "@pages/user-page/UserPage.jsx";

export function UserRoute() {
    const {id} = useParams();
    const navigate = useNavigate();

    const {user, isCurrent} = useMemo(() => {
        const data = usersStorage.load();
        const userId = Number(id);

        const found = data.users?.find((u) => Number(u.id) === userId) ?? null;
        const current = Number(data.currentUserId) === Number(userId);

        return {user: found, isCurrent: current};
    }, [id]);

    if (!user) return <PageNotFound/>;

    return (
        <UserPage
            user={user}
            isCurrent={isCurrent}
            onBack={() => navigate(-1)}
            onLogout={() => {
                usersStorage.logout();
                navigate(routes.startPath, {replace: true});
            }}
        />
    );
}
