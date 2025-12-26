import {usersStorage} from "./usersStorage.js";

export const auth = {
    isAuthenticated() {
        return Boolean(usersStorage.load().currentUserId);
    },

    getCurrentUser() {
        return usersStorage.getCurrentUser();
    },
};