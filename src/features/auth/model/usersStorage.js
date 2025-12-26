import { storage } from "@shared/storage/storage.js";

const KEY = "anagram:users";

const emptyState = {
    currentUserId: null,
    users: [],
};

const defaultStats = () => ({
    bestSuccessRate: 0,
    totalScore: 0,
    totalTimeSeconds: 0,
    totalWordsSolved: 0,
    totalSessions: 0,
});

const normalizeName = (name) => name.trim().toLowerCase();

export const usersStorage = {
    load() {
        const s = storage.get(KEY, emptyState);
        return {
            ...emptyState,
            ...s,
            users: Array.isArray(s.users) ? s.users : [],
        };
    },

    save(state) {
        storage.set(KEY, state);
    },

    getNextId(users) {
        const maxId = users.reduce((m, u) => Math.max(m, Number(u.id) || 0), 0);
        return maxId + 1;
    },

    findByName(users, name) {
        const n = normalizeName(name);
        return users.find((u) => normalizeName(u.name) === n) ?? null;
    },

    loginByName(name) {
        const state = this.load();
        const trimmed = name.trim();
        if (!trimmed) return null;

        let user = this.findByName(state.users, trimmed);

        if (!user) {
            user = {
                id: this.getNextId(state.users),
                name: trimmed,
                createdAt: Date.now(),
                stats: defaultStats(),
            };
            state.users = [...state.users, user];
        }

        state.currentUserId = user.id;
        this.save(state);
        return user;
    },

    getCurrentUser() {
        const state = this.load();
        return state.users.find((u) => u.id === state.currentUserId) ?? null;
    },

    logout() {
        const state = this.load();
        state.currentUserId = null;
        this.save(state);
    },

    updateStatsAfterSession(session) {
        const state = this.load();
        const idx = state.users.findIndex((u) => u.id === state.currentUserId);
        if (idx === -1) return { isNewRecord: false };

        const user = state.users[idx];
        const s = user.stats ?? defaultStats();

        const successRate = Number(session.successRate) || 0;
        const prevBest = Number(s.bestSuccessRate) || 0;
        const isNewRecord = successRate > prevBest;

        user.stats = {
            ...s,
            bestSuccessRate: Math.max(prevBest, successRate),
            totalScore: (Number(s.totalScore) || 0) + (Number(session.score) || 0),
            totalTimeSeconds:
                (Number(s.totalTimeSeconds) || 0) + (Number(session.timeSeconds) || 0),
            totalWordsSolved:
                (Number(s.totalWordsSolved) || 0) + (Number(session.wordsSolved) || 0),
            totalSessions: (Number(s.totalSessions) || 0) + 1,
        };

        state.users = state.users.map((u, i) => (i === idx ? user : u));
        this.save(state);

        return { isNewRecord };
    },
};
